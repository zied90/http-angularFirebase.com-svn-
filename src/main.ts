
src\App.scss 2:1              root stylesheet

11:06:58 [vite] Pre-transform error: Failed to resolve import "@/services/AdminContext" from "src/components/AppContent/AppContent.tsx". Does the file exist?

11:06:58 [vite] Pre-transform error: Failed to resolve import "@/Admin/Admin" from "src/config/Routes.tsx". Does the file exist?

11:06:58 [vite] Pre-transform error: Failed to resolve import "@/Admin/Admin" from "src/config/Routes.tsx". Does the file exist? (x2)

11:06:58 [vite] Pre-transform error: Failed to resolve import "@/services/UserContext" from "src/oidc/SendUserInfos/SendUserInfos.tsx". Does the file exist?

11:06:59 [vite] Pre-transform error: Failed to resolve import "@/services/AdminContext" from "src/toolkit/Components/Navigation/NavigationList/NavigationList.tsx". Does the file exist?

11:07:00 [vite] Pre-transform error: Failed to resolve import "@/Admin/Admin" from "src/config/Routes.tsx". Does the file exist?

11:07:00 [vite] Pre-transform error: Failed to resolve import "@/Admin/Admin" from "src/config/Routes.tsx". Does the file exist? (x2)

11:07:00 [vite] Pre-transform error: Failed to resolve import "@/Admin/Admin" from "src/config/Routes.tsx". Does the file exist? (x3)

11:07:01 [vite] Pre-transform error: Failed to resolve import "@/services/UserContext" from "src/context/FiltersProvider.tsx". Does the file exist?

11:07:01 [vite] Pre-transform error: Failed to resolve import "@/services/UserContext" from "src/context/FiltersProvider.tsx". Does the file exist? (x2)

11:07:01 [vite] Pre-transform error: Failed to resolve import "@/Admin/Admin" from "src/config/Routes.tsx". Does the file exist?

11:07:01 [vite] Pre-transform error: Failed to resolve import "@/Admin/Admin" from "src/config/Routes.tsx". Does the file exist? (x2)

11:07:01 [vite] Pre-transform error: Failed to resolve import "@/Admin/Admin" from "src/config/Routes.tsx". Does the file exist? (x3)

11:07:01 [vite] Pre-transform error: Failed to resolve import "@/Admin/Admin" from "src/config/Routes.tsx". Does the file exist? (x4)

11:07:02 [vite] Internal server error: Failed to resolve import "./Utils/polyfills/window.crypto.subtle" from "src/index.tsx". Does the file exist?

  Plugin: vite:import-analysis

  File: C:/Users/B695GL/Downloads/Ellipse/src/index.tsx:17:15

  14 |  }

  15 |  if (window.crypto && !window.crypto.subtle) {

  16 |      await import("./Utils/polyfills/window.crypto.subtle");

     |                   ^

  17 |  }

  18 |  const root = ReactDOM.createRoot(document.getElementById("root"));

      at TransformPluginContext._formatError (file:///C:/Users/B695GL/Downloads/Ellipse/node_modules/vite/dist/node/chunks/dep-CHZK6zbr.js:49257:41)

      at TransformPluginContext.error (file:///C:/Users/B695GL/Downloads/Ellipse/node_modules/vite/dist/node/chunks/dep-CHZK6zbr.js:49252:16)

      at normalizeUrl (file:///C:/Users/B695GL/Downloads/Ellipse/node_modules/vite/dist/node/chunks/dep-CHZK6zbr.js:64199:23)

      at async file:///C:/Users/B695GL/Downloads/Ellipse/node_modules/vite/dist/node/chunks/dep-CHZK6zbr.js:64331:39

      at async Promise.all (index 9)

      at async TransformPluginContext.transform (file:///C:/Users/B695GL/Downloads/Ellipse/node_modules/vite/dist/node/chunks/dep-CHZK6zbr.js:64258:7)

      at async PluginContainer.transform (file:///C:/Users/B695GL/Downloads/Ellipse/node_modules/vite/dist/node/chunks/dep-CHZK6zbr.js:49098:18)

      at async loadAndTransform (file:///C:/Users/B695GL/Downloads/Ellipse/node_modules/vite/dist/node/chunks/dep-CHZK6zbr.js:51931:27)

11:07:02 [vite] Pre-transform error: Failed to resolve import "./Utils/polyfills/window.crypto.subtle" from "src/index.tsx". Does the file exist?

11:07:02 [vite] Pre-transform error: Failed to resolve import "@/Admin/Admin" from "src/config/Routes.tsx". Does the file exist?

11:07:03 [vite] Pre-transform error: Failed to resolve import "@/services/UserContext" from "src/context/FiltersProvider.tsx". Does the file exist?

11:07:03 [vite] Pre-transform error: Failed to resolve import "./Utils/polyfills/window.crypto.subtle" from "src/index.tsx". Does the file exist?

11:07:03 [vite] Pre-transform error: Failed to resolve import "@/Admin/Admin" from "src/config/Routes.tsx". Does the file exist?

11:07:03 [vite] Pre-transform error: Failed to resolve import "@/services/UserContext" from "src/context/FiltersProvider.tsx". Does the file exist?

11:07:03 [vite] Pre-transform error: Failed to resolve import "@/Admin/Admin" from "src/config/Routes.tsx". Does the file exist?

11:07:04 [vite] Pre-transform error: Failed to resolve import "@/services/UserContext" from "src/context/FiltersProvider.tsx". Does the file exist?

11:07:04 [vite] Pre-transform error: Failed to resolve import "@/Admin/Admin" from "src/config/Routes.tsx". Does the file exist?

src/components/AppContent/AppContent.tsx:7:26 - error TS2307: Cannot find module '@/services/AdminContext' or its corresponding type declarations.
 
7 import { useAdmin } from "@/services/AdminContext";

                           ~~~~~~~~~~~~~~~~~~~~~~~~~
 
src/config/Routes.tsx:20:33 - error TS2307: Cannot find module '@/Admin/Admin' or its corresponding type declarations.
 
20 const Admin = lazy(() => import("@/Admin/Admin"));

                                   ~~~~~~~~~~~~~~~
 
src/config/Routes.tsx:21:41 - error TS2307: Cannot find module '@/Admin/Habilitations' or its corresponding type declarations.
 
21 const Habilitations = lazy(() => import("@/Admin/Habilitations"));

                                           ~~~~~~~~~~~~~~~~~~~~~~~
 
src/config/Routes.tsx:22:39 - error TS2307: Cannot find module '@/Admin/ajoutModele' or its corresponding type declarations.
 
22 const AjoutModele = lazy(() => import("@/Admin/ajoutModele"));

                                         ~~~~~~~~~~~~~~~~~~~~~
 
src/config/Routes.tsx:23:42 - error TS2307: Cannot find module '@/Admin/GestionModeles' or its corresponding type declarations.
 
23 const GestionModeles = lazy(() => import("@/Admin/GestionModeles"));

                                            ~~~~~~~~~~~~~~~~~~~~~~~~
 
src/context/FiltersProvider.tsx:11:25 - error TS2307: Cannot find module '@/services/UserContext' or its corresponding type declarations.
 
11 import { useUser } from "@/services/UserContext";

                           ~~~~~~~~~~~~~~~~~~~~~~~~
 
src/index.tsx:17:16 - error TS2307: Cannot find module './Utils/polyfills/window.crypto.subtle' or its corresponding type declarations.
 
17   await import("./Utils/polyfills/window.crypto.subtle");

                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 
src/mocks/handlers.ts:22:30 - error TS2307: Cannot find module './response/admin/saveTemplatePost.json' or its corresponding type declarations.
 
22 import saveTemplatePost from "./response/admin/saveTemplatePost.json";

                                ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 
src/mocks/handlers.ts:23:27 - error TS2307: Cannot find module './response/admin/habilitationResponse.json' or its corresponding type declarations.
 
23 import habilitations from "./response/admin/habilitationResponse.json";

                             ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 
src/mocks/handlers.ts:24:25 - error TS2307: Cannot find module './response/admin/profiles.json' or its corresponding type declarations.
 
24 import profilsJSON from "./response/admin/profiles.json";

                           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 
src/mocks/handlers.ts:25:23 - error TS2307: Cannot find module './response/admin/types.json' or its corresponding type declarations.
 
25 import typesJSON from "./response/admin/types.json";

                         ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 
src/mocks/handlers.ts:26:28 - error TS2307: Cannot find module './response/admin/workspaces.json' or its corresponding type declarations.
 
26 import workspacesJSON from "./response/admin/workspaces.json";

                              ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 
src/mocks/handlers.ts:27:22 - error TS2307: Cannot find module './response/user/user_PUT.json' or its corresponding type declarations.
 
27 import userJSON from "./response/user/user_PUT.json";

                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 
src/oidc/OidcNotLoadedApp.tsx:4:31 - error TS2307: Cannot find module '@/services/AdminContext' or its corresponding type declarations.
 
4 import { AdminProvider } from "@/services/AdminContext";

                                ~~~~~~~~~~~~~~~~~~~~~~~~~
 
src/oidc/OidcNotLoadedApp.tsx:5:30 - error TS2307: Cannot find module '@/services/UserContext' or its corresponding type declarations.
 
5 import { UserProvider } from "@/services/UserContext";

                               ~~~~~~~~~~~~~~~~~~~~~~~~
 
src/oidc/SendUserInfos/SendUserInfos.tsx:3:25 - error TS2307: Cannot find module '@/services/UserContext' or its corresponding type declarations.
 
3 import { useUser } from "@/services/UserContext";

                          ~~~~~~~~~~~~~~~~~~~~~~~~
 
src/toolkit/Components/Navigation/NavigationList/NavigationList.tsx:7:26 - error TS2307: Cannot find module '@/services/AdminContext' or its corresponding type declarations.
 
7 import { useAdmin } from "@/ser
 
