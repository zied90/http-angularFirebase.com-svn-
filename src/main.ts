export const AppRoutes = () => {
  const userRole=useUserRole()
    console.log(consolePfelAdmin,"sqqqqqq")
    console.log(userRole ,"ssss")
  const router = createProtectedRouter(userRole);
  return <RouterProvider router={router} />;
};
Argument of type 'string | null' is not assignable to parameter of type 'UserRole'.
  Type 'null' is not assignable to type 'UserRole
