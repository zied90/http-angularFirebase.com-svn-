
Running "concat:generated" (concat) task
File .tmp\concat\scripts\vendor.js created.
File .tmp\concat\app\app.js created.

Running "cssmin:generated" (cssmin) task
>> 1 file created. 2.17 MB → 2.1 MB

Running "uglify:generated" (uglify) task
JS_Parse_Error {
  message: 'Unexpected token: punc (.)',
  filename: '../../.tmp/concat/app/app.js',
  line: 6133,
  col: 15,
  pos: 198143,
  stack:
   'Error\n    at new JS_Parse_Error (e:\\wB22b\\5061\\s\\node_modules\\grunt-contrib-uglify\\node_modules\\uglify-js\\lib\\parse.js:196:18)\n    at js_error (e:\\wB22b\\5061\\s\\node_modules\\grunt-contrib-uglify\\node_modules\\uglify-js\\lib\\parse.js:204:11)\n    at croak (e:\\wB22b\\5061\\s\\node_modules\\grunt-contrib-uglify\\node_modules\\uglify-js\\lib\\parse.js:674:9)\n    at token_error (e:\\wB22b\\5061\\s\\node_modules\\grunt-contrib-uglify\\node_modules\\uglify-js\\lib\\parse.js:682:9)\n    at unexpected (e:\\wB22b\\5061\\s\\node_modules\\grunt-contrib-uglify\\node_modules\\uglify-js\\lib\\parse.js:688:9)\n    at expr_atom (e:\\wB22b\\5061\\s\\node_modules\\grunt-contrib-uglify\\node_modules\\uglify-js\\lib\\parse.js:1183:13)\n    at maybe_unary (e:\\wB22b\\5061\\s\\node_modules\\grunt-contrib-uglify\\node_modules\\uglify-js\\lib\\parse.js:1357:19)\n    at expr_ops (e:\\wB22b\\5061\\s\\node_modules\\grunt-contrib-uglify\\node_modules\\uglify-js\\lib\\parse.js:1392:24)\n    at maybe_conditional (e:\\wB22b\\5061\\s\\node_modules\\grunt-contrib-uglify\\node_modules\\uglify-js\\lib\\parse.js:1397:20)\n    at maybe_assign (e:\\wB22b\\5061\\s\\node_modules\\grunt-contrib-uglify\\node_modules\\uglify-js\\lib\\parse.js:1421:20)' }
>> Uglifying source .tmp/concat/app/app.js failed.
Warning: Uglification failed.
Unexpected token: punc (.). 
Line 6133 in .tmp/concat/app/app.js
 Use --force to continue.

Aborted due to warnings.


Execution Time (2025-07-22 17:46:38 UTC+2)
loading tasks            2.3s  ██████ 13%
sass:dist                2.1s  █████ 12%
autoprefixer:sourcemap   1.1s  ███ 6%
copy:dist               234ms  █ 1%
cssmin:generated        750ms  ██ 4%
uglify:generated        10.2s  ███████████████████████ 59%
Total 17.2s


##[error]Grunt failed with error: The process 'E:\npm\grunt.cmd' failed with exit code 6
Finishing: grunt deployRev
