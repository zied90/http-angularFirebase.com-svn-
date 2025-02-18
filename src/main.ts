react-dom.development.js:29895 Download the React DevTools for a better development experience: https://reactjs.org/link/react-devtools
useAxios.ts:85 Fetch /user with params undefined and datas {}
4react-dom.development.js:86  Warning: Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks
    at AppContent (http://localhost/src/components/AppContent/AppContent.tsx?t=1739874824448:19:26)
    at div
    at App (http://localhost/src/App.tsx?t=1739875878342:24:22)
    at FiltersProvider (http://localhost/src/context/FiltersProvider.tsx?t=1739874824448:21:28)
    at Router (http://localhost/node_modules/.vite/deps/chunk-QQ5GUQ7I.js?v=9e035f9b:4546:15)
    at BrowserRouter (http://localhost/node_modules/.vite/deps/react-router-dom.js?v=9e035f9b:556:5)
    at SignatureProvider (http://localhost/src/context/SignatureProvider.tsx:22:37)
    at AgencesProvider (http://localhost/src/context/AgencesProvider.tsx:17:28)
    at DocumentManagerProvider (http://localhost/src/context/documentManager/DocumentManagerProvider.tsx:16:43)
    at SendUserInfos (http://localhost/src/oidc/SendUserInfos/SendUserInfos.tsx?t=1739874824448:17:26)
    at AdminProvider (http://localhost/src/services/AdminContext.tsx?t=1739874824448:13:33)
    at ge2 (http://localhost/node_modules/.vite/deps/@axa-fr_react-oidc.js?v=9e035f9b:2161:13)
    at OidcNotLoadedApp (http://localhost/src/oidc/OidcNotLoadedApp.tsx?t=1739874824448:13:29)
    at fe2 (http://localhost/node_modules/.vite/deps/@axa-fr_react-oidc.js?v=9e035f9b:2021:21)
    at _e2 (http://localhost/node_modules/.vite/deps/@axa-fr_react-oidc.js?v=9e035f9b:1984:27)
    at P2 (http://localhost/node_modules/.vite/deps/@axa-fr_react-oidc.js?v=9e035f9b:2035:24)
    at Pe2 (http://localhost/node_modules/.vite/deps/@axa-fr_react-oidc.js?v=9e035f9b:2040:13)
    at Oidc (http://localhost/src/oidc/Oidc.tsx?t=1739874824448:13:17)
    at CacheProvider (http://localhost/src/context/CacheProvider.tsx:15:33)
    at GlobalAlertProvider (http://localhost/src/toolkit/Components/GlobalAlert/GlobalAlertContext.tsx:16:32)
    at NestedProviders (http://localhost/node_modules/.vite/deps/react-flat-providers.js?v=9e035f9b:12:25)
    at NestedProviders (http://localhost/node_modules/.vite/deps/react-flat-providers.js?v=9e035f9b:12:25)
    at NestedProviders (http://localhost/node_modules/.vite/deps/react-flat-providers.js?v=9e035f9b:12:25)
    at NestedProviders (http://localhost/node_modules/.vite/deps/react-flat-providers.js?v=9e035f9b:12:25)
    at NestedProviders (http://localhost/node_modules/.vite/deps/react-flat-providers.js?v=9e035f9b:12:25)
    at FlatProviders (http://localhost/node_modules/.vite/deps/react-flat-providers.js?v=9e035f9b:31:24)
    at ChainedFlatProviders2 (http://localhost/node_modules/.vite/deps/react-flat-providers.js?v=9e035f9b:45:29)
    at AppWithProviders
printWarning @ react-dom.development.js:86
deprecations.ts:9  ⚠️ React Router Future Flag Warning: React Router will begin wrapping state updates in `React.startTransition` in v7. You can use the `v7_startTransition` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_starttransition.
warnOnce @ deprecations.ts:9
deprecations.ts:9  ⚠️ React Router Future Flag Warning: Relative route resolution within Splat routes is changing in v7. You can use the `v7_relativeSplatPath` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath.
warnOnce @ deprecations.ts:9
react-dom.development.js:86  Warning: React has detected a change in the order of Hooks called by AppContent. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks

   Previous render            Next render
   ------------------------------------------------------
1. useState                   useState
2. useState                   useState
3. useState                   useState
4. useEffect                  useEffect
5. useMemo                    useMemo
6. useContext                 useContext
7. useContext                 useContext
8. useContext                 useContext
9. useContext                 useContext
10. useContext                useContext
11. useContext                useContext
12. useContext                useContext
13. useContext                useEffect
   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    at AppContent (http://localhost/src/components/AppContent/AppContent.tsx?t=1739874824448:19:26)
    at div
    at App (http://localhost/src/App.tsx?t=1739875878342:24:22)
    at FiltersProvider (http://localhost/src/context/FiltersProvider.tsx?t=1739874824448:21:28)
    at Router (http://localhost/node_modules/.vite/deps/chunk-QQ5GUQ7I.js?v=9e035f9b:4546:15)
    at BrowserRouter (http://localhost/node_modules/.vite/deps/react-router-dom.js?v=9e035f9b:556:5)
    at SignatureProvider (http://localhost/src/context/SignatureProvider.tsx:22:37)
    at AgencesProvider (http://localhost/src/context/AgencesProvider.tsx:17:28)
    at DocumentManagerProvider (http://localhost/src/context/documentManager/DocumentManagerProvider.tsx:16:43)
    at SendUserInfos (http://localhost/src/oidc/SendUserInfos/SendUserInfos.tsx?t=1739874824448:17:26)
    at AdminProvider (http://localhost/src/services/AdminContext.tsx?t=1739874824448:13:33)
    at ge2 (http://localhost/node_modules/.vite/deps/@axa-fr_react-oidc.js?v=9e035f9b:2161:13)
    at OidcNotLoadedApp (http://localhost/src/oidc/OidcNotLoadedApp.tsx?t=1739874824448:13:29)
    at fe2 (http://localhost/node_modules/.vite/deps/@axa-fr_react-oidc.js?v=9e035f9b:2021:21)
    at _e2 (http://localhost/node_modules/.vite/deps/@axa-fr_react-oidc.js?v=9e035f9b:1984:27)
    at P2 (http://localhost/node_modules/.vite/deps/@axa-fr_react-oidc.js?v=9e035f9b:2035:24)
    at Pe2 (http://localhost/node_modules/.vite/deps/@axa-fr_react-oidc.js?v=9e035f9b:2040:13)
    at Oidc (http://localhost/src/oidc/Oidc.tsx?t=1739874824448:13:17)
    at CacheProvider (http://localhost/src/context/CacheProvider.tsx:15:33)
    at GlobalAlertProvider (http://localhost/src/toolkit/Components/GlobalAlert/GlobalAlertContext.tsx:16:32)
    at NestedProviders (http://localhost/node_modules/.vite/deps/react-flat-providers.js?v=9e035f9b:12:25)
    at NestedProviders (http://localhost/node_modules/.vite/deps/react-flat-providers.js?v=9e035f9b:12:25)
    at NestedProviders (http://localhost/node_modules/.vite/deps/react-flat-providers.js?v=9e035f9b:12:25)
    at NestedProviders (http://localhost/node_modules/.vite/deps/react-flat-providers.js?v=9e035f9b:12:25)
    at NestedProviders (http://localhost/node_modules/.vite/deps/react-flat-providers.js?v=9e035f9b:12:25)
    at FlatProviders (http://localhost/node_modules/.vite/deps/react-flat-providers.js?v=9e035f9b:31:24)
    at ChainedFlatProviders2 (http://localhost/node_modules/.vite/deps/react-flat-providers.js?v=9e035f9b:45:29)
    at AppWithProviders
printWarning @ react-dom.development.js:86
useAxios.ts:85 Fetch /user with params undefined and datas {"email":"zied.miladi.intm@axa.fr","userNumber":"S875170","name":"MILADI Zied","axaType":"2"}
useAxios.ts:85 Fetch /parameters/legal with params [object Object] and datas undefined
useAxios.ts:85 Fetch /agency with params [object Object] and datas undefined
useAxios.ts:85 Fetch /parameters/signature with params [object Object] and datas undefined
[NOUVEAU] Expliquez les erreurs de la console à l’aide de Copilot pour Edge : cliquez sur
         
         pour expliquer une erreur.
        En savoir plus
        Ne plus afficher
