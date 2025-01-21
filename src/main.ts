PS C:\dev\Front\e-validation-front> node -v
v12.22.12
PS C:\dev\Front\e-validation-front> npm -v
internal/modules/cjs/loader.js:818
  throw err;
  ^

Error: Cannot find module 'node:path'
Require stack:
- C:\Users\B609EN\AppData\Local\Volta\tools\image\npm\11.0.0\lib\cli.js
- C:\Users\B609EN\AppData\Local\Volta\tools\image\npm\11.0.0\bin\npm-cli.js
    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:815:15)
    at Function.Module._load (internal/modules/cjs/loader.js:667:27)
    at Module.require (internal/modules/cjs/loader.js:887:19)
    at require (internal/modules/cjs/helpers.js:74:18)
    at Object.<anonymous> (C:\Users\B609EN\AppData\Local\Volta\tools\image\npm\11.0.0\lib\cli.js:10:18)
    at Module._compile (internal/modules/cjs/loader.js:999:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1027:10)
    at Module.load (internal/modules/cjs/loader.js:863:32)
    at Function.Module._load (internal/modules/cjs/loader.js:708:14)
    at Module.require (internal/modules/cjs/loader.js:887:19) {
  code: 'MODULE_NOT_FOUND',
  requireStack: [
    'C:\\Users\\B609EN\\AppData\\Local\\Volta\\tools\\image\\npm\\11.0.0\\lib\\cli.js',
    'C:\\Users\\B609EN\\AppData\\Local\\Volta\\tools\\image\\npm\\11.0.0\\bin\\npm-cli.js'
  ]
}
