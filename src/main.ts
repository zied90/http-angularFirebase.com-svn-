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
