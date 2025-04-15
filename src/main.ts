 src/pages/Container/containerApp.test.tsx > ContainerApp > should switch to groupAct
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
                        data-testid="switch-act-doc"
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


  <SwitchToggle onChange={switchList} value={groupByAct} />


    import { useEffect, useRef, useState } from "react";
import "./switchToggle.scss";

interface PropsText {
  value: boolean;
  onChange: (event: any) => void;
}

const SwitchToggle = ({ onChange, value }: PropsText) => {
  const docRef = useRef<HTMLLIElement>(null);
  const folderRef = useRef<HTMLLIElement>(null);
  const [clipPath, setClipPath] = useState("");

  const localOnChange = (event: any) => {
    console.log(event.target.checked, event.target.value);
    onChange(event.target.checked && event.target.value === "folder");
  };
  const selectedValue = value ? "folder" : "doc";

  useEffect(() => {
    const calculateClipPath = () => {
      if (!docRef.current || !folderRef.current) return "inset(0 50% 0 0 round 1rem)";

      const docWidth = docRef.current.offsetWidth;
      const totalWidth = docRef.current.parentElement?.offsetWidth || 0;
      const docPercent = (docWidth / totalWidth) * 100;

      if (selectedValue === "folder") {
        return `inset(0 0 0 ${docPercent}% round 1rem)`;
      }
      return `inset(0 ${100 - docPercent}% 0 0 round 1rem)`;
    };

    setClipPath(calculateClipPath());

    // Ajouter un listener pour le redimensionnement
    const handleResize = () => setClipPath(calculateClipPath());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [selectedValue]);

  return (
    <div className="switch-wrapper">
      <label>Affichage par&nbsp;:</label>
      <div className="switch-container">
        <ul className="switch-nav">
          <li className="switch-item--doc" ref={docRef}>
            <input
              type="radio"
              name="switch-act"
              id="switch-act-doc"
              onChange={localOnChange}
              value="doc"
              defaultChecked={selectedValue === "doc"}
            />
            <label htmlFor="switch-act-doc">
              <i className="icon icon-document" /> Document
            </label>
          </li>
          <li className="switch-item--folder" ref={folderRef}>
            <input
              type="radio"
              name="switch-act"
              id="switch-act-folder"
              onChange={localOnChange}
              value="folder"
              defaultChecked={selectedValue === "folder"}
            />
            <label htmlFor="switch-act-folder">
              <i className="glyphicon glyphicon-folder-open" /> Dossier
            </label>
          </li>
        </ul>
        <ul className="switch-nav duplicate-nav" style={{ clipPath }}>
          <li className="switch-item--doc">
            <label htmlFor="switch-act-doc">
              <i className="icon icon-document" /> Document
            </label>
          </li>
          <li className="switch-item--folder">
            <label htmlFor="switch-act-folder">
              <i className="glyphicon glyphicon-folder-open" /> Dossier
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default SwitchToggle;

  it("should switch to groupAct", async () => {
    const node = (
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ContainerApp />
        </QueryClientProvider>
      </BrowserRouter>
    );
    const { getByTestId } = render(node);
    const switchToggle = getByTestId("switch-act") as HTMLInputElement;
    expect(switchToggle.checked).toBe(false);
    await act(() => fireEvent.click(switchToggle));
    expect(mockSetSearchParams).toHaveBeenCalledWith(mockSearchParamCallArgument);
  });

