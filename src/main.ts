Warning: An update to AjoutModele inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act
    at AjoutModele (C:\dev\Front\Ellipse\src\Admin\ajoutModele\index.tsx:37:57)
    at Router (C:\dev\Front\Ellipse\node_modules\react-router\dist\umd\react-router.development.js:1174:17)
    at MemoryRouter (C:\dev\Front\Ellipse\node_modules\react-router\dist\umd\react-router.development.js:1069:7)
Warning: An update to AjoutModele inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act
    at AjoutModele (C:\dev\Front\Ellipse\src\Admin\ajoutModele\index.tsx:37:57)
    at Router (C:\dev\Front\Ellipse\node_modules\react-router\dist\umd\react-router.development.js:1174:17)
    at MemoryRouter (C:\dev\Front\Ellipse\node_modules\react-router\dist\umd\react-router.development.js:1069:7)
