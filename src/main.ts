   </div>
            <div
              class="row"
            >
              <div
                class="col-lg-3 col-md-12 no-space-in-mobile"
              />
              <div
                class="col-lg-9 col-md-12 full-space-in-mobile"
              >
                <div
                  data-testid="actApp"
                >
                  ActApp mocked
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
 ❯ Object.getElementError node_modules/@testing-library/dom/dist/config.js:37:19
 ❯ node_modules/@testing-library/dom/dist/query-helpers.js:76:38
 ❯ node_modules/@testing-library/dom/dist/query-helpers.js:52:17
 ❯ getByTestId node_modules/@testing-library/dom/dist/query-helpers.js:95:19
 ❯ src/pages/Container/containerApp.test.tsx:93:31
     91|     );
     92| 
     93|     let switchToggle = screen.getByTestId("switch-act") as HTMLInputElement;
       |                               ^
     94|     await act(() => {
     95|       fireEvent.click(switchToggle);

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/3]⎯
 FAIL  src/pages/Container/containerApp.test.tsx > ContainerApp > should switch to groupAct
TestingLibraryElementError: Unable to find an element by: [data-testid="switch-act"]

Ignored nodes: comments, script, style
<body>
  <div>
    <div
      class="loader-test"
    >
      <div
        data-testid="container-app"
      >
        <div
          class="af-layout__wapper"
        >
          <div
            class="af-title-bar af-title-bar--sticky"
          >
            <div
              class="container af-title-bar__wrapper"
            >
              <h1
                class="af-title-bar__title"
              />
            </div>
          </div>
          <div
            class="container"
          >
            <div
              class="app-toolbar"
            >
              <div
                class="switch-wrapper"
              >
                <label>
                  Affichage par :
                </label>
                <div
                  class="switch-container"
                >
                  <ul
                    class="switch-nav"
                  >
                    <li
                      class="switch-item--doc"
                    >
                      <input
                        id="switch-act-doc"
                        name="switch-act"
                        type="radio"
                        value="doc"
                      />
                      <label
                        for="switch-act-doc"
                      >
                        <i
                          class="icon icon-document"
                        />
                         Document
                      </label>
                    </li>
                    <li
                      class="switch-item--folder"
                    >
                      <input
                        id="switch-act-folder"
                        name="switch-act"
                        type="radio"
                        value="folder"
                      />
                      <label
                        for="switch-act-folder"
                      >
                        <i
                          class="glyphicon glyphicon-folder-open"
                        />
                         Dossier
                      </label>
                    </li>
                  </ul>
                  <ul
                    class="switch-nav duplicate-nav"
                    style="clip-path: inset(0 0 0 NaN% round 1rem);"
                  >
                    <li
                      class="switch-item--doc"
                    >
                      <label
                        for="switch-act-doc"
                      >
                        <i
                          class="icon icon-document"
                        />
                         Document
                      </label>
                    </li>
                    <li
                      class="switch-item--folder"
                    >
                      <label
                        for="switch-act-folder"
                      >
                        <i
                          class="glyphicon glyphicon-folder-open"
                        />
                         Dossier
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
              |
              <div
                class="refresh-btn-wrapper"
              >
                Recharger  
                <button
                  class="refresh-btn"
                  data-testid="refresh-button"
                >
                  <i
                    class="glyphicon glyphicon-refresh refresh-icon"
                  />
                </button>
              </div>
            </div>
            <div
              class="row"
            >
              <div
                class="col-lg-3 col-md-12 no-space-in-mobile"
              />
              <div
                class="col-lg-9 col-md-12 full-space-in-mobile"
              >
                <div
                  data-testid="actApp"
                >
                  ActApp mocked
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
 ❯ Object.getElementError node_modules/@testing-library/dom/dist/config.js:37:19
 ❯ node_modules/@testing-library/dom/dist/query-helpers.js:76:38
 ❯ node_modules/@testing-library/dom/dist/query-helpers.js:52:17
 ❯ getByTestId node_modules/@testing-library/dom/dist/query-helpers.js:95:19
 ❯ src/pages/Container/containerApp.test.tsx:124:26
    122|     );
    123|     const { getByTestId } = render(node);
    124|     const switchToggle = getByTestId("switch-act") as HTMLInputElement;
       |                          ^
    125|     expect(switchToggle.checked).toBe(false);
    126|     await act(() => fireEvent.click(switchToggle));

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/3]⎯
 FAIL  src/pages/Container/containerApp.test.tsx > ContainerApp > should call refetchQueries when refreshDocumentApp is called and groupByAct is false
AssertionError: expected "refetchQueries" to be called with arguments: [ [ 'finddoc' ] ]

Received:

  1st refetchQueries call:

  Array [
    Array [
-     "finddoc",
+     "findact",
    ],
  ]


Number of calls: 1


Ignored nodes: comments, script, style
<html>
  <head />
  <body>
    <div>
      <div
        class="loader-test"
      >
        <div
          data-testid="container-app"
        >
          <div
            class="af-layout__wapper"
          >
            <div
              class="af-title-bar af-title-bar--sticky"
            >
              <div
                class="container af-title-bar__wrapper"
              >
                <h1
                  class="af-title-bar__title"
                />
              </div>
            </div>
            <div
              class="container"
            >
              <div
                class="app-toolbar"
              >
                <div
                  class="switch-wrapper"
                >
                  <label>
                    Affichage par :
                  </label>
                  <div
                    class="switch-container"
                  >
                    <ul
                      class="switch-nav"
                    >
                      <li
                        class="switch-item--doc"
                      >
                        <input
                          id="switch-act-doc"
                          name="switch-act"
                          type="radio"
                          value="doc"
                        />
                        <label
                          for="switch-act-doc"
                        >
                          <i
                            class="icon icon-document"
                          />
                           Document
                        </label>
                      </li>
                      <li
                        class="switch-item--folder"
                      >
                        <input
                          id="switch-act-folder"
                          name="switch-act"
                          type="radio"
                          value="folder"
                        />
                        <label
                          for="switch-act-folder"
                        >
                          <i
                            class="glyphicon glyphicon-folder-open"
                          />
                           Dossier
                        </label>
                      </li>
                    </ul>
                    <ul
                      class="switch-nav duplicate-nav"
                      style="clip-path: inset(0 0 0 NaN% round 1rem);"
                    >
                      <li
                        class="switch-item--doc"
                      >
                        <label
                          for="switch-act-doc"
                        >
                          <i
                            class="icon icon-document"
                          />
                           Document
                        </label>
                      </li>
                      <li
                        class="switch-item--folder"
                      >
                        <label
                          for="switch-act-folder"
                        >
                          <i
                            class="glyphicon glyphicon-folder-open"
                          />
                           Dossier
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
                |
                <div
                  class="refresh-btn-wrapper"
                >
                  Recharger  
                  <button
                    class="refresh-btn"
                    data-testid="refresh-button"
                  >
                    <i
                      class="glyphicon glyphicon-refresh refresh-icon"
                    />
                  </button>
                </div>
              </div>
              <div
                class="row"
              >
                <div
                  class="col-lg-3 col-md-12 no-space-in-mobile"
                />
                <div
                  class="col-lg-9 col-md-12 full-space-in-mobile"
                >
                  <div
                    data-testid="actApp"
                  >
                    ActApp mocked
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
 ❯ src/pages/Container/containerApp.test.tsx:159:37
    157|       fireEvent.click(refreshButton);
    158|     });
       |                                     ^
    160|   });
    161| });
 ❯ runWithExpensiveErrorDiagnosticsDisabled node_modules/@testing-library/dom/dist/config.js:47:12
 ❯ checkCallback node_modules/@testing-library/dom/dist/wait-for.js:124:77
 ❯ Timeout.checkRealTimersCallback node_modules/@testing-library/dom/dist/wait-for.js:118:16

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[3/3]⎯

 Test Files  2 failed (2)
      Tests  4 failed | 7 passed (11)
   Start at  10:26:46
   Duration  11.40s

 FAIL  Tests failed. Watching for file changes...
       press h to show help, press q to quit
Cancelling test run. Press CTRL+c again to exit forcefully.

PS C:\dev\Front\Spoolnet-migration> npm run test

> spoolnet-vite@3.3.1 test
> vitest


 DEV  v2.1.6 C:/dev/Front/Spoolnet-migration

Cancelling test run. Press CTRL+c again to exit forcefully.

 · src/components/actions/esign.test.tsx (0)
 · src/components/status/statusDoc.test.tsx (0)
 · src/App.test.tsx (0)
 · src/api/apifunctions/findDocuments.test.ts (0)
 · src/utils/trimValues.test.ts (0)
 · src/utils/retrieveOptions.test.ts (0)
 · src/api/apifunctions/configuration.test.ts (0)
 · src/api/apifunctions/deleteDocuments.test.ts (0)
 · src/utils/dateFormat.test.ts (0)
 · src/api/apifunctions/subscribers.test.ts (0)
 · src/utils/extractValues.test.ts (0)
 · src/utils/isNullOrUndefined.test.ts (0)
 · src/utils/StringUtils.test.ts (0)
 · src/api/apifunctions/ged.test.ts (0)
 · src/utils/stringPluralUtil.test.ts (0)
 · src/api/apifunctions/actDocuments.test.ts (0)
 · src/components/actions/delete.test.tsx (0)
 · src/api/apifunctions/deleteAct.test.ts (0)
TAP version 13
PS C:\dev\Front\Spoolnet-migration> npm run test

> spoolnet-vite@3.3.1 test
> vitest


 DEV  v2.1.6 C:/dev/Front/Spoolnet-migration

stderr | src/utils/localStorage.test.ts > LocalStorage utilities > should set the correct value to localStorage
Unable to access localStorage

stderr | src/utils/localStorage.test.ts > LocalStorage utilities > should log a warning if localStorage is not available
Unable to access localStorage

 ✓ src/utils/docUtils.test.ts (10)
 ✓ src/utils/getEsignUrl.test.ts (9)
stderr | src/pages/Container/containerApp.test.tsx > ContainerApp > renders the ContainerApp component
⚠️ React Router Future Flag Warning: React Router will begin wrapping state updates in `React.startTransition` in v7. You can use the `v7_startTransition` future flag to opt-in early. For more
 information, see https://reactrouter.com/v6/upgrading/future#v7_starttransition.
⚠️ React Router Future Flag Warning: Relative route resolution within Splat routes is changing in v7. You can use the `v7_relativeSplatPath` future flag to opt-in early. For more information, 
see https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath.

 ✓ src/App.test.tsx (1)
 ✓ src/utils/addPrefixPfel.test.ts (4)
 ✓ src/utils/dateFormat.test.ts (4)
 ✓ src/utils/docUtils.test.ts (10)
 ✓ src/utils/extractValues.test.ts (2)
 ✓ src/utils/getDomainForUrl.test.ts (3)
 ✓ src/utils/getEsignUrl.test.ts (9)
 ✓ src/utils/isNullOrUndefined.test.ts (3)
 ❯ src/utils/localStorage.test.ts (5)
   ❯ LocalStorage utilities (5)
     ✓ should return true by default if localStorage is inaccessible
     ✓ should return false if localStorage groupByAct is "false"
     ✓ should return true if localStorage groupByAct is not "false"
     × should set the correct value to localStorage
     ✓ should log a warning if localStorage is not available
 ✓ src/utils/retrieveOptions.test.ts (2)
 ✓ src/utils/stringPluralUtil.test.ts (3)
 ✓ src/utils/StringUtils.test.ts (4)
 ✓ src/utils/trimValues.test.ts (3)
 ✓ src/utils/validateEmail.test.ts (4)
 ✓ src/api/apifunctions/actDocuments.test.ts (1)
 ✓ src/api/apifunctions/byNumeroClientOrNumeroContrat.test.ts (3)
 ✓ src/api/apifunctions/configuration.test.ts (2)
 ✓ src/api/apifunctions/deleteAct.test.ts (1)
 ✓ src/api/apifunctions/deleteDocuments.test.ts (3)
 ✓ src/api/apifunctions/documentsByActs.test.ts (3)
 ✓ src/api/apifunctions/documentShow.test.ts (3)
 ✓ src/api/apifunctions/findDocuments.test.ts (3)
 ✓ src/api/apifunctions/findDocumentsByAct.test.ts (3)
 ✓ src/api/apifunctions/fusionDocumentsWithEsignTreatment.test.ts (3)
 ✓ src/api/apifunctions/fusionDocumentsWithParameterizedPrePrinted.test.ts (3)
 ✓ src/api/apifunctions/ged.test.ts (1)
 ✓ src/api/apifunctions/preprintedList.test.ts (4)
 ✓ src/api/apifunctions/sendEmail.test.ts (3)
 ✓ src/api/apifunctions/subscribers.test.ts (3)
 ✓ src/api/config/apiHandler.test.ts (3)
 ✓ src/components/actions/delete.test.tsx (1)
 ✓ src/components/actions/esign.test.tsx (4)
 ✓ src/components/actions/mail.test.tsx (3)
 ✓ src/components/actions/print.test.tsx (3)
 ✓ src/components/actions/treat.test.tsx (3)
 ✓ src/components/Pagination/PaginationUtils.test.tsx (14)
 ✓ src/components/status/statusDoc.test.tsx (1)
 ❯ src/pages/Container/containerApp.test.tsx (6) 1490ms
   ❯ ContainerApp (6) 1483ms
     ✓ renders the ContainerApp component
     × updates the groupByAct state when switch is toggled
     ✓ calls the refreshDocumentApp function when refresh button is clicked
     × should switch to groupAct
     ✓ should call setDocumentsByAct when updateActs onSuccess is called
     × should call refetchQueries when refreshDocumentApp is called and groupByAct is false 1121ms
 ✓ src/pages/Filters/FiltersUtils.test.ts (8)

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 4 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯
 FAIL  src/utils/localStorage.test.ts > LocalStorage utilities > should set the correct value to localStorage
TypeError: undefined is not a spy or a call to a spy!
 ❯ src/utils/localStorage.test.ts:41:34
     39|     setGroupByActInLocalStorage(true);
     40|     // Vérifier que localStorage.setItem a été appelé avec les bons arguments
     41|     expect(localStorage.setItem).toHaveBeenCalledWith("groupByAct", "true");
       |                                  ^
     42|   });
     43|   it("should log a warning if localStorage is not available", () => {

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/4]⎯
 FAIL  src/pages/Container/containerApp.test.tsx > ContainerApp > updates the groupByAct state when switch is toggled
TestingLibraryElementError: Unable to find an element by: [data-testid="switch-act"]

Ignored nodes: comments, script, style
<body>
  <div>
    <div
      class="loader-test"
    >
      <div
        data-testid="container-app"
      >
        <div
          class="af-layout__wapper"
        >
          <div
            class="af-title-bar af-title-bar--sticky"
          >
            <div
              class="container af-title-bar__wrapper"
            >
              <h1
                class="af-title-bar__title"
              />
            </div>
          </div>
          <div
            class="container"
          >
            <div
              class="app-toolbar"
            >
              <div
                class="switch-wrapper"
              >
                <label>
                  Affichage par :
                </label>
                <div
                  class="switch-container"
                >
                  <ul
                    class="switch-nav"
                  >
                    <li
                      class="switch-item--doc"
                    >
                      <input
                        id="switch-act-doc"
                        name="switch-act"
                        type="radio"
                        value="doc"
                      />
                      <label
                        for="switch-act-doc"
                      >
                        <i
                          class="icon icon-document"
                        />
                         Document
                      </label>
                    </li>
                    <li
                      class="switch-item--folder"
                    >
                      <input
                        id="switch-act-folder"
                        name="switch-act"
                        type="radio"
                        value="folder"
                      />
                      <label
                        for="switch-act-folder"
                      >
                        <i
                          class="glyphicon glyphicon-folder-open"
                        />
                         Dossier
                      </label>
                    </li>
                  </ul>
                  <ul
                    class="switch-nav duplicate-nav"
                    style="clip-path: inset(0 0 0 NaN% round 1rem);"
                  >
                    <li
                      class="switch-item--doc"
                    >
                      <label
                        for="switch-act-doc"
                      >
                        <i
                          class="icon icon-document"
                        />
                         Document
                      </label>
                    </li>
                    <li
                      class="switch-item--folder"
                    >
                      <label
                        for="switch-act-folder"
                      >
                        <i
                          class="glyphicon glyphicon-folder-open"
                        />
                         Dossier
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
              |
              <div
                class="refresh-btn-wrapper"
              >
                Recharger  
                <button
                  class="refresh-btn"
                  data-testid="refresh-button"
                >
                  <i
                    class="glyphicon glyphicon-refresh refresh-icon"
                  />
                </button>
              </div>
            </div>
            <div
              class="row"
            >
              <div
                class="col-lg-3 col-md-12 no-space-in-mobile"
              />
              <div
                class="col-lg-9 col-md-12 full-space-in-mobile"
              >
                <div
                  data-testid="actApp"
                >
                  ActApp mocked
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
 ❯ Object.getElementError node_modules/@testing-library/dom/dist/config.js:37:19
 ❯ node_modules/@testing-library/dom/dist/query-helpers.js:76:38
 ❯ node_modules/@testing-library/dom/dist/query-helpers.js:52:17
 ❯ getByTestId node_modules/@testing-library/dom/dist/query-helpers.js:95:19
 ❯ src/pages/Container/containerApp.test.tsx:93:31
     91|     );
     92| 
     93|     let switchToggle = screen.getByTestId("switch-act") as HTMLInputElement;
       |                               ^
     94|     await act(() => {
     95|       fireEvent.click(switchToggle);

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/4]⎯
 FAIL  src/pages/Container/containerApp.test.tsx > ContainerApp > should switch to groupAct
TestingLibraryElementError: Unable to find an element by: [data-testid="switch-act"]

Ignored nodes: comments, script, style
<body>
  <div>
    <div
      class="loader-test"
    >
      <div
        data-testid="container-app"
      >
        <div
          class="af-layout__wapper"
        >
          <div
            class="af-title-bar af-title-bar--sticky"
          >
            <div
              class="container af-title-bar__wrapper"
            >
              <h1
                class="af-title-bar__title"
              />
            </div>
          </div>
          <div
            class="container"
          >
            <div
              class="app-toolbar"
            >
              <div
                class="switch-wrapper"
              >
                <label>
                  Affichage par :
                </label>
                <div
                  class="switch-container"
                >
                  <ul
                    class="switch-nav"
                  >
                    <li
                      class="switch-item--doc"
                    >
                      <input
                        id="switch-act-doc"
                        name="switch-act"
                        type="radio"
                        value="doc"
                      />
                      <label
                        for="switch-act-doc"
                      >
                        <i
                          class="icon icon-document"
                        />
                         Document
                      </label>
                    </li>
                    <li
                      class="switch-item--folder"
                    >
                      <input
                        id="switch-act-folder"
                        name="switch-act"
                        type="radio"
                        value="folder"
                      />
                      <label
                        for="switch-act-folder"
                      >
                        <i
                          class="glyphicon glyphicon-folder-open"
                        />
                         Dossier
                      </label>
                    </li>
                  </ul>
                  <ul
                    class="switch-nav duplicate-nav"
                    style="clip-path: inset(0 0 0 NaN% round 1rem);"
                  >
                    <li
                      class="switch-item--doc"
                    >
                      <label
                        for="switch-act-doc"
                      >
                        <i
                          class="icon icon-document"
                        />
                         Document
                      </label>
                    </li>
                    <li
                      class="switch-item--folder"
                    >
                      <label
                        for="switch-act-folder"
                      >
                        <i
                          class="glyphicon glyphicon-folder-open"
                        />
                         Dossier
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
              |
              <div
                class="refresh-btn-wrapper"
              >
                Recharger  
                <button
                  class="refresh-btn"
                  data-testid="refresh-button"
                >
                  <i
                    class="glyphicon glyphicon-refresh refresh-icon"
                  />
                </button>
              </div>
            </div>
            <div
              class="row"
            >
              <div
                class="col-lg-3 col-md-12 no-space-in-mobile"
              />
              <div
                class="col-lg-9 col-md-12 full-space-in-mobile"
              >
                <div
                  data-testid="actApp"
                >
                  ActApp mocked
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
 ❯ Object.getElementError node_modules/@testing-library/dom/dist/config.js:37:19
 ❯ node_modules/@testing-library/dom/dist/query-helpers.js:76:38
 ❯ node_modules/@testing-library/dom/dist/query-helpers.js:52:17
 ❯ getByTestId node_modules/@testing-library/dom/dist/query-helpers.js:95:19
 ❯ src/pages/Container/containerApp.test.tsx:124:26
    122|     );
    123|     const { getByTestId } = render(node);
    124|     const switchToggle = getByTestId("switch-act") as HTMLInputElement;
       |                          ^
    125|     expect(switchToggle.checked).toBe(false);
    126|     await act(() => fireEvent.click(switchToggle));

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[3/4]⎯
 FAIL  src/pages/Container/containerApp.test.tsx > ContainerApp > should call refetchQueries when refreshDocumentApp is called and groupByAct is false
AssertionError: expected "refetchQueries" to be called with arguments: [ [ 'finddoc' ] ]

Received:

  1st refetchQueries call:

  Array [
    Array [
-     "finddoc",
+     "findact",
    ],
  ]


Number of calls: 1


Ignored nodes: comments, script, style
<html>
  <head />
  <body>
    <div>
      <div
        class="loader-test"
      >
        <div
          data-testid="container-app"
        >
          <div
            class="af-layout__wapper"
          >
            <div
              class="af-title-bar af-title-bar--sticky"
            >
              <div
                class="container af-title-bar__wrapper"
              >
                <h1
                  class="af-title-bar__title"
                />
              </div>
            </div>
            <div
              class="container"
            >
              <div
                class="app-toolbar"
              >
                <div
                  class="switch-wrapper"
                >
                  <label>
                    Affichage par :
                  </label>
                  <div
                    class="switch-container"
                  >
                    <ul
                      class="switch-nav"
                    >
                      <li
                        class="switch-item--doc"
                      >
                        <input
                          id="switch-act-doc"
                          name="switch-act"
                          type="radio"
                          value="doc"
                        />
                        <label
                          for="switch-act-doc"
                        >
                          <i
                            class="icon icon-document"
                          />
                           Document
                        </label>
                      </li>
                      <li
                        class="switch-item--folder"
                      >
                        <input
                          id="switch-act-folder"
                          name="switch-act"
                          type="radio"
                          value="folder"
                        />
                        <label
                          for="switch-act-folder"
                        >
                          <i
                            class="glyphicon glyphicon-folder-open"
                          />
                           Dossier
                        </label>
                      </li>
                    </ul>
                    <ul
                      class="switch-nav duplicate-nav"
                      style="clip-path: inset(0 0 0 NaN% round 1rem);"
                    >
                      <li
                        class="switch-item--doc"
                      >
                        <label
                          for="switch-act-doc"
                        >
                          <i
                            class="icon icon-document"
                          />
                           Document
                        </label>
                      </li>
                      <li
                        class="switch-item--folder"
                      >
                        <label
                          for="switch-act-folder"
                        >
                          <i
                            class="glyphicon glyphicon-folder-open"
                          />
                           Dossier
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
                |
                <div
                  class="refresh-btn-wrapper"
                >
                  Recharger  
                  <button
                    class="refresh-btn"
                    data-testid="refresh-button"
                  >
                    <i
                      class="glyphicon glyphicon-refresh refresh-icon"
                    />
                  </button>
                </div>
              </div>
              <div
                class="row"
              >
                <div
                  class="col-lg-3 col-md-12 no-space-in-mobile"
                />
                <div
                  class="col-lg-9 col-md-12 full-space-in-mobile"
                >
                  <div
                    data-testid="actApp"
                  >
                    ActApp mocked
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
 ❯ src/pages/Container/containerApp.test.tsx:159:37
    157|       fireEvent.click(refreshButton);
    158|     });
    159|     await waitFor(() => expect(spy).toHaveBeenCalledWith(["finddoc"]));
       |                                     ^
    160|   });
    161| });
 ❯ runWithExpensiveErrorDiagnosticsDisabled node_modules/@testing-library/dom/dist/config.js:47:12
 ❯ checkCallback node_modules/@testing-library/dom/dist/wait-for.js:124:77
 ❯ Timeout.checkRealTimersCallback node_modules/@testing-library/dom/dist/wait-for.js:118:16

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[4/4]⎯

 Test Files  2 failed | 37 passed (39)
      Tests  4 failed | 138 passed (142)
   Start at  10:28:31
   Duration  66.73s (transform 7.39s, setup 253.22s, collect 59.26s, tests 2.56s, environment 119.24s, prepare 22.98s)

 FAIL  Tests failed. Watching for file changes...
       press h to show help, press q to quit

















