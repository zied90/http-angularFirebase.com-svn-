import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import { putInfosUserRoute } from "@/Api/ApiRoutes";
import { useDelayApi } from "@/hooks/useApi";
import { useOidcUser } from "@/oidc/useOidc";

// Define the types for our user data
interface OidcUserData {
  email?: string;
  axa_uid_racf?: string;
  name?: string;
  axa_uid_rdu?: string;
  axa_type?: string;
  [key: string]: any; // For any other properties in the OIDC user object
}

interface ApiUserData {
  authorities?: string[];
  [key: string]: any; // For any other properties in the API response
}

interface UserContextType {
  oidcUser: OidcUserData | null;
  apiUser: ApiUserData | null;
  isAdmin: boolean;
  isAllowed: boolean;
  isLoading: boolean;
  error: Error | null;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create the provider component
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { oidcUser } = useOidcUser();
  const { email, axa_uid_racf, name, axa_uid_rdu, axa_type } = (oidcUser as OidcUserData) || {};

  const { call, loaded } = useDelayApi(putInfosUserRoute);
  const [apiUser, setApiUser] = useState<ApiUserData | null>(null);
  const [isAllowed, setIsAllowed] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const apiCallMadeRef = useRef(false);

  useEffect(() => {
    // Skip if we don't have the required user data
    if (!email || !axa_uid_racf) return;

    // Skip if we've already made the API call with this user data
    if (apiCallMadeRef.current) return;

    const fetchUserData = async () => {
      try {
        apiCallMadeRef.current = true;
        const response = await call({
          email,
          userNumber: axa_uid_racf,
          name,
          axaUiRdu: axa_uid_rdu,
          axaType: axa_type,
        });

        setApiUser(response);

        if (response?.authorities) {
          setIsAdmin(response.authorities.includes("ADMIN"));
        }

        setIsAllowed(true);
      } catch (error) {
        console.error("Error while sending user infos to API", error);
        setError(error instanceof Error ? error : new Error("Unknown error"));
        // Reset the flag so we can try again if needed
        apiCallMadeRef.current = false;
      }
    };

    fetchUserData();

    // Reset the flag when user data changes
    return () => {
      apiCallMadeRef.current = false;
    };
  }, [email, axa_uid_racf, name, axa_uid_rdu, axa_type]); 

  const contextValue: UserContextType = {
    oidcUser: (oidcUser as OidcUserData) || null,
    apiUser,
    isAdmin,
    isAllowed,
    isLoading: !loaded,
    error,
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

// Create the hook to use the context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
 en local ilya que un seulk appel user  http://localhost:8080/api/user avec  les valeur:{
    "email": "zied.miladi.intm@axa.fr",
    "userNumber": "S875170",
    "name": "MILADI Zied",
    "axaType": "2"
} mais en envirenemnt recte jaitrouvé 2 appel le premier  http://localhost:8080/api/user avec {} et le retour  {
    "id": null,
    "email": null,
    "userNumber": null,
    "axaType": null,
    "name": null,
    "authorities": null,
    "portfolios": null
}  et un deuxieme appel  http://localhost:8080/api/user avec {
    "email": "zied.miladi.intm@axa.fr",
    "userNumber": "S875170",
    "name": "MILADI Zied",
    "axaType": "2"
}  et rerour {
    "id": 92,
    "email": "zied.miladi.intm@axa.fr",
    "userNumber": "S875170",
    "axaType": "2",
    "name": "MILADI Zied",
    "authorities": [
        "ADMIN"
    ],
    "portfolios": []
}  je comprend pas pour ce nest pas le meme comprtement 
