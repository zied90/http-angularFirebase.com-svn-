npm warn deprecated node-sass@4.14.1: Node Sass is no longer supported. Please use `sass` or `sass-embedded` instead.
npm warn deprecated eslint@6.6.0: This version is no longer supported. Please see https://eslint.org/version-support for other options.
npm warn deprecated core-js@1.2.7: core-js@<3.23.3 is no longer maintained and not recommended for usage due to the number of issues. Because of the V8 engine whims, feature detection in old core-js versions could cause a slowdown up to 100x even if nothing is polyfilled. Some versions have web compatibility issues. Please, upgrade your dependencies to the actual version of core-js.     
npm warn deprecated core-js@2.6.11: core-js@<3.23.3 is no longer maintained and not recommended for usage due to the number of issues. Because of the V8 engine whims, feature detection in old core-js versions could cause a slowdown up to 100x even if nothing is polyfilled. Some versions have web compatibility issues. Please, upgrade your dependencies to the actual version of core-js.    
npm warn deprecated core-js@2.6.10: core-js@<3.23.3 is no longer maintained and not recommended for usage due to the number of issues. Because of the V8 engine whims, feature detection in old core-js versions could cause a slowdown up to 100x even if nothing is polyfilled. Some versions have web compatibility issues. Please, upgrade your dependencies to the actual version of core-js.    
npm warn deprecated core-js@2.6.11: core-js@<3.23.3 is no longer maintained and not recommended for usage due to the number of issues. Because of the V8 engine whims, feature detection in old core-js versions could cause a slowdown up to 100x even if nothing is polyfilled. Some versions have web compatibility issues. Please, upgrade your dependencies to the actual version of core-js.    
npm warn deprecated core-js@3.2.1: core-js@<3.23.3 is no longer maintained and not recommended for usage due to the number of issues. Because of the V8 engine whims, feature detection in old core-js versions could cause a slowdown up to 100x even if nothing is polyfilled. Some versions have web compatibility issues. Please, upgrade your dependencies to the actual version of core-js.     
npm warn deprecated @material-ui/core@4.11.4: Material UI v4 doesn't receive active development since September 2021. See the guide https://mui.com/material-ui/migration/migration-v4/ to upgrade 
to v5.
npm warn cleanup Failed to remove some directories [
npm warn cleanup   [
npm warn cleanup     'C:\\dev\\Front\\e-validation-front\\node_modules\\@axa-fr\\react-toolkit-form-input-date',
npm warn cleanup     [Error: EPERM: operation not permitted, rmdir 'C:\dev\Front\e-validation-front\node_modules\@axa-fr\react-toolkit-form-input-date'] {
npm warn cleanup       errno: -4048,
npm warn cleanup       code: 'EPERM',
npm warn cleanup       syscall: 'rmdir',
npm warn cleanup       path: 'C:\\dev\\Front\\e-validation-front\\node_modules\\@axa-fr\\react-toolkit-form-input-date'
npm warn cleanup     }
npm warn cleanup   ],
npm warn cleanup   [
npm warn cleanup     'C:\\dev\\Front\\e-validation-front\\node_modules\\attr-accept',
npm warn cleanup     [Error: EPERM: operation not permitted, rmdir 'C:\dev\Front\e-validation-front\node_modules\attr-accept\node_modules'] {
npm warn cleanup       errno: -4048,
npm warn cleanup       code: 'EPERM',
npm warn cleanup       syscall: 'rmdir',
npm warn cleanup       path: 'C:\\dev\\Front\\e-validation-front\\node_modules\\attr-accept\\node_modules'
npm warn cleanup     }
npm warn cleanup   ],
npm warn cleanup   [
npm warn cleanup     'C:\\dev\\Front\\e-validation-front\\node_modules\\browser-resolve',
npm warn cleanup     [Error: EPERM: operation not permitted, rmdir 'C:\dev\Front\e-validation-front\node_modules\browser-resolve\node_modules\resolve\test\pathfilter\deep_ref\node_modules'] {    
npm warn cleanup       errno: -4048,
npm warn cleanup       code: 'EPERM',
npm warn cleanup       syscall: 'rmdir',
npm warn cleanup       path: 'C:\\dev\\Front\\e-validation-front\\node_modules\\browser-resolve\\node_modules\\resolve\\test\\pathfilter\\deep_ref\\node_modules'
npm warn cleanup     }
npm warn cleanup   ]
npm warn cleanup ]
npm error code 1
npm error path C:\dev\Front\e-validation-front\node_modules\node-sass
npm error command failed
npm error command C:\windows\system32\cmd.exe /d /s /c node scripts/build.js
npm error Building: C:\Users\B609EN\AppData\Local\Volta\tools\image\node\20.11.0\node.exe C:\dev\Front\e-validation-front\node_modules\node-gyp\bin\node-gyp.js rebuild --verbose --libsass_ext= --libsass_cflags= --libsass_ldflags= --libsass_library=
npm error gyp info it worked if it ends with ok
npm error gyp verb cli [
npm error gyp verb cli   'C:\\Users\\B609EN\\AppData\\Local\\Volta\\tools\\image\\node\\20.11.0\\node.exe',
npm error gyp verb cli   'C:\\dev\\Front\\e-validation-front\\node_modules\\node-gyp\\bin\\node-gyp.js',
npm error gyp verb cli   'rebuild',
npm error gyp verb cli   '--verbose',
npm error gyp verb cli   '--libsass_ext=',
npm error gyp verb cli   '--libsass_cflags=',
npm error gyp verb cli   '--libsass_ldflags=',
npm error gyp verb cli   '--libsass_library='
npm error gyp verb cli ]
npm error gyp info using node-gyp@3.8.0
npm error gyp info using node@20.11.0 | win32 | x64
npm error gyp verb command rebuild []
npm error gyp verb command clean []
npm error gyp verb clean removing "build" directory
npm error gyp verb command configure []
npm error gyp verb check python checking for Python executable "python2" in the PATH
npm error gyp verb `which` failed Error: not found: python2
npm error gyp verb `which` failed     at getNotFoundError (C:\dev\Front\e-validation-front\node_modules\which\which.js:13:12)
npm error gyp verb `which` failed     at F (C:\dev\Front\e-validation-front\node_modules\which\which.js:68:19)
npm error gyp verb `which` failed     at E (C:\dev\Front\e-validation-front\node_modules\which\which.js:80:29)
npm error gyp verb `which` failed     at C:\dev\Front\e-validation-front\node_modules\which\which.js:89:16
npm error gyp verb `which` failed     at C:\dev\Front\e-validation-front\node_modules\isexe\index.js:42:5
npm error gyp verb `which` failed     at C:\dev\Front\e-validation-front\node_modules\isexe\windows.js:36:5
npm error gyp verb `which` failed     at FSReqCallback.oncomplete (node:fs:201:21)
npm error gyp verb `which` failed  python2 Error: not found: python2
npm error gyp verb `which` failed     at getNotFoundError (C:\dev\Front\e-validation-front\node_modules\which\which.js:13:12)
npm error gyp verb `which` failed     at F (C:\dev\Front\e-validation-front\node_modules\which\which.js:68:19)
npm error gyp verb `which` failed     at E (C:\dev\Front\e-validation-front\node_modules\which\which.js:80:29)
npm error gyp verb `which` failed     at C:\dev\Front\e-validation-front\node_modules\which\which.js:89:16
npm error gyp verb `which` failed     at C:\dev\Front\e-validation-front\node_modules\isexe\index.js:42:5
npm error gyp verb `which` failed     at C:\dev\Front\e-validation-front\node_modules\isexe\windows.js:36:5
npm error gyp verb `which` failed     at FSReqCallback.oncomplete (node:fs:201:21) {
npm error gyp verb `which` failed   code: 'ENOENT'
npm error gyp verb `which` failed }
npm error gyp verb check python checking for Python executable "python" in the PATH
npm error gyp verb `which` failed Error: not found: python
npm error gyp verb `which` failed     at getNotFoundError (C:\dev\Front\e-validation-front\node_modules\which\which.js:13:12)
npm error gyp verb `which` failed     at F (C:\dev\Front\e-validation-front\node_modules\which\which.js:68:19)
npm error gyp verb `which` failed     at E (C:\dev\Front\e-validation-front\node_modules\which\which.js:80:29)
npm error gyp verb `which` failed     at C:\dev\Front\e-validation-front\node_modules\which\which.js:89:16
npm error gyp verb `which` failed     at C:\dev\Front\e-validation-front\node_modules\isexe\index.js:42:5
npm error gyp verb `which` failed     at FSReqCallback.oncomplete (node:fs:201:21)
npm error gyp verb `which` failed  python Error: not found: python
npm error gyp verb `which` failed     at getNotFoundError (C:\dev\Front\e-validation-front\node_modules\which\which.js:13:12)
npm error gyp verb `which` failed     at F (C:\dev\Front\e-validation-front\node_modules\which\which.js:68:19)
npm error gyp verb `which` failed     at E (C:\dev\Front\e-validation-front\node_modules\which\which.js:80:29)
npm error gyp verb `which` failed     at C:\dev\Front\e-validation-front\node_modules\which\which.js:89:16
npm error gyp verb `which` failed     at C:\dev\Front\e-validation-front\node_modules\isexe\index.js:42:5
npm error gyp verb `which` failed     at C:\dev\Front\e-validation-front\node_modules\isexe\windows.js:36:5
npm error gyp verb `which` failed     at FSReqCallback.oncomplete (node:fs:201:21) {
npm error gyp verb `which` failed   code: 'ENOENT'
npm error gyp verb `which` failed }
npm error gyp verb could not find "python". checking python launcher
npm error gyp verb could not find "python". guessing location
npm error gyp verb ensuring that file exists: C:\Python27\python.exe
npm error gyp ERR! configure error
npm error gyp ERR! stack Error: Can't find Python executable "python", you can set the PYTHON env variable.
npm error gyp ERR! stack     at PythonFinder.failNoPython (C:\dev\Front\e-validation-front\node_modules\node-gyp\lib\configure.js:484:19)
npm error gyp ERR! stack     at PythonFinder.<anonymous> (C:\dev\Front\e-validation-front\node_modules\node-gyp\lib\configure.js:509:16)
npm error gyp ERR! stack     at callback (C:\dev\Front\e-validation-front\node_modules\graceful-fs\polyfills.js:295:20)
npm error gyp ERR! stack     at FSReqCallback.oncomplete (node:fs:201:21)
npm error gyp ERR! System Windows_NT 10.0.19045
npm error gyp ERR! command "C:\\Users\\B609EN\\AppData\\Local\\Volta\\tools\\image\\node\\20.11.0\\node.exe" "C:\\dev\\Front\\e-validation-front\\node_modules\\node-gyp\\bin\\node-gyp.js" "rebuild" "--verbose" "--libsass_ext=" "--libsass_cflags=" "--libsass_ldflags=" "--libsass_library="
npm error gyp ERR! cwd C:\dev\Front\e-validation-front\node_modules\node-sass
npm error gyp ERR! node -v v20.11.0
npm error gyp ERR! node-gyp -v v3.8.0
npm error gyp ERR! not ok
npm error Build failed with error code: 1
npm error A complete log of this run can be found in: C:\Users\B609EN\AppData\Local\npm-cache\_logs\2025-01-21T13_29_53_701Z-debug-0.log
