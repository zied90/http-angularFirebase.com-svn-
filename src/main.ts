/*! normalize.css v3.0.2 | MIT License | git.io/normalize */
html {
  font-family: sans-serif;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%; }

body {
  margin: 0; }

article, aside, details, figcaption, figure, footer, header, hgroup, main, menu, nav, section, summary {
  display: block; }

audio, canvas, progress, video {
  display: inline-block;
  vertical-align: baseline; }

audio:not([controls]) {
  display: none;
  height: 0; }

[hidden], template {
  display: none; }

a {
  background-color: transparent; }

a:active, a:hover {
  outline: 0; }

abbr[title] {
  border-bottom: 1px dotted; }

b, strong {
  font-weight: bold; }

dfn {
  font-style: italic; }

h1 {
  font-size: 2em;
  margin: 0.67em 0; }

mark {
  background: #ff0;
  color: #000; }

small {
  font-size: 80%; }

sub, sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline; }

sup {
  top: -0.5em; }

sub {
  bottom: -0.25em; }

img {
  border: 0; }

svg:not(:root) {
  overflow: hidden; }

figure {
  margin: 1em 40px; }

hr {
  box-sizing: content-box;
  height: 0; }

pre {
  overflow: auto; }

code, kbd, pre, samp {
  font-family: monospace, monospace;
  font-size: 1em; }

button, input, optgroup, select, textarea {
  color: inherit;
  font: inherit;
  margin: 0; }

button {
  overflow: visible; }

button, select {
  text-transform: none; }

button, html input[type="button"], input[type="reset"], input[type="submit"] {
  -webkit-appearance: button;
  cursor: pointer; }

button[disabled], html input[disabled] {
  cursor: default; }

button::-moz-focus-inner, input::-moz-focus-inner {
  border: 0;
  padding: 0; }

input {
  line-height: normal; }

input[type="checkbox"], input[type="radio"] {
  box-sizing: border-box;
  padding: 0; }

input[type="number"]::-webkit-inner-spin-button, input[type="number"]::-webkit-outer-spin-button {
  height: auto; }

input[type="search"] {
  -webkit-appearance: textfield;
  box-sizing: content-box; }

input[type="search"]::-webkit-search-cancel-button, input[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none; }

fieldset {
  border: 1px solid #c0c0c0;
  margin: 0 2px;
  padding: 0.35em 0.625em 0.75em; }

legend {
  border: 0;
  padding: 0; }

textarea {
  overflow: auto; }

optgroup {
  font-weight: bold; }

table {
  border-collapse: collapse;
  border-spacing: 0; }

td, th {
  padding: 0; }

/*! Source: https://github.com/h5bp/html5-boilerplate/blob/master/src/css/main.css */
@media print {
  *, *:before, *:after {
    background: transparent !important;
    color: #000 !important;
    box-shadow: none !important;
    text-shadow: none !important; }
  a, a:visited {
    text-decoration: underline; }
  a[href]:after {
    content: " (" attr(href) ")"; }
  abbr[title]:after {
    content: " (" attr(title) ")"; }
  a[href^="#"]:after, a[href^="javascript:"]:after {
    content: ""; }
  pre, blockquote {
    border: 1px solid #999;
    page-break-inside: avoid; }
  thead {
    display: table-header-group; }
  tr, img {
    page-break-inside: avoid; }
  img {
    max-width: 100% !important; }
  p, h2, h3 {
    orphans: 3;
    widows: 3; }
  h2, h3 {
    page-break-after: avoid; }
  select {
    background: #fff !important; }
  .navbar {
    display: none; }
  .btn > .caret, .dropup > .btn > .caret {
    border-top-color: #000 !important; }
  .label {
    border: 1px solid #000; }
  .table {
    border-collapse: collapse !important; }
    .table td, .table th {
      background-color: #fff !important; }
  .table-bordered th, .table-bordered td {
    border: 1px solid #ddd !important; } }

@font-face {
  font-family: "icons";
  src: url("../fonts/icons/icons.eot");
  src: url("../fonts/icons/icons.eot?#iefix") format("embedded-opentype"), url("../fonts/icons/icons.woff") format("woff"), url("../fonts/icons/icons.ttf") format("truetype"), url("../fonts/icons/icons.svg#icons") format("svg");
  font-weight: normal;
  font-style: normal; }

.glyphicon, .select2-container .select2-choice abbr, .select2-search-choice-close, .breadcrumb > li + li:before, .cards-select .item-selected .item-checkbox, .cards-select .item-disabled .item-checkbox, .cards-select .item-disabled .item-radio {
  font-family: "icons";
  position: relative;
  top: 0;
  display: inline-block;
  font-style: normal;
  font-weight: normal;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; }

.glyphicon-adjust:before {
  content: "\f101"; }

.glyphicon-alert:before {
  content: "\f102"; }

.glyphicon-align-center:before {
  content: "\f103"; }

.glyphicon-align-justify:before {
  content: "\f104"; }

.glyphicon-align-left:before {
  content: "\f105"; }

.glyphicon-align-right:before {
  content: "\f106"; }

.glyphicon-all:before {
  content: "\f107"; }

.glyphicon-apple:before {
  content: "\f108"; }

.glyphicon-arrow-down:before {
  content: "\f109"; }

.glyphicon-arrow-left:before {
  content: "\f10a"; }

.glyphicon-arrow-right:before {
  content: "\f10b"; }

.glyphicon-arrow-up:before {
  content: "\f10c"; }

.glyphicon-arrow-xs-down:before {
  content: "\f10d"; }

.glyphicon-arrow-xs-left:before {
  content: "\f10e"; }

.glyphicon-arrow-xs-right:before, .breadcrumb > li + li:before {
  content: "\f10f"; }

.glyphicon-arrow-xs-up:before {
  content: "\f110"; }

.glyphicon-asterisk:before {
  content: "\f111"; }

.glyphicon-auto:before {
  content: "\f112"; }

.glyphicon-axa-switch:before {
  content: "\f113"; }

.glyphicon-baby-formula:before {
  content: "\f114"; }

.glyphicon-backward:before {
  content: "\f115"; }

.glyphicon-ban-circle:before, .cards-select .item-disabled .item-checkbox:before, .cards-select .item-disabled .item-radio:before {
  content: "\f116"; }

.glyphicon-bank:before {
  content: "\f117"; }

.glyphicon-barcode:before {
  content: "\f118"; }

.glyphicon-bed:before {
  content: "\f119"; }

.glyphicon-bell:before {
  content: "\f11a"; }

.glyphicon-bishop:before {
  content: "\f11b"; }

.glyphicon-bitcoin:before {
  content: "\f11c"; }

.glyphicon-blackboard:before {
  content: "\f11d"; }

.glyphicon-bold:before {
  content: "\f11e"; }

.glyphicon-book:before {
  content: "\f11f"; }

.glyphicon-bookmark:before {
  content: "\f120"; }

.glyphicon-briefcase-add:before {
  content: "\f121"; }

.glyphicon-briefcase-cup:before {
  content: "\f122"; }

.glyphicon-briefcase-ok:before {
  content: "\f123"; }

.glyphicon-briefcase-wait:before {
  content: "\f124"; }

.glyphicon-briefcase:before {
  content: "\f125"; }

.glyphicon-bullhorn:before {
  content: "\f126"; }

.glyphicon-calendar:before {
  content: "\f127"; }

.glyphicon-camera:before {
  content: "\f128"; }

.glyphicon-cd:before {
  content: "\f129"; }

.glyphicon-certificate:before {
  content: "\f12a"; }

.glyphicon-check:before {
  content: "\f12b"; }

.glyphicon-chevron-down:before {
  content: "\f12c"; }

.glyphicon-chevron-left:before {
  content: "\f12d"; }

.glyphicon-chevron-right:before {
  content: "\f12e"; }

.glyphicon-chevron-up:before {
  content: "\f12f"; }

.glyphicon-circle-arrow-down:before {
  content: "\f130"; }

.glyphicon-circle-arrow-left:before {
  content: "\f131"; }

.glyphicon-circle-arrow-right:before {
  content: "\f132"; }

.glyphicon-circle-arrow-up:before {
  content: "\f133"; }

.glyphicon-close:before, .select2-container .select2-choice abbr:before, .select2-search-choice-close:before {
  content: "\f134"; }

.glyphicon-cloud-download:before {
  content: "\f135"; }

.glyphicon-cloud-upload:before {
  content: "\f136"; }

.glyphicon-cloud:before {
  content: "\f137"; }

.glyphicon-cog:before {
  content: "\f138"; }

.glyphicon-collapse-down:before {
  content: "\f139"; }

.glyphicon-collapse-up:before {
  content: "\f13a"; }

.glyphicon-comment:before {
  content: "\f13b"; }

.glyphicon-compressed:before {
  content: "\f13c"; }

.glyphicon-console:before {
  content: "\f13d"; }

.glyphicon-copy:before {
  content: "\f13e"; }

.glyphicon-copyright-mark:before {
  content: "\f13f"; }

.glyphicon-credit-card:before {
  content: "\f140"; }

.glyphicon-cutlery:before {
  content: "\f141"; }

.glyphicon-dashboard:before {
  content: "\f142"; }

.glyphicon-download-alt:before {
  content: "\f143"; }

.glyphicon-download:before {
  content: "\f144"; }

.glyphicon-duplicate:before {
  content: "\f145"; }

.glyphicon-earphone:before {
  content: "\f146"; }

.glyphicon-edit:before {
  content: "\f147"; }

.glyphicon-education:before {
  content: "\f148"; }

.glyphicon-eject:before {
  content: "\f149"; }

.glyphicon-envelope:before {
  content: "\f14a"; }

.glyphicon-equalizer:before {
  content: "\f14b"; }

.glyphicon-erase:before {
  content: "\f14c"; }

.glyphicon-euro-symbol:before {
  content: "\f14d"; }

.glyphicon-exclamation-sign:before {
  content: "\f14e"; }

.glyphicon-expand:before {
  content: "\f14f"; }

.glyphicon-export:before {
  content: "\f150"; }

.glyphicon-eye-close:before {
  content: "\f151"; }

.glyphicon-eye-open:before {
  content: "\f152"; }

.glyphicon-facetime-video:before {
  content: "\f153"; }

.glyphicon-fast-backward:before {
  content: "\f154"; }

.glyphicon-fast-forward:before {
  content: "\f155"; }

.glyphicon-file-doc:before {
  content: "\f156"; }

.glyphicon-file-pdf:before {
  content: "\f157"; }

.glyphicon-file-xls:before {
  content: "\f158"; }

.glyphicon-file:before {
  content: "\f159"; }

.glyphicon-film:before {
  content: "\f15a"; }

.glyphicon-filter:before {
  content: "\f15b"; }

.glyphicon-fire:before {
  content: "\f15c"; }

.glyphicon-flag:before {
  content: "\f15d"; }

.glyphicon-flash:before {
  content: "\f15e"; }

.glyphicon-floppy-disk:before {
  content: "\f15f"; }

.glyphicon-floppy-open:before {
  content: "\f160"; }

.glyphicon-floppy-remove:before {
  content: "\f161"; }

.glyphicon-floppy-save:before {
  content: "\f162"; }

.glyphicon-floppy-saved:before {
  content: "\f163"; }

.glyphicon-folder-close:before {
  content: "\f164"; }

.glyphicon-folder-open:before {
  content: "\f165"; }

.glyphicon-font:before {
  content: "\f166"; }

.glyphicon-forward:before {
  content: "\f167"; }

.glyphicon-france:before {
  content: "\f168"; }

.glyphicon-fullscreen:before {
  content: "\f169"; }

.glyphicon-gbp:before {
  content: "\f16a"; }

.glyphicon-gift:before {
  content: "\f16b"; }

.glyphicon-glass:before {
  content: "\f16c"; }

.glyphicon-globe:before {
  content: "\f16d"; }

.glyphicon-grain:before {
  content: "\f16e"; }

.glyphicon-hand-down:before {
  content: "\f16f"; }

.glyphicon-hand-left:before {
  content: "\f170"; }

.glyphicon-hand-right:before {
  content: "\f171"; }

.glyphicon-hand-up:before {
  content: "\f172"; }

.glyphicon-hd-video:before {
  content: "\f173"; }

.glyphicon-hdd:before {
  content: "\f174"; }

.glyphicon-header:before {
  content: "\f175"; }

.glyphicon-headphone:before {
  content: "\f176"; }

.glyphicon-heart-empty:before {
  content: "\f177"; }

.glyphicon-heart:before {
  content: "\f178"; }

.glyphicon-home:before {
  content: "\f179"; }

.glyphicon-hourglass:before {
  content: "\f17a"; }

.glyphicon-import:before {
  content: "\f17b"; }

.glyphicon-imprimer:before {
  content: "\f17c"; }

.glyphicon-inbox:before {
  content: "\f17d"; }

.glyphicon-indent-left:before {
  content: "\f17e"; }

.glyphicon-indent-right:before {
  content: "\f17f"; }

.glyphicon-info-sign:before {
  content: "\f180"; }

.glyphicon-italic:before {
  content: "\f181"; }

.glyphicon-king:before {
  content: "\f182"; }

.glyphicon-knight:before {
  content: "\f183"; }

.glyphicon-lamp:before {
  content: "\f184"; }

.glyphicon-leaf:before {
  content: "\f185"; }

.glyphicon-level-up:before {
  content: "\f186"; }

.glyphicon-link:before {
  content: "\f187"; }

.glyphicon-list-alt:before {
  content: "\f188"; }

.glyphicon-list:before {
  content: "\f189"; }

.glyphicon-lock:before {
  content: "\f18a"; }

.glyphicon-log-in:before {
  content: "\f18b"; }

.glyphicon-log-out:before {
  content: "\f18c"; }

.glyphicon-lolly-tasted:before {
  content: "\f18d"; }

.glyphicon-lolly:before {
  content: "\f18e"; }

.glyphicon-magnet:before {
  content: "\f18f"; }

.glyphicon-map-marker:before {
  content: "\f190"; }

.glyphicon-menu-down:before {
  content: "\f191"; }

.glyphicon-menu-hamburger:before {
  content: "\f192"; }

.glyphicon-menu-left:before {
  content: "\f193"; }

.glyphicon-menu-right:before {
  content: "\f194"; }

.glyphicon-menu-up:before {
  content: "\f195"; }

.glyphicon-minus-sign:before {
  content: "\f196"; }

.glyphicon-minus:before {
  content: "\f197"; }

.glyphicon-modal-window:before {
  content: "\f198"; }

.glyphicon-move:before {
  content: "\f199"; }

.glyphicon-music:before {
  content: "\f19a"; }

.glyphicon-new-window:before {
  content: "\f19b"; }

.glyphicon-object-align-bottom:before {
  content: "\f19c"; }

.glyphicon-object-align-horizontal:before {
  content: "\f19d"; }

.glyphicon-object-align-left:before {
  content: "\f19e"; }

.glyphicon-object-align-right:before {
  content: "\f19f"; }

.glyphicon-object-align-top:before {
  content: "\f1a0"; }

.glyphicon-object-align-vertical:before {
  content: "\f1a1"; }

.glyphicon-off:before {
  content: "\f1a2"; }

.glyphicon-oil:before {
  content: "\f1a3"; }

.glyphicon-ok-circle:before {
  content: "\f1a4"; }

.glyphicon-ok-sign:before {
  content: "\f1a5"; }

.glyphicon-ok:before, .checkbox label:after, .radiocheck-custom .checkbox-inline input[type="checkbox"] + label:after, .cards-select .item-selected .item-checkbox:before {
  content: "\f1a6"; }

.glyphicon-open-file:before {
  content: "\f1a7"; }

.glyphicon-open:before {
  content: "\f1a8"; }

.glyphicon-option-horizontal:before {
  content: "\f1a9"; }

.glyphicon-option-vertical:before {
  content: "\f1aa"; }

.glyphicon-paperclip:before {
  content: "\f1ab"; }

.glyphicon-paste:before {
  content: "\f1ac"; }

.glyphicon-pause:before {
  content: "\f1ad"; }

.glyphicon-pawn:before {
  content: "\f1ae"; }

.glyphicon-pdf:before {
  content: "\f1af"; }

.glyphicon-pencil:before {
  content: "\f1b0"; }

.glyphicon-phone-alt:before {
  content: "\f1b1"; }

.glyphicon-phone:before {
  content: "\f1b2"; }

.glyphicon-picture:before {
  content: "\f1b3"; }

.glyphicon-plane:before {
  content: "\f1b4"; }

.glyphicon-play-circle:before {
  content: "\f1b5"; }

.glyphicon-play:before {
  content: "\f1b6"; }

.glyphicon-plus-sign:before {
  content: "\f1b7"; }

.glyphicon-plus:before {
  content: "\f1b8"; }

.glyphicon-print:before {
  content: "\f1b9"; }

.glyphicon-pushpin:before {
  content: "\f1ba"; }

.glyphicon-pushpin2:before {
  content: "\f1bb"; }

.glyphicon-pushpin3:before {
  content: "\f1bc"; }

.glyphicon-pushpin4:before {
  content: "\f1bd"; }

.glyphicon-pushpin5:before {
  content: "\f1be"; }

.glyphicon-pushpin6:before {
  content: "\f1bf"; }

.glyphicon-pushpin7:before {
  content: "\f1c0"; }

.glyphicon-pushpin8:before {
  content: "\f1c1"; }

.glyphicon-qrcode:before {
  content: "\f1c2"; }

.glyphicon-queen:before {
  content: "\f1c3"; }

.glyphicon-question-sign:before {
  content: "\f1c4"; }

.glyphicon-random:before {
  content: "\f1c5"; }

.glyphicon-record:before {
  content: "\f1c6"; }

.glyphicon-refresh:before {
  content: "\f1c7"; }

.glyphicon-registration-mark:before {
  content: "\f1c8"; }

.glyphicon-remove-circle:before {
  content: "\f1c9"; }

.glyphicon-remove-sign:before {
  content: "\f1ca"; }

.glyphicon-remove:before {
  content: "\f1cb"; }

.glyphicon-repeat:before {
  content: "\f1cc"; }

.glyphicon-reset:before {
  content: "\f1cd"; }

.glyphicon-resize-full:before {
  content: "\f1ce"; }

.glyphicon-resize-horizontal:before {
  content: "\f1cf"; }

.glyphicon-resize-small:before {
  content: "\f1d0"; }

.glyphicon-resize-vertical:before {
  content: "\f1d1"; }

.glyphicon-retweet:before {
  content: "\f1d2"; }

.glyphicon-road:before {
  content: "\f1d3"; }

.glyphicon-ruble:before {
  content: "\f1d4"; }

.glyphicon-save-alt:before {
  content: "\f1d5"; }

.glyphicon-save-file:before {
  content: "\f1d6"; }

.glyphicon-saved:before {
  content: "\f1d7"; }

.glyphicon-scale:before {
  content: "\f1d8"; }

.glyphicon-scissors:before {
  content: "\f1d9"; }

.glyphicon-screenshot:before {
  content: "\f1da"; }

.glyphicon-sd-video:before {
  content: "\f1db"; }

.glyphicon-search:before {
  content: "\f1dc"; }

.glyphicon-send:before {
  content: "\f1dd"; }

.glyphicon-share-alt:before {
  content: "\f1de"; }

.glyphicon-share:before {
  content: "\f1df"; }

.glyphicon-shopping-cart:before {
  content: "\f1e0"; }

.glyphicon-signal:before {
  content: "\f1e1"; }

.glyphicon-sorting-asc:before, .table > thead > tr > th.sorting_asc .glyphicon-sort:before {
  content: "\f1e2"; }

.glyphicon-sorting-desc:before, .table > thead > tr > th.sorting_desc .glyphicon-sort:before {
  content: "\f1e3"; }

.glyphicon-sorting:before, .table > thead > tr > th.sorting .glyphicon-sort:before {
  content: "\f1e4"; }

.glyphicon-sound-5-1:before {
  content: "\f1e5"; }

.glyphicon-sound-6-1:before {
  content: "\f1e6"; }

.glyphicon-sound-7-1:before {
  content: "\f1e7"; }

.glyphicon-sound-dolby:before {
  content: "\f1e8"; }

.glyphicon-sound-stereo:before {
  content: "\f1e9"; }

.glyphicon-star-empty:before {
  content: "\f1ea"; }

.glyphicon-star:before {
  content: "\f1eb"; }

.glyphicon-stats:before {
  content: "\f1ec"; }

.glyphicon-step-backward:before {
  content: "\f1ed"; }

.glyphicon-step-forward:before {
  content: "\f1ee"; }

.glyphicon-stop:before {
  content: "\f1ef"; }

.glyphicon-subscript:before {
  content: "\f1f0"; }

.glyphicon-subtitles:before {
  content: "\f1f1"; }

.glyphicon-sunglasses:before {
  content: "\f1f2"; }

.glyphicon-superscript:before {
  content: "\f1f3"; }

.glyphicon-tag:before {
  content: "\f1f4"; }

.glyphicon-tags:before {
  content: "\f1f5"; }

.glyphicon-task:before {
  content: "\f1f6"; }

.glyphicon-text-background:before {
  content: "\f1f7"; }

.glyphicon-text-color:before {
  content: "\f1f8"; }

.glyphicon-text-height:before {
  content: "\f1f9"; }

.glyphicon-text-size:before {
  content: "\f1fa"; }

.glyphicon-text-width:before {
  content: "\f1fb"; }

.glyphicon-th-large:before {
  content: "\f1fc"; }

.glyphicon-th-list:before {
  content: "\f1fd"; }

.glyphicon-th:before {
  content: "\f1fe"; }

.glyphicon-thumbs-down:before {
  content: "\f1ff"; }

.glyphicon-thumbs-up:before {
  content: "\f200"; }

.glyphicon-time:before {
  content: "\f201"; }

.glyphicon-tint:before {
  content: "\f202"; }

.glyphicon-tower:before {
  content: "\f203"; }

.glyphicon-transfer:before {
  content: "\f204"; }

.glyphicon-trash:before {
  content: "\f205"; }

.glyphicon-tree-conifer:before {
  content: "\f206"; }

.glyphicon-tree-deciduous:before {
  content: "\f207"; }

.glyphicon-uncheck:before {
  content: "\f208"; }

.glyphicon-unlock:before {
  content: "\f209"; }

.glyphicon-upload:before {
  content: "\f20a"; }

.glyphicon-usd:before {
  content: "\f20b"; }

.glyphicon-user:before {
  content: "\f20c"; }

.glyphicon-volume-down:before {
  content: "\f20d"; }

.glyphicon-volume-off:before {
  content: "\f20e"; }

.glyphicon-volume-up:before {
  content: "\f20f"; }

.glyphicon-warning-sign:before {
  content: "\f210"; }

.glyphicon-wrench:before {
  content: "\f211"; }

.glyphicon-xls:before {
  content: "\f212"; }

.glyphicon-yen:before {
  content: "\f213"; }

.glyphicon-zoom-in:before {
  content: "\f214"; }

.glyphicon-zoom-out:before {
  content: "\f215"; }

* {
  box-sizing: border-box; }

*:before, *:after {
  box-sizing: border-box; }

html {
  font-size: 10px;
  -webkit-tap-highlight-color: transparent; }

body {
  font-family: Arial Narrow, Arial, sans-serif;
  font-stretch: condensed;
  font-size: 16px;
  line-height: 1.428571429;
  color: #333333;
  background-color: #fff; }

input, button, select, textarea {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit; }

a {
  color: #004893;
  text-decoration: none; }
  a > span {
    text-decoration: underline; }
  a:hover > span {
    text-decoration: none; }
  a:focus {
    outline: thin dotted;
    outline: 5px auto -webkit-focus-ring-color;
    outline-offset: -2px; }
  a.link-circle {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #004893;
    border-radius: 50%;
    text-align: center;
    line-height: 27px;
    margin-right: 5px; }
    a.link-circle:hover {
      background: #004893;
      color: #fff; }

figure {
  margin: 0; }

img {
  vertical-align: middle; }

.img-responsive {
  display: block;
  max-width: 100%;
  height: auto; }

.img-rounded {
  border-radius: 6px; }

.img-thumbnail {
  padding: 4px;
  line-height: 1.428571429;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  -webkit-transition: all .2s ease-in-out;
  transition: all .2s ease-in-out;
  display: inline-block;
  max-width: 100%;
  height: auto; }

.img-circle {
  border-radius: 50%; }

hr {
  margin-top: 22px;
  margin-bottom: 22px;
  border: 0;
  border-top: 1px solid #eeeeee; }

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0; }

.sr-only-focusable:active, .sr-only-focusable:focus {
  position: static;
  width: auto;
  height: auto;
  margin: 0;
  overflow: visible;
  clip: auto; }

header {
  padding-top: 20px; }

.container-flex {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
      -ms-flex-pack: justify;
          justify-content: space-between;
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
      -ms-flex-align: start;
          align-items: flex-start; }

.logo {
  text-decoration: none;
  -webkit-align-self: flex-start;
      -ms-flex-item-align: start;
          align-self: flex-start; }
  .logo span {
    font-family: "HelveticaBoldCn";
    text-decoration: none; }

.axa-logo {
  display: inline-block;
  width: 40px;
  height: 40px;
  margin-right: 5px;
  margin-bottom: -2px;
  background: url(../img/logo-axa.svg) no-repeat left center;
  background-size: auto 100%; }

.info-user {
  font-size: 14px;
  -webkit-align-self: flex-end;
      -ms-flex-item-align: end;
          align-self: flex-end; }
  .info-user p {
    margin: 0 0 3px 0;
    padding: 0 0 3px 0;
    border-bottom: 1px solid #E0E0E0; }
    .info-user p span {
      font-family: "HelveticaBoldCn"; }

.panel-contrat-container {
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
      -ms-flex-positive: 1;
          flex-grow: 1;
  text-align: center; }

.panel-contrat {
  position: relative;
  display: inline-block;
  background: #eceef0;
  border-radius: 25px;
  margin: 5px auto 0 auto;
  padding: 5px 5px 5px 30px;
  font-size: 14px;
  background-color: #eceef0; }
  .panel-contrat ul {
    display: inline-block;
    vertical-align: top;
    margin: 0; }
    .panel-contrat ul span {
      font-family: "HelveticaBoldCn"; }
  .panel-contrat .glyphicon-info-sign {
    display: inline-block;
    font-size: 25px;
    opacity: 0.1;
    filter: alpha(opacity=10);
    position: absolute;
    top: 6px;
    left: 6px; }

.main-title-container {
  height: 57px; }
  .main-title-container .affix {
    z-index: 100;
    width: 100% !important;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2); }
    .main-title-container .affix .visible-affix-inline-block {
      display: inline-block !important; }

.main-title {
  background: #42145f; }
  .main-title h1 {
    color: #fff;
    margin: 15px 0; }
  .main-title .actions {
    margin: 10px 0; }
  .main-title .link-circle {
    border-color: #fff;
    color: #fff;
    height: 35px;
    width: 35px;
    line-height: 35px;
    margin-left: 10px;
    margin-right: 0;
    cursor: pointer; }
    .main-title .link-circle.link-circle-txt {
      position: relative;
      width: auto;
      border-radius: 20px;
      padding: 0 10px 0 35px;
      font-size: 14px; }
      .main-title .link-circle.link-circle-txt span {
        font-family: "HelveticaBoldCn";
        text-decoration: none; }
      .main-title .link-circle.link-circle-txt i {
        position: absolute;
        top: 5px;
        left: 5px;
        font-size: 1.65em; }
      .main-title .link-circle.link-circle-txt.link-circle-txt-left {
        padding: 0 35px 0 10px; }
        .main-title .link-circle.link-circle-txt.link-circle-txt-left i {
          left: auto;
          right: 10px;
          top: 10px;
          font-size: 1em; }
    .main-title .link-circle i {
      font-size: 1em; }
    .main-title .link-circle.pull-left {
      margin: 10px 10px 0 0; }
    .main-title .link-circle:hover {
      background-color: #fff;
      color: #004893; }

footer {
  border-top: 1px solid #bfbfbf;
  font-size: 14px;
  padding-top: 20px;
  margin-top: 20px; }
  footer .logo {
    font-size: 0.85em;
    display: inline-block;
    margin-right: 30px; }
    footer .logo span {
      font-family: "HelveticaBoldCn"; }
  footer .axa-logo {
    width: 30px;
    height: 30px; }
  footer ul {
    display: inline-block;
    color: #777777; }
    footer ul a {
      color: #777777; }

i {
  font-size: 0.8em; }

.glyphicon-axa-switch {
  color: #e2003b; }

.more-help {
  display: inline-block;
  background: #004893;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  text-align: center;
  color: #fff;
  font: italic normal 1.2em/25px Georgia, Arial;
  cursor: pointer;
  vertical-align: top; }
  .more-help:focus {
    outline: none;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 72, 147, 0.6); }

@font-face {
  font-family: "HelveticaBoldCn";
  src: url("../fonts/typo/HelveticaBoldCn.eot?#iefix");
  src: url("../fonts/typo/HelveticaBoldCn.eot?#iefix") format("eot"), url("../fonts/typo/HelveticaBoldCn.woff") format("woff"), url("../fonts/typo/HelveticaBoldCn.ttf") format("truetype"), url("../fonts/typo/HelveticaBoldCn.svg#HelveticaBoldCn") format("svg"); }

h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 {
  font-family: inherit;
  font-weight: 500;
  line-height: 1.1;
  color: inherit; }
  h1 small, h1 .small, h2 small, h2 .small, h3 small, h3 .small, h4 small, h4 .small, h5 small, h5 .small, h6 small, h6 .small, .h1 small, .h1 .small, .h2 small, .h2 .small, .h3 small, .h3 .small, .h4 small, .h4 .small, .h5 small, .h5 .small, .h6 small, .h6 .small {
    font-weight: normal;
    line-height: 1;
    color: #777777; }

h1, .h1, h2, .h2, h3, .h3 {
  margin-top: 22px;
  margin-bottom: 11px; }
  h1 small, h1 .small, .h1 small, .h1 .small, h2 small, h2 .small, .h2 small, .h2 .small, h3 small, h3 .small, .h3 small, .h3 .small {
    font-size: 65%; }

h4, .h4, h5, .h5, h6, .h6 {
  margin-top: 11px;
  margin-bottom: 11px; }
  h4 small, h4 .small, .h4 small, .h4 .small, h5 small, h5 .small, .h5 small, .h5 .small, h6 small, h6 .small, .h6 small, .h6 .small {
    font-size: 75%; }

h1, .h1 {
  font-size: 25px;
  color: #34104c;
  font-family: "HelveticaBoldCn"; }

h2, .h2 {
  font-size: 25px;
  color: #34104c; }

h3, .h3 {
  font-size: 21px;
  color: #34104c;
  font-family: "HelveticaBoldCn"; }

h4, .h4 {
  font-size: 16px;
  color: #34104c;
  font-family: "HelveticaBoldCn"; }

h5, .h5 {
  font-size: 16px;
  color: #34104c; }

h6, .h6 {
  font-size: 14px;
  color: #34104c; }

h2, .h2 {
  position: relative;
  overflow: hidden; }
  h2:after, .h2:after {
    background: #34104c;
    border: none;
    bottom: 5px;
    clear: left;
    content: " ";
    float: left;
    height: 1px;
    margin-left: 10px;
    padding: 0;
    position: absolute;
    width: 100%;
    z-index: -1; }
  h2 + h3, .h2 + h3 {
    margin-top: 0; }

.title-hasbutton h2 {
  margin-bottom: -10px; }
  .title-hasbutton h2 + .pull-right {
    padding-right: 0;
    border-right: 0; }
.title-hasbutton .pull-right {
  position: relative;
  top: -15px;
  z-index: 5;
  background: #fff;
  padding-left: 10px;
  padding-right: 10px;
  border-right: 1px solid; }

@media (min-width: 1024px) {
  [class^="col-"] h3:first-child, [class*=" col-"] h3:first-child {
    margin-top: 0; } }

p {
  margin: 0 0 11px; }

.lead {
  margin-bottom: 22px;
  font-size: 18px;
  font-weight: 300;
  line-height: 1.4; }
  @media (min-width: 1024px) {
    .lead {
      font-size: 24px; } }

small, .small {
  font-size: 87%; }

mark, .mark {
  background-color: #fcf8e3;
  padding: .2em; }

.text-left {
  text-align: left; }

.text-right {
  text-align: right; }

.text-center {
  text-align: center; }

.text-justify {
  text-align: justify; }

.text-nowrap {
  white-space: nowrap; }

.text-lowercase {
  text-transform: lowercase; }

.text-uppercase {
  text-transform: uppercase; }

.text-capitalize {
  text-transform: capitalize; }

.text-muted {
  color: #777777; }

.text-primary {
  color: #004893; }

a.text-primary:hover {
  color: #002f60; }

.text-success {
  color: #3c763d; }

a.text-success:hover {
  color: #2b542c; }

.text-info {
  color: #31708f; }

a.text-info:hover {
  color: #245269; }

.text-warning {
  color: #8a6d3b; }

a.text-warning:hover {
  color: #66512c; }

.text-danger {
  color: #a94442; }

a.text-danger:hover {
  color: #843534; }

.bg-primary {
  color: #fff; }

.bg-primary {
  background-color: #004893; }

a.bg-primary:hover {
  background-color: #002f60; }

.bg-success {
  background-color: #dff0d8; }

a.bg-success:hover {
  background-color: #c1e2b3; }

.bg-info {
  background-color: #d9edf7; }

a.bg-info:hover {
  background-color: #afd9ee; }

.bg-warning {
  background-color: #fcf8e3; }

a.bg-warning:hover {
  background-color: #f7ecb5; }

.bg-danger {
  background-color: #f2dede; }

a.bg-danger:hover {
  background-color: #e4b9b9; }

.page-header {
  padding-bottom: 10px;
  margin: 44px 0 22px;
  border-bottom: 1px solid #eeeeee; }

ul, ol {
  margin-top: 0;
  margin-bottom: 11px; }
  ul li, ol li {
    margin: 3px 0; }
  ul ul, ul ol, ol ul, ol ol {
    margin-bottom: 0; }

.list-unstyled {
  padding-left: 0;
  list-style: none; }

.list-inline {
  padding-left: 0;
  list-style: none;
  margin-left: -5px; }
  .list-inline > li {
    display: inline-block;
    padding-left: 5px;
    padding-right: 5px; }

.list-infos span {
  font-family: "HelveticaBoldCn"; }

dl {
  margin-top: 0;
  margin-bottom: 22px; }

dt, dd {
  line-height: 1.428571429; }

dt {
  font-weight: bold; }

dd {
  margin-left: 0; }

.dl-horizontal dd:before, .dl-horizontal dd:after {
  content: " ";
  display: table; }
.dl-horizontal dd:after {
  clear: both; }
@media (min-width: 1024px) {
  .dl-horizontal dt {
    float: left;
    width: 160px;
    clear: left;
    text-align: right;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap; }
  .dl-horizontal dd {
    margin-left: 180px; } }

abbr[title], abbr[data-original-title] {
  cursor: help;
  border-bottom: 1px dotted #777777; }

.initialism {
  font-size: 90%;
  text-transform: uppercase; }

blockquote {
  padding: 11px 22px;
  margin: 0 0 22px;
  font-size: 20px;
  border-left: 5px solid #eeeeee; }
  blockquote p:last-child, blockquote ul:last-child, blockquote ol:last-child {
    margin-bottom: 0; }
  blockquote footer, blockquote small, blockquote .small {
    display: block;
    font-size: 80%;
    line-height: 1.428571429;
    color: #777777; }
    blockquote footer:before, blockquote small:before, blockquote .small:before {
      content: '\2014 \00A0'; }

.blockquote-reverse, blockquote.pull-right {
  padding-right: 15px;
  padding-left: 0;
  border-right: 5px solid #eeeeee;
  border-left: 0;
  text-align: right; }
  .blockquote-reverse footer:before, .blockquote-reverse small:before, .blockquote-reverse .small:before, blockquote.pull-right footer:before, blockquote.pull-right small:before, blockquote.pull-right .small:before {
    content: ''; }
  .blockquote-reverse footer:after, .blockquote-reverse small:after, .blockquote-reverse .small:after, blockquote.pull-right footer:after, blockquote.pull-right small:after, blockquote.pull-right .small:after {
    content: '\00A0 \2014'; }

address {
  margin-bottom: 22px;
  font-style: normal;
  line-height: 1.428571429; }

code, kbd, pre, samp {
  font-family: Menlo, Monaco, Consolas, "Courier New", monospace; }

code {
  padding: 2px 4px;
  font-size: 90%;
  color: #c7254e;
  background-color: #f9f2f4;
  border-radius: 4px; }

kbd {
  padding: 2px 4px;
  font-size: 90%;
  color: #fff;
  background-color: #333;
  border-radius: 3px;
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.25); }
  kbd kbd {
    padding: 0;
    font-size: 100%;
    font-weight: bold;
    box-shadow: none; }

pre {
  display: block;
  padding: 10.5px;
  margin: 0 0 11px;
  font-size: 15px;
  line-height: 1.428571429;
  word-break: break-all;
  word-wrap: break-word;
  color: #333333;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 4px; }
  pre code {
    padding: 0;
    font-size: inherit;
    color: inherit;
    white-space: pre-wrap;
    background-color: transparent;
    border-radius: 0; }

.pre-scrollable {
  max-height: 340px;
  overflow-y: scroll; }

.container {
  margin-right: auto;
  margin-left: auto;
  padding-left: 20px;
  padding-right: 20px; }
  .container:before, .container:after {
    content: " ";
    display: table; }
  .container:after {
    clear: both; }
  @media (min-width: 1024px) {
    .container {
      width: 760px; } }
  @media (min-width: 1280px) {
    .container {
      width: 1146px; } }
  @media (min-width: 1680px) {
    .container {
      width: 1570px; } }

.container-fluid {
  margin-right: auto;
  margin-left: auto;
  padding-left: 20px;
  padding-right: 20px; }
  .container-fluid:before, .container-fluid:after {
    content: " ";
    display: table; }
  .container-fluid:after {
    clear: both; }
  @media (min-width: 1280px) {
    .container-fluid {
      margin-right: auto;
      margin-left: auto;
      padding-left: 75px;
      padding-right: 75px; }
      .container-fluid:before, .container-fluid:after {
        content: " ";
        display: table; }
      .container-fluid:after {
        clear: both; } }

.row {
  margin-left: -20px;
  margin-right: -20px; }
  .row:before, .row:after {
    content: " ";
    display: table; }
  .row:after {
    clear: both; }

.col-xs-1, .col-sm-1, .col-md-1, .col-lg-1, .col-xs-2, .col-sm-2, .col-md-2, .col-lg-2, .col-xs-3, .col-sm-3, .col-md-3, .col-lg-3, .col-xs-4, .col-sm-4, .col-md-4, .col-lg-4, .col-xs-5, .col-sm-5, .col-md-5, .col-lg-5, .col-xs-6, .col-sm-6, .col-md-6, .col-lg-6, .col-xs-7, .col-sm-7, .col-md-7, .col-lg-7, .col-xs-8, .col-sm-8, .col-md-8, .col-lg-8, .col-xs-9, .col-sm-9, .col-md-9, .col-lg-9, .col-xs-10, .col-sm-10, .col-md-10, .col-lg-10, .col-xs-11, .col-sm-11, .col-md-11, .col-lg-11, .col-xs-12, .col-sm-12, .col-md-12, .col-lg-12 {
  position: relative;
  min-height: 1px;
  padding-left: 20px;
  padding-right: 20px; }

.col-xs-1, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9, .col-xs-10, .col-xs-11, .col-xs-12 {
  float: left; }

.col-xs-1 {
  width: 8.3333333333%; }

.col-xs-2 {
  width: 16.6666666667%; }

.col-xs-3 {
  width: 25%; }

.col-xs-4 {
  width: 33.3333333333%; }

.col-xs-5 {
  width: 41.6666666667%; }

.col-xs-6 {
  width: 50%; }

.col-xs-7 {
  width: 58.3333333333%; }

.col-xs-8 {
  width: 66.6666666667%; }

.col-xs-9 {
  width: 75%; }

.col-xs-10 {
  width: 83.3333333333%; }

.col-xs-11 {
  width: 91.6666666667%; }

.col-xs-12 {
  width: 100%; }

.col-xs-pull-0 {
  right: auto; }

.col-xs-pull-1 {
  right: 8.3333333333%; }

.col-xs-pull-2 {
  right: 16.6666666667%; }

.col-xs-pull-3 {
  right: 25%; }

.col-xs-pull-4 {
  right: 33.3333333333%; }

.col-xs-pull-5 {
  right: 41.6666666667%; }

.col-xs-pull-6 {
  right: 50%; }

.col-xs-pull-7 {
  right: 58.3333333333%; }

.col-xs-pull-8 {
  right: 66.6666666667%; }

.col-xs-pull-9 {
  right: 75%; }

.col-xs-pull-10 {
  right: 83.3333333333%; }

.col-xs-pull-11 {
  right: 91.6666666667%; }

.col-xs-pull-12 {
  right: 100%; }

.col-xs-push-0 {
  left: auto; }

.col-xs-push-1 {
  left: 8.3333333333%; }

.col-xs-push-2 {
  left: 16.6666666667%; }

.col-xs-push-3 {
  left: 25%; }

.col-xs-push-4 {
  left: 33.3333333333%; }

.col-xs-push-5 {
  left: 41.6666666667%; }

.col-xs-push-6 {
  left: 50%; }

.col-xs-push-7 {
  left: 58.3333333333%; }

.col-xs-push-8 {
  left: 66.6666666667%; }

.col-xs-push-9 {
  left: 75%; }

.col-xs-push-10 {
  left: 83.3333333333%; }

.col-xs-push-11 {
  left: 91.6666666667%; }

.col-xs-push-12 {
  left: 100%; }

.col-xs-offset-0 {
  margin-left: 0%; }

.col-xs-offset-1 {
  margin-left: 8.3333333333%; }

.col-xs-offset-2 {
  margin-left: 16.6666666667%; }

.col-xs-offset-3 {
  margin-left: 25%; }

.col-xs-offset-4 {
  margin-left: 33.3333333333%; }

.col-xs-offset-5 {
  margin-left: 41.6666666667%; }

.col-xs-offset-6 {
  margin-left: 50%; }

.col-xs-offset-7 {
  margin-left: 58.3333333333%; }

.col-xs-offset-8 {
  margin-left: 66.6666666667%; }

.col-xs-offset-9 {
  margin-left: 75%; }

.col-xs-offset-10 {
  margin-left: 83.3333333333%; }

.col-xs-offset-11 {
  margin-left: 91.6666666667%; }

.col-xs-offset-12 {
  margin-left: 100%; }

@media (min-width: 1024px) {
  .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12 {
    float: left; }
  .col-sm-1 {
    width: 8.3333333333%; }
  .col-sm-2 {
    width: 16.6666666667%; }
  .col-sm-3 {
    width: 25%; }
  .col-sm-4 {
    width: 33.3333333333%; }
  .col-sm-5 {
    width: 41.6666666667%; }
  .col-sm-6 {
    width: 50%; }
  .col-sm-7 {
    width: 58.3333333333%; }
  .col-sm-8 {
    width: 66.6666666667%; }
  .col-sm-9 {
    width: 75%; }
  .col-sm-10 {
    width: 83.3333333333%; }
  .col-sm-11 {
    width: 91.6666666667%; }
  .col-sm-12 {
    width: 100%; }
  .col-sm-pull-0 {
    right: auto; }
  .col-sm-pull-1 {
    right: 8.3333333333%; }
  .col-sm-pull-2 {
    right: 16.6666666667%; }
  .col-sm-pull-3 {
    right: 25%; }
  .col-sm-pull-4 {
    right: 33.3333333333%; }
  .col-sm-pull-5 {
    right: 41.6666666667%; }
  .col-sm-pull-6 {
    right: 50%; }
  .col-sm-pull-7 {
    right: 58.3333333333%; }
  .col-sm-pull-8 {
    right: 66.6666666667%; }
  .col-sm-pull-9 {
    right: 75%; }
  .col-sm-pull-10 {
    right: 83.3333333333%; }
  .col-sm-pull-11 {
    right: 91.6666666667%; }
  .col-sm-pull-12 {
    right: 100%; }
  .col-sm-push-0 {
    left: auto; }
  .col-sm-push-1 {
    left: 8.3333333333%; }
  .col-sm-push-2 {
    left: 16.6666666667%; }
  .col-sm-push-3 {
    left: 25%; }
  .col-sm-push-4 {
    left: 33.3333333333%; }
  .col-sm-push-5 {
    left: 41.6666666667%; }
  .col-sm-push-6 {
    left: 50%; }
  .col-sm-push-7 {
    left: 58.3333333333%; }
  .col-sm-push-8 {
    left: 66.6666666667%; }
  .col-sm-push-9 {
    left: 75%; }
  .col-sm-push-10 {
    left: 83.3333333333%; }
  .col-sm-push-11 {
    left: 91.6666666667%; }
  .col-sm-push-12 {
    left: 100%; }
  .col-sm-offset-0 {
    margin-left: 0%; }
  .col-sm-offset-1 {
    margin-left: 8.3333333333%; }
  .col-sm-offset-2 {
    margin-left: 16.6666666667%; }
  .col-sm-offset-3 {
    margin-left: 25%; }
  .col-sm-offset-4 {
    margin-left: 33.3333333333%; }
  .col-sm-offset-5 {
    margin-left: 41.6666666667%; }
  .col-sm-offset-6 {
    margin-left: 50%; }
  .col-sm-offset-7 {
    margin-left: 58.3333333333%; }
  .col-sm-offset-8 {
    margin-left: 66.6666666667%; }
  .col-sm-offset-9 {
    margin-left: 75%; }
  .col-sm-offset-10 {
    margin-left: 83.3333333333%; }
  .col-sm-offset-11 {
    margin-left: 91.6666666667%; }
  .col-sm-offset-12 {
    margin-left: 100%; } }

@media (min-width: 1280px) {
  .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12 {
    float: left; }
  .col-md-1 {
    width: 8.3333333333%; }
  .col-md-2 {
    width: 16.6666666667%; }
  .col-md-3 {
    width: 25%; }
  .col-md-4 {
    width: 33.3333333333%; }
  .col-md-5 {
    width: 41.6666666667%; }
  .col-md-6 {
    width: 50%; }
  .col-md-7 {
    width: 58.3333333333%; }
  .col-md-8 {
    width: 66.6666666667%; }
  .col-md-9 {
    width: 75%; }
  .col-md-10 {
    width: 83.3333333333%; }
  .col-md-11 {
    width: 91.6666666667%; }
  .col-md-12 {
    width: 100%; }
  .col-md-pull-0 {
    right: auto; }
  .col-md-pull-1 {
    right: 8.3333333333%; }
  .col-md-pull-2 {
    right: 16.6666666667%; }
  .col-md-pull-3 {
    right: 25%; }
  .col-md-pull-4 {
    right: 33.3333333333%; }
  .col-md-pull-5 {
    right: 41.6666666667%; }
  .col-md-pull-6 {
    right: 50%; }
  .col-md-pull-7 {
    right: 58.3333333333%; }
  .col-md-pull-8 {
    right: 66.6666666667%; }
  .col-md-pull-9 {
    right: 75%; }
  .col-md-pull-10 {
    right: 83.3333333333%; }
  .col-md-pull-11 {
    right: 91.6666666667%; }
  .col-md-pull-12 {
    right: 100%; }
  .col-md-push-0 {
    left: auto; }
  .col-md-push-1 {
    left: 8.3333333333%; }
  .col-md-push-2 {
    left: 16.6666666667%; }
  .col-md-push-3 {
    left: 25%; }
  .col-md-push-4 {
    left: 33.3333333333%; }
  .col-md-push-5 {
    left: 41.6666666667%; }
  .col-md-push-6 {
    left: 50%; }
  .col-md-push-7 {
    left: 58.3333333333%; }
  .col-md-push-8 {
    left: 66.6666666667%; }
  .col-md-push-9 {
    left: 75%; }
  .col-md-push-10 {
    left: 83.3333333333%; }
  .col-md-push-11 {
    left: 91.6666666667%; }
  .col-md-push-12 {
    left: 100%; }
  .col-md-offset-0 {
    margin-left: 0%; }
  .col-md-offset-1 {
    margin-left: 8.3333333333%; }
  .col-md-offset-2 {
    margin-left: 16.6666666667%; }
  .col-md-offset-3 {
    margin-left: 25%; }
  .col-md-offset-4 {
    margin-left: 33.3333333333%; }
  .col-md-offset-5 {
    margin-left: 41.6666666667%; }
  .col-md-offset-6 {
    margin-left: 50%; }
  .col-md-offset-7 {
    margin-left: 58.3333333333%; }
  .col-md-offset-8 {
    margin-left: 66.6666666667%; }
  .col-md-offset-9 {
    margin-left: 75%; }
  .col-md-offset-10 {
    margin-left: 83.3333333333%; }
  .col-md-offset-11 {
    margin-left: 91.6666666667%; }
  .col-md-offset-12 {
    margin-left: 100%; } }

@media (min-width: 1680px) {
  .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12 {
    float: left; }
  .col-lg-1 {
    width: 8.3333333333%; }
  .col-lg-2 {
    width: 16.6666666667%; }
  .col-lg-3 {
    width: 25%; }
  .col-lg-4 {
    width: 33.3333333333%; }
  .col-lg-5 {
    width: 41.6666666667%; }
  .col-lg-6 {
    width: 50%; }
  .col-lg-7 {
    width: 58.3333333333%; }
  .col-lg-8 {
    width: 66.6666666667%; }
  .col-lg-9 {
    width: 75%; }
  .col-lg-10 {
    width: 83.3333333333%; }
  .col-lg-11 {
    width: 91.6666666667%; }
  .col-lg-12 {
    width: 100%; }
  .col-lg-pull-0 {
    right: auto; }
  .col-lg-pull-1 {
    right: 8.3333333333%; }
  .col-lg-pull-2 {
    right: 16.6666666667%; }
  .col-lg-pull-3 {
    right: 25%; }
  .col-lg-pull-4 {
    right: 33.3333333333%; }
  .col-lg-pull-5 {
    right: 41.6666666667%; }
  .col-lg-pull-6 {
    right: 50%; }
  .col-lg-pull-7 {
    right: 58.3333333333%; }
  .col-lg-pull-8 {
    right: 66.6666666667%; }
  .col-lg-pull-9 {
    right: 75%; }
  .col-lg-pull-10 {
    right: 83.3333333333%; }
  .col-lg-pull-11 {
    right: 91.6666666667%; }
  .col-lg-pull-12 {
    right: 100%; }
  .col-lg-push-0 {
    left: auto; }
  .col-lg-push-1 {
    left: 8.3333333333%; }
  .col-lg-push-2 {
    left: 16.6666666667%; }
  .col-lg-push-3 {
    left: 25%; }
  .col-lg-push-4 {
    left: 33.3333333333%; }
  .col-lg-push-5 {
    left: 41.6666666667%; }
  .col-lg-push-6 {
    left: 50%; }
  .col-lg-push-7 {
    left: 58.3333333333%; }
  .col-lg-push-8 {
    left: 66.6666666667%; }
  .col-lg-push-9 {
    left: 75%; }
  .col-lg-push-10 {
    left: 83.3333333333%; }
  .col-lg-push-11 {
    left: 91.6666666667%; }
  .col-lg-push-12 {
    left: 100%; }
  .col-lg-offset-0 {
    margin-left: 0%; }
  .col-lg-offset-1 {
    margin-left: 8.3333333333%; }
  .col-lg-offset-2 {
    margin-left: 16.6666666667%; }
  .col-lg-offset-3 {
    margin-left: 25%; }
  .col-lg-offset-4 {
    margin-left: 33.3333333333%; }
  .col-lg-offset-5 {
    margin-left: 41.6666666667%; }
  .col-lg-offset-6 {
    margin-left: 50%; }
  .col-lg-offset-7 {
    margin-left: 58.3333333333%; }
  .col-lg-offset-8 {
    margin-left: 66.6666666667%; }
  .col-lg-offset-9 {
    margin-left: 75%; }
  .col-lg-offset-10 {
    margin-left: 83.3333333333%; }
  .col-lg-offset-11 {
    margin-left: 91.6666666667%; }
  .col-lg-offset-12 {
    margin-left: 100%; } }

_tables.scss table {
  background-color: #f4f6f9; }

caption {
  padding-top: 8px;
  padding-bottom: 8px;
  color: #777777;
  text-align: left; }

th {
  text-align: left; }

.table {
  width: 100%;
  max-width: 100%; }
  .table > thead > tr > th, .table > thead > tr > td, .table > tbody > tr > th, .table > tbody > tr > td, .table > tfoot > tr > th, .table > tfoot > tr > td {
    padding: 8px;
    line-height: 1.428571429;
    vertical-align: middle;
    border-top: 2px solid #fff; }
  .table > thead > tr > th {
    vertical-align: bottom;
    border-bottom: 2px solid #fff;
    background: #555;
    color: #fff;
    font-weight: normal;
    position: relative; }
    .table > thead > tr > th .glyphicon-sort {
      margin-top: 5px;
      font-size: 10px;
      position: absolute;
      top: 30%;
      right: 5px; }
    .table > thead > tr > th.sorting, .table > thead > tr > th.sorting_desc, .table > thead > tr > th.sorting_asc {
      text-decoration: underline;
      cursor: pointer;
      padding-right: 20px; }
    .table > thead > tr > th.sorting_asc {
      background: #333; }
    .table > thead > tr > th.sorting_desc {
      background: #333; }
  .table > caption + thead > tr:first-child > th, .table > caption + thead > tr:first-child > td, .table > colgroup + thead > tr:first-child > th, .table > colgroup + thead > tr:first-child > td, .table > thead:first-child > tr:first-child > th, .table > thead:first-child > tr:first-child > td {
    border-top: 0; }
  .table > tbody + tbody {
    border-top: 2px solid #fff; }
  .table .table {
    background-color: #fff; }

.table-upload {
  margin-bottom: 20px; }
  .table-upload .cell-thumbnail {
    width: 150px; }
    .table-upload .cell-thumbnail img {
      width: 100%; }
  .table-upload .progress {
    margin-bottom: 0; }

.table-condensed > thead > tr > th, .table-condensed > thead > tr > td, .table-condensed > tbody > tr > th, .table-condensed > tbody > tr > td, .table-condensed > tfoot > tr > th, .table-condensed > tfoot > tr > td {
  padding: 5px; }

.table-bordered {
  border: 1px solid #fff; }
  .table-bordered > thead > tr > th, .table-bordered > thead > tr > td, .table-bordered > tbody > tr > th, .table-bordered > tbody > tr > td, .table-bordered > tfoot > tr > th, .table-bordered > tfoot > tr > td {
    border: 1px solid #fff; }
  .table-bordered > thead > tr > th, .table-bordered > thead > tr > td {
    border-bottom-width: 2px; }

.table-striped > tbody > tr:nth-of-type(odd) {
  background-color: #e5e7eb; }

.table-hover > tbody > tr:hover {
  background-color: #ccdff4; }

table col[class*="col-"] {
  position: static;
  float: none;
  display: table-column; }

table td[class*="col-"], table th[class*="col-"] {
  position: static;
  float: none;
  display: table-cell; }

.table > thead > tr > td.active, .table > thead > tr > th.active, .table > thead > tr.active > td, .table > thead > tr.active > th, .table > tbody > tr > td.active, .table > tbody > tr > th.active, .table > tbody > tr.active > td, .table > tbody > tr.active > th, .table > tfoot > tr > td.active, .table > tfoot > tr > th.active, .table > tfoot > tr.active > td, .table > tfoot > tr.active > th {
  background-color: #ccdff4; }

.table-hover > tbody > tr > td.active:hover, .table-hover > tbody > tr > th.active:hover, .table-hover > tbody > tr.active:hover > td, .table-hover > tbody > tr:hover > .active, .table-hover > tbody > tr.active:hover > th {
  background-color: #b7d2ef; }

.table > thead > tr > td.success, .table > thead > tr > th.success, .table > thead > tr.success > td, .table > thead > tr.success > th, .table > tbody > tr > td.success, .table > tbody > tr > th.success, .table > tbody > tr.success > td, .table > tbody > tr.success > th, .table > tfoot > tr > td.success, .table > tfoot > tr > th.success, .table > tfoot > tr.success > td, .table > tfoot > tr.success > th {
  background-color: #dff0d8; }

.table-hover > tbody > tr > td.success:hover, .table-hover > tbody > tr > th.success:hover, .table-hover > tbody > tr.success:hover > td, .table-hover > tbody > tr:hover > .success, .table-hover > tbody > tr.success:hover > th {
  background-color: #d0e9c6; }

.table > thead > tr > td.info, .table > thead > tr > th.info, .table > thead > tr.info > td, .table > thead > tr.info > th, .table > tbody > tr > td.info, .table > tbody > tr > th.info, .table > tbody > tr.info > td, .table > tbody > tr.info > th, .table > tfoot > tr > td.info, .table > tfoot > tr > th.info, .table > tfoot > tr.info > td, .table > tfoot > tr.info > th {
  background-color: #d9edf7; }

.table-hover > tbody > tr > td.info:hover, .table-hover > tbody > tr > th.info:hover, .table-hover > tbody > tr.info:hover > td, .table-hover > tbody > tr:hover > .info, .table-hover > tbody > tr.info:hover > th {
  background-color: #c4e3f3; }

.table > thead > tr > td.warning, .table > thead > tr > th.warning, .table > thead > tr.warning > td, .table > thead > tr.warning > th, .table > tbody > tr > td.warning, .table > tbody > tr > th.warning, .table > tbody > tr.warning > td, .table > tbody > tr.warning > th, .table > tfoot > tr > td.warning, .table > tfoot > tr > th.warning, .table > tfoot > tr.warning > td, .table > tfoot > tr.warning > th {
  background-color: #fcf8e3; }

.table-hover > tbody > tr > td.warning:hover, .table-hover > tbody > tr > th.warning:hover, .table-hover > tbody > tr.warning:hover > td, .table-hover > tbody > tr:hover > .warning, .table-hover > tbody > tr.warning:hover > th {
  background-color: #faf2cc; }

.table > thead > tr > td.danger, .table > thead > tr > th.danger, .table > thead > tr.danger > td, .table > thead > tr.danger > th, .table > tbody > tr > td.danger, .table > tbody > tr > th.danger, .table > tbody > tr.danger > td, .table > tbody > tr.danger > th, .table > tfoot > tr > td.danger, .table > tfoot > tr > th.danger, .table > tfoot > tr.danger > td, .table > tfoot > tr.danger > th {
  background-color: #f2dede; }

.table-hover > tbody > tr > td.danger:hover, .table-hover > tbody > tr > th.danger:hover, .table-hover > tbody > tr.danger:hover > td, .table-hover > tbody > tr:hover > .danger, .table-hover > tbody > tr.danger:hover > th {
  background-color: #ebcccc; }

.table-responsive {
  overflow-x: auto;
  min-height: 0.01%; }
  @media screen and (max-width: 1023px) {
    .table-responsive {
      width: 100%;
      margin-bottom: 16.5px;
      overflow-y: hidden;
      -ms-overflow-style: -ms-autohiding-scrollbar;
      border: 1px solid #fff; }
      .table-responsive > .table {
        margin-bottom: 0; }
        .table-responsive > .table > thead > tr > th, .table-responsive > .table > thead > tr > td, .table-responsive > .table > tbody > tr > th, .table-responsive > .table > tbody > tr > td, .table-responsive > .table > tfoot > tr > th, .table-responsive > .table > tfoot > tr > td {
          white-space: nowrap; }
      .table-responsive > .table-bordered {
        border: 0; }
        .table-responsive > .table-bordered > thead > tr > th:first-child, .table-responsive > .table-bordered > thead > tr > td:first-child, .table-responsive > .table-bordered > tbody > tr > th:first-child, .table-responsive > .table-bordered > tbody > tr > td:first-child, .table-responsive > .table-bordered > tfoot > tr > th:first-child, .table-responsive > .table-bordered > tfoot > tr > td:first-child {
          border-left: 0; }
        .table-responsive > .table-bordered > thead > tr > th:last-child, .table-responsive > .table-bordered > thead > tr > td:last-child, .table-responsive > .table-bordered > tbody > tr > th:last-child, .table-responsive > .table-bordered > tbody > tr > td:last-child, .table-responsive > .table-bordered > tfoot > tr > th:last-child, .table-responsive > .table-bordered > tfoot > tr > td:last-child {
          border-right: 0; }
        .table-responsive > .table-bordered > tbody > tr:last-child > th, .table-responsive > .table-bordered > tbody > tr:last-child > td, .table-responsive > .table-bordered > tfoot > tr:last-child > th, .table-responsive > .table-bordered > tfoot > tr:last-child > td {
          border-bottom: 0; } }

.state-success, .state-warning, .state-danger {
  font-size: 1.3em; }

.state-success {
  color: #468847; }

.state-warning {
  color: #e18a00; }

.state-danger {
  color: #d90000; }

.table-control {
  background: #eceef0;
  padding: 5px 5px 0 5px;
  margin: 5px 0;
  position: relative; }
  .table-control select {
    width: auto;
    display: inline-block; }

.table-control-top {
  padding-top: 50px; }
  .table-control-top .col-xs-12 {
    position: absolute;
    top: 10px;
    left: 0; }

.table-control-bottom {
  padding-bottom: 50px; }
  .table-control-bottom .col-xs-12 {
    position: absolute;
    bottom: 10px;
    left: 0; }

@media (min-width: 1024px) {
  .table-control .col-xs-12 {
    position: static; }
  .table-control-top {
    padding-top: 5px; }
  .table-control-bottom {
    padding-bottom: 5px; } }

.table-resp > tbody > tr {
  background-color: #e5e7eb !important; }
  .table-resp > tbody > tr:nth-child(4n+1) {
    background-color: transparent !important; }
    .table-resp > tbody > tr:nth-child(4n+1) + tr {
      background-color: transparent !important; }
.table-resp .row-detail-name, .table-resp .row-detail-value {
  display: inline-block; }
.table-resp .row-detail-value {
  font-weight: bold; }

.select2-container {
  margin: 0;
  position: relative;
  display: inline-block;
  vertical-align: middle;
  min-width: 300px;
  max-width: 80%;
  margin-right: 15px; }

.select2-container, .select2-drop, .select2-search, .select2-search input {
  box-sizing: border-box; }

.select2-container .select2-choice {
  display: block;
  height: 32px;
  padding: 0 0 0 8px;
  overflow: hidden;
  position: relative;
  border: 1px solid #ccc;
  white-space: nowrap;
  line-height: 30px;
  color: #444;
  background-clip: padding-box;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: #fff;
  cursor: pointer;
  width: 100% !important; }
  .select2-container .select2-choice span {
    text-decoration: none; }

html[dir="rtl"] .select2-container .select2-choice {
  padding: 0 8px 0 0; }

.select2-container.select2-drop-above .select2-choice {
  border-bottom-color: #ccc; }

.select2-container.select2-allowclear .select2-choice .select2-chosen {
  margin-right: 42px; }

.select2-container .select2-choice > .select2-chosen {
  margin-right: 26px;
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  float: none;
  width: auto; }

html[dir="rtl"] .select2-container .select2-choice > .select2-chosen {
  margin-left: 26px;
  margin-right: 0; }

.select2-container .select2-choice abbr {
  display: none;
  width: 12px;
  height: 32px;
  line-height: 30px;
  position: absolute;
  right: 24px;
  top: 0;
  font-size: 10px;
  text-decoration: none;
  border: 0;
  cursor: pointer;
  outline: 0; }

.select2-container.select2-allowclear .select2-choice abbr {
  display: inline-block; }

.select2-container .select2-choice abbr:hover {
  background-position: right -11px;
  cursor: pointer; }

.select2-drop-mask {
  border: 0;
  margin: 0;
  padding: 0;
  position: fixed;
  left: 0;
  top: 0;
  min-height: 100%;
  min-width: 100%;
  height: auto;
  width: auto;
  opacity: 0;
  z-index: 9998;
  background-color: #fff;
  filter: alpha(opacity=0); }

.select2-drop {
  width: 100%;
  margin-top: -1px;
  position: absolute;
  z-index: 9999;
  top: 100%;
  background: #fff;
  color: #000;
  border: 1px solid #004893;
  border-top: 0;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.15); }

.select2-drop.select2-drop-above {
  margin-top: 1px;
  border-top: 1px solid #ccc;
  border-bottom: 0;
  box-shadow: 0 -4px 5px rgba(0, 0, 0, 0.15); }

.select2-drop-active {
  border-top: none; }

.select2-drop.select2-drop-above.select2-drop-active {
  border-top: 1px solid #004893; }

.select2-drop-auto-width {
  border-top: 1px solid #ccc;
  width: auto; }

.select2-drop-auto-width .select2-search {
  padding-top: 4px; }

.select2-container .select2-choice .select2-arrow {
  display: inline-block;
  width: 18px;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  background-clip: padding-box; }

html[dir="rtl"] .select2-container .select2-choice .select2-arrow {
  left: 0;
  right: auto;
  border-left: none;
  border-right: 1px solid #ccc; }

.select2-container .select2-choice .select2-arrow b {
  border-color: #333 transparent transparent transparent;
  border-style: solid;
  border-width: 5px 4px 0 4px;
  height: 0;
  left: 50%;
  margin-left: -4px;
  margin-top: -2px;
  position: absolute;
  top: 50%;
  width: 0; }

.select2-search {
  display: inline-block;
  width: 100%;
  min-height: 32px;
  margin: 0;
  padding-left: 4px;
  padding-right: 4px;
  position: relative;
  z-index: 10000;
  white-space: nowrap; }

.select2-search input {
  width: 100%;
  height: auto !important;
  min-height: 32px;
  padding: 4px 20px 4px 5px;
  margin: 0;
  outline: 0;
  font-family: sans-serif;
  font-size: 1em;
  border: 1px solid #ccc;
  box-shadow: inset 1px 1px 1px rgba(0, 0, 0, 0.4);
  -webkit-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s; }
  .select2-search input:focus {
    border-color: #004893;
    outline: 0;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 72, 147, 0.6); }

html[dir="rtl"] .select2-search input {
  padding: 4px 5px 4px 20px;
  background: #fff url('select2.png') no-repeat -37px -22px;
  background: url('select2.png') no-repeat -37px -22px, -webkit-gradient(linear, left bottom, left top, color-stop(0.85, #fff), color-stop(0.99, #eee));
  background: url('select2.png') no-repeat -37px -22px, -webkit-linear-gradient(center bottom, #fff 85%, #eee 99%);
  background: url('select2.png') no-repeat -37px -22px, -webkit-linear-gradient(top, #fff 85%, #eee 99%) 0 0;
  background: url('select2.png') no-repeat -37px -22px, linear-gradient(to bottom, #fff 85%, #eee 99%) 0 0; }

.select2-drop.select2-drop-above .select2-search input {
  margin-top: 4px; }

.select2-search input.select2-active {
  background: #fff url('select2-spinner.gif') no-repeat 100%;
  background: url('select2-spinner.gif') no-repeat 100%, -webkit-gradient(linear, left bottom, left top, color-stop(0.85, #fff), color-stop(0.99, #eee));
  background: url('select2-spinner.gif') no-repeat 100%, -webkit-linear-gradient(center bottom, #fff 85%, #eee 99%);
  background: url('select2-spinner.gif') no-repeat 100%, -webkit-linear-gradient(top, #fff 85%, #eee 99%) 0 0;
  background: url('select2-spinner.gif') no-repeat 100%, linear-gradient(to bottom, #fff 85%, #eee 99%) 0 0; }

.select2-container-active .select2-choice, .select2-container-active .select2-choices {
  outline: none;
  border-color: #004893;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 72, 147, 0.6); }

.select2-dropdown-open .select2-choice {
  border-bottom-color: transparent;
  box-shadow: 0 1px 0 #fff inset; }

.select2-dropdown-open.select2-drop-above .select2-choice, .select2-dropdown-open.select2-drop-above .select2-choices {
  border: 1px solid #5897fb;
  border-top-color: transparent; }

.select2-dropdown-open .select2-choice .select2-arrow {
  background: transparent;
  border-left: none;
  -webkit-filter: none;
          filter: none; }

html[dir="rtl"] .select2-dropdown-open .select2-choice .select2-arrow {
  border-right: none; }

.select2-dropdown-open .select2-choice .select2-arrow b {
  border-color: transparent transparent #333 transparent;
  border-width: 0 4px 5px 4px; }

html[dir="rtl"] .select2-dropdown-open .select2-choice .select2-arrow b {
  background-position: -16px 1px; }

.select2-hidden-accessible {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px; }

/* results */
.select2-results {
  max-height: 200px;
  padding: 0 0 0 4px;
  margin: 4px 4px 4px 0;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-tap-highlight-color: transparent; }

html[dir="rtl"] .select2-results {
  padding: 0 4px 0 0;
  margin: 4px 0 4px 4px; }

.select2-results ul.select2-result-sub {
  margin: 0;
  padding-left: 0; }

.select2-results li {
  list-style: none;
  display: list-item;
  background-image: none; }

.select2-results li.select2-result-with-children > .select2-result-label {
  font-weight: bold; }

.select2-results .select2-result-label {
  padding: 3px 7px 4px;
  margin: 0;
  cursor: pointer;
  min-height: 1em;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none; }

.select2-results-dept-1 .select2-result-label {
  padding-left: 20px; }

.select2-results-dept-2 .select2-result-label {
  padding-left: 40px; }

.select2-results-dept-3 .select2-result-label {
  padding-left: 60px; }

.select2-results-dept-4 .select2-result-label {
  padding-left: 80px; }

.select2-results-dept-5 .select2-result-label {
  padding-left: 100px; }

.select2-results-dept-6 .select2-result-label {
  padding-left: 110px; }

.select2-results-dept-7 .select2-result-label {
  padding-left: 120px; }

.select2-results .select2-highlighted {
  background: #004893;
  color: #fff; }

.select2-results li em {
  background: #feffde;
  font-style: normal; }

.select2-results .select2-highlighted em {
  background: transparent; }

.select2-results .select2-highlighted ul {
  background: #fff;
  color: #000; }

.select2-results .select2-no-results, .select2-results .select2-searching, .select2-results .select2-ajax-error, .select2-results .select2-selection-limit {
  background: #f4f4f4;
  display: list-item;
  padding-left: 5px; }

/*
disabled look for disabled choices in the results dropdown
*/
.select2-results .select2-disabled.select2-highlighted {
  color: #666;
  background: #f4f4f4;
  display: list-item;
  cursor: default; }

.select2-results .select2-disabled {
  background: #f4f4f4;
  display: list-item;
  cursor: default; }

.select2-results .select2-selected {
  display: none; }

.select2-more-results.select2-active {
  background: #f4f4f4 url('select2-spinner.gif') no-repeat 100%; }

.select2-results .select2-ajax-error {
  background: rgba(255, 50, 50, 0.2); }

.select2-more-results {
  background: #f4f4f4;
  display: list-item; }

/* disabled styles */
.select2-container.select2-container-disabled .select2-choice {
  background-color: #f4f4f4;
  background-image: none;
  border: 1px solid #ddd;
  cursor: default; }

.select2-container.select2-container-disabled .select2-choice .select2-arrow {
  background-color: #f4f4f4;
  background-image: none;
  border-left: 0; }

.select2-container.select2-container-disabled .select2-choice abbr {
  display: none; }

/* multiselect */
.select2-container-multi .select2-choices {
  height: auto !important;
  height: 1%;
  margin: 0;
  padding: 0 5px;
  position: relative;
  border: 1px solid #ccc;
  cursor: text;
  overflow: hidden; }

html[dir="rtl"] .select2-container-multi .select2-choices {
  padding: 0 0 0 5px; }

.select2-locked {
  padding: 3px 5px 3px 5px !important; }

.select2-container-multi .select2-choices {
  min-height: 32px; }

.select2-container-multi.select2-container-active .select2-choices {
  border: 1px solid #004893;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3); }

.select2-container-multi .select2-choices li {
  float: left;
  list-style: none; }

html[dir="rtl"] .select2-container-multi .select2-choices li {
  float: right; }

.select2-container-multi .select2-choices .select2-search-field {
  margin: 0;
  padding: 0;
  white-space: nowrap; }

.select2-container-multi .select2-choices .select2-search-field input {
  padding: 5px;
  margin: 1px 0;
  font-family: sans-serif;
  font-size: 100%;
  color: #666;
  outline: 0;
  border: 0;
  box-shadow: none;
  background: transparent !important; }

.select2-container-multi .select2-choices .select2-search-field input.select2-active {
  background: #fff url('select2-spinner.gif') no-repeat 100% !important; }

.select2-container-multi .select2-choices .select2-search-choice {
  border-radius: 3px;
  cursor: default;
  float: left;
  margin: 3px 5px 0 0;
  margin-top: 5px;
  padding: 0 5px;
  border: 1px solid #ccc;
  background-clip: padding-box;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: #fff; }

html[dir="rtl"] .select2-container-multi .select2-choices .select2-search-choice {
  margin: 3px 5px 3px 0;
  padding: 3px 18px 3px 5px; }

.select2-container-multi .select2-choices .select2-search-choice .select2-chosen {
  cursor: default; }

.select2-container-multi .select2-choices .select2-search-choice-focus {
  background: #d4d4d4; }

.select2-search-choice-close {
  color: #004893;
  cursor: pointer;
  display: inline-block;
  font-weight: bold;
  font-size: 25px;
  margin-left: 10px;
  margin-right: 5px;
  line-height: 24px;
  float: right;
  font-size: 10px; }

html[dir="rtl"] .select2-search-choice-close {
  right: auto;
  left: 3px; }

.select2-container-multi .select2-search-choice-close {
  left: 3px; }

html[dir="rtl"] .select2-container-multi .select2-search-choice-close {
  left: auto;
  right: 2px; }

.select2-container-multi .select2-choices .select2-search-choice .select2-search-choice-close:hover {
  background-position: right -11px; }

.select2-container-multi .select2-choices .select2-search-choice-focus .select2-search-choice-close {
  background-position: right -11px; }

/* disabled styles */
.select2-container-multi.select2-container-disabled .select2-choices {
  background-color: #f4f4f4;
  background-image: none;
  border: 1px solid #ddd;
  cursor: default; }

.select2-container-multi.select2-container-disabled .select2-choices .select2-search-choice {
  padding: 3px 5px 3px 5px;
  border: 1px solid #ddd;
  background-image: none;
  background-color: #f4f4f4; }

.select2-container-multi.select2-container-disabled .select2-choices .select2-search-choice .select2-search-choice-close {
  display: none;
  background: none; }

/* end multiselect */
.select2-result-selectable .select2-match, .select2-result-unselectable .select2-match {
  text-decoration: underline; }

.select2-offscreen, .select2-offscreen:focus {
  clip: rect(0 0 0 0) !important;
  width: 1px !important;
  height: 1px !important;
  border: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
  overflow: hidden !important;
  position: absolute !important;
  outline: 0 !important;
  left: 0px !important;
  top: 0px !important; }

.select2-display-none {
  display: none; }

.select2-measure-scrollbar {
  position: absolute;
  top: -10000px;
  left: -10000px;
  width: 100px;
  height: 100px;
  overflow: scroll; }

/*!
 * ui-select
 * http://github.com/angular-ui/ui-select
 * Version: 0.11.2 - 2015-04-28T16:04:59.367Z
 * License: MIT
 */
/* Style when highlighting a search. */
.ui-select-highlight {
  font-weight: bold; }

.ui-select-offscreen {
  clip: rect(0 0 0 0) !important;
  width: 1px !important;
  height: 1px !important;
  border: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
  overflow: hidden !important;
  position: absolute !important;
  outline: 0 !important;
  left: 0px !important;
  top: 0px !important; }

/* Select2 theme */
/* Mark invalid Select2 */
.ng-dirty.ng-invalid > a.select2-choice {
  border-color: #D44950; }

.select2-result-single {
  padding-left: 0; }

.select2-locked > .select2-search-choice-close {
  display: none; }

.select-locked > .ui-select-match-close {
  display: none; }

body > .select2-container.open {
  z-index: 9999;
  /* The z-index Select2 applies to the select2-drop */ }

/* Selectize theme */
/* Helper class to show styles when focus */
.selectize-input.selectize-focus {
  border-color: #007FBB !important; }

/* Fix input width for Selectize theme */
.selectize-control > .selectize-input > input {
  width: 100%; }

/* Fix dropdown width for Selectize theme */
.selectize-control > .selectize-dropdown {
  width: 100%; }

/* Mark invalid Selectize */
.ng-dirty.ng-invalid > div.selectize-input {
  border-color: #D44950; }

/* Bootstrap theme */
/* Helper class to show styles when focus */
.btn-default-focus {
  color: #333;
  background-color: #EBEBEB;
  border-color: #ADADAD;
  text-decoration: none;
  outline: 5px auto -webkit-focus-ring-color;
  outline-offset: -2px;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6); }

.ui-select-bootstrap .ui-select-toggle {
  position: relative; }

.ui-select-bootstrap .ui-select-toggle > .caret {
  position: absolute;
  height: 10px;
  top: 50%;
  right: 10px;
  margin-top: -2px; }

/* Fix Bootstrap dropdown position when inside a input-group */
.input-group > .ui-select-bootstrap.dropdown {
  /* Instead of relative */
  position: static; }

.input-group > .ui-select-bootstrap > input.ui-select-search.form-control, .select2-container .input-group > .ui-select-bootstrap > input.ui-select-search.select2-choice {
  border-radius: 4px;
  /* FIXME hardcoded value :-/ */
  border-top-right-radius: 0;
  border-bottom-right-radius: 0; }

.ui-select-bootstrap > .ui-select-match > .btn {
  /* Instead of center because of .btn */
  text-align: left !important; }

.ui-select-bootstrap > .ui-select-match > .caret {
  position: absolute;
  top: 45%;
  right: 15px; }

/* See Scrollable Menu with Bootstrap 3 http://stackoverflow.com/questions/19227496 */
.ui-select-bootstrap > .ui-select-choices {
  width: 100%;
  height: auto;
  max-height: 200px;
  overflow-x: hidden;
  margin-top: -1px; }

body > .ui-select-bootstrap.open {
  z-index: 1000;
  /* Standard Bootstrap dropdown z-index */ }

.ui-select-multiple.ui-select-bootstrap {
  height: auto;
  padding: 3px 3px 0 3px; }

.ui-select-multiple.ui-select-bootstrap input.ui-select-search {
  background-color: transparent !important;
  /* To prevent double background when disabled */
  border: none;
  outline: none;
  height: 1.666666em;
  margin-bottom: 3px; }

.ui-select-multiple.ui-select-bootstrap .ui-select-match .close {
  font-size: 1.6em;
  line-height: 0.75; }

.ui-select-multiple.ui-select-bootstrap .ui-select-match-item {
  outline: 0;
  margin: 0 3px 3px 0; }

.ui-select-multiple .ui-select-match-item {
  position: relative; }

.ui-select-multiple .ui-select-match-item.dropping-before:before {
  content: "";
  position: absolute;
  top: 0;
  right: 100%;
  height: 100%;
  margin-right: 2px;
  border-left: 1px solid #428bca; }

.ui-select-multiple .ui-select-match-item.dropping-after:after {
  content: "";
  position: absolute;
  top: 0;
  left: 100%;
  height: 100%;
  margin-left: 2px;
  border-right: 1px solid #428bca; }

.ui-select-bootstrap .ui-select-choices-row > a {
  display: block;
  padding: 3px 20px;
  clear: both;
  font-weight: 400;
  line-height: 1.42857143;
  color: #333;
  white-space: nowrap; }

.ui-select-bootstrap .ui-select-choices-row > a:hover, .ui-select-bootstrap .ui-select-choices-row > a:focus {
  text-decoration: none;
  color: #262626;
  background-color: #f5f5f5; }

.ui-select-bootstrap .ui-select-choices-row.active > a {
  color: #fff;
  text-decoration: none;
  outline: 0;
  background-color: #428bca; }

.ui-select-bootstrap .ui-select-choices-row.disabled > a, .ui-select-bootstrap .ui-select-choices-row.active.disabled > a {
  color: #777;
  cursor: not-allowed;
  background-color: #fff; }

/* fix hide/show angular animation */
.ui-select-match.ng-hide-add, .ui-select-search.ng-hide-add {
  display: none !important; }

/* Mark invalid Bootstrap */
.ui-select-bootstrap.ng-dirty.ng-invalid > button.btn.ui-select-match {
  border-color: #D44950; }

fieldset {
  padding: 0;
  margin: 0;
  border: 0;
  min-width: 0; }

legend {
  display: block;
  width: 100%;
  padding: 0;
  margin-bottom: 22px;
  font-size: 24px;
  line-height: inherit;
  color: #333333;
  border: 0;
  border-bottom: 1px solid #e5e5e5; }

label {
  display: inline-block;
  max-width: 100%;
  margin-bottom: 5px;
  font-weight: normal; }

input[type="search"] {
  box-sizing: border-box; }

input[type="radio"], input[type="checkbox"] {
  margin: 4px 0 0;
  margin-top: 1px \9;
  line-height: normal; }

input[type="file"] {
  display: block; }

input[type="range"] {
  display: block;
  width: 100%; }

select[multiple], select[size] {
  height: auto; }

input[type="file"]:focus, input[type="radio"]:focus, input[type="checkbox"]:focus {
  outline: thin dotted;
  outline: 5px auto -webkit-focus-ring-color;
  outline-offset: -2px; }

output {
  display: block;
  padding-top: 5px;
  font-size: 16px;
  line-height: 1.428571429;
  color: #555555; }

.form-control, .select2-container .select2-choice {
  display: inline-block;
  width: 80%;
  height: 32px;
  padding: 4px 10px;
  margin-right: 10px;
  font-size: 16px;
  line-height: 1.428571429;
  color: #555555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 0;
  -webkit-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s; }
  .form-control:focus, .select2-container .select2-choice:focus {
    border-color: #004893;
    outline: 0;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 72, 147, 0.6); }
  .form-control::-moz-placeholder, .select2-container .select2-choice::-moz-placeholder {
    color: #999;
    opacity: 1; }
  .form-control:-ms-input-placeholder, .select2-container .select2-choice:-ms-input-placeholder {
    color: #999; }
  .form-control::-webkit-input-placeholder, .select2-container .select2-choice::-webkit-input-placeholder {
    color: #999; }
  .form-control[disabled], .select2-container [disabled].select2-choice, .form-control[readonly], .select2-container [readonly].select2-choice, fieldset[disabled] .form-control, fieldset[disabled] .select2-container .select2-choice, .select2-container fieldset[disabled] .select2-choice {
    cursor: false;
    background-color: #eeeeee;
    opacity: 1; }

select.form-control, .select2-container select.select2-choice {
  box-shadow: none;
  width: auto; }

textarea.form-control, .select2-container textarea.select2-choice {
  height: auto; }

input[type="search"] {
  -webkit-appearance: none; }

@media screen and (-webkit-min-device-pixel-ratio: 0) {
  input[type="date"], input[type="time"], input[type="datetime-local"], input[type="month"] {
    line-height: 32px; }
    input[type="date"].input-sm, .input-group-sm > input[type="date"].form-control, .select2-container .input-group-sm > input[type="date"].select2-choice, .input-group-sm > input[type="date"].input-group-addon, .input-group-sm > .input-group-btn > input[type="date"].btn, .input-group-sm input[type="date"], input[type="time"].input-sm, .input-group-sm > input[type="time"].form-control, .select2-container .input-group-sm > input[type="time"].select2-choice, .input-group-sm > input[type="time"].input-group-addon, .input-group-sm > .input-group-btn > input[type="time"].btn, .input-group-sm input[type="time"], input[type="datetime-local"].input-sm, .input-group-sm > input[type="datetime-local"].form-control, .select2-container .input-group-sm > input[type="datetime-local"].select2-choice, .input-group-sm > input[type="datetime-local"].input-group-addon, .input-group-sm > .input-group-btn > input[type="datetime-local"].btn, .input-group-sm input[type="datetime-local"], input[type="month"].input-sm, .input-group-sm > input[type="month"].form-control, .select2-container .input-group-sm > input[type="month"].select2-choice, .input-group-sm > input[type="month"].input-group-addon, .input-group-sm > .input-group-btn > input[type="month"].btn, .input-group-sm input[type="month"] {
      line-height: 33px; }
    input[type="date"].input-lg, .input-group-lg > input[type="date"].form-control, .select2-container .input-group-lg > input[type="date"].select2-choice, .input-group-lg > input[type="date"].input-group-addon, .input-group-lg > .input-group-btn > input[type="date"].btn, .input-group-lg input[type="date"], input[type="time"].input-lg, .input-group-lg > input[type="time"].form-control, .select2-container .input-group-lg > input[type="time"].select2-choice, .input-group-lg > input[type="time"].input-group-addon, .input-group-lg > .input-group-btn > input[type="time"].btn, .input-group-lg input[type="time"], input[type="datetime-local"].input-lg, .input-group-lg > input[type="datetime-local"].form-control, .select2-container .input-group-lg > input[type="datetime-local"].select2-choice, .input-group-lg > input[type="datetime-local"].input-group-addon, .input-group-lg > .input-group-btn > input[type="datetime-local"].btn, .input-group-lg input[type="datetime-local"], input[type="month"].input-lg, .input-group-lg > input[type="month"].form-control, .select2-container .input-group-lg > input[type="month"].select2-choice, .input-group-lg > input[type="month"].input-group-addon, .input-group-lg > .input-group-btn > input[type="month"].btn, .input-group-lg input[type="month"] {
      line-height: 49px; } }

textarea, input[type="text"], input[type="password"], input[type="number"], input[type="email"], input[type="url"], input[type="search"], input[type="tel"], input[type="color"] {
  -webkit-appearance: none; }

.form-group {
  margin-bottom: 15px; }
  .form-group .more-help {
    margin-top: 3px;
    position: relative;
    z-index: 5; }
  .form-group .control-label {
    padding-right: 0; }

.radio, .checkbox {
  position: relative;
  display: block;
  margin-top: 10px;
  margin-bottom: 10px; }
  .radio label, .checkbox label {
    min-height: 22px;
    padding-left: 20px;
    margin-bottom: 0;
    font-weight: normal;
    cursor: pointer; }
    .radio label:before, .checkbox label:before {
      content: '';
      position: absolute;
      width: 15px;
      height: 15px;
      border: 1px solid #ccc;
      background: #fff;
      box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.3); }
    .radio label:after, .checkbox label:after {
      position: absolute;
      color: #333;
      -webkit-transition: all .2s;
      transition: all .2s;
      opacity: 0;
      filter: alpha(opacity=0); }
  .radio input:checked + label:after, .checkbox input:checked + label:after {
    opacity: 1;
    filter: alpha(opacity=100); }

.checkbox label:before {
  content: '';
  position: absolute;
  left: 0;
  top: 9px; }
.checkbox label:after {
  font-family: "icons";
  top: 8px;
  left: 1px;
  font-size: 12px; }

.radio label:before {
  content: '';
  position: absolute;
  left: 0;
  top: 9px;
  border-radius: 50%; }
.radio label:after {
  content: "\2022";
  top: 17px;
  left: 4px;
  font-size: 25px;
  line-height: 0; }

.radio input[type="radio"], .radio-inline input[type="radio"], .checkbox input[type="checkbox"], .checkbox-inline input[type="checkbox"] {
  position: absolute;
  margin-top: 4px \9;
  opacity: 0; }

.radio + .radio, .checkbox + .checkbox {
  margin-top: -5px; }

.radio-inline, .checkbox-inline {
  display: inline-block;
  padding-left: 20px;
  margin-bottom: 0;
  vertical-align: middle;
  font-weight: normal;
  cursor: pointer; }

.radio-inline + .radio-inline, .checkbox-inline + .checkbox-inline {
  margin-top: 0;
  margin-left: 10px; }

input[type="radio"][disabled], input[type="radio"].disabled, fieldset[disabled] input[type="radio"], input[type="checkbox"][disabled], input[type="checkbox"].disabled, fieldset[disabled] input[type="checkbox"] {
  cursor: false; }

.radio-inline.disabled, fieldset[disabled] .radio-inline, .checkbox-inline.disabled, fieldset[disabled] .checkbox-inline {
  cursor: false; }

.radio.disabled label, fieldset[disabled] .radio label, .checkbox.disabled label, fieldset[disabled] .checkbox label {
  cursor: false; }

.radiocheck-custom .radio-inline, .radiocheck-custom .checkbox-inline {
  position: relative;
  padding: 0 !important;
  margin-top: 5px !important;
  margin-bottom: 5px !important; }
  .radiocheck-custom .radio-inline input[type="radio"], .radiocheck-custom .radio-inline input[type="checkbox"], .radiocheck-custom .checkbox-inline input[type="radio"], .radiocheck-custom .checkbox-inline input[type="checkbox"] {
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
    opacity: 0;
    filter: alpha(opacity=0); }
    .radiocheck-custom .radio-inline input[type="radio"] + label, .radiocheck-custom .radio-inline input[type="checkbox"] + label, .radiocheck-custom .checkbox-inline input[type="radio"] + label, .radiocheck-custom .checkbox-inline input[type="checkbox"] + label {
      padding: 4px 20px 6px 20px;
      background: #eceef0;
      border: 1px solid transparent;
      margin-bottom: 0;
      cursor: pointer;
      box-shadow: inset 0 -2px 0 0 rgba(0, 0, 0, 0.25); }
      .radiocheck-custom .radio-inline input[type="radio"] + label:hover, .radiocheck-custom .radio-inline input[type="checkbox"] + label:hover, .radiocheck-custom .checkbox-inline input[type="radio"] + label:hover, .radiocheck-custom .checkbox-inline input[type="checkbox"] + label:hover {
        background: #dee1e5; }
    .radiocheck-custom .radio-inline input[type="radio"]:checked + label, .radiocheck-custom .radio-inline input[type="checkbox"]:checked + label, .radiocheck-custom .checkbox-inline input[type="radio"]:checked + label, .radiocheck-custom .checkbox-inline input[type="checkbox"]:checked + label {
      color: #fff;
      background: #004893;
      box-shadow: inset 0 2px 0 0 rgba(0, 0, 0, 0.25); }
    .radiocheck-custom .radio-inline input[type="radio"]:focus + label, .radiocheck-custom .radio-inline input[type="checkbox"]:focus + label, .radiocheck-custom .checkbox-inline input[type="radio"]:focus + label, .radiocheck-custom .checkbox-inline input[type="checkbox"]:focus + label {
      border-color: #004893;
      outline: 0;
      box-shadow: inset 0 2px 0 0 rgba(0, 0, 0, 0.25), 0 0 8px rgba(0, 72, 147, 0.6); }
    .radiocheck-custom .radio-inline input[type="radio"][disabled] + label, .radiocheck-custom .radio-inline input[type="checkbox"][disabled] + label, .radiocheck-custom .checkbox-inline input[type="radio"][disabled] + label, .radiocheck-custom .checkbox-inline input[type="checkbox"][disabled] + label {
      opacity: 0.5;
      filter: alpha(opacity=50);
      cursor: default; }
.radiocheck-custom .radio-inline + .radio-inline, .radiocheck-custom .checkbox-inline + .checkbox-inline {
  margin-left: 0; }
.radiocheck-custom .control-label {
  padding-top: 8px !important; }
.radiocheck-custom .checkbox-inline input[type="checkbox"] + label {
  padding-left: 30px;
  position: relative; }
  .radiocheck-custom .checkbox-inline input[type="checkbox"] + label:before {
    content: '';
    position: absolute;
    left: 8px;
    top: 8px;
    width: 15px;
    height: 15px;
    border: 1px solid #ccc;
    background: #fff;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.3); }
  .radiocheck-custom .checkbox-inline input[type="checkbox"] + label:after {
    font-family: "icons";
    position: absolute;
    top: 7px;
    left: 9px;
    font-size: 12px;
    color: #333;
    -webkit-transition: all .2s;
    transition: all .2s;
    opacity: 0;
    filter: alpha(opacity=0); }
.radiocheck-custom .checkbox-inline input[type="checkbox"]:checked + label:after {
  opacity: 1;
  filter: alpha(opacity=100); }
.radiocheck-custom .form-control-feedback {
  float: none;
  display: inline-block;
  right: 0; }

.form-control-static {
  font-family: "HelveticaBoldCn";
  padding-top: 1px;
  padding-bottom: 5px;
  margin-bottom: 0; }
  .form-control-static.input-lg, .input-group-lg > .form-control-static.form-control, .select2-container .input-group-lg > .form-control-static.select2-choice, .input-group-lg > .form-control-static.input-group-addon, .input-group-lg > .input-group-btn > .form-control-static.btn, .form-control-static.input-sm, .input-group-sm > .form-control-static.form-control, .select2-container .input-group-sm > .form-control-static.select2-choice, .input-group-sm > .form-control-static.input-group-addon, .input-group-sm > .input-group-btn > .form-control-static.btn {
    padding-left: 0;
    padding-right: 0; }

@media (min-width: 1024px) {
  .form-control-static {
    padding-top: 5px; } }

.input-sm, .input-group-sm > .form-control, .select2-container .input-group-sm > .select2-choice, .input-group-sm > .input-group-addon, .input-group-sm > .input-group-btn > .btn {
  height: 33px;
  padding: 5px 10px;
  font-size: 14px;
  line-height: 1.5;
  border-radius: 3px; }

select.input-sm, .input-group-sm > select.form-control, .select2-container .input-group-sm > select.select2-choice, .input-group-sm > select.input-group-addon, .input-group-sm > .input-group-btn > select.btn {
  height: 33px;
  line-height: 33px; }

textarea.input-sm, .input-group-sm > textarea.form-control, .select2-container .input-group-sm > textarea.select2-choice, .input-group-sm > textarea.input-group-addon, .input-group-sm > .input-group-btn > textarea.btn, select[multiple].input-sm, .input-group-sm > select[multiple].form-control, .select2-container .input-group-sm > select[multiple].select2-choice, .input-group-sm > select[multiple].input-group-addon, .input-group-sm > .input-group-btn > select[multiple].btn {
  height: auto; }

.form-group-sm .form-control, .form-group-sm .select2-container .select2-choice, .select2-container .form-group-sm .select2-choice {
  height: 33px;
  padding: 5px 10px;
  font-size: 14px;
  line-height: 1.5;
  border-radius: 3px; }
.form-group-sm select.form-control, .form-group-sm .select2-container select.select2-choice, .select2-container .form-group-sm select.select2-choice {
  height: 33px;
  line-height: 33px; }
.form-group-sm textarea.form-control, .form-group-sm .select2-container textarea.select2-choice, .select2-container .form-group-sm textarea.select2-choice, .form-group-sm select[multiple].form-control, .form-group-sm .select2-container select[multiple].select2-choice, .select2-container .form-group-sm select[multiple].select2-choice {
  height: auto; }
.form-group-sm .form-control-static {
  height: 33px;
  padding: 5px 10px;
  font-size: 14px;
  line-height: 1.5; }

.input-lg, .input-group-lg > .form-control, .select2-container .input-group-lg > .select2-choice, .input-group-lg > .input-group-addon, .input-group-lg > .input-group-btn > .btn {
  height: 49px;
  padding: 10px 16px;
  font-size: 20px;
  line-height: 1.3333333;
  border-radius: 6px; }

select.input-lg, .input-group-lg > select.form-control, .select2-container .input-group-lg > select.select2-choice, .input-group-lg > select.input-group-addon, .input-group-lg > .input-group-btn > select.btn {
  height: 49px;
  line-height: 49px; }

textarea.input-lg, .input-group-lg > textarea.form-control, .select2-container .input-group-lg > textarea.select2-choice, .input-group-lg > textarea.input-group-addon, .input-group-lg > .input-group-btn > textarea.btn, select[multiple].input-lg, .input-group-lg > select[multiple].form-control, .select2-container .input-group-lg > select[multiple].select2-choice, .input-group-lg > select[multiple].input-group-addon, .input-group-lg > .input-group-btn > select[multiple].btn {
  height: auto; }

.form-group-lg .form-control, .form-group-lg .select2-container .select2-choice, .select2-container .form-group-lg .select2-choice {
  height: 49px;
  padding: 10px 16px;
  font-size: 20px;
  line-height: 1.3333333;
  border-radius: 6px; }
.form-group-lg select.form-control, .form-group-lg .select2-container select.select2-choice, .select2-container .form-group-lg select.select2-choice {
  height: 49px;
  line-height: 49px; }
.form-group-lg textarea.form-control, .form-group-lg .select2-container textarea.select2-choice, .select2-container .form-group-lg textarea.select2-choice, .form-group-lg select[multiple].form-control, .form-group-lg .select2-container select[multiple].select2-choice, .select2-container .form-group-lg select[multiple].select2-choice {
  height: auto; }
.form-group-lg .form-control-static {
  height: 49px;
  padding: 10px 16px;
  font-size: 20px;
  line-height: 1.3333333; }

.has-feedback {
  position: relative; }

.form-control-feedback {
  right: 10px;
  display: inline-block;
  width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  pointer-events: none;
  vertical-align: top; }

.input-lg + .form-control-feedback, .input-group-lg > .form-control + .form-control-feedback, .select2-container .input-group-lg > .select2-choice + .form-control-feedback, .input-group-lg > .input-group-addon + .form-control-feedback, .input-group-lg > .input-group-btn > .btn + .form-control-feedback {
  width: 49px;
  height: 49px;
  line-height: 49px; }

.input-sm + .form-control-feedback, .input-group-sm > .form-control + .form-control-feedback, .select2-container .input-group-sm > .select2-choice + .form-control-feedback, .input-group-sm > .input-group-addon + .form-control-feedback, .input-group-sm > .input-group-btn > .btn + .form-control-feedback {
  width: 33px;
  height: 33px;
  line-height: 33px; }

.has-success .form-control-feedback {
  color: #3c763d; }

.has-warning .help-block, .has-warning .radio-inline, .has-warning .checkbox-inline, .has-warning.radio label, .has-warning.checkbox label, .has-warning.radio-inline label, .has-warning.checkbox-inline label {
  color: #8a6d3b; }
.has-warning .form-control, .has-warning .select2-container .select2-choice, .select2-container .has-warning .select2-choice {
  border-color: #8a6d3b;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075); }
  .has-warning .form-control:focus, .has-warning .select2-container .select2-choice:focus, .select2-container .has-warning .select2-choice:focus {
    border-color: #66512c;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #c0a16b; }
.has-warning .input-group-addon {
  color: #8a6d3b;
  border-color: #8a6d3b;
  background-color: #fcf8e3; }
.has-warning .form-control-feedback {
  color: #8a6d3b; }
.has-warning .radio input[type="radio"], .has-warning .checkbox input[type="checkbox"] {
  outline: #a94442 solid 1px;
  outline-offset: 2px; }
.has-warning .placeholder {
  display: none; }
.has-warning .form-control-feedback {
  width: auto;
  height: auto;
  line-height: 20px;
  margin-right: 5px;
  right: 0; }

.has-error .help-block, .has-error .radio-inline, .has-error .checkbox-inline, .has-error.radio label, .has-error.checkbox label, .has-error.radio-inline label, .has-error.checkbox-inline label {
  color: #a94442; }
.has-error .form-control, .has-error .select2-container .select2-choice, .select2-container .has-error .select2-choice {
  border-color: #a94442;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075); }
  .has-error .form-control:focus, .has-error .select2-container .select2-choice:focus, .select2-container .has-error .select2-choice:focus {
    border-color: #843534;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ce8483; }
.has-error .input-group-addon {
  color: #a94442;
  border-color: #a94442;
  background-color: #f2dede; }
.has-error .form-control-feedback {
  color: #a94442; }
.has-error .radio input[type="radio"], .has-error .checkbox input[type="checkbox"] {
  outline: #a94442 solid 1px;
  outline-offset: 2px; }
.has-error .form-control, .has-error .select2-container .select2-choice, .select2-container .has-error .select2-choice {
  color: #a94442;
  background: #f2dede; }
.has-error .placeholder {
  display: none; }
.has-error .form-control-feedback {
  width: auto;
  height: auto;
  line-height: 20px;
  margin-right: 5px;
  right: 0; }
.has-error .radio label:before, .has-error .checkbox label:before {
  background: #f2dede;
  border-color: #a94442; }

.help-block, .placeholder {
  display: block;
  margin-top: 2px;
  margin-bottom: 2px;
  font-size: 14px;
  color: #8c8c8c; }

@media (min-width: 1024px) {
  .form-inline .form-group {
    display: inline-block;
    margin-bottom: 0;
    vertical-align: middle; }
  .form-inline .form-control, .form-inline .select2-container .select2-choice, .select2-container .form-inline .select2-choice {
    display: inline-block;
    width: auto;
    vertical-align: middle; }
  .form-inline .form-control-static {
    display: inline-block; }
  .form-inline .input-group {
    display: inline-table;
    vertical-align: middle; }
    .form-inline .input-group .input-group-addon, .form-inline .input-group .input-group-btn, .form-inline .input-group .form-control, .form-inline .input-group .select2-container .select2-choice, .select2-container .form-inline .input-group .select2-choice {
      width: auto; }
  .form-inline .input-group > .form-control, .form-inline .select2-container .input-group > .select2-choice, .select2-container .form-inline .input-group > .select2-choice {
    width: 100%; }
  .form-inline .control-label {
    margin-bottom: 0;
    vertical-align: middle; }
  .form-inline .radio, .form-inline .checkbox {
    display: inline-block;
    margin-top: 0;
    margin-bottom: 0;
    vertical-align: middle; }
    .form-inline .radio label, .form-inline .checkbox label {
      padding-left: 0; }
  .form-inline .radio input[type="radio"], .form-inline .checkbox input[type="checkbox"] {
    position: relative;
    margin-left: 0; } }

.form-horizontal .radio, .form-horizontal .checkbox, .form-horizontal .radio-inline, .form-horizontal .checkbox-inline {
  margin-top: 0;
  margin-bottom: 0;
  padding-top: 5px; }
.form-horizontal .radio, .form-horizontal .checkbox {
  min-height: 27px; }
.form-horizontal .form-group {
  margin-left: -20px;
  margin-right: -20px; }
  .form-horizontal .form-group:before, .form-horizontal .form-group:after {
    content: " ";
    display: table; }
  .form-horizontal .form-group:after {
    clear: both; }
@media (min-width: 1024px) {
  .form-horizontal .control-label {
    margin-bottom: 0;
    padding-top: 4px; } }
@media (min-width: 1024px) {
  .form-horizontal .form-group-lg .control-label {
    padding-top: 14.333333px; } }
@media (min-width: 1024px) {
  .form-horizontal .form-group-sm .control-label {
    padding-top: 6px; } }

.col-auto {
  width: auto !important; }

.col-100 {
  width: 100px !important; }

.col-130 {
  width: 130px !important; }

.col-160 {
  width: 160px !important; }

.col-200 {
  width: 200px !important; }

.col-250 {
  width: 250px !important; }

.col-350 {
  width: 350px !important; }

.col-full-width {
  width: 100% !important; }

.btn {
  display: inline-block;
  margin-bottom: 0;
  font-weight: normal;
  font-size: 16px;
  font-family: "HelveticaBoldCn";
  text-align: center;
  vertical-align: middle;
  -ms-touch-action: manipulation;
      touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: none;
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.3);
  white-space: nowrap;
  margin-bottom: 5px;
  box-shadow: inset 0 -3px 0 0 rgba(0, 0, 0, 0.25);
  padding: 4px 16px;
  font-size: 16px;
  line-height: 1.428571429;
  border-radius: 3px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none; }
  .btn:focus, .btn.focus, .btn:active:focus, .btn:active.focus, .btn.active:focus, .btn.active.focus {
    outline: thin dotted;
    outline: 5px auto -webkit-focus-ring-color;
    outline-offset: -2px; }
  .btn:hover, .btn:focus, .btn.focus {
    color: #fff;
    text-decoration: none;
    box-shadow: inset 0 0 0 0 transparent; }
  .btn:active, .btn.active {
    outline: 0;
    background-image: none;
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125); }
  .btn.disabled, .btn[disabled], fieldset[disabled] .btn {
    cursor: false;
    pointer-events: none;
    box-shadow: none;
    background-image: none !important;
    background: #ccc !important;
    text-shadow: none;
    -webkit-filter: none !important;
            filter: none !important; }
  .btn .glyphicon:before, .btn .select2-container .select2-choice abbr:before, .select2-container .select2-choice .btn abbr:before, .btn .select2-search-choice-close:before, .btn .breadcrumb > li + li:before, .btn .cards-select .item-selected .item-checkbox:before, .cards-select .item-selected .btn .item-checkbox:before, .btn .cards-select .item-disabled .item-checkbox:before, .cards-select .item-disabled .btn .item-checkbox:before, .btn .cards-select .item-disabled .item-radio:before, .cards-select .item-disabled .btn .item-radio:before {
    position: relative;
    top: -1px; }

.btn-default {
  color: #fff;
  background-color: #42145f;
  border-color: #ccc;
  background-image: -webkit-linear-gradient(top, #542b6f 0%, #3b1255 100%);
  background-image: linear-gradient(to bottom, #542b6f 0%, #3b1255 100%);
  background-repeat: repeat-x;
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#FF542B6F', endColorstr='#FF3B1255', GradientType=0); }
  .btn-default:hover, .btn-default:focus, .btn-default.focus, .btn-default:active, .btn-default.active, .open > .btn-default.dropdown-toggle {
    color: #fff;
    background-color: #250b35;
    border-color: #adadad; }
  .btn-default:active, .btn-default.active, .open > .btn-default.dropdown-toggle {
    background-image: none; }
  .btn-default.disabled, .btn-default.disabled:hover, .btn-default.disabled:focus, .btn-default.disabled.focus, .btn-default.disabled:active, .btn-default.disabled.active, .btn-default[disabled], .btn-default[disabled]:hover, .btn-default[disabled]:focus, .btn-default[disabled].focus, .btn-default[disabled]:active, .btn-default[disabled].active, fieldset[disabled] .btn-default, fieldset[disabled] .btn-default:hover, fieldset[disabled] .btn-default:focus, fieldset[disabled] .btn-default.focus, fieldset[disabled] .btn-default:active, fieldset[disabled] .btn-default.active {
    background-color: #42145f;
    border-color: #ccc; }
  .btn-default .badge {
    color: #42145f;
    background-color: #fff; }
  .btn-default:hover, .btn-default:focus, .btn-default.focus {
    background-image: -webkit-linear-gradient(top, #3b1255 0%, #3b1255 100%);
    background-image: linear-gradient(to bottom, #3b1255 0%, #3b1255 100%);
    background-repeat: repeat-x;
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#FF3B1255', endColorstr='#FF3B1255', GradientType=0); }

.btn-primary {
  color: #fff;
  background-color: #004893;
  border-color: #003c79;
  background-image: -webkit-linear-gradient(top, #195a9d 0%, #004084 100%);
  background-image: linear-gradient(to bottom, #195a9d 0%, #004084 100%);
  background-repeat: repeat-x;
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#FF195A9D', endColorstr='#FF004084', GradientType=0); }
  .btn-primary:hover, .btn-primary:focus, .btn-primary.focus, .btn-primary:active, .btn-primary.active, .open > .btn-primary.dropdown-toggle {
    color: #fff;
    background-color: #002f60;
    border-color: #001e3c; }
  .btn-primary:active, .btn-primary.active, .open > .btn-primary.dropdown-toggle {
    background-image: none; }
  .btn-primary.disabled, .btn-primary.disabled:hover, .btn-primary.disabled:focus, .btn-primary.disabled.focus, .btn-primary.disabled:active, .btn-primary.disabled.active, .btn-primary[disabled], .btn-primary[disabled]:hover, .btn-primary[disabled]:focus, .btn-primary[disabled].focus, .btn-primary[disabled]:active, .btn-primary[disabled].active, fieldset[disabled] .btn-primary, fieldset[disabled] .btn-primary:hover, fieldset[disabled] .btn-primary:focus, fieldset[disabled] .btn-primary.focus, fieldset[disabled] .btn-primary:active, fieldset[disabled] .btn-primary.active {
    background-color: #004893;
    border-color: #003c79; }
  .btn-primary .badge {
    color: #004893;
    background-color: #fff; }
  .btn-primary:hover, .btn-primary:focus, .btn-primary.focus {
    background-image: -webkit-linear-gradient(top, #004084 0%, #004084 100%);
    background-image: linear-gradient(to bottom, #004084 0%, #004084 100%);
    background-repeat: repeat-x;
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#FF004084', endColorstr='#FF004084', GradientType=0); }

.btn-success {
  color: #fff;
  background-color: #468847;
  border-color: #3d773e; }
  .btn-success:hover, .btn-success:focus, .btn-success.focus, .btn-success:active, .btn-success.active, .open > .btn-success.dropdown-toggle {
    color: #fff;
    background-color: #356635;
    border-color: #294f29; }
  .btn-success:active, .btn-success.active, .open > .btn-success.dropdown-toggle {
    background-image: none; }
  .btn-success.disabled, .btn-success.disabled:hover, .btn-success.disabled:focus, .btn-success.disabled.focus, .btn-success.disabled:active, .btn-success.disabled.active, .btn-success[disabled], .btn-success[disabled]:hover, .btn-success[disabled]:focus, .btn-success[disabled].focus, .btn-success[disabled]:active, .btn-success[disabled].active, fieldset[disabled] .btn-success, fieldset[disabled] .btn-success:hover, fieldset[disabled] .btn-success:focus, fieldset[disabled] .btn-success.focus, fieldset[disabled] .btn-success:active, fieldset[disabled] .btn-success.active {
    background-color: #468847;
    border-color: #3d773e; }
  .btn-success .badge {
    color: #468847;
    background-color: #fff; }

.btn-info {
  color: #fff;
  background-color: #3a87ad;
  border-color: #34789a; }
  .btn-info:hover, .btn-info:focus, .btn-info.focus, .btn-info:active, .btn-info.active, .open > .btn-info.dropdown-toggle {
    color: #fff;
    background-color: #2d6987;
    border-color: #24546c; }
  .btn-info:active, .btn-info.active, .open > .btn-info.dropdown-toggle {
    background-image: none; }
  .btn-info.disabled, .btn-info.disabled:hover, .btn-info.disabled:focus, .btn-info.disabled.focus, .btn-info.disabled:active, .btn-info.disabled.active, .btn-info[disabled], .btn-info[disabled]:hover, .btn-info[disabled]:focus, .btn-info[disabled].focus, .btn-info[disabled]:active, .btn-info[disabled].active, fieldset[disabled] .btn-info, fieldset[disabled] .btn-info:hover, fieldset[disabled] .btn-info:focus, fieldset[disabled] .btn-info.focus, fieldset[disabled] .btn-info:active, fieldset[disabled] .btn-info.active {
    background-color: #3a87ad;
    border-color: #34789a; }
  .btn-info .badge {
    color: #3a87ad;
    background-color: #fff; }

.btn-warning {
  color: #fff;
  background-color: #e18a00;
  border-color: #c87a00; }
  .btn-warning:hover, .btn-warning:focus, .btn-warning.focus, .btn-warning:active, .btn-warning.active, .open > .btn-warning.dropdown-toggle {
    color: #fff;
    background-color: #ae6b00;
    border-color: #8a5500; }
  .btn-warning:active, .btn-warning.active, .open > .btn-warning.dropdown-toggle {
    background-image: none; }
  .btn-warning.disabled, .btn-warning.disabled:hover, .btn-warning.disabled:focus, .btn-warning.disabled.focus, .btn-warning.disabled:active, .btn-warning.disabled.active, .btn-warning[disabled], .btn-warning[disabled]:hover, .btn-warning[disabled]:focus, .btn-warning[disabled].focus, .btn-warning[disabled]:active, .btn-warning[disabled].active, fieldset[disabled] .btn-warning, fieldset[disabled] .btn-warning:hover, fieldset[disabled] .btn-warning:focus, fieldset[disabled] .btn-warning.focus, fieldset[disabled] .btn-warning:active, fieldset[disabled] .btn-warning.active {
    background-color: #e18a00;
    border-color: #c87a00; }
  .btn-warning .badge {
    color: #e18a00;
    background-color: #fff; }

.btn-danger {
  color: #fff;
  background-color: #d90000;
  border-color: #c00000; }
  .btn-danger:hover, .btn-danger:focus, .btn-danger.focus, .btn-danger:active, .btn-danger.active, .open > .btn-danger.dropdown-toggle {
    color: #fff;
    background-color: #a60000;
    border-color: #820000; }
  .btn-danger:active, .btn-danger.active, .open > .btn-danger.dropdown-toggle {
    background-image: none; }
  .btn-danger.disabled, .btn-danger.disabled:hover, .btn-danger.disabled:focus, .btn-danger.disabled.focus, .btn-danger.disabled:active, .btn-danger.disabled.active, .btn-danger[disabled], .btn-danger[disabled]:hover, .btn-danger[disabled]:focus, .btn-danger[disabled].focus, .btn-danger[disabled]:active, .btn-danger[disabled].active, fieldset[disabled] .btn-danger, fieldset[disabled] .btn-danger:hover, fieldset[disabled] .btn-danger:focus, fieldset[disabled] .btn-danger.focus, fieldset[disabled] .btn-danger:active, fieldset[disabled] .btn-danger.active {
    background-color: #d90000;
    border-color: #c00000; }
  .btn-danger .badge {
    color: #d90000;
    background-color: #fff; }

.btn-link {
  color: #004893;
  font-weight: normal;
  border-radius: 0;
  text-decoration: underline;
  text-shadow: none;
  font-family: Arial Narrow, Arial, sans-serif; }
  .btn-link, .btn-link:active, .btn-link.active, .btn-link[disabled], fieldset[disabled] .btn-link {
    background-color: transparent;
    box-shadow: none; }
  .btn-link, .btn-link:hover, .btn-link:focus, .btn-link:active {
    border-color: transparent; }
  .btn-link:hover, .btn-link:focus {
    color: #004893;
    text-decoration: none;
    background-color: transparent;
    box-shadow: none; }
  .btn-link[disabled]:hover, .btn-link[disabled]:focus, fieldset[disabled] .btn-link:hover, fieldset[disabled] .btn-link:focus {
    color: #777777;
    text-decoration: none; }

.btn-lg, .btn-group-lg > .btn {
  padding: 10px 16px;
  font-size: 16px;
  line-height: 1.3333333;
  border-radius: 3px; }

.btn-sm, .btn-group-sm > .btn {
  padding: 5px 10px;
  font-size: 14px;
  line-height: 1.5;
  border-radius: 3px; }

.btn-xs, .btn-group-xs > .btn {
  padding: 1px 5px;
  font-size: 14px;
  line-height: 1.5;
  border-radius: 3px; }

.btn-block {
  display: block;
  width: 100%; }

.btn-block + .btn-block {
  margin-top: 5px; }

input[type="submit"].btn-block, input[type="reset"].btn-block, input[type="button"].btn-block {
  width: 100%; }

.fade {
  opacity: 0;
  -webkit-transition: opacity .15s linear;
  transition: opacity .15s linear; }
  .fade.in {
    opacity: 1; }

.collapse {
  display: none; }
  .collapse.in {
    display: block; }

tr.collapse.in {
  display: table-row; }

tbody.collapse.in {
  display: table-row-group; }

.collapsing {
  position: relative;
  height: 0;
  overflow: hidden;
  -webkit-transition-property: height, visibility;
  transition-property: height, visibility;
  -webkit-transition-duration: .3s;
  transition-duration: .3s;
  -webkit-transition-timing-function: ease;
  transition-timing-function: ease; }

.caret {
  display: inline-block;
  width: 0;
  height: 0;
  margin-left: 2px;
  vertical-align: middle;
  border-top: 4px solid;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent; }

.dropup, .dropdown {
  position: relative; }

.dropdown-toggle:focus {
  outline: 0; }

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  display: none;
  float: left;
  min-width: 160px;
  padding: 5px 0;
  margin: 2px 0 0;
  list-style: none;
  font-size: 16px;
  text-align: left;
  background-color: #fff;
  border: 1px solid #ccc;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  background-clip: padding-box; }
  .dropdown-menu.pull-right {
    right: 0;
    left: auto; }
  .dropdown-menu .divider {
    height: 1px;
    margin: 10px 0;
    overflow: hidden;
    background-color: #e5e5e5; }
  .dropdown-menu > li > a {
    display: block;
    padding: 3px 20px;
    clear: both;
    font-weight: normal;
    line-height: 1.428571429;
    color: #333333;
    white-space: nowrap; }

.dropdown-menu > li > a:hover, .dropdown-menu > li > a:focus {
  text-decoration: none;
  color: #fff;
  background-color: #004893; }

.dropdown-menu > .active > a, .dropdown-menu > .active > a:hover, .dropdown-menu > .active > a:focus {
  color: #fff;
  text-decoration: none;
  outline: 0;
  background-color: #004893; }

.nav .dropdown-menu > li > a:hover, .nav .dropdown-menu > li > a:focus {
  text-decoration: none;
  color: #fff;
  background-color: #42145f; }
.nav .dropdown-menu > .active > a, .nav .dropdown-menu > .active > a:hover, .nav .dropdown-menu > .active > a:focus {
  color: #fff;
  text-decoration: none;
  outline: 0;
  background-color: #42145f; }

.dropdown-menu > .disabled > a, .dropdown-menu > .disabled > a:hover, .dropdown-menu > .disabled > a:focus {
  color: #777777; }
.dropdown-menu > .disabled > a:hover, .dropdown-menu > .disabled > a:focus {
  text-decoration: none;
  background-color: transparent;
  background-image: none;
  filter: progid:DXImageTransform.Microsoft.gradient(enabled = false);
  cursor: false; }

.open > .dropdown-menu {
  display: block; }
.open > a {
  outline: 0; }

.dropdown-menu-right {
  left: auto;
  right: 0; }

.dropdown-menu-left {
  left: 0;
  right: auto; }

.dropdown-header {
  display: block;
  padding: 3px 20px;
  font-size: 14px;
  line-height: 1.428571429;
  color: #777777;
  white-space: nowrap; }

.dropdown-backdrop {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 990; }

.pull-right > .dropdown-menu {
  right: 0;
  left: auto; }

.dropup .caret, .navbar-fixed-bottom .dropdown .caret {
  border-top: 0;
  border-bottom: 4px solid;
  content: ""; }
.dropup .dropdown-menu, .navbar-fixed-bottom .dropdown .dropdown-menu {
  top: auto;
  bottom: 100%;
  margin-bottom: 2px; }

@media (min-width: 1024px) {
  .navbar-right .dropdown-menu {
    right: 0;
    left: auto; }
  .navbar-right .dropdown-menu-left {
    left: 0;
    right: auto; } }

.btn-group, .btn-group-vertical {
  position: relative;
  display: inline-block;
  vertical-align: middle; }
  .btn-group > .btn, .btn-group-vertical > .btn {
    position: relative;
    float: left; }
    .btn-group > .btn:hover, .btn-group > .btn:focus, .btn-group > .btn:active, .btn-group > .btn.active, .btn-group-vertical > .btn:hover, .btn-group-vertical > .btn:focus, .btn-group-vertical > .btn:active, .btn-group-vertical > .btn.active {
      z-index: 2; }

.btn-group .btn + .btn, .btn-group .btn + .btn-group, .btn-group .btn-group + .btn, .btn-group .btn-group + .btn-group {
  margin-left: -1px; }

.btn-toolbar {
  margin-left: -5px; }
  .btn-toolbar:before, .btn-toolbar:after {
    content: " ";
    display: table; }
  .btn-toolbar:after {
    clear: both; }
  .btn-toolbar .btn-group, .btn-toolbar .input-group {
    float: left; }
  .btn-toolbar > .btn, .btn-toolbar > .btn-group, .btn-toolbar > .input-group {
    margin-left: 5px; }

.btn-group > .btn:not(:first-child):not(:last-child):not(.dropdown-toggle) {
  border-radius: 0; }

.btn-group > .btn:first-child {
  margin-left: 0; }
  .btn-group > .btn:first-child:not(:last-child):not(.dropdown-toggle) {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0; }

.btn-group > .btn:last-child:not(:first-child), .btn-group > .dropdown-toggle:not(:first-child) {
  border-bottom-left-radius: 0;
  border-top-left-radius: 0; }

.btn-group > .btn-group {
  float: left; }

.btn-group > .btn-group:not(:first-child):not(:last-child) > .btn {
  border-radius: 0; }

.btn-group > .btn-group:first-child:not(:last-child) > .btn:last-child, .btn-group > .btn-group:first-child:not(:last-child) > .dropdown-toggle {
  border-bottom-right-radius: 0;
  border-top-right-radius: 0; }

.btn-group > .btn-group:last-child:not(:first-child) > .btn:first-child {
  border-bottom-left-radius: 0;
  border-top-left-radius: 0; }

.btn-group .dropdown-toggle:active, .btn-group.open .dropdown-toggle {
  outline: 0; }

.btn-group > .btn + .dropdown-toggle {
  padding-left: 8px;
  padding-right: 8px; }

.btn-group > .btn-lg + .dropdown-toggle, .btn-group-lg.btn-group > .btn + .dropdown-toggle {
  padding-left: 12px;
  padding-right: 12px; }

.btn-group.open .dropdown-toggle {
  box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125); }
  .btn-group.open .dropdown-toggle.btn-link {
    box-shadow: none; }

.btn .caret {
  margin-left: 0; }

.btn-lg .caret, .btn-group-lg > .btn .caret {
  border-width: 5px 5px 0;
  border-bottom-width: 0; }

.dropup .btn-lg .caret, .dropup .btn-group-lg > .btn .caret {
  border-width: 0 5px 5px; }

.btn-group-vertical > .btn, .btn-group-vertical > .btn-group, .btn-group-vertical > .btn-group > .btn {
  display: block;
  float: none;
  width: 100%;
  max-width: 100%; }
.btn-group-vertical > .btn-group:before, .btn-group-vertical > .btn-group:after {
  content: " ";
  display: table; }
.btn-group-vertical > .btn-group:after {
  clear: both; }
.btn-group-vertical > .btn-group > .btn {
  float: none; }
.btn-group-vertical > .btn + .btn, .btn-group-vertical > .btn + .btn-group, .btn-group-vertical > .btn-group + .btn, .btn-group-vertical > .btn-group + .btn-group {
  margin-top: -1px;
  margin-left: 0; }

.btn-group-vertical > .btn:not(:first-child):not(:last-child) {
  border-radius: 0; }
.btn-group-vertical > .btn:first-child:not(:last-child) {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0; }
.btn-group-vertical > .btn:last-child:not(:first-child) {
  border-bottom-left-radius: 4px;
  border-top-right-radius: 0;
  border-top-left-radius: 0; }

.btn-group-vertical > .btn-group:not(:first-child):not(:last-child) > .btn {
  border-radius: 0; }

.btn-group-vertical > .btn-group:first-child:not(:last-child) > .btn:last-child, .btn-group-vertical > .btn-group:first-child:not(:last-child) > .dropdown-toggle {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0; }

.btn-group-vertical > .btn-group:last-child:not(:first-child) > .btn:first-child {
  border-top-right-radius: 0;
  border-top-left-radius: 0; }

.btn-group-justified {
  display: table;
  width: 100%;
  table-layout: fixed;
  border-collapse: separate; }
  .btn-group-justified > .btn, .btn-group-justified > .btn-group {
    float: none;
    display: table-cell;
    width: 1%; }
  .btn-group-justified > .btn-group .btn {
    width: 100%; }
  .btn-group-justified > .btn-group .dropdown-menu {
    left: auto; }

[data-toggle="buttons"] > .btn input[type="radio"], [data-toggle="buttons"] > .btn input[type="checkbox"], [data-toggle="buttons"] > .btn-group > .btn input[type="radio"], [data-toggle="buttons"] > .btn-group > .btn input[type="checkbox"] {
  position: absolute;
  clip: rect(0, 0, 0, 0);
  pointer-events: none; }

.input-group {
  position: relative;
  display: inline-block;
  border-collapse: separate; }
  .input-group[class*="col-"] {
    float: none;
    padding-left: 0;
    padding-right: 0; }
  .input-group .form-control, .input-group .select2-container .select2-choice, .select2-container .input-group .select2-choice {
    position: relative;
    z-index: 2;
    float: left;
    width: 100%;
    margin-bottom: 0; }

.input-group-addon, .input-group-btn, .input-group .form-control, .input-group .select2-container .select2-choice, .select2-container .input-group .select2-choice {
  display: table-cell; }
  .input-group-addon:not(:first-child):not(:last-child), .input-group-btn:not(:first-child):not(:last-child), .input-group .form-control:not(:first-child):not(:last-child), .input-group .select2-container .select2-choice:not(:first-child):not(:last-child), .select2-container .input-group .select2-choice:not(:first-child):not(:last-child) {
    border-radius: 0; }

.input-group-addon, .input-group-btn {
  width: 1%;
  white-space: nowrap;
  vertical-align: middle; }

.input-group-addon {
  padding: 4px 10px;
  font-size: 16px;
  font-weight: normal;
  line-height: 1;
  color: #555555;
  text-align: center;
  background-color: #eeeeee;
  border: 1px solid #ccc;
  border-radius: 4px; }
  .input-group-addon.input-sm, .input-group-sm > .input-group-addon, .input-group-sm > .input-group-btn > .input-group-addon.btn {
    padding: 5px 10px;
    font-size: 14px;
    border-radius: 3px; }
  .input-group-addon.input-lg, .input-group-lg > .input-group-addon, .input-group-lg > .input-group-btn > .input-group-addon.btn {
    padding: 10px 16px;
    font-size: 20px;
    border-radius: 6px; }
  .input-group-addon input[type="radio"], .input-group-addon input[type="checkbox"] {
    margin-top: 0; }

.input-group .form-control:first-child, .input-group .select2-container .select2-choice:first-child, .select2-container .input-group .select2-choice:first-child, .input-group-addon:first-child, .input-group-btn:first-child > .btn, .input-group-btn:first-child > .btn-group > .btn, .input-group-btn:first-child > .dropdown-toggle, .input-group-btn:last-child > .btn:not(:last-child):not(.dropdown-toggle), .input-group-btn:last-child > .btn-group:not(:last-child) > .btn {
  border-bottom-right-radius: 0;
  border-top-right-radius: 0; }

.input-group-addon:first-child {
  border-right: 0; }

.input-group .form-control:last-child, .input-group .select2-container .select2-choice:last-child, .select2-container .input-group .select2-choice:last-child, .input-group-addon:last-child, .input-group-btn:last-child > .btn, .input-group-btn:last-child > .btn-group > .btn, .input-group-btn:last-child > .dropdown-toggle, .input-group-btn:first-child > .btn:not(:first-child), .input-group-btn:first-child > .btn-group:not(:first-child) > .btn {
  border-bottom-left-radius: 0;
  border-top-left-radius: 0; }

.input-group-addon:last-child {
  border-left: 0; }

.input-group-btn {
  position: relative;
  font-size: 0;
  white-space: nowrap; }
  .input-group-btn > .btn {
    position: relative; }
    .input-group-btn > .btn + .btn {
      margin-left: -1px; }
    .input-group-btn > .btn:hover, .input-group-btn > .btn:focus, .input-group-btn > .btn:active {
      z-index: 2; }
  .input-group-btn:first-child > .btn, .input-group-btn:first-child > .btn-group {
    margin-right: -1px; }
  .input-group-btn:last-child > .btn, .input-group-btn:last-child > .btn-group {
    margin-left: -1px; }

.group-addon .form-control, .group-addon .select2-container .select2-choice, .select2-container .group-addon .select2-choice {
  padding-right: 40px; }
.group-addon .input-group-btn {
  display: inline-block;
  z-index: 5;
  margin-left: -40px; }
.group-addon .btn-link {
  padding: 0 5px;
  height: 32px;
  line-height: 32px;
  font-size: 25px;
  text-shadow: none;
  color: #999999;
  pointer-events: none; }

.nav {
  margin-bottom: 0;
  padding-left: 0;
  list-style: none; }
  .nav:before, .nav:after {
    content: " ";
    display: table; }
  .nav:after {
    clear: both; }
  .nav > li {
    position: relative;
    display: block;
    margin: 0;
    border-left: 1px solid #fff;
    border-right: 1px solid #fff; }
    .nav > li > a {
      position: relative;
      display: block;
      padding: 10px 15px; }
      .nav > li > a:hover, .nav > li > a:focus {
        text-decoration: none;
        color: #fff;
        background-color: #42145f; }
    .nav > li.disabled > a {
      color: #777777;
      cursor: default; }
      .nav > li.disabled > a:hover, .nav > li.disabled > a:focus {
        color: #777777;
        text-decoration: none;
        background-color: transparent;
        cursor: false; }
  .nav .open > a, .nav .open > a:hover, .nav .open > a:focus {
    border-color: #004893; }
  .nav .nav-divider {
    height: 1px;
    margin: 10px 0;
    overflow: hidden;
    background-color: #e5e5e5; }
  .nav > li > a > img {
    max-width: none; }

.nav-tabs {
  border-bottom: 2px solid #004893;
  margin-bottom: 10px; }
  .nav-tabs > li {
    display: inline-block;
    vertical-align: bottom;
    border-left: 0;
    border-right: 0;
    margin: 0 5px 0 0; }
    .nav-tabs > li > a {
      margin-right: 2px;
      line-height: 1.428571429;
      border: 1px solid #b2c8de;
      border-bottom: transparent;
      border-radius: 4px 4px 0 0;
      background: transparent;
      color: #004893;
      cursor: pointer;
      padding: 7px 15px; }
      .nav-tabs > li > a:hover {
        color: #004893;
        border-color: #004893;
        background: transparent; }
    .nav-tabs > li.active > a {
      padding: 10px 15px; }
      .nav-tabs > li.active > a, .nav-tabs > li.active > a:hover, .nav-tabs > li.active > a:focus {
        color: #fff;
        background-color: #004893;
        border: 1px solid #004893;
        border-bottom-color: transparent;
        cursor: default; }
    .nav-tabs > li.disabled a, .nav-tabs > li.disabled a:hover, .nav-tabs > li.disabled a:focus {
      background: #eceef0;
      border-color: transparent; }

.nav-pills > li {
  float: left; }
  .nav-pills > li > a {
    border-radius: 4px; }
  .nav-pills > li + li {
    margin-left: 2px; }
  .nav-pills > li.active > a, .nav-pills > li.active > a:hover, .nav-pills > li.active > a:focus {
    color: #fff;
    background-color: #004893; }

.nav-stacked > li {
  float: none; }
  .nav-stacked > li + li {
    margin-top: 2px;
    margin-left: 0; }

.nav-justified, .nav-tabs.nav-justified {
  width: 100%; }
  .nav-justified > li, .nav-tabs.nav-justified > li {
    float: none; }
    .nav-justified > li > a, .nav-tabs.nav-justified > li > a {
      text-align: center;
      margin-bottom: 5px; }
  .nav-justified > .dropdown .dropdown-menu {
    top: auto;
    left: auto; }
  @media (min-width: 1024px) {
    .nav-justified > li, .nav-tabs.nav-justified > li {
      display: table-cell;
      width: 1%; }
      .nav-justified > li > a, .nav-tabs.nav-justified > li > a {
        margin-bottom: 0; } }

.nav-tabs-justified, .nav-tabs.nav-justified {
  border-bottom: 0; }
  .nav-tabs-justified > li > a, .nav-tabs.nav-justified > li > a {
    margin-right: 0;
    border-radius: 4px; }
  .nav-tabs-justified > .active > a, .nav-tabs.nav-justified > .active > a, .nav-tabs-justified > .active > a:hover, .nav-tabs.nav-justified > .active > a:hover, .nav-tabs-justified > .active > a:focus, .nav-tabs.nav-justified > .active > a:focus {
    border: 1px solid #004893; }
  @media (min-width: 1024px) {
    .nav-tabs-justified > li > a, .nav-tabs.nav-justified > li > a {
      border-bottom: 1px solid #004893;
      border-radius: 4px 4px 0 0; }
    .nav-tabs-justified > .active > a, .nav-tabs.nav-justified > .active > a, .nav-tabs-justified > .active > a:hover, .nav-tabs.nav-justified > .active > a:hover, .nav-tabs-justified > .active > a:focus, .nav-tabs.nav-justified > .active > a:focus {
      border-bottom-color: #004893; } }

.tab-content > .tab-pane {
  display: none;
  visibility: hidden; }
.tab-content > .active {
  display: block;
  visibility: visible; }

.nav-tabs .dropdown-menu {
  margin-top: -1px;
  border-top-right-radius: 0;
  border-top-left-radius: 0; }

.navbar {
  position: relative;
  min-height: 42px; }
  .navbar:before, .navbar:after {
    content: " ";
    display: table; }
  .navbar:after {
    clear: both; }
  @media (min-width: 1024px) {
    .navbar {
      border-radius: 4px; } }

.navbar-header:before, .navbar-header:after {
  content: " ";
  display: table; }
.navbar-header:after {
  clear: both; }
@media (min-width: 1024px) {
  .navbar-header {
    float: left; } }

.navbar-collapse {
  overflow-x: visible;
  padding-right: 20px;
  padding-left: 20px;
  border-top: 1px solid transparent;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
  -webkit-overflow-scrolling: touch;
  max-height: 500px; }
  .navbar-collapse:before, .navbar-collapse:after {
    content: " ";
    display: table; }
  .navbar-collapse:after {
    clear: both; }
  .navbar-collapse.in {
    overflow-y: auto; }
  @media (min-width: 1024px) {
    .navbar-collapse {
      width: auto;
      border-top: 0;
      box-shadow: none;
      padding-left: 0;
      padding-right: 0; }
      .navbar-collapse.collapse {
        display: block !important;
        visibility: visible !important;
        height: auto !important;
        padding-bottom: 0;
        overflow: visible !important; }
      .navbar-collapse.in {
        overflow-y: visible; }
      .navbar-fixed-top .navbar-collapse, .navbar-static-top .navbar-collapse, .navbar-fixed-bottom .navbar-collapse {
        padding-left: 0;
        padding-right: 0; } }

.navbar-fixed-top .navbar-collapse, .navbar-fixed-bottom .navbar-collapse {
  max-height: 340px; }
  @media (max-device-width: 480px) and (orientation: landscape) {
    .navbar-fixed-top .navbar-collapse, .navbar-fixed-bottom .navbar-collapse {
      max-height: 200px; } }

.container > .navbar-header, .container > .navbar-collapse, .container-fluid > .navbar-header, .container-fluid > .navbar-collapse {
  margin-right: -20px;
  margin-left: -20px; }
  @media (min-width: 1024px) {
    .container > .navbar-header, .container > .navbar-collapse, .container-fluid > .navbar-header, .container-fluid > .navbar-collapse {
      margin-right: 0;
      margin-left: 0; } }

.navbar-static-top {
  z-index: 1000;
  border-width: 0 0 1px; }
  @media (min-width: 1024px) {
    .navbar-static-top {
      border-radius: 0; } }

.navbar-fixed-top, .navbar-fixed-bottom {
  position: fixed;
  right: 0;
  left: 0;
  z-index: 1030; }
  @media (min-width: 1024px) {
    .navbar-fixed-top, .navbar-fixed-bottom {
      border-radius: 0; } }

.navbar-fixed-top {
  top: 0;
  border-width: 0 0 1px; }

.navbar-fixed-bottom {
  bottom: 0;
  margin-bottom: 0;
  border-width: 1px 0 0; }

.navbar-brand {
  float: left;
  padding: 10px 20px;
  font-size: 20px;
  line-height: 22px;
  height: 42px; }
  .navbar-brand:hover, .navbar-brand:focus {
    text-decoration: none; }
  .navbar-brand > img {
    display: block; }
  @media (min-width: 1024px) {
    .navbar > .container .navbar-brand, .navbar > .container-fluid .navbar-brand {
      margin-left: -20px; } }

.navbar-toggle {
  position: relative;
  float: left;
  margin-left: 20px;
  padding: 10px;
  background-color: transparent;
  background-image: none;
  border: 0;
  font-weight: bold;
  border-width: 0px 2px 0px 2px;
  border-style: solid; }
  .navbar-toggle:focus {
    outline: 0; }
  .navbar-toggle .icon-bar {
    display: block;
    width: 22px;
    height: 2px;
    border-radius: 1px; }
  .navbar-toggle .icon-bar + .icon-bar {
    margin-top: 4px; }
  .navbar-toggle i {
    margin-right: 5px;
    font-size: 15px; }
  @media (min-width: 1024px) {
    .navbar-toggle {
      display: none; } }

.navbar-nav {
  margin: 5px -20px;
  border-left: 1px solid #fff;
  border-right: 1px solid #fff; }
  .navbar-nav > li > a {
    padding-top: 10px;
    padding-bottom: 10px;
    line-height: 22px;
    font-weight: bold; }
  @media (max-width: 1023px) {
    .navbar-nav .open .dropdown-menu {
      position: static;
      float: none;
      width: auto;
      margin-top: 0;
      background-color: transparent;
      border: 0;
      box-shadow: none; }
      .navbar-nav .open .dropdown-menu > li > a, .navbar-nav .open .dropdown-menu .dropdown-header {
        padding: 5px 15px 5px 25px; }
      .navbar-nav .open .dropdown-menu > li > a {
        line-height: 22px; }
        .navbar-nav .open .dropdown-menu > li > a:hover, .navbar-nav .open .dropdown-menu > li > a:focus {
          background-image: none; } }
  @media (min-width: 1024px) {
    .navbar-nav {
      float: left;
      margin: 0; }
      .navbar-nav > li {
        float: left; }
        .navbar-nav > li > a {
          padding-top: 10px;
          padding-bottom: 10px; } }

.navbar-form {
  margin-left: -20px;
  margin-right: -20px;
  padding: 10px 20px;
  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 0 rgba(255, 255, 255, 0.1);
  margin-top: 5px;
  margin-bottom: 5px; }
  @media (min-width: 1024px) {
    .navbar-form .form-group {
      display: inline-block;
      margin-bottom: 0;
      vertical-align: middle; }
    .navbar-form .form-control, .navbar-form .select2-container .select2-choice, .select2-container .navbar-form .select2-choice {
      display: inline-block;
      width: auto;
      vertical-align: middle; }
    .navbar-form .form-control-static {
      display: inline-block; }
    .navbar-form .input-group {
      display: inline-table;
      vertical-align: middle; }
      .navbar-form .input-group .input-group-addon, .navbar-form .input-group .input-group-btn, .navbar-form .input-group .form-control, .navbar-form .input-group .select2-container .select2-choice, .select2-container .navbar-form .input-group .select2-choice {
        width: auto; }
    .navbar-form .input-group > .form-control, .navbar-form .select2-container .input-group > .select2-choice, .select2-container .navbar-form .input-group > .select2-choice {
      width: 100%; }
    .navbar-form .control-label {
      margin-bottom: 0;
      vertical-align: middle; }
    .navbar-form .radio, .navbar-form .checkbox {
      display: inline-block;
      margin-top: 0;
      margin-bottom: 0;
      vertical-align: middle; }
      .navbar-form .radio label, .navbar-form .checkbox label {
        padding-left: 0; }
    .navbar-form .radio input[type="radio"], .navbar-form .checkbox input[type="checkbox"] {
      position: relative;
      margin-left: 0; } }
  @media (max-width: 1023px) {
    .navbar-form .form-group {
      margin-bottom: 5px; }
      .navbar-form .form-group:last-child {
        margin-bottom: 0; } }
  @media (min-width: 1024px) {
    .navbar-form {
      width: auto;
      border: 0;
      margin-left: 0;
      margin-right: 0;
      padding-top: 0;
      padding-bottom: 0;
      box-shadow: none; } }

.navbar-nav > li > .dropdown-menu {
  margin-top: 0;
  border-top-right-radius: 0;
  border-top-left-radius: 0; }

.navbar-fixed-bottom .navbar-nav > li > .dropdown-menu {
  margin-bottom: 0;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0; }

.navbar-btn {
  margin-top: 5px;
  margin-bottom: 5px; }
  .navbar-btn.btn-sm, .btn-group-sm > .navbar-btn.btn {
    margin-top: 4.5px;
    margin-bottom: 4.5px; }
  .navbar-btn.btn-xs, .btn-group-xs > .navbar-btn.btn {
    margin-top: 10px;
    margin-bottom: 10px; }

.navbar-text {
  margin-top: 10px;
  margin-bottom: 10px; }
  @media (min-width: 1024px) {
    .navbar-text {
      float: left;
      margin-left: 20px;
      margin-right: 20px; } }

@media (min-width: 1024px) {
  .navbar-left {
    float: left !important; }
  .navbar-right {
    float: right !important;
    margin-right: -20px; }
    .navbar-right ~ .navbar-right {
      margin-right: 0; } }

.navbar-default {
  background-color: #f8f8f8;
  border-color: #e7e7e7; }
  .navbar-default .navbar-brand {
    color: #333; }
    .navbar-default .navbar-brand:hover, .navbar-default .navbar-brand:focus {
      color: #1a1a1a;
      background-color: transparent; }
  .navbar-default .navbar-text {
    color: #777; }
  .navbar-default .navbar-nav > li > a {
    color: #333; }
    .navbar-default .navbar-nav > li > a:hover, .navbar-default .navbar-nav > li > a:focus {
      color: #fff;
      background-color: #42145f; }
  .navbar-default .navbar-nav > .active > a, .navbar-default .navbar-nav > .active > a:hover, .navbar-default .navbar-nav > .active > a:focus {
    color: #fff;
    background-color: #42145f; }
  .navbar-default .navbar-nav > .disabled > a, .navbar-default .navbar-nav > .disabled > a:hover, .navbar-default .navbar-nav > .disabled > a:focus {
    color: #ccc;
    background-color: transparent; }
  .navbar-default .navbar-toggle {
    border-color: #fff; }
    .navbar-default .navbar-toggle:hover, .navbar-default .navbar-toggle:focus {
      background-color: #ddd; }
    .navbar-default .navbar-toggle .icon-bar {
      background-color: #333; }
  .navbar-default .navbar-collapse, .navbar-default .navbar-form {
    border-color: #e7e7e7; }
  .navbar-default .navbar-nav > .open > a, .navbar-default .navbar-nav > .open > a:hover, .navbar-default .navbar-nav > .open > a:focus {
    background-color: #42145f;
    color: #fff; }
  @media (max-width: 1023px) {
    .navbar-default .navbar-nav .open .dropdown-menu > li > a {
      color: #333; }
      .navbar-default .navbar-nav .open .dropdown-menu > li > a:hover, .navbar-default .navbar-nav .open .dropdown-menu > li > a:focus {
        color: #fff;
        background-color: #42145f; }
    .navbar-default .navbar-nav .open .dropdown-menu > .active > a, .navbar-default .navbar-nav .open .dropdown-menu > .active > a:hover, .navbar-default .navbar-nav .open .dropdown-menu > .active > a:focus {
      color: #fff;
      background-color: #42145f; }
    .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a, .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a:hover, .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a:focus {
      color: #ccc;
      background-color: transparent; } }
  .navbar-default .navbar-link {
    color: #333; }
    .navbar-default .navbar-link:hover {
      color: #fff; }
  .navbar-default .btn-link {
    color: #333; }
    .navbar-default .btn-link:hover, .navbar-default .btn-link:focus {
      color: #fff; }
    .navbar-default .btn-link[disabled]:hover, .navbar-default .btn-link[disabled]:focus, fieldset[disabled] .navbar-default .btn-link:hover, fieldset[disabled] .navbar-default .btn-link:focus {
      color: #ccc; }

.navbar-inverse {
  background-color: #222;
  border-color: #090909; }
  .navbar-inverse .navbar-brand {
    color: #9d9d9d; }
    .navbar-inverse .navbar-brand:hover, .navbar-inverse .navbar-brand:focus {
      color: #fff;
      background-color: transparent; }
  .navbar-inverse .navbar-text {
    color: #9d9d9d; }
  .navbar-inverse .navbar-nav > li > a {
    color: #9d9d9d; }
    .navbar-inverse .navbar-nav > li > a:hover, .navbar-inverse .navbar-nav > li > a:focus {
      color: #fff;
      background-color: transparent; }
  .navbar-inverse .navbar-nav > .active > a, .navbar-inverse .navbar-nav > .active > a:hover, .navbar-inverse .navbar-nav > .active > a:focus {
    color: #fff;
    background-color: #090909; }
  .navbar-inverse .navbar-nav > .disabled > a, .navbar-inverse .navbar-nav > .disabled > a:hover, .navbar-inverse .navbar-nav > .disabled > a:focus {
    color: #444;
    background-color: transparent; }
  .navbar-inverse .navbar-toggle {
    border-color: #333; }
    .navbar-inverse .navbar-toggle:hover, .navbar-inverse .navbar-toggle:focus {
      background-color: #333; }
    .navbar-inverse .navbar-toggle .icon-bar {
      background-color: #fff; }
  .navbar-inverse .navbar-collapse, .navbar-inverse .navbar-form {
    border-color: #101010; }
  .navbar-inverse .navbar-nav > .open > a, .navbar-inverse .navbar-nav > .open > a:hover, .navbar-inverse .navbar-nav > .open > a:focus {
    background-color: #090909;
    color: #fff; }
  @media (max-width: 1023px) {
    .navbar-inverse .navbar-nav .open .dropdown-menu > .dropdown-header {
      border-color: #090909; }
    .navbar-inverse .navbar-nav .open .dropdown-menu .divider {
      background-color: #090909; }
    .navbar-inverse .navbar-nav .open .dropdown-menu > li > a {
      color: #9d9d9d; }
      .navbar-inverse .navbar-nav .open .dropdown-menu > li > a:hover, .navbar-inverse .navbar-nav .open .dropdown-menu > li > a:focus {
        color: #fff;
        background-color: transparent; }
    .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a, .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a:hover, .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a:focus {
      color: #fff;
      background-color: #090909; }
    .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a, .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a:hover, .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a:focus {
      color: #444;
      background-color: transparent; } }
  .navbar-inverse .navbar-link {
    color: #9d9d9d; }
    .navbar-inverse .navbar-link:hover {
      color: #fff; }
  .navbar-inverse .btn-link {
    color: #9d9d9d; }
    .navbar-inverse .btn-link:hover, .navbar-inverse .btn-link:focus {
      color: #fff; }
    .navbar-inverse .btn-link[disabled]:hover, .navbar-inverse .btn-link[disabled]:focus, fieldset[disabled] .navbar-inverse .btn-link:hover, fieldset[disabled] .navbar-inverse .btn-link:focus {
      color: #444; }

.breadcrumb {
  padding: 0px 0px;
  margin-bottom: 22px;
  list-style: none;
  background-color: transparent;
  border-radius: 4px; }
  .breadcrumb > li {
    display: inline-block; }
    .breadcrumb > li + li:before {
      padding: 0 5px;
      color: #ccc;
      font-size: 12px; }
  .breadcrumb > .active {
    color: #777777; }

.pagination {
  display: inline-block;
  padding-left: 0;
  margin: 0; }
  .pagination > li {
    display: inline; }
    .pagination > li > a, .pagination > li > span {
      position: relative;
      float: left;
      padding: 4px 10px;
      line-height: 1.428571429;
      text-decoration: none;
      color: #004893;
      margin-left: -1px; }
    .pagination > li:first-child > a, .pagination > li:first-child > span {
      margin-left: 0; }
  .pagination > li > a:hover, .pagination > li > a:focus {
    color: #fff;
    background-color: #004893;
    border-color: #004893;
    cursor: pointer; }
  .pagination > .active > a, .pagination > .active > a:hover, .pagination > .active > a:focus {
    z-index: 2;
    color: #fff;
    background-color: #004893;
    border-color: #004893;
    cursor: default; }
    .pagination > .active > a span, .pagination > .active > a:hover span, .pagination > .active > a:focus span {
      text-decoration: none; }
  .pagination > .disabled > span, .pagination > .disabled > span:hover, .pagination > .disabled > span:focus, .pagination > .disabled > a, .pagination > .disabled > a:hover, .pagination > .disabled > a:focus {
    color: #ccc;
    background-color: transparent;
    border-color: #ddd;
    cursor: default; }
    .pagination > .disabled > span span, .pagination > .disabled > span:hover span, .pagination > .disabled > span:focus span, .pagination > .disabled > a span, .pagination > .disabled > a:hover span, .pagination > .disabled > a:focus span {
      text-decoration: none; }

.pagination-lg > li > a, .pagination-lg > li > span {
  padding: 10px 16px;
  font-size: 20px; }
.pagination-lg > li:first-child > a, .pagination-lg > li:first-child > span {
  border-bottom-left-radius: 6px;
  border-top-left-radius: 6px; }
.pagination-lg > li:last-child > a, .pagination-lg > li:last-child > span {
  border-bottom-right-radius: 6px;
  border-top-right-radius: 6px; }

.pagination-sm > li > a, .pagination-sm > li > span {
  padding: 5px 10px;
  font-size: 14px; }
.pagination-sm > li:first-child > a, .pagination-sm > li:first-child > span {
  border-bottom-left-radius: 3px;
  border-top-left-radius: 3px; }
.pagination-sm > li:last-child > a, .pagination-sm > li:last-child > span {
  border-bottom-right-radius: 3px;
  border-top-right-radius: 3px; }

.pager {
  padding-left: 0;
  margin: 22px 0;
  list-style: none;
  text-align: center; }
  .pager:before, .pager:after {
    content: " ";
    display: table; }
  .pager:after {
    clear: both; }
  .pager li {
    display: inline; }
    .pager li > a, .pager li > span {
      display: inline-block;
      padding: 5px 14px;
      background-color: #fff;
      border: 1px solid #ddd;
      border-radius: 15px; }
    .pager li > a:hover, .pager li > a:focus {
      text-decoration: none;
      background-color: #004893; }
  .pager .next > a, .pager .next > span {
    float: right; }
  .pager .previous > a, .pager .previous > span {
    float: left; }
  .pager .disabled > a, .pager .disabled > a:hover, .pager .disabled > a:focus, .pager .disabled > span {
    color: #ccc;
    background-color: #fff;
    cursor: false; }

.label {
  display: inline;
  padding: .2em .5em;
  font-size: 85%;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: .25em;
  text-transform: uppercase; }
  .label:empty {
    display: none; }
  .btn .label {
    position: relative;
    top: -1px; }

a.label:hover, a.label:focus {
  color: #fff;
  text-decoration: none;
  cursor: pointer; }

.label-default {
  background-color: #777777; }
  .label-default[href]:hover, .label-default[href]:focus {
    background-color: #5e5e5e; }

.label-primary {
  background-color: #004893; }
  .label-primary[href]:hover, .label-primary[href]:focus {
    background-color: #002f60; }

.label-success {
  background-color: #468847; }
  .label-success[href]:hover, .label-success[href]:focus {
    background-color: #356635; }

.label-info {
  background-color: #3a87ad; }
  .label-info[href]:hover, .label-info[href]:focus {
    background-color: #2d6987; }

.label-warning {
  background-color: #e18a00; }
  .label-warning[href]:hover, .label-warning[href]:focus {
    background-color: #ae6b00; }

.label-danger {
  background-color: #d90000; }
  .label-danger[href]:hover, .label-danger[href]:focus {
    background-color: #a60000; }

.badge {
  display: inline-block;
  min-width: 10px;
  padding: 3px 7px;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  line-height: 1;
  vertical-align: baseline;
  white-space: nowrap;
  text-align: center;
  background-color: #777777;
  border-radius: 10px; }
  .badge:empty {
    display: none; }
  .btn .badge {
    position: relative;
    top: -1px; }
  .btn-xs .badge, .btn-group-xs > .btn .badge {
    top: 0;
    padding: 1px 5px; }
  .list-group-item.active > .badge, .nav-pills > .active > a > .badge {
    color: #004893;
    background-color: #fff; }
  .list-group-item > .badge {
    float: right; }
  .list-group-item > .badge + .badge {
    margin-right: 5px; }
  .nav-pills > li > a > .badge {
    margin-left: 3px; }

a.badge:hover, a.badge:focus {
  color: #fff;
  text-decoration: none;
  cursor: pointer; }

.jumbotron {
  padding: 30px 15px;
  margin-bottom: 30px;
  color: inherit;
  background-color: #eeeeee; }
  .jumbotron h1, .jumbotron .h1 {
    color: inherit; }
  .jumbotron p {
    margin-bottom: 15px;
    font-size: 24px;
    font-weight: 200; }
  .jumbotron > hr {
    border-top-color: #d5d5d5; }
  .container .jumbotron, .container-fluid .jumbotron {
    border-radius: 6px; }
  .jumbotron .container {
    max-width: 100%; }
  @media screen and (min-width: 1024px) {
    .jumbotron {
      padding: 48px 0; }
      .container .jumbotron, .container-fluid .jumbotron {
        padding-left: 60px;
        padding-right: 60px; }
      .jumbotron h1, .jumbotron .h1 {
        font-size: 72px; } }

.thumbnail {
  display: block;
  padding: 4px;
  margin-bottom: 22px;
  line-height: 1.428571429;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  -webkit-transition: border .2s ease-in-out;
  transition: border .2s ease-in-out; }
  .thumbnail > img, .thumbnail a > img {
    display: block;
    max-width: 100%;
    height: auto;
    margin-left: auto;
    margin-right: auto; }
  .thumbnail .caption {
    padding: 9px;
    color: #333333; }

a.thumbnail:hover, a.thumbnail:focus, a.thumbnail.active {
  border-color: #004893; }

.alert {
  position: relative;
  padding: 10px 30px 10px 40px;
  margin-bottom: 22px;
  border: 1px solid transparent;
  border-radius: 0;
  line-height: 18px; }
  .alert h4 {
    margin: 0;
    color: inherit; }
  .alert .alert-link {
    font-weight: bold; }
  .alert > p, .alert > ul {
    margin-bottom: 0; }
  .alert > p + p {
    margin-top: 5px; }
  .alert .state-alert {
    position: absolute;
    top: 8px;
    left: 10px;
    font-size: 18px; }
  .alert .close {
    position: absolute;
    top: 0;
    right: 0;
    width: 25px; }
  .alert ul {
    padding-left: 17px;
    margin-bottom: -3px; }

.alert-dismissable, .alert-dismissible {
  padding-right: 10px 30px 10px 40px20; }
  .alert-dismissable .close, .alert-dismissible .close {
    position: relative;
    top: -2px;
    right: -21px;
    color: inherit; }

.alert-success {
  background-color: #dff0d8;
  border-color: #d6e9c6;
  color: #3c763d; }
  .alert-success hr {
    border-top-color: #c9e2b3; }
  .alert-success .alert-link {
    color: #2b542c; }

.alert-info {
  background-color: #d9edf7;
  border-color: #bce8f1;
  color: #31708f; }
  .alert-info hr {
    border-top-color: #a6e1ec; }
  .alert-info .alert-link {
    color: #245269; }

.alert-warning {
  background-color: #fcf8e3;
  border-color: #faebcc;
  color: #8a6d3b; }
  .alert-warning hr {
    border-top-color: #f7e1b5; }
  .alert-warning .alert-link {
    color: #66512c; }

.alert-danger {
  background-color: #f2dede;
  border-color: #ebccd1;
  color: #a94442; }
  .alert-danger hr {
    border-top-color: #e4b9c0; }
  .alert-danger .alert-link {
    color: #843534; }
  .alert-danger a {
    color: #a94442; }

@-webkit-keyframes progress-bar-stripes {
  from {
    background-position: 40px 0; }

  to {
    background-position: 0 0; } }

@keyframes progress-bar-stripes {
  from {
    background-position: 40px 0; }

  to {
    background-position: 0 0; } }

.progress {
  overflow: hidden;
  height: 22px;
  margin-bottom: 22px;
  background-color: #f5f5f5;
  border-radius: 4px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1); }

.progress-bar {
  float: left;
  width: 0%;
  height: 100%;
  font-size: 14px;
  line-height: 22px;
  color: #fff;
  text-align: center;
  background-color: #004893;
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);
  -webkit-transition: width .6s ease;
  transition: width .6s ease; }

.progress-striped .progress-bar, .progress-bar-striped {
  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-size: 40px 40px; }

.progress.active .progress-bar, .progress-bar.active {
  -webkit-animation: progress-bar-stripes 2s linear infinite;
  animation: progress-bar-stripes 2s linear infinite; }

.progress-bar-success {
  background-color: #468847; }
  .progress-striped .progress-bar-success {
    background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
    background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent); }

.progress-bar-info {
  background-color: #3a87ad; }
  .progress-striped .progress-bar-info {
    background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
    background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent); }

.progress-bar-warning {
  background-color: #e18a00; }
  .progress-striped .progress-bar-warning {
    background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
    background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent); }

.progress-bar-danger {
  background-color: #d90000; }
  .progress-striped .progress-bar-danger {
    background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
    background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent); }

.media {
  margin-top: 15px; }
  .media:first-child {
    margin-top: 0; }

.media, .media-body {
  zoom: 1;
  overflow: hidden; }

.media-body {
  width: 10000px; }

.media-object {
  display: block; }

.media-right, .media > .pull-right {
  padding-left: 10px; }

.media-left, .media > .pull-left {
  padding-right: 10px; }

.media-left, .media-right, .media-body {
  display: table-cell;
  vertical-align: top; }

.media-middle {
  vertical-align: middle; }

.media-bottom {
  vertical-align: bottom; }

.media-heading {
  margin-top: 0;
  margin-bottom: 5px; }

.media-list {
  padding-left: 0;
  list-style: none; }

.list-group {
  margin-bottom: 20px;
  padding-left: 0; }

.list-group-item {
  position: relative;
  display: block;
  padding: 10px 15px;
  margin-bottom: -1px;
  background-color: #fff;
  border: 1px solid #ddd; }
  .list-group-item:first-child {
    border-top-right-radius: 4px;
    border-top-left-radius: 4px; }
  .list-group-item:last-child {
    margin-bottom: 0;
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px; }

a.list-group-item {
  color: #555; }
  a.list-group-item .list-group-item-heading {
    color: #333; }
  a.list-group-item:hover, a.list-group-item:focus {
    text-decoration: none;
    color: #555;
    background-color: #f5f5f5; }

.list-group-item.disabled, .list-group-item.disabled:hover, .list-group-item.disabled:focus {
  background-color: #eeeeee;
  color: #777777;
  cursor: false; }
  .list-group-item.disabled .list-group-item-heading, .list-group-item.disabled:hover .list-group-item-heading, .list-group-item.disabled:focus .list-group-item-heading {
    color: inherit; }
  .list-group-item.disabled .list-group-item-text, .list-group-item.disabled:hover .list-group-item-text, .list-group-item.disabled:focus .list-group-item-text {
    color: #777777; }
.list-group-item.active, .list-group-item.active:hover, .list-group-item.active:focus {
  z-index: 2;
  color: #fff;
  background-color: #004893;
  border-color: #004893; }
  .list-group-item.active .list-group-item-heading, .list-group-item.active .list-group-item-heading > small, .list-group-item.active .list-group-item-heading > .small, .list-group-item.active:hover .list-group-item-heading, .list-group-item.active:hover .list-group-item-heading > small, .list-group-item.active:hover .list-group-item-heading > .small, .list-group-item.active:focus .list-group-item-heading, .list-group-item.active:focus .list-group-item-heading > small, .list-group-item.active:focus .list-group-item-heading > .small {
    color: inherit; }
  .list-group-item.active .list-group-item-text, .list-group-item.active:hover .list-group-item-text, .list-group-item.active:focus .list-group-item-text {
    color: #60aeff; }

.list-group-item-success {
  color: #3c763d;
  background-color: #dff0d8; }

a.list-group-item-success {
  color: #3c763d; }
  a.list-group-item-success .list-group-item-heading {
    color: inherit; }
  a.list-group-item-success:hover, a.list-group-item-success:focus {
    color: #3c763d;
    background-color: #d0e9c6; }
  a.list-group-item-success.active, a.list-group-item-success.active:hover, a.list-group-item-success.active:focus {
    color: #fff;
    background-color: #3c763d;
    border-color: #3c763d; }

.list-group-item-info {
  color: #31708f;
  background-color: #d9edf7; }

a.list-group-item-info {
  color: #31708f; }
  a.list-group-item-info .list-group-item-heading {
    color: inherit; }
  a.list-group-item-info:hover, a.list-group-item-info:focus {
    color: #31708f;
    background-color: #c4e3f3; }
  a.list-group-item-info.active, a.list-group-item-info.active:hover, a.list-group-item-info.active:focus {
    color: #fff;
    background-color: #31708f;
    border-color: #31708f; }

.list-group-item-warning {
  color: #8a6d3b;
  background-color: #fcf8e3; }

a.list-group-item-warning {
  color: #8a6d3b; }
  a.list-group-item-warning .list-group-item-heading {
    color: inherit; }
  a.list-group-item-warning:hover, a.list-group-item-warning:focus {
    color: #8a6d3b;
    background-color: #faf2cc; }
  a.list-group-item-warning.active, a.list-group-item-warning.active:hover, a.list-group-item-warning.active:focus {
    color: #fff;
    background-color: #8a6d3b;
    border-color: #8a6d3b; }

.list-group-item-danger {
  color: #a94442;
  background-color: #f2dede; }

a.list-group-item-danger {
  color: #a94442; }
  a.list-group-item-danger .list-group-item-heading {
    color: inherit; }
  a.list-group-item-danger:hover, a.list-group-item-danger:focus {
    color: #a94442;
    background-color: #ebcccc; }
  a.list-group-item-danger.active, a.list-group-item-danger.active:hover, a.list-group-item-danger.active:focus {
    color: #fff;
    background-color: #a94442;
    border-color: #a94442; }

.list-group-item-heading {
  margin-top: 0;
  margin-bottom: 5px; }

.list-group-item-text {
  margin-bottom: 0;
  line-height: 1.3; }

.panel {
  margin-bottom: 5px;
  background-color: #eceef0;
  border: 1px solid transparent;
  border-radius: 0;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05); }
  .panel.panel-contrat {
    margin-top: 22px; }
    .panel.panel-contrat span {
      font-family: "HelveticaBoldCn"; }

.panel-body {
  padding: 10px; }
  .panel-body:before, .panel-body:after {
    content: " ";
    display: table; }
  .panel-body:after {
    clear: both; }
  .panel-body ul {
    font-size: 14px; }
  .panel-body .link {
    display: block;
    color: #333333;
    margin: 5px 0; }
  .panel-body .form-group {
    margin-bottom: 10px; }
    .panel-body .form-group .row [class^="col-"]:first-child, .panel-body .form-group .row [class*=" col-"]:first-child {
      padding-right: 10px; }
    .panel-body .form-group .row [class^="col-"] + [class^="col-"], .panel-body .form-group .row [class^="col-"] + [class*=" col-"], .panel-body .form-group .row [class*=" col-"] + [class^="col-"], .panel-body .form-group .row [class*=" col-"] + [class*=" col-"] {
      padding-left: 0; }
    .panel-body .form-group .form-control, .panel-body .form-group .select2-container .select2-choice, .select2-container .panel-body .form-group .select2-choice {
      font-size: 14px; }
  .panel-body.panel-recap > h3:first-child {
    margin-top: 0; }
  .panel-body.panel-recap .form-group {
    margin-bottom: 0; }

.panel-sticky .form-group {
  font-size: 14px; }

.panel-heading {
  padding: 10px;
  border-bottom: 1px solid transparent;
  border-top-right-radius: -1;
  border-top-left-radius: -1; }
  .panel-heading > .dropdown .dropdown-toggle {
    color: inherit; }
  .panel-heading a {
    color: #fff;
    margin-top: -22px; }

.panel-collapse, .panel-accordion {
  background-color: #fff; }
  .panel-collapse .panel-heading:hover, .panel-collapse .panel-heading:focus, .panel-accordion .panel-heading:hover, .panel-accordion .panel-heading:focus {
    outline: none;
    cursor: pointer;
    background-color: #f2f3f4; }
    .panel-collapse .panel-heading:hover .panel-title, .panel-collapse .panel-heading:focus .panel-title, .panel-accordion .panel-heading:hover .panel-title, .panel-accordion .panel-heading:focus .panel-title {
      color: #004893; }

.panel-title {
  margin-top: 0;
  margin-bottom: 0;
  font-size: 18px;
  color: inherit; }
  .panel-title .glyphicon, .panel-title .select2-container .select2-choice abbr, .select2-container .select2-choice .panel-title abbr, .panel-title .select2-search-choice-close, .panel-title .breadcrumb > li + li:before, .panel-title .cards-select .item-selected .item-checkbox, .cards-select .item-selected .panel-title .item-checkbox, .panel-title .cards-select .item-disabled .item-checkbox, .cards-select .item-disabled .panel-title .item-checkbox, .panel-title .cards-select .item-disabled .item-radio, .cards-select .item-disabled .panel-title .item-radio {
    -webkit-transition: -webkit-transform .3s ease-in-out;
            transition: transform .3s ease-in-out; }
  .active .panel-title .glyphicon, .active .panel-title .select2-container .select2-choice abbr, .select2-container .select2-choice .active .panel-title abbr, .active .panel-title .select2-search-choice-close, .active .panel-title .breadcrumb > li + li:before, .active .panel-title .cards-select .item-selected .item-checkbox, .cards-select .item-selected .active .panel-title .item-checkbox, .active .panel-title .cards-select .item-disabled .item-checkbox, .cards-select .item-disabled .active .panel-title .item-checkbox, .active .panel-title .cards-select .item-disabled .item-radio, .cards-select .item-disabled .active .panel-title .item-radio {
    -webkit-transform: rotate(-0.5turn);
        -ms-transform: rotate(-0.5turn);
            transform: rotate(-0.5turn); }
  .panel-title > a, .panel-title > small, .panel-title > .small, .panel-title > small > a, .panel-title > .small > a {
    color: inherit; }
  .panel-title a {
    display: block;
    cursor: pointer; }
    .panel-title a:hover {
      color: #004893; }

.panel-footer {
  padding: 10px;
  background-color: #f5f5f5;
  border-top: 1px solid #ddd;
  border-bottom-right-radius: -1;
  border-bottom-left-radius: -1; }

.panel > .list-group, .panel > .panel-collapse > .list-group {
  margin-bottom: 0; }
  .panel > .list-group .list-group-item, .panel > .panel-collapse > .list-group .list-group-item {
    border-width: 1px 0;
    border-radius: 0; }
  .panel > .list-group:first-child .list-group-item:first-child, .panel > .panel-collapse > .list-group:first-child .list-group-item:first-child {
    border-top: 0;
    border-top-right-radius: -1;
    border-top-left-radius: -1; }
  .panel > .list-group:last-child .list-group-item:last-child, .panel > .panel-collapse > .list-group:last-child .list-group-item:last-child {
    border-bottom: 0;
    border-bottom-right-radius: -1;
    border-bottom-left-radius: -1; }

.panel-heading + .list-group .list-group-item:first-child {
  border-top-width: 0; }

.list-group + .panel-footer {
  border-top-width: 0; }

.panel > .table, .panel > .table-responsive > .table, .panel > .panel-collapse > .table {
  margin-bottom: 0; }
  .panel > .table caption, .panel > .table-responsive > .table caption, .panel > .panel-collapse > .table caption {
    padding-left: 10px;
    padding-right: 10px; }
.panel > .table:first-child, .panel > .table-responsive:first-child > .table:first-child {
  border-top-right-radius: -1;
  border-top-left-radius: -1; }
  .panel > .table:first-child > thead:first-child > tr:first-child, .panel > .table:first-child > tbody:first-child > tr:first-child, .panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child, .panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child {
    border-top-left-radius: -1;
    border-top-right-radius: -1; }
    .panel > .table:first-child > thead:first-child > tr:first-child td:first-child, .panel > .table:first-child > thead:first-child > tr:first-child th:first-child, .panel > .table:first-child > tbody:first-child > tr:first-child td:first-child, .panel > .table:first-child > tbody:first-child > tr:first-child th:first-child, .panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child td:first-child, .panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child th:first-child, .panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child td:first-child, .panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child th:first-child {
      border-top-left-radius: -1; }
    .panel > .table:first-child > thead:first-child > tr:first-child td:last-child, .panel > .table:first-child > thead:first-child > tr:first-child th:last-child, .panel > .table:first-child > tbody:first-child > tr:first-child td:last-child, .panel > .table:first-child > tbody:first-child > tr:first-child th:last-child, .panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child td:last-child, .panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child th:last-child, .panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child td:last-child, .panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child th:last-child {
      border-top-right-radius: -1; }
.panel > .table:last-child, .panel > .table-responsive:last-child > .table:last-child {
  border-bottom-right-radius: -1;
  border-bottom-left-radius: -1; }
  .panel > .table:last-child > tbody:last-child > tr:last-child, .panel > .table:last-child > tfoot:last-child > tr:last-child, .panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child, .panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child {
    border-bottom-left-radius: -1;
    border-bottom-right-radius: -1; }
    .panel > .table:last-child > tbody:last-child > tr:last-child td:first-child, .panel > .table:last-child > tbody:last-child > tr:last-child th:first-child, .panel > .table:last-child > tfoot:last-child > tr:last-child td:first-child, .panel > .table:last-child > tfoot:last-child > tr:last-child th:first-child, .panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child td:first-child, .panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child th:first-child, .panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child td:first-child, .panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child th:first-child {
      border-bottom-left-radius: -1; }
    .panel > .table:last-child > tbody:last-child > tr:last-child td:last-child, .panel > .table:last-child > tbody:last-child > tr:last-child th:last-child, .panel > .table:last-child > tfoot:last-child > tr:last-child td:last-child, .panel > .table:last-child > tfoot:last-child > tr:last-child th:last-child, .panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child td:last-child, .panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child th:last-child, .panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child td:last-child, .panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child th:last-child {
      border-bottom-right-radius: -1; }
.panel > .panel-body + .table, .panel > .panel-body + .table-responsive, .panel > .table + .panel-body, .panel > .table-responsive + .panel-body {
  border-top: 1px solid #fff; }
.panel > .table > tbody:first-child > tr:first-child th, .panel > .table > tbody:first-child > tr:first-child td {
  border-top: 0; }
.panel > .table-bordered, .panel > .table-responsive > .table-bordered {
  border: 0; }
  .panel > .table-bordered > thead > tr > th:first-child, .panel > .table-bordered > thead > tr > td:first-child, .panel > .table-bordered > tbody > tr > th:first-child, .panel > .table-bordered > tbody > tr > td:first-child, .panel > .table-bordered > tfoot > tr > th:first-child, .panel > .table-bordered > tfoot > tr > td:first-child, .panel > .table-responsive > .table-bordered > thead > tr > th:first-child, .panel > .table-responsive > .table-bordered > thead > tr > td:first-child, .panel > .table-responsive > .table-bordered > tbody > tr > th:first-child, .panel > .table-responsive > .table-bordered > tbody > tr > td:first-child, .panel > .table-responsive > .table-bordered > tfoot > tr > th:first-child, .panel > .table-responsive > .table-bordered > tfoot > tr > td:first-child {
    border-left: 0; }
  .panel > .table-bordered > thead > tr > th:last-child, .panel > .table-bordered > thead > tr > td:last-child, .panel > .table-bordered > tbody > tr > th:last-child, .panel > .table-bordered > tbody > tr > td:last-child, .panel > .table-bordered > tfoot > tr > th:last-child, .panel > .table-bordered > tfoot > tr > td:last-child, .panel > .table-responsive > .table-bordered > thead > tr > th:last-child, .panel > .table-responsive > .table-bordered > thead > tr > td:last-child, .panel > .table-responsive > .table-bordered > tbody > tr > th:last-child, .panel > .table-responsive > .table-bordered > tbody > tr > td:last-child, .panel > .table-responsive > .table-bordered > tfoot > tr > th:last-child, .panel > .table-responsive > .table-bordered > tfoot > tr > td:last-child {
    border-right: 0; }
  .panel > .table-bordered > thead > tr:first-child > td, .panel > .table-bordered > thead > tr:first-child > th, .panel > .table-bordered > tbody > tr:first-child > td, .panel > .table-bordered > tbody > tr:first-child > th, .panel > .table-responsive > .table-bordered > thead > tr:first-child > td, .panel > .table-responsive > .table-bordered > thead > tr:first-child > th, .panel > .table-responsive > .table-bordered > tbody > tr:first-child > td, .panel > .table-responsive > .table-bordered > tbody > tr:first-child > th {
    border-bottom: 0; }
  .panel > .table-bordered > tbody > tr:last-child > td, .panel > .table-bordered > tbody > tr:last-child > th, .panel > .table-bordered > tfoot > tr:last-child > td, .panel > .table-bordered > tfoot > tr:last-child > th, .panel > .table-responsive > .table-bordered > tbody > tr:last-child > td, .panel > .table-responsive > .table-bordered > tbody > tr:last-child > th, .panel > .table-responsive > .table-bordered > tfoot > tr:last-child > td, .panel > .table-responsive > .table-bordered > tfoot > tr:last-child > th {
    border-bottom: 0; }
.panel > .table-responsive {
  border: 0;
  margin-bottom: 0; }

.panel-group {
  margin-bottom: 22px; }
  .panel-group .panel {
    margin-bottom: 0;
    border-radius: 0; }
    .panel-group .panel + .panel {
      margin-top: 5px; }
  .panel-group .panel-heading {
    border-bottom: 0; }
    .panel-group .panel-heading + .panel-collapse > .panel-body, .panel-group .panel-heading + .panel-collapse > .list-group {
      border-top: 1px solid #ddd; }
  .panel-group .panel-footer {
    border-top: 0; }
    .panel-group .panel-footer + .panel-collapse .panel-body {
      border-bottom: 1px solid #ddd; }

.panel-default {
  border-color: #eceef0; }
  .panel-default > .panel-heading {
    color: #fff;
    background-color: #42145f;
    border-color: #42145f; }
    .panel-default > .panel-heading + .panel-collapse > .panel-body {
      border-top-color: #eceef0; }
    .panel-default > .panel-heading .badge {
      color: #42145f;
      background-color: #fff; }
  .panel-default > .panel-footer + .panel-collapse > .panel-body {
    border-bottom-color: #eceef0; }

.panel-primary {
  border-color: #004893; }
  .panel-primary > .panel-heading {
    color: #fff;
    background-color: #004893;
    border-color: #42145f; }
    .panel-primary > .panel-heading + .panel-collapse > .panel-body {
      border-top-color: #004893; }
    .panel-primary > .panel-heading .badge {
      color: #004893;
      background-color: #fff; }
  .panel-primary > .panel-footer + .panel-collapse > .panel-body {
    border-bottom-color: #004893; }

.panel-success {
  border-color: #d6e9c6; }
  .panel-success > .panel-heading {
    color: #3c763d;
    background-color: #dff0d8;
    border-color: #42145f; }
    .panel-success > .panel-heading + .panel-collapse > .panel-body {
      border-top-color: #d6e9c6; }
    .panel-success > .panel-heading .badge {
      color: #dff0d8;
      background-color: #3c763d; }
  .panel-success > .panel-footer + .panel-collapse > .panel-body {
    border-bottom-color: #d6e9c6; }

.panel-info {
  border-color: #bce8f1; }
  .panel-info > .panel-heading {
    color: #31708f;
    background-color: #d9edf7;
    border-color: #42145f; }
    .panel-info > .panel-heading + .panel-collapse > .panel-body {
      border-top-color: #bce8f1; }
    .panel-info > .panel-heading .badge {
      color: #d9edf7;
      background-color: #31708f; }
  .panel-info > .panel-footer + .panel-collapse > .panel-body {
    border-bottom-color: #bce8f1; }

.panel-warning {
  border-color: #faebcc; }
  .panel-warning > .panel-heading {
    color: #8a6d3b;
    background-color: #fcf8e3;
    border-color: #42145f; }
    .panel-warning > .panel-heading + .panel-collapse > .panel-body {
      border-top-color: #faebcc; }
    .panel-warning > .panel-heading .badge {
      color: #fcf8e3;
      background-color: #8a6d3b; }
  .panel-warning > .panel-footer + .panel-collapse > .panel-body {
    border-bottom-color: #faebcc; }

.panel-danger {
  border-color: #ebccd1; }
  .panel-danger > .panel-heading {
    color: #a94442;
    background-color: #f2dede;
    border-color: #42145f; }
    .panel-danger > .panel-heading + .panel-collapse > .panel-body {
      border-top-color: #ebccd1; }
    .panel-danger > .panel-heading .badge {
      color: #f2dede;
      background-color: #a94442; }
  .panel-danger > .panel-footer + .panel-collapse > .panel-body {
    border-bottom-color: #ebccd1; }

.panel-accordion {
  border-color: #eceef0; }
  .panel-accordion > .panel-heading {
    color: #333333;
    background-color: #f7f8f9;
    border-color: #42145f; }
    .panel-accordion > .panel-heading + .panel-collapse > .panel-body {
      border-top-color: #eceef0; }
    .panel-accordion > .panel-heading .badge {
      color: #f7f8f9;
      background-color: #333333; }
  .panel-accordion > .panel-footer + .panel-collapse > .panel-body {
    border-bottom-color: #eceef0; }
  .panel-accordion .panel-body {
    padding-top: 0 !important;
    padding-bottom: 20px; }

.faceted-search .panel {
  border-color: #d0d4d9; }
.faceted-search .panel-group .panel + .panel {
  margin-top: -1px; }
.faceted-search .panel-default {
  margin-bottom: 0; }
  .faceted-search .panel-default > .panel-heading {
    margin: -1px; }
.faceted-search .panel-accordion > .panel-heading {
  background: #fff; }
  .faceted-search .panel-accordion > .panel-heading .panel-title {
    font-size: 16px; }
.faceted-search .panel-accordion .panel-body {
  border-top-color: transparent !important; }
.faceted-search .list-inline {
  margin-bottom: 0; }
.faceted-search .radiocheck-custom {
  margin-bottom: 0; }
  .faceted-search .radiocheck-custom label {
    margin-bottom: 0; }
  .faceted-search .radiocheck-custom .checkbox-inline, .faceted-search .radiocheck-custom .radio-inline {
    display: block; }
    .faceted-search .radiocheck-custom .checkbox-inline label, .faceted-search .radiocheck-custom .radio-inline label {
      display: block; }
  .faceted-search .radiocheck-custom .radio-inline label {
    padding: 5px 10px !important; }
.faceted-search .form-control, .faceted-search .select2-container .select2-choice, .select2-container .faceted-search .select2-choice {
  width: 100%; }

li.filter {
  position: relative;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 16px;
  padding: 3px 35px 3px 5px; }
  li.filter a {
    position: absolute;
    top: 3px;
    right: 10px; }

.embed-responsive {
  position: relative;
  display: block;
  height: 0;
  padding: 0;
  overflow: hidden; }
  .embed-responsive .embed-responsive-item, .embed-responsive iframe, .embed-responsive embed, .embed-responsive object, .embed-responsive video {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    border: 0; }
  .embed-responsive.embed-responsive-16by9 {
    padding-bottom: 56.25%; }
  .embed-responsive.embed-responsive-4by3 {
    padding-bottom: 75%; }

.well {
  min-height: 20px;
  padding: 19px;
  margin-bottom: 20px;
  background-color: #f5f5f5;
  border: 1px solid #e3e3e3;
  border-radius: 4px;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05); }
  .well blockquote {
    border-color: #ddd;
    border-color: rgba(0, 0, 0, 0.15); }

.well-lg {
  padding: 24px;
  border-radius: 6px; }

.well-sm {
  padding: 9px;
  border-radius: 3px; }

.close {
  float: right;
  font-size: 24px;
  font-weight: bold;
  line-height: 1;
  color: #000;
  text-shadow: 0 1px 0 #fff;
  opacity: 0.2;
  filter: alpha(opacity=20); }
  .close:hover, .close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
    opacity: 0.5;
    filter: alpha(opacity=50); }

button.close {
  padding: 0;
  cursor: pointer;
  background: transparent;
  border: 0;
  -webkit-appearance: none; }

.steps-container {
  position: relative;
  margin: 22px 0;
  padding: 0;
  box-sizing: border-box; }
  .steps-container ol {
    display: table;
    width: 100%;
    table-layout: fixed;
    border-radius: 4px;
    overflow: hidden;
    padding: 0;
    margin: 0;
    border: 2px solid #eceef0;
    box-sizing: border-box; }
    .steps-container ol li {
      display: table-cell;
      font-size: 16px;
      font-family: "HelveticaBoldCn";
      background: #eceef0;
      padding: 12px 0;
      padding-left: 30px;
      color: #333333; }
      .steps-container ol li:first-child {
        padding-left: 20px; }
        .steps-container ol li:first-child > span:first-child {
          margin-left: 0; }
      .steps-container ol li.on {
        color: #34104c;
        background: #fff; }
        .steps-container ol li.on > span:first-child .step-number, .steps-container ol li.on > span:first-child .step-title {
          opacity: 1;
          filter: alpha(opacity=100); }
      .steps-container ol li.past {
        color: #34104c; }
        .steps-container ol li.past > span:first-child .step-number, .steps-container ol li.past > span:first-child .step-title {
          opacity: 0.5;
          filter: alpha(opacity=50); }
        .steps-container ol li.past:hover {
          cursor: pointer; }
          .steps-container ol li.past:hover > span:first-child .step-number, .steps-container ol li.past:hover > span:first-child .step-title {
            opacity: 1;
            filter: alpha(opacity=100); }
      .steps-container ol li.disabled {
        color: #f8f8f8;
        background: #ccc; }
      .steps-container ol li > span:first-child {
        position: relative;
        display: inline-block;
        vertical-align: middle;
        width: 100%; }
        .steps-container ol li > span:first-child:before {
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 50px 0 50px 36px;
          border-color: transparent transparent transparent #fff;
          content: "";
          position: absolute;
          right: -23px;
          top: 50%;
          margin-top: -50px; }
        .steps-container ol li > span:first-child:after {
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 50px 0 50px 36px;
          border-color: transparent transparent transparent #eceef0;
          content: "";
          position: absolute;
          right: -20px;
          top: 50%;
          margin-top: -50px; }
        .steps-container ol li > span:first-child .step-number, .steps-container ol li > span:first-child .step-title {
          opacity: 0.3;
          filter: alpha(opacity=30); }
        .steps-container ol li > span:first-child .step-number {
          position: absolute;
          height: 35px;
          padding-top: 4px;
          top: 50%;
          margin-top: -25px;
          left: 10px;
          display: inline-block;
          vertical-align: middle;
          margin-left: 0;
          margin-right: 5px;
          font-size: 26px; }
          .steps-container ol li > span:first-child .step-number i {
            vertical-align: bottom; }
        .steps-container ol li > span:first-child .step-title {
          padding-left: 30px;
          padding-right: 20px;
          display: block;
          line-height: 15px; }
      .steps-container ol li.past > span:first-child:after {
        border-color: transparent transparent transparent #eceef0; }
      .steps-container ol li.on > span:first-child:after {
        border-color: transparent transparent transparent #fff; }
      .steps-container ol li.disabled > span:first-child:after {
        border-color: transparent transparent transparent #ccc; }
      .steps-container ol li:last-child > span:first-child .step-number {
        font-size: 18px; }
      .steps-container ol li:last-child > span:first-child:after, .steps-container ol li:last-child > span:first-child:before {
        display: none !important; }

@media (max-width: 1023px) {
  .steps-container ol {
    table-layout: auto; }
    .steps-container ol li {
      min-width: 50px; }
      .steps-container ol li > span:first-child .step-title {
        display: none; }
      .steps-container ol li > span:first-child .step-number {
        left: 50%;
        margin-left: -10px; }
        .steps-container ol li > span:first-child .step-number i {
          font-size: 20px; }
      .steps-container ol li.on > span:first-child .step-title {
        display: block; }
      .steps-container ol li.on > span:first-child .step-number {
        left: 10px;
        margin-left: 0; }
        .steps-container ol li.on > span:first-child .step-number i {
          font-size: 18px; } }

.datepicker {
  width: 260px;
  height: 245px;
  padding: 3px; }
  .datepicker .btn {
    background-image: none;
    -webkit-filter: none;
            filter: none;
    border-radius: 0;
    text-shadow: none;
    margin: 0;
    font-family: Arial Narrow, Arial, sans-serif;
    min-height: 100%;
    box-shadow: none;
    color: #333333;
    background-color: transparent !important; }
    .datepicker .btn:focus, .datepicker .btn:active, .datepicker .btn.active {
      color: #333333;
      background-color: transparent !important; }
    .datepicker .btn:hover {
      color: #333333;
      background-color: #eceef0 !important; }
  .datepicker .btn-today {
    color: #31708f;
    background-color: #d9edf7 !important; }
    .datepicker .btn-today:focus, .datepicker .btn-today:active, .datepicker .btn-today.active {
      color: #31708f;
      background-color: #d9edf7 !important; }
    .datepicker .btn-today:hover {
      color: #31708f;
      background-color: #eceef0 !important; }
  .datepicker .btn-primary {
    color: #fff;
    background-color: #004893 !important; }
    .datepicker .btn-primary:focus, .datepicker .btn-primary:active, .datepicker .btn-primary.active {
      color: #fff;
      background-color: #004893 !important; }
    .datepicker .btn-primary:hover {
      color: #fff;
      background-color: #004893 !important; }
  .datepicker .btn[disabled] {
    color: #ccc;
    background-color: transparent !important; }
    .datepicker .btn[disabled]:focus, .datepicker .btn[disabled]:active, .datepicker .btn[disabled].active {
      color: #ccc;
      background-color: transparent !important; }
    .datepicker .btn[disabled]:hover {
      color: #ccc;
      background-color: transparent !important; }
    .datepicker .btn[disabled] .text-muted {
      color: #ccc; }
  .datepicker table {
    background: #fff; }
    .datepicker table thead {
      border-bottom: 5px solid #fff; }
      .datepicker table thead > tr:first-child {
        background: #004893; }
        .datepicker table thead > tr:first-child .btn {
          color: #fff;
          background-color: transparent !important; }
          .datepicker table thead > tr:first-child .btn:focus, .datepicker table thead > tr:first-child .btn:active, .datepicker table thead > tr:first-child .btn.active {
            color: #fff;
            background-color: transparent !important; }
          .datepicker table thead > tr:first-child .btn:hover {
            color: #fff;
            background-color: transparent !important; }

.drop-box {
  border: 2px dashed #ccc;
  border-radius: 4px;
  padding: 5px 10px;
  margin-top: -40px;
  margin-left: -5px;
  background: #fafbfb;
  color: #ccc;
  text-align: center;
  font-family: "HelveticaBoldCn";
  font-size: 20px; }
  .drop-box.dragover {
    border-color: #468847; }
  .drop-box.dragover-err {
    border-color: #d90000; }

.slider {
  width: 100%;
  box-sizing: border-box;
  background-color: #fff;
  border: 2px solid #ccc;
  height: .8em;
  position: relative;
  margin-top: 8px;
  margin-bottom: 25px;
  display: block;
  cursor: pointer; }
  .slider .slider-handle {
    display: inline-block;
    width: 1.7em;
    height: 1.7em;
    border-radius: 50%;
    border: 2px solid #004893;
    background-color: #99b5d3;
    position: absolute;
    top: 50%;
    margin-top: -0.85em;
    margin-left: -0.85em;
    -webkit-transition: background-color .2s ease;
            transition: background-color .2s ease;
    cursor: move;
    cursor: -webkit-grab;
    cursor: grab; }
    .slider .slider-handle:active {
      cursor: -webkit-grabbing;
      cursor: grabbing; }
      .slider .slider-handle:active:before {
        cursor: -webkit-grabbing;
        cursor: grabbing; }
    .slider .slider-handle:hover {
      background-color: #fff; }
    .slider .slider-handle:before {
      content: "|||";
      font-weight: bold;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -0.325em;
      margin-top: -0.785em;
      font-size: 0.9em;
      color: #004893;
      cursor: move;
      cursor: -webkit-grab;
      cursor: grab; }
  .slider .slider-range {
    background-color: #004893;
    height: 100%;
    position: absolute;
    top: 0; }
  .slider .slider-scale {
    width: 100%;
    font-size: 0; }
    .slider .slider-scale > .slider-scale-step {
      display: inline-block;
      font-size: 13px;
      position: relative;
      margin-top: 16px;
      width: 10%; }
      .slider .slider-scale > .slider-scale-step:before {
        content: "|";
        position: absolute;
        font-size: 10px;
        top: -19px; }
      .slider .slider-scale > .slider-scale-step:first-child:before, .slider .slider-scale > .slider-scale-step:last-child:before {
        content: ""; }
      .slider .slider-scale > .slider-scale-step:first-child > span {
        left: 0; }
      .slider .slider-scale > .slider-scale-step:last-child > span {
        right: 0; }
      .slider .slider-scale > .slider-scale-step > span {
        position: absolute; }

.select2-container .select2-choice {
  display: block;
  padding: 0 0 0 8px;
  line-height: 30px; }

.select2-container-active .select2-choice, .select2-container-active .select2-choices {
  border-color: #004893; }

.select2-dropdown-open .select2-choice {
  border-bottom-color: transparent; }

.has-error .select2-container .select2-choice {
  border-color: #a94442; }

.cards .item {
  display: inline-block;
  background: #eceef0;
  width: 190px;
  margin: 10px;
  border-radius: 4px;
  border: 1px solid #d4d6d8;
  vertical-align: top;
  font-size: 14px;
  -webkit-transition: all 0.15s ease;
  transition: all 0.15s ease;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.2); }
  .cards .item:not(.item-disabled):not(.item-unselectable):hover {
    box-shadow: none;
    border-color: #004893;
    cursor: pointer; }
  .cards .item .item-content {
    margin: 0;
    padding: 10px;
    list-style: none;
    min-height: 92px; }
    .cards .item .item-content .item-name {
      color: #42145f;
      font-size: 18px;
      font-family: "HelveticaBoldCn";
      line-height: normal;
      margin: 0;
      min-height: 44px; }
    .cards .item .item-content .item-role {
      color: #42145f;
      font-weight: bold;
      min-height: 17px; }
    .cards .item .item-content .item-role.undefined {
      color: red;
      font-style: italic; }
    .cards .item .item-content .item-icon {
      text-align: center; }
      .cards .item .item-content .item-icon i {
        font-size: 20px;
        color: #42145f; }
  .cards .item .item-footer {
    margin: 0;
    padding: 0;
    width: 100%;
    display: block;
    position: relative;
    box-sizing: border-box;
    list-style: none; }
    .cards .item .item-footer .item-number {
      font-size: 14px;
      padding: 10px; }
    .cards .item .item-footer .item-siret {
      font-size: 14px;
      padding: 8px 10px 0 10px; }
    .cards .item .item-footer .item-contrat {
      border-top: 1px solid #d4d6d8;
      background: #f5f6f7;
      padding: 0 10px;
      position: relative;
      color: #42145f;
      font-weight: bold;
      min-height: 50px;
      line-height: 40px;
      text-align: center;
      display: table;
      width: 100%;
      margin: 0;
      border-radius: 0 0 4px 4px;
      box-sizing: border-box; }
      .cards .item .item-footer .item-contrat p {
        line-height: normal;
        vertical-align: middle;
        text-align: left;
        display: table-cell;
        width: 100%;
        margin-bottom: 0; }
        .cards .item .item-footer .item-contrat p a {
          text-align: left; }
      .cards .item .item-footer .item-contrat .detail {
        color: red;
        font-style: italic; }
      .cards .item .item-footer .item-contrat i {
        font-size: 25px;
        margin-right: 5px;
        line-height: 48px; }
      .cards .item .item-footer .item-contrat.active {
        background: #e1ecf9; }
  .cards .item.item-selected {
    background: #e1ecf9;
    border-color: #004893;
    box-shadow: none; }
    .cards .item.item-selected .item-footer .item-contrat {
      background: #eff5fb; }

.cards-select .item-checkbox, .cards-select .item-radio {
  display: inline-block;
  position: relative;
  width: 100%;
  height: 30px;
  background: #d4d6d8;
  text-align: center;
  border-radius: 4px 4px 0 0; }
  .cards-select .item-checkbox:after, .cards-select .item-radio:after {
    content: '';
    display: block;
    position: absolute;
    left: 50%;
    top: 5px;
    width: 20px;
    height: 20px;
    margin-left: -10px;
    border: 1px solid #ccc;
    background: #fff;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.3); }
  .cards-select .item-checkbox input[type="checkbox"], .cards-select .item-checkbox input[type="radio"], .cards-select .item-radio input[type="checkbox"], .cards-select .item-radio input[type="radio"] {
    opacity: 0;
    filter: alpha(opacity=0); }
.cards-select .item-radio:after {
  border-radius: 50%; }
.cards-select .item-selected .item-checkbox {
  background: #cad4df; }
  .cards-select .item-selected .item-checkbox:before {
    position: absolute;
    top: 10px;
    left: 50%;
    z-index: 10;
    font-size: 13px;
    margin-left: -7px; }
.cards-select .item-selected .item-radio {
  background: #cad4df; }
  .cards-select .item-selected .item-radio:before {
    content: "\2022";
    display: block;
    position: absolute;
    top: 15px;
    left: 50%;
    z-index: 10;
    font-size: 30px;
    line-height: 0;
    margin-left: -5px; }
.cards-select .item-disabled {
  cursor: default; }
  .cards-select .item-disabled .item-icon {
    color: #d6d9dd; }
  .cards-select .item-disabled .item-checkbox:before, .cards-select .item-disabled .item-radio:before {
    position: absolute;
    top: 8px;
    left: 50%;
    z-index: 10;
    font-size: 16px;
    margin-left: -8px;
    color: red; }
  .cards-select .item-disabled .item-checkbox:after, .cards-select .item-disabled .item-radio:after {
    display: none; }
.cards-select .item-unselectable {
  cursor: default; }
  .cards-select .item-unselectable .item-content {
    padding-top: 45px; }

.item-principal {
  display: table-cell;
  border-right: 2px solid #eceef0;
  padding-right: 10px;
  padding-left: 0;
  vertical-align: top;
  box-sizing: border-box;
  width: 206px; }

.item-list {
  display: table-cell;
  width: auto;
  padding-left: 10px;
  font-size: 0; }

.loading {
  display: none;
  height: 100%;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1060; }
  .loading.active {
    display: block; }
  .loading .loader {
    display: block;
    background: url(../img/loader.gif) no-repeat scroll center center transparent;
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1062; }
    .loading .loader span {
      display: block;
      width: 100%;
      text-align: center;
      position: fixed;
      left: 0;
      top: 55%; }
  .loading .loaderfilter {
    position: fixed;
    left: 0;
    top: 0;
    background: none repeat scroll 0 0 #FFFFFF;
    height: 100%;
    width: 100%;
    opacity: 0.7;
    filter: alpha(opacity=70);
    z-index: 1061; }

.loader-mini {
  display: none;
  width: 24px;
  height: 24px;
  background: url(../img/loader-mini.gif) no-repeat 0 0;
  vertical-align: middle;
  margin: 0 0 5px 2px; }
  .loader-mini.active {
    display: inline-block; }

.faceted-search .panel-default .panel-heading .link-circle {
  border-color: #fff; }
  .faceted-search .panel-default .panel-heading .link-circle:hover {
    background-color: #fff;
    color: #004893; }
.faceted-search .panel-default .panel-heading .close {
  position: absolute;
  top: 0;
  right: 0;
  width: 48px;
  height: 48px;
  font-size: 25px;
  line-height: 48px;
  background: rgba(255, 255, 255, 0.5); }

@media (max-width: 1023px) {
  .faceted-search {
    position: fixed;
    top: 0;
    left: -350px;
    height: 100vh;
    width: 350px;
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 1050;
    background: #fff;
    box-shadow: 3px 0 10px 0 rgba(0, 0, 0, 0.3);
    -webkit-transition-property: all;
    transition-property: all;
    -webkit-transition-duration: .3s;
    transition-duration: .3s;
    -webkit-transition-timing-function: ease;
    transition-timing-function: ease; }
    .faceted-search.open {
      left: 0; }
    .faceted-search .panel-default .panel-heading .panel-title {
      display: inline-block;
      margin-right: 10px; }
  .faceted-backdrop {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 1;
    z-index: 1040; } }

.modal-open {
  overflow: hidden;
  padding-right: 17px; }
  .modal-open .main-title.affix {
    padding-right: 17px; }

@media (max-device-width: 1024px) {
  .modal-open {
    padding-right: 0; }
    .modal-open .main-title.affix {
      padding-right: 0; } }

.modal {
  display: none;
  overflow: hidden;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1040;
  -webkit-overflow-scrolling: touch;
  outline: 0; }
  .modal.fade .modal-dialog {
    -webkit-transform: translate(0, -25%);
    -ms-transform: translate(0, -25%);
    transform: translate(0, -25%);
    -webkit-transition: -webkit-transform 0.3s ease-out;
    transition: transform 0.3s ease-out; }
  .modal.in .modal-dialog {
    -webkit-transform: translate(0, 0);
    -ms-transform: translate(0, 0);
    transform: translate(0, 0); }

.modal-open .modal {
  overflow-x: hidden;
  overflow-y: auto; }

.modal-dialog {
  position: relative;
  width: auto;
  margin: 10px; }

.modal-content {
  position: relative;
  background-color: #fff;
  border: 1px solid #999;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
  background-clip: padding-box;
  outline: 0; }

.modal-backdrop, .aside-backdrop {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0; }
  .modal-backdrop.fade, .fade.aside-backdrop {
    opacity: 0;
    filter: alpha(opacity=0); }
  .modal-backdrop.in, .in.aside-backdrop {
    opacity: 0.5;
    filter: alpha(opacity=50); }

.modal-header, .aside .aside-dialog .aside-header {
  padding: 10px 15px;
  border-bottom: 1px solid #e5e5e5; }
  .modal-header h4, .aside .aside-dialog .aside-header h4 {
    font-size: 23px;
    color: #333333; }

.modal-header .close, .aside .aside-dialog .aside-header .close {
  width: 52px;
  height: 52px;
  margin-top: -10px;
  margin-right: -15px;
  font-size: 25px;
  line-height: 52px; }
  .modal-header .close:hover, .aside .aside-dialog .aside-header .close:hover {
    background: #eceef0; }

.modal-title {
  margin: 0;
  line-height: 1.428571429;
  text-align: left; }

.modal-body, .aside .aside-dialog .aside-body {
  position: relative;
  padding: 15px;
  color: #333333;
  font-size: 16px;
  text-align: left; }

.modal-footer, .aside .aside-dialog .aside-footer {
  padding: 15px;
  text-align: center;
  border-top: 1px solid #e5e5e5; }
  .modal-footer:before, .aside .aside-dialog .aside-footer:before, .modal-footer:after, .aside .aside-dialog .aside-footer:after {
    content: " ";
    display: table; }
  .modal-footer:after, .aside .aside-dialog .aside-footer:after {
    clear: both; }
  .modal-footer .btn, .aside .aside-dialog .aside-footer .btn {
    margin-bottom: 0; }
  .modal-footer .btn + .btn, .aside .aside-dialog .aside-footer .btn + .btn {
    margin-left: 5px;
    margin-bottom: 0; }
  .modal-footer .btn-group .btn + .btn, .aside .aside-dialog .aside-footer .btn-group .btn + .btn {
    margin-left: -1px; }
  .modal-footer .btn-block + .btn-block, .aside .aside-dialog .aside-footer .btn-block + .btn-block {
    margin-left: 0; }

.modal-scrollbar-measure {
  position: absolute;
  top: -9999px;
  width: 50px;
  height: 50px;
  overflow: scroll; }

@media (min-width: 1024px) {
  .modal-dialog {
    width: 600px;
    margin: 30px auto; }
  .modal-content {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5); }
  .modal-sm {
    width: 300px; } }

@media (min-width: 1280px) {
  .modal-lg {
    width: 900px; } }

.modal-backdrop.am-fade, .am-fade.aside-backdrop {
  opacity: 1;
  -webkit-transition: opacity 0 linear;
          transition: opacity 0 linear; }
  .modal-backdrop.am-fade.ng-enter, .am-fade.ng-enter.aside-backdrop {
    opacity: 0; }
  .modal-backdrop.am-fade.ng-enter-active, .am-fade.ng-enter-active.aside-backdrop {
    opacity: .5; }
  .modal-backdrop.am-fade.ng-leave, .am-fade.ng-leave.aside-backdrop {
    opacity: .5; }
  .modal-backdrop.am-fade.ng-leave-active, .am-fade.ng-leave-active.aside-backdrop {
    opacity: 0; }

.modal-dialog {
  -webkit-animation-duration: 0.15s;
          animation-duration: 0.15s;
  -webkit-animation-timing-function: ease-in-out;
          animation-timing-function: ease-in-out;
  -webkit-animation-fill-mode: backwards;
          animation-fill-mode: backwards; }

.am-fade.ng-enter .modal-dialog {
  -webkit-animation-name: slideFromTop;
          animation-name: slideFromTop; }

.am-fade.ng-leave .modal-dialog {
  -webkit-animation-name: slideToTop;
          animation-name: slideToTop; }

@-webkit-keyframes slideFromTop {
  from {
    opacity: 0;
    -webkit-transform: translateY(-20%);
            transform: translateY(-20%); }

  to {
    opacity: 1; } }

@keyframes slideFromTop {
  from {
    opacity: 0;
    -webkit-transform: translateY(-20%);
            transform: translateY(-20%); }

  to {
    opacity: 1; } }

@-webkit-keyframes slideToTop {
  from {
    opacity: 1; }

  to {
    opacity: 0;
    -webkit-transform: translateY(-20%);
            transform: translateY(-20%); } }

@keyframes slideToTop {
  from {
    opacity: 1; }

  to {
    opacity: 0;
    -webkit-transform: translateY(-20%);
            transform: translateY(-20%); } }

.tooltip {
  position: absolute;
  z-index: 1070;
  display: block;
  visibility: visible;
  font-family: Arial Narrow, Arial, sans-serif;
  font-size: 14px;
  font-weight: normal;
  line-height: 1.4;
  opacity: 0;
  filter: alpha(opacity=0); }
  .tooltip.in {
    opacity: 1;
    filter: alpha(opacity=100); }
  .tooltip.top {
    margin-top: -3px;
    padding: 5px 0; }
  .tooltip.right {
    margin-left: 3px;
    padding: 0 5px; }
  .tooltip.bottom {
    margin-top: 3px;
    padding: 5px 0; }
  .tooltip.left {
    margin-left: -3px;
    padding: 0 5px; }

.tooltip-inner {
  max-width: 200px;
  padding: 3px 8px;
  color: #fff;
  text-align: center;
  text-decoration: none;
  background-color: #003c79;
  border-radius: 4px; }

.tooltip-arrow {
  position: absolute;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid; }

.tooltip.top .tooltip-arrow {
  bottom: 0;
  left: 50%;
  margin-left: -5px;
  border-width: 5px 5px 0;
  border-top-color: #003c79; }
.tooltip.top-left .tooltip-arrow {
  bottom: 0;
  right: 5px;
  margin-bottom: -5px;
  border-width: 5px 5px 0;
  border-top-color: #003c79; }
.tooltip.top-right .tooltip-arrow {
  bottom: 0;
  left: 5px;
  margin-bottom: -5px;
  border-width: 5px 5px 0;
  border-top-color: #003c79; }
.tooltip.right .tooltip-arrow {
  top: 50%;
  left: 0;
  margin-top: -5px;
  border-width: 5px 5px 5px 0;
  border-right-color: #003c79; }
.tooltip.left .tooltip-arrow {
  top: 50%;
  right: 0;
  margin-top: -5px;
  border-width: 5px 0 5px 5px;
  border-left-color: #003c79; }
.tooltip.bottom .tooltip-arrow {
  top: 0;
  left: 50%;
  margin-left: -5px;
  border-width: 0 5px 5px;
  border-bottom-color: #003c79; }
.tooltip.bottom-left .tooltip-arrow {
  top: 0;
  right: 5px;
  margin-top: -5px;
  border-width: 0 5px 5px;
  border-bottom-color: #003c79; }
.tooltip.bottom-right .tooltip-arrow {
  top: 0;
  left: 5px;
  margin-top: -5px;
  border-width: 0 5px 5px;
  border-bottom-color: #003c79; }

.popover {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1060;
  display: none;
  max-width: 300px;
  padding: 1px;
  font-family: Arial Narrow, Arial, sans-serif;
  font-size: 16px;
  font-weight: normal;
  line-height: 1.428571429;
  text-align: left;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ccc;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  white-space: normal; }
  .popover .panel-body {
    padding: 0;
    min-width: 200px; }
    .popover .panel-body span {
      font-weight: bold; }
  .popover.top {
    margin-top: 0; }
  .popover.right {
    margin-left: 10px;
    margin-top: 7px; }
  .popover.bottom {
    margin-top: 10px; }
  .popover.left {
    margin-left: -10px;
    margin-top: 7px; }

.popover-title {
  margin: 0;
  padding: 8px 14px;
  font-size: 16px;
  background-color: #f7f7f7;
  border-bottom: 1px solid #ebebeb;
  border-radius: 5px 5px 0 0; }

.popover-content {
  padding: 9px 14px; }
  .popover-content .list-infos {
    font-size: 14px; }
    .popover-content .list-infos li {
      display: block; }

.popover > .arrow, .popover > .arrow:after {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid; }

.popover > .arrow {
  border-width: 11px; }

.popover > .arrow:after {
  border-width: 10px;
  content: ""; }

.popover.top > .arrow {
  left: 50%;
  margin-left: -11px;
  border-bottom-width: 0;
  border-top-color: #999999;
  border-top-color: rgba(0, 0, 0, 0.25);
  bottom: -11px; }
  .popover.top > .arrow:after {
    content: " ";
    bottom: 1px;
    margin-left: -10px;
    border-bottom-width: 0;
    border-top-color: #fff; }
.popover.right > .arrow {
  top: 50%;
  left: -11px;
  margin-top: -11px;
  border-left-width: 0;
  border-right-color: #999999;
  border-right-color: rgba(0, 0, 0, 0.25); }
  .popover.right > .arrow:after {
    content: " ";
    left: 1px;
    bottom: -10px;
    border-left-width: 0;
    border-right-color: #fff; }
.popover.bottom > .arrow {
  left: 50%;
  margin-left: -11px;
  border-top-width: 0;
  border-bottom-color: #999999;
  border-bottom-color: rgba(0, 0, 0, 0.25);
  top: -11px; }
  .popover.bottom > .arrow:after {
    content: " ";
    top: 1px;
    margin-left: -10px;
    border-top-width: 0;
    border-bottom-color: #fff; }
.popover.left > .arrow {
  top: 50%;
  right: -11px;
  margin-top: -11px;
  border-right-width: 0;
  border-left-color: #999999;
  border-left-color: rgba(0, 0, 0, 0.25); }
  .popover.left > .arrow:after {
    content: " ";
    right: 1px;
    border-right-width: 0;
    border-left-color: #fff;
    bottom: -10px; }

.carousel {
  position: relative; }

.carousel-inner {
  position: relative;
  overflow: hidden;
  width: 90%;
  margin: 0 auto 50px auto; }
  .carousel-inner > .item {
    display: none;
    position: relative;
    -webkit-transition: .6s ease-in-out left;
    transition: .6s ease-in-out left; }
    .carousel-inner > .item > img, .carousel-inner > .item > a > img {
      display: block;
      max-width: 100%;
      height: auto;
      line-height: 1; }
    @media all and (transform-3d), (-webkit-transform-3d) {
      .carousel-inner > .item {
        -webkit-transition: -webkit-transform 0.6s ease-in-out;
        transition: transform 0.6s ease-in-out;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        -webkit-perspective: 1000;
        perspective: 1000; }
        .carousel-inner > .item.next, .carousel-inner > .item.active.right {
          -webkit-transform: translate3d(100%, 0, 0);
          transform: translate3d(100%, 0, 0);
          left: 0; }
        .carousel-inner > .item.prev, .carousel-inner > .item.active.left {
          -webkit-transform: translate3d(-100%, 0, 0);
          transform: translate3d(-100%, 0, 0);
          left: 0; }
        .carousel-inner > .item.next.left, .carousel-inner > .item.prev.right, .carousel-inner > .item.active {
          -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
          left: 0; } }
  .carousel-inner > .active, .carousel-inner > .next, .carousel-inner > .prev {
    display: block; }
  .carousel-inner > .active {
    left: 0; }
  .carousel-inner > .next, .carousel-inner > .prev {
    position: absolute;
    top: 0;
    width: 100%; }
  .carousel-inner > .next {
    left: 100%; }
  .carousel-inner > .prev {
    left: -100%; }
  .carousel-inner > .next.left, .carousel-inner > .prev.right {
    left: 0; }
  .carousel-inner > .active.left {
    left: -100%; }
  .carousel-inner > .active.right {
    left: 100%; }

.carousel-control {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 30px;
  font-size: 20px;
  color: #fff;
  text-align: center;
  margin-bottom: 0; }
  .carousel-control.right {
    left: auto;
    right: 0; }
  .carousel-control:hover, .carousel-control:focus {
    outline: 0;
    text-decoration: none; }
  .carousel-control .icon-prev, .carousel-control .icon-next, .carousel-control .glyphicon-chevron-left, .carousel-control .glyphicon-chevron-right {
    position: absolute;
    top: 50%;
    z-index: 5;
    display: inline-block; }
  .carousel-control .icon-prev, .carousel-control .glyphicon-chevron-left {
    left: 50%;
    margin-left: -10px; }
  .carousel-control .icon-next, .carousel-control .glyphicon-chevron-right {
    right: 50%;
    margin-right: -10px; }
  .carousel-control .icon-prev, .carousel-control .icon-next {
    width: 20px;
    height: 20px;
    margin-top: -10px;
    line-height: 1;
    font-family: serif; }
  .carousel-control .icon-prev:before {
    content: '\2039'; }
  .carousel-control .icon-next:before {
    content: '\203a'; }

.carousel-indicators {
  position: absolute;
  bottom: -35px;
  left: 50%;
  z-index: 15;
  width: 60%;
  margin-left: -30%;
  padding-left: 0;
  list-style: none;
  text-align: center; }
  .carousel-indicators li {
    display: inline-block;
    width: 10px;
    height: 10px;
    margin: 0 3px;
    text-indent: -999px;
    border: 1px solid #42145f;
    border-radius: 10px;
    cursor: pointer;
    background-color: #000 \9;
    background-color: transparent; }
  .carousel-indicators .active {
    margin-bottom: -1px;
    width: 12px;
    height: 12px;
    background-color: #42145f; }

.carousel-caption {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  padding: 10px;
  color: #fff;
  text-align: left;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
  background: rgba(0, 0, 0, 0.75); }
  .carousel-caption .btn {
    text-shadow: none; }
  .carousel-caption h3, .carousel-caption p {
    color: #fff;
    margin-bottom: 0; }
  .carousel-caption h3 {
    margin-top: 0; }

@media screen and (min-width: 1024px) {
  .carousel-control .glyphicon-chevron-left, .carousel-control .glyphicon-chevron-right, .carousel-control .icon-prev, .carousel-control .icon-next {
    width: 30px;
    height: 30px;
    margin-top: -15px; }
  .carousel-control .glyphicon-chevron-left, .carousel-control .icon-prev {
    margin-left: -15px; }
  .carousel-control .glyphicon-chevron-right, .carousel-control .icon-next {
    margin-right: -15px; } }

input[type=range] {
  width: 300px; }

ul[af-carousel] {
  overflow: hidden;
  padding: 0;
  white-space: nowrap;
  position: relative;
  -webkit-perspective: 1000px;
          perspective: 1000px;
  width: 90%;
  min-height: 250px;
  margin: 0 auto 50px auto;
  -ms-touch-action: pan-y;
  touch-action: pan-y; }
  ul[af-carousel] > li {
    color: black;
    -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
    overflow: visible;
    vertical-align: top;
    position: absolute;
    left: 0;
    right: 0;
    white-space: normal;
    padding: 0;
    margin: 0;
    list-style-type: none;
    width: 100%;
    height: 100%;
    display: inline-block; }
    ul[af-carousel] > li img {
      display: block;
      max-width: 100%;
      height: auto;
      line-height: 1; }

/* prevent flickering when moving buffer */
ul[carousel-buffered] > li {
  display: none; }

ul[af-carousel-transition="hexagon"] {
  overflow: visible; }

/*
 * Aside element
 */
.aside-open {
  overflow: hidden;
  padding-right: 17px; }
  .aside-open .main-title.affix {
    padding-right: 17px; }

@media (max-device-width: 1024px) {
  .aside-open {
    padding-right: 0; }
    .aside-open .main-title.affix {
      padding-right: 0; } }

.aside {
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 1039;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  min-width: 320px;
  background: white; }
  .aside:focus {
    outline: none; }
  @media (max-width: 1279px) {
    .aside {
      min-width: 240px; } }
  .aside.left {
    right: auto;
    left: 0;
    box-shadow: 3px 0 10px 0 rgba(0, 0, 0, 0.3); }
  .aside.right {
    right: 0;
    left: auto; }
  .aside .aside-dialog .aside-header {
    padding: 1px 15px; }
    .aside .aside-dialog .aside-header .close {
      margin-top: -4px; }
  .aside .aside-dialog .aside-body {
    padding: 0 20px; }
    .aside .aside-dialog .aside-body .navbar-nav {
      margin: 0 -20px; }
    .aside .aside-dialog .aside-body .nav {
      float: none;
      border: none; }
      .aside .aside-dialog .aside-body .nav li {
        display: block;
        float: none; }
        .aside .aside-dialog .aside-body .nav li a {
          color: #333; }
          .aside .aside-dialog .aside-body .nav li a:hover, .aside .aside-dialog .aside-body .nav li a:focus {
            color: #fff; }
        .aside .aside-dialog .aside-body .nav li.active > a {
          color: #fff;
          background-color: #42145f; }
      .aside .aside-dialog .aside-body .nav .dropdown.open .dropdown-menu {
        display: block;
        float: none;
        position: static;
        border: none;
        box-shadow: none;
        background: #eee; }

.am-collapse {
  -webkit-animation-duration: 0.3s;
          animation-duration: 0.3s;
  -webkit-animation-timing-function: ease;
          animation-timing-function: ease;
  -webkit-animation-fill-mode: backwards;
          animation-fill-mode: backwards;
  opacity: 1; }
  .am-collapse.am-collapse-add, .am-collapse.ng-hide-remove, .am-collapse.ng-move {
    -webkit-animation-name: expand;
            animation-name: expand; }
  .am-collapse.am-collapse-remove, .am-collapse.ng-hide {
    -webkit-animation-name: collapse;
            animation-name: collapse; }
  .am-collapse.ng-enter {
    visibility: hidden;
    -webkit-animation-name: expand;
            animation-name: expand;
    -webkit-animation-play-state: paused;
            animation-play-state: paused; }
    .am-collapse.ng-enter.ng-enter-active {
      visibility: visible;
      -webkit-animation-play-state: running;
              animation-play-state: running; }
  .am-collapse.ng-leave {
    -webkit-animation-name: collapse;
            animation-name: collapse;
    -webkit-animation-play-state: paused;
            animation-play-state: paused; }
    .am-collapse.ng-leave.ng-leave-active {
      -webkit-animation-play-state: running;
              animation-play-state: running; }

@-webkit-keyframes expand {
  from {
    max-height: 0px; }

  to {
    max-height: 500px; } }

@keyframes expand {
  from {
    max-height: 0px; }

  to {
    max-height: 500px; } }

@-webkit-keyframes collapse {
  from {
    max-height: 500px; }

  to {
    max-height: 0px; } }

@keyframes collapse {
  from {
    max-height: 500px; }

  to {
    max-height: 0px; } }

.panel-collapse.am-collapse.in-remove {
  -webkit-animation-name: collapse;
          animation-name: collapse;
  display: block;
  overflow: hidden; }
.panel-collapse.am-collapse.in-add {
  -webkit-animation-name: expand;
          animation-name: expand;
  overflow: hidden; }

.am-fade {
  -webkit-animation-duration: 0.15s;
          animation-duration: 0.15s;
  -webkit-animation-timing-function: linear;
          animation-timing-function: linear;
  -webkit-animation-fill-mode: backwards;
          animation-fill-mode: backwards;
  opacity: 1; }
  .am-fade.am-fade-add, .am-fade.ng-hide-remove, .am-fade.ng-move {
    -webkit-animation-name: fadeIn;
            animation-name: fadeIn; }
  .am-fade.am-fade-remove, .am-fade.ng-hide {
    -webkit-animation-name: fadeOut;
            animation-name: fadeOut; }
  .am-fade.ng-enter {
    visibility: hidden;
    -webkit-animation-name: fadeIn;
            animation-name: fadeIn;
    -webkit-animation-play-state: paused;
            animation-play-state: paused; }
    .am-fade.ng-enter.ng-enter-active {
      visibility: visible;
      -webkit-animation-play-state: running;
              animation-play-state: running; }
  .am-fade.ng-leave {
    -webkit-animation-name: fadeOut;
            animation-name: fadeOut;
    -webkit-animation-play-state: paused;
            animation-play-state: paused; }
    .am-fade.ng-leave.ng-leave-active {
      -webkit-animation-play-state: running;
              animation-play-state: running; }

@-webkit-keyframes fadeIn {
  from {
    opacity: 0; }

  to {
    opacity: 1; } }

@keyframes fadeIn {
  from {
    opacity: 0; }

  to {
    opacity: 1; } }

@-webkit-keyframes fadeOut {
  from {
    opacity: 1; }

  to {
    opacity: 0; } }

@keyframes fadeOut {
  from {
    opacity: 1; }

  to {
    opacity: 0; } }

.tab-pane.am-fade.active-remove {
  display: none !important; }
.tab-pane.am-fade.active-add {
  -webkit-animation-name: fadeIn;
          animation-name: fadeIn; }

.modal-backdrop.am-fade, .am-fade.aside-backdrop, .aside-backdrop.am-fade {
  background: rgba(0, 0, 0, 0.5);
  -webkit-animation-duration: 0.075s;
          animation-duration: 0.075s; }
  .modal-backdrop.am-fade.ng-leave, .am-fade.ng-leave.aside-backdrop, .aside-backdrop.am-fade.ng-leave {
    -webkit-animation-delay: 0.15s;
            animation-delay: 0.15s; }

.am-fade-and-scale {
  -webkit-animation-duration: 0.3s;
          animation-duration: 0.3s;
  -webkit-animation-timing-function: ease-in-out;
          animation-timing-function: ease-in-out;
  -webkit-animation-fill-mode: backwards;
          animation-fill-mode: backwards; }
  .am-fade-and-scale.ng-enter, .am-fade-and-scale.am-fade-and-scale-add, .am-fade-and-scale.ng-hide-remove, .am-fade-and-scale.ng-move {
    -webkit-animation-name: fadeAndScaleIn;
            animation-name: fadeAndScaleIn; }
  .am-fade-and-scale.ng-leave, .am-fade-and-scale.am-fade-and-scale-remove, .am-fade-and-scale.ng-hide {
    -webkit-animation-name: fadeAndScaleOut;
            animation-name: fadeAndScaleOut; }
  .am-fade-and-scale.ng-enter {
    visibility: hidden;
    -webkit-animation-name: fadeAndScaleIn;
            animation-name: fadeAndScaleIn;
    -webkit-animation-play-state: paused;
            animation-play-state: paused; }
    .am-fade-and-scale.ng-enter.ng-enter-active {
      visibility: visible;
      -webkit-animation-play-state: running;
              animation-play-state: running; }
  .am-fade-and-scale.ng-leave {
    -webkit-animation-name: fadeAndScaleOut;
            animation-name: fadeAndScaleOut;
    -webkit-animation-play-state: paused;
            animation-play-state: paused; }
    .am-fade-and-scale.ng-leave.ng-leave-active {
      -webkit-animation-play-state: running;
              animation-play-state: running; }

@-webkit-keyframes fadeAndScaleIn {
  from {
    opacity: 0;
    -webkit-transform: scale(0.7);
            transform: scale(0.7); }

  to {
    opacity: 1; } }

@keyframes fadeAndScaleIn {
  from {
    opacity: 0;
    -webkit-transform: scale(0.7);
            transform: scale(0.7); }

  to {
    opacity: 1; } }

@-webkit-keyframes fadeAndScaleOut {
  from {
    opacity: 1; }

  to {
    opacity: 0;
    -webkit-transform: scale(0.7);
            transform: scale(0.7); } }

@keyframes fadeAndScaleOut {
  from {
    opacity: 1; }

  to {
    opacity: 0;
    -webkit-transform: scale(0.7);
            transform: scale(0.7); } }

.am-fade-and-slide-top {
  -webkit-animation-duration: 0.3s;
          animation-duration: 0.3s;
  -webkit-animation-timing-function: ease-in-out;
          animation-timing-function: ease-in-out;
  -webkit-animation-fill-mode: backwards;
          animation-fill-mode: backwards; }
  .am-fade-and-slide-top.am-fade-and-slide-top-add, .am-fade-and-slide-top.ng-hide-remove, .am-fade-and-slide-top.ng-move {
    -webkit-animation-name: fadeAndSlideFromTop;
            animation-name: fadeAndSlideFromTop; }
  .am-fade-and-slide-top.am-fade-and-slide-top-remove, .am-fade-and-slide-top.ng-hide {
    -webkit-animation-name: fadeAndSlideToTop;
            animation-name: fadeAndSlideToTop; }
  .am-fade-and-slide-top.ng-enter {
    visibility: hidden;
    -webkit-animation-name: fadeAndSlideFromTop;
            animation-name: fadeAndSlideFromTop;
    -webkit-animation-play-state: paused;
            animation-play-state: paused; }
    .am-fade-and-slide-top.ng-enter.ng-enter-active {
      visibility: visible;
      -webkit-animation-play-state: running;
              animation-play-state: running; }
  .am-fade-and-slide-top.ng-leave {
    -webkit-animation-name: fadeAndSlideToTop;
            animation-name: fadeAndSlideToTop;
    -webkit-animation-play-state: paused;
            animation-play-state: paused; }
    .am-fade-and-slide-top.ng-leave.ng-leave-active {
      -webkit-animation-play-state: running;
              animation-play-state: running; }

.am-fade-and-slide-right {
  -webkit-animation-duration: 0.3s;
          animation-duration: 0.3s;
  -webkit-animation-timing-function: ease-in-out;
          animation-timing-function: ease-in-out;
  -webkit-animation-fill-mode: backwards;
          animation-fill-mode: backwards; }
  .am-fade-and-slide-right.am-fade-and-slide-right-add, .am-fade-and-slide-right.ng-hide-remove, .am-fade-and-slide-right.ng-move {
    -webkit-animation-name: fadeAndSlideFromRight;
            animation-name: fadeAndSlideFromRight; }
  .am-fade-and-slide-right.am-fade-and-slide-right-remove, .am-fade-and-slide-right.ng-hide {
    -webkit-animation-name: fadeAndSlideToRight;
            animation-name: fadeAndSlideToRight; }
  .am-fade-and-slide-right.ng-enter {
    visibility: hidden;
    -webkit-animation-name: fadeAndSlideFromRight;
            animation-name: fadeAndSlideFromRight;
    -webkit-animation-play-state: paused;
            animation-play-state: paused; }
    .am-fade-and-slide-right.ng-enter.ng-enter-active {
      visibility: visible;
      -webkit-animation-play-state: running;
              animation-play-state: running; }
  .am-fade-and-slide-right.ng-leave {
    -webkit-animation-name: fadeAndSlideToRight;
            animation-name: fadeAndSlideToRight;
    -webkit-animation-play-state: paused;
            animation-play-state: paused; }
    .am-fade-and-slide-right.ng-leave.ng-leave-active {
      -webkit-animation-play-state: running;
              animation-play-state: running; }

.am-fade-and-slide-bottom {
  -webkit-animation-duration: 0.3s;
          animation-duration: 0.3s;
  -webkit-animation-timing-function: ease-in-out;
          animation-timing-function: ease-in-out;
  -webkit-animation-fill-mode: backwards;
          animation-fill-mode: backwards; }
  .am-fade-and-slide-bottom.am-fade-and-slide-bottom-add, .am-fade-and-slide-bottom.ng-hide-remove, .am-fade-and-slide-bottom.ng-move {
    -webkit-animation-name: fadeAndSlideFromBottom;
            animation-name: fadeAndSlideFromBottom; }
  .am-fade-and-slide-bottom.am-fade-and-slide-bottom-remove, .am-fade-and-slide-bottom.ng-hide {
    -webkit-animation-name: fadeAndSlideToBottom;
            animation-name: fadeAndSlideToBottom; }
  .am-fade-and-slide-bottom.ng-enter {
    visibility: hidden;
    -webkit-animation-name: fadeAndSlideFromBottom;
            animation-name: fadeAndSlideFromBottom;
    -webkit-animation-play-state: paused;
            animation-play-state: paused; }
    .am-fade-and-slide-bottom.ng-enter.ng-enter-active {
      visibility: visible;
      -webkit-animation-play-state: running;
              animation-play-state: running; }
  .am-fade-and-slide-bottom.ng-leave {
    -webkit-animation-name: fadeAndSlideToBottom;
            animation-name: fadeAndSlideToBottom;
    -webkit-animation-play-state: paused;
            animation-play-state: paused; }
    .am-fade-and-slide-bottom.ng-leave.ng-leave-active {
      -webkit-animation-play-state: running;
              animation-play-state: running; }

.am-fade-and-slide-left {
  -webkit-animation-duration: 0.3s;
          animation-duration: 0.3s;
  -webkit-animation-timing-function: ease-in-out;
          animation-timing-function: ease-in-out;
  -webkit-animation-fill-mode: backwards;
          animation-fill-mode: backwards; }
  .am-fade-and-slide-left.am-fade-and-slide-left-add, .am-fade-and-slide-left.ng-hide-remove, .am-fade-and-slide-left.ng-move {
    -webkit-animation-fill-mode: backwards;
            animation-fill-mode: backwards;
    -webkit-animation-name: fadeAndSlideFromLeft;
            animation-name: fadeAndSlideFromLeft; }
  .am-fade-and-slide-left.am-fade-and-slide-left-remove, .am-fade-and-slide-left.ng-hide {
    -webkit-animation-name: fadeAndSlideToLeft;
            animation-name: fadeAndSlideToLeft; }
  .am-fade-and-slide-left.ng-enter {
    visibility: hidden;
    -webkit-animation-name: fadeAndSlideFromLeft;
            animation-name: fadeAndSlideFromLeft;
    -webkit-animation-play-state: paused;
            animation-play-state: paused; }
    .am-fade-and-slide-left.ng-enter.ng-enter-active {
      visibility: visible;
      -webkit-animation-play-state: running;
              animation-play-state: running; }
  .am-fade-and-slide-left.ng-leave {
    -webkit-animation-name: fadeAndSlideToLeft;
            animation-name: fadeAndSlideToLeft;
    -webkit-animation-play-state: paused;
            animation-play-state: paused; }
    .am-fade-and-slide-left.ng-leave.ng-leave-active {
      -webkit-animation-play-state: running;
              animation-play-state: running; }

@-webkit-keyframes fadeAndSlideFromTop {
  from {
    opacity: 0;
    -webkit-transform: translateY(-20%);
            transform: translateY(-20%); }

  to {
    opacity: 1; } }

@keyframes fadeAndSlideFromTop {
  from {
    opacity: 0;
    -webkit-transform: translateY(-20%);
            transform: translateY(-20%); }

  to {
    opacity: 1; } }

@-webkit-keyframes fadeAndSlideToTop {
  from {
    opacity: 1; }

  to {
    opacity: 0;
    -webkit-transform: translateY(-20%);
            transform: translateY(-20%); } }

@keyframes fadeAndSlideToTop {
  from {
    opacity: 1; }

  to {
    opacity: 0;
    -webkit-transform: translateY(-20%);
            transform: translateY(-20%); } }

@-webkit-keyframes fadeAndSlideFromRight {
  from {
    opacity: 0;
    -webkit-transform: translateX(20%);
            transform: translateX(20%); }

  to {
    opacity: 1; } }

@keyframes fadeAndSlideFromRight {
  from {
    opacity: 0;
    -webkit-transform: translateX(20%);
            transform: translateX(20%); }

  to {
    opacity: 1; } }

@-webkit-keyframes fadeAndSlideToRight {
  from {
    opacity: 1; }

  to {
    opacity: 0;
    -webkit-transform: translateX(20%);
            transform: translateX(20%); } }

@keyframes fadeAndSlideToRight {
  from {
    opacity: 1; }

  to {
    opacity: 0;
    -webkit-transform: translateX(20%);
            transform: translateX(20%); } }

@-webkit-keyframes fadeAndSlideFromBottom {
  from {
    opacity: 0;
    -webkit-transform: translateY(20%);
            transform: translateY(20%); }

  to {
    opacity: 1; } }

@keyframes fadeAndSlideFromBottom {
  from {
    opacity: 0;
    -webkit-transform: translateY(20%);
            transform: translateY(20%); }

  to {
    opacity: 1; } }

@-webkit-keyframes fadeAndSlideToBottom {
  from {
    opacity: 1; }

  to {
    opacity: 0;
    -webkit-transform: translateY(20%);
            transform: translateY(20%); } }

@keyframes fadeAndSlideToBottom {
  from {
    opacity: 1; }

  to {
    opacity: 0;
    -webkit-transform: translateY(20%);
            transform: translateY(20%); } }

@-webkit-keyframes fadeAndSlideFromLeft {
  from {
    opacity: 0;
    -webkit-transform: translateX(-20%);
            transform: translateX(-20%); }

  to {
    opacity: 1; } }

@keyframes fadeAndSlideFromLeft {
  from {
    opacity: 0;
    -webkit-transform: translateX(-20%);
            transform: translateX(-20%); }

  to {
    opacity: 1; } }

@-webkit-keyframes fadeAndSlideToLeft {
  from {
    opacity: 1; }

  to {
    opacity: 0;
    -webkit-transform: translateX(-20%);
            transform: translateX(-20%); } }

@keyframes fadeAndSlideToLeft {
  from {
    opacity: 1; }

  to {
    opacity: 0;
    -webkit-transform: translateX(-20%);
            transform: translateX(-20%); } }

.am-flip-x {
  -webkit-animation-duration: 0.4s;
          animation-duration: 0.4s;
  -webkit-animation-timing-function: ease;
          animation-timing-function: ease;
  -webkit-animation-fill-mode: backwards;
          animation-fill-mode: backwards; }
  .am-flip-x.am-flip-x-add, .am-flip-x.ng-hide-remove, .am-flip-x.ng-move {
    -webkit-animation-name: flipInXBounce;
            animation-name: flipInXBounce; }
  .am-flip-x.am-flip-x-remove, .am-flip-x.ng-hide {
    -webkit-animation-name: flipOutX;
            animation-name: flipOutX; }
  .am-flip-x.ng-enter {
    visibility: hidden;
    -webkit-animation-name: flipInXBounce;
            animation-name: flipInXBounce;
    -webkit-animation-play-state: paused;
            animation-play-state: paused; }
    .am-flip-x.ng-enter.ng-enter-active {
      visibility: visible;
      -webkit-animation-play-state: running;
              animation-play-state: running; }
  .am-flip-x.ng-leave {
    -webkit-animation-name: flipOutX;
            animation-name: flipOutX;
    -webkit-animation-play-state: paused;
            animation-play-state: paused; }
    .am-flip-x.ng-leave.ng-leave-active {
      -webkit-animation-play-state: running;
              animation-play-state: running; }

.am-flip-x-linear {
  -webkit-animation-duration: 0.4s;
          animation-duration: 0.4s;
  -webkit-animation-timing-function: ease;
          animation-timing-function: ease;
  -webkit-animation-fill-mode: backwards;
          animation-fill-mode: backwards; }
  .am-flip-x-linear.am-flip-x-add, .am-flip-x-linear.ng-hide-remove, .am-flip-x-linear.ng-move {
    -webkit-animation-name: flipInX;
            animation-name: flipInX; }
  .am-flip-x-linear.am-flip-x-remove, .am-flip-x-linear.ng-hide {
    -webkit-animation-name: flipOutX;
            animation-name: flipOutX; }
  .am-flip-x-linear.ng-enter {
    visibility: hidden;
    -webkit-animation-name: flipInX;
            animation-name: flipInX;
    -webkit-animation-play-state: paused;
            animation-play-state: paused; }
    .am-flip-x-linear.ng-enter.ng-enter-active {
      visibility: visible;
      -webkit-animation-play-state: running;
              animation-play-state: running; }
  .am-flip-x-linear.ng-leave {
    -webkit-animation-name: flipOutX;
            animation-name: flipOutX;
    -webkit-animation-play-state: paused;
            animation-play-state: paused; }
    .am-flip-x-linear.ng-leave.ng-leave-active {
      -webkit-animation-play-state: running;
              animation-play-state: running; }

@-webkit-keyframes flipInX {
  from {
    opacity: 0;
    -webkit-transform: perspective(400px) rotateX(90deg);
            transform: perspective(400px) rotateX(90deg); }

  to {
    opacity: 1;
    -webkit-transform: perspective(400px) rotateX(0deg);
            transform: perspective(400px) rotateX(0deg); } }

@keyframes flipInX {
  from {
    opacity: 0;
    -webkit-transform: perspective(400px) rotateX(90deg);
            transform: perspective(400px) rotateX(90deg); }

  to {
    opacity: 1;
    -webkit-transform: perspective(400px) rotateX(0deg);
            transform: perspective(400px) rotateX(0deg); } }

@-webkit-keyframes flipInXBounce {
  from {
    opacity: 0;
    -webkit-transform: perspective(400px) rotateX(90deg);
            transform: perspective(400px) rotateX(90deg); }

  40% {
    -webkit-transform: perspective(400px) rotateX(-10deg);
            transform: perspective(400px) rotateX(-10deg); }

  70% {
    -webkit-transform: perspective(400px) rotateX(10deg);
            transform: perspective(400px) rotateX(10deg); }

  to {
    opacity: 1;
    -webkit-transform: perspective(400px) rotateX(0deg);
            transform: perspective(400px) rotateX(0deg); } }

@keyframes flipInXBounce {
  from {
    opacity: 0;
    -webkit-transform: perspective(400px) rotateX(90deg);
            transform: perspective(400px) rotateX(90deg); }

  40% {
    -webkit-transform: perspective(400px) rotateX(-10deg);
            transform: perspective(400px) rotateX(-10deg); }

  70% {
    -webkit-transform: perspective(400px) rotateX(10deg);
            transform: perspective(400px) rotateX(10deg); }

  to {
    opacity: 1;
    -webkit-transform: perspective(400px) rotateX(0deg);
            transform: perspective(400px) rotateX(0deg); } }

@-webkit-keyframes flipOutX {
  from {
    opacity: 1;
    -webkit-transform: perspective(400px) rotateX(0deg);
            transform: perspective(400px) rotateX(0deg); }

  to {
    opacity: 0;
    -webkit-transform: perspective(400px) rotateX(90deg);
            transform: perspective(400px) rotateX(90deg); } }

@keyframes flipOutX {
  from {
    opacity: 1;
    -webkit-transform: perspective(400px) rotateX(0deg);
            transform: perspective(400px) rotateX(0deg); }

  to {
    opacity: 0;
    -webkit-transform: perspective(400px) rotateX(90deg);
            transform: perspective(400px) rotateX(90deg); } }

.am-slide-top {
  -webkit-animation-duration: 0.3s;
          animation-duration: 0.3s;
  -webkit-animation-timing-function: ease-in-out;
          animation-timing-function: ease-in-out;
  -webkit-animation-fill-mode: backwards;
          animation-fill-mode: backwards; }
  .am-slide-top.am-slide-top-add, .am-slide-top.ng-hide-remove, .am-slide-top.ng-move {
    -webkit-animation-name: slideFromTop;
            animation-name: slideFromTop; }
  .am-slide-top.am-slide-top-remove, .am-slide-top.ng-hide {
    -webkit-animation-name: slideToTop;
            animation-name: slideToTop; }
  .am-slide-top.ng-enter {
    visibility: hidden;
    -webkit-animation-name: slideFromTop;
            animation-name: slideFromTop;
    -webkit-animation-play-state: paused;
            animation-play-state: paused; }
    .am-slide-top.ng-enter.ng-enter-active {
      visibility: visible;
      -webkit-animation-play-state: running;
              animation-play-state: running; }
  .am-slide-top.ng-leave {
    -webkit-animation-name: slideToTop;
            animation-name: slideToTop;
    -webkit-animation-play-state: paused;
            animation-play-state: paused; }
    .am-slide-top.ng-leave.ng-leave-active {
      -webkit-animation-play-state: running;
              animation-play-state: running; }

.am-slide-right {
  -webkit-animation-duration: 0.3s;
          animation-duration: 0.3s;
  -webkit-animation-timing-function: ease-in-out;
          animation-timing-function: ease-in-out;
  -webkit-animation-fill-mode: backwards;
          animation-fill-mode: backwards; }
  .am-slide-right.am-slide-right-add, .am-slide-right.ng-hide-remove, .am-slide-right.ng-move {
    -webkit-animation-name: slideFromRight;
            animation-name: slideFromRight; }
  .am-slide-right.am-slide-right-remove, .am-slide-right.ng-hide {
    -webkit-animation-name: slideToRight;
            animation-name: slideToRight; }
  .am-slide-right.ng-enter {
    visibility: hidden;
    -webkit-animation-name: slideFromRight;
            animation-name: slideFromRight;
    -webkit-animation-play-state: paused;
            animation-play-state: paused; }
    .am-slide-right.ng-enter.ng-enter-active {
      visibility: visible;
      -webkit-animation-play-state: running;
              animation-play-state: running; }
  .am-slide-right.ng-leave {
    -webkit-animation-name: slideToRight;
            animation-name: slideToRight;
    -webkit-animation-play-state: paused;
            animation-play-state: paused; }
    .am-slide-right.ng-leave.ng-leave-active {
      -webkit-animation-play-state: running;
              animation-play-state: running; }

.am-slide-bottom {
  -webkit-animation-duration: 0.3s;
          animation-duration: 0.3s;
  -webkit-animation-timing-function: ease-in-out;
          animation-timing-function: ease-in-out;
  -webkit-animation-fill-mode: backwards;
          animation-fill-mode: backwards; }
  .am-slide-bottom.am-slide-bottom-add, .am-slide-bottom.ng-hide-remove, .am-slide-bottom.ng-move {
    -webkit-animation-name: slideFromBottom;
            animation-name: slideFromBottom; }
  .am-slide-bottom.am-slide-bottom-remove, .am-slide-bottom.ng-hide {
    -webkit-animation-name: slideToBottom;
            animation-name: slideToBottom; }
  .am-slide-bottom.ng-enter {
    visibility: hidden;
    -webkit-animation-name: slideFromBottom;
            animation-name: slideFromBottom;
    -webkit-animation-play-state: paused;
            animation-play-state: paused; }
    .am-slide-bottom.ng-enter.ng-enter-active {
      visibility: visible;
      -webkit-animation-play-state: running;
              animation-play-state: running; }
  .am-slide-bottom.ng-leave {
    -webkit-animation-name: slideToBottom;
            animation-name: slideToBottom;
    -webkit-animation-play-state: paused;
            animation-play-state: paused; }
    .am-slide-bottom.ng-leave.ng-leave-active {
      -webkit-animation-play-state: running;
              animation-play-state: running; }

.am-slide-left {
  -webkit-animation-duration: 0.3s;
          animation-duration: 0.3s;
  -webkit-animation-timing-function: ease-in-out;
          animation-timing-function: ease-in-out;
  -webkit-animation-fill-mode: backwards;
          animation-fill-mode: backwards; }
  .am-slide-left.am-slide-left-add, .am-slide-left.ng-hide-remove, .am-slide-left.ng-move {
    -webkit-animation-name: slideFromLeft;
            animation-name: slideFromLeft; }
  .am-slide-left.am-slide-left-remove, .am-slide-left.ng-hide {
    -webkit-animation-name: slideToLeft;
            animation-name: slideToLeft; }
  .am-slide-left.ng-enter {
    visibility: hidden;
    -webkit-animation-name: slideFromLeft;
            animation-name: slideFromLeft;
    -webkit-animation-play-state: paused;
            animation-play-state: paused; }
    .am-slide-left.ng-enter.ng-enter-active {
      visibility: visible;
      -webkit-animation-play-state: running;
              animation-play-state: running; }
  .am-slide-left.ng-leave {
    -webkit-animation-name: slideToLeft;
            animation-name: slideToLeft;
    -webkit-animation-play-state: paused;
            animation-play-state: paused; }
    .am-slide-left.ng-leave.ng-leave-active {
      -webkit-animation-play-state: running;
              animation-play-state: running; }

@keyframes slideFromTop {
  from {
    -webkit-transform: translateY(-100%);
            transform: translateY(-100%); } }

@keyframes slideToTop {
  to {
    -webkit-transform: translateY(-100%);
            transform: translateY(-100%); } }

@-webkit-keyframes slideFromRight {
  from {
    -webkit-transform: translateX(100%);
            transform: translateX(100%); } }

@keyframes slideFromRight {
  from {
    -webkit-transform: translateX(100%);
            transform: translateX(100%); } }

@-webkit-keyframes slideToRight {
  to {
    -webkit-transform: translateX(100%);
            transform: translateX(100%); } }

@keyframes slideToRight {
  to {
    -webkit-transform: translateX(100%);
            transform: translateX(100%); } }

@-webkit-keyframes slideFromBottom {
  from {
    -webkit-transform: translateY(100%);
            transform: translateY(100%); } }

@keyframes slideFromBottom {
  from {
    -webkit-transform: translateY(100%);
            transform: translateY(100%); } }

@-webkit-keyframes slideToBottom {
  to {
    -webkit-transform: translateY(100%);
            transform: translateY(100%); } }

@keyframes slideToBottom {
  to {
    -webkit-transform: translateY(100%);
            transform: translateY(100%); } }

@-webkit-keyframes slideFromLeft {
  from {
    -webkit-transform: translateX(-100%);
            transform: translateX(-100%); } }

@keyframes slideFromLeft {
  from {
    -webkit-transform: translateX(-100%);
            transform: translateX(-100%); } }

@-webkit-keyframes slideToLeft {
  to {
    -webkit-transform: translateX(-100%);
            transform: translateX(-100%); } }

@keyframes slideToLeft {
  to {
    -webkit-transform: translateX(-100%);
            transform: translateX(-100%); } }

.clearfix:before, .clearfix:after {
  content: " ";
  display: table; }
.clearfix:after {
  clear: both; }

.center-block {
  display: block;
  margin-left: auto;
  margin-right: auto; }

.pull-right {
  float: right !important; }

.pull-left {
  float: left !important; }

.hide {
  display: none !important; }

.show {
  display: block !important; }

.invisible {
  visibility: hidden; }

.text-hide {
  font: 0/0 a;
  color: transparent;
  text-shadow: none;
  background-color: transparent;
  border: 0; }

.hidden {
  display: none !important;
  visibility: hidden !important; }

.affix {
  position: fixed; }
  .affix.panel-sticky {
    top: 0;
    width: 219px; }

.no-padding-right {
  padding-right: 0; }

@-ms-viewport {
  width: device-width; }

.visible-xs {
  display: none !important; }

.visible-sm {
  display: none !important; }

.visible-md {
  display: none !important; }

.visible-lg {
  display: none !important; }

.visible-xs-block, .visible-xs-inline, .visible-xs-inline-block, .visible-sm-block, .visible-sm-inline, .visible-sm-inline-block, .visible-md-block, .visible-md-inline, .visible-md-inline-block, .visible-lg-block, .visible-lg-inline, .visible-lg-inline-block {
  display: none !important; }

@media (max-width: 1023px) {
  .visible-xs {
    display: block !important; }
  table.visible-xs {
    display: table; }
  tr.visible-xs {
    display: table-row !important; }
  th.visible-xs, td.visible-xs {
    display: table-cell !important; } }

@media (max-width: 1023px) {
  .visible-xs-block {
    display: block !important; } }

@media (max-width: 1023px) {
  .visible-xs-inline {
    display: inline !important; } }

@media (max-width: 1023px) {
  .visible-xs-inline-block {
    display: inline-block !important; } }

@media (min-width: 1024px) and (max-width: 1279px) {
  .visible-sm {
    display: block !important; }
  table.visible-sm {
    display: table; }
  tr.visible-sm {
    display: table-row !important; }
  th.visible-sm, td.visible-sm {
    display: table-cell !important; } }

@media (min-width: 1024px) and (max-width: 1279px) {
  .visible-sm-block {
    display: block !important; } }

@media (min-width: 1024px) and (max-width: 1279px) {
  .visible-sm-inline {
    display: inline !important; } }

@media (min-width: 1024px) and (max-width: 1279px) {
  .visible-sm-inline-block {
    display: inline-block !important; } }

@media (min-width: 1280px) and (max-width: 1679px) {
  .visible-md {
    display: block !important; }
  table.visible-md {
    display: table; }
  tr.visible-md {
    display: table-row !important; }
  th.visible-md, td.visible-md {
    display: table-cell !important; } }

@media (min-width: 1280px) and (max-width: 1679px) {
  .visible-md-block {
    display: block !important; } }

@media (min-width: 1280px) and (max-width: 1679px) {
  .visible-md-inline {
    display: inline !important; } }

@media (min-width: 1280px) and (max-width: 1679px) {
  .visible-md-inline-block {
    display: inline-block !important; } }

@media (min-width: 1680px) {
  .visible-lg {
    display: block !important; }
  table.visible-lg {
    display: table; }
  tr.visible-lg {
    display: table-row !important; }
  th.visible-lg, td.visible-lg {
    display: table-cell !important; } }

@media (min-width: 1680px) {
  .visible-lg-block {
    display: block !important; } }

@media (min-width: 1680px) {
  .visible-lg-inline {
    display: inline !important; } }

@media (min-width: 1680px) {
  .visible-lg-inline-block {
    display: inline-block !important; } }

@media (max-width: 1023px) {
  .hidden-xs {
    display: none !important; } }

@media (min-width: 1024px) and (max-width: 1279px) {
  .hidden-sm {
    display: none !important; } }

@media (min-width: 1280px) and (max-width: 1679px) {
  .hidden-md {
    display: none !important; } }

@media (min-width: 1680px) {
  .hidden-lg {
    display: none !important; } }

@media (max-device-width: 1024px) {
  .hidden-mobile {
    display: none; } }

.visible-print {
  display: none !important; }

@media print {
  .visible-print {
    display: block !important; }
  table.visible-print {
    display: table; }
  tr.visible-print {
    display: table-row !important; }
  th.visible-print, td.visible-print {
    display: table-cell !important; } }

.visible-print-block {
  display: none !important; }
  @media print {
    .visible-print-block {
      display: block !important; } }

.visible-print-inline {
  display: none !important; }
  @media print {
    .visible-print-inline {
      display: inline !important; } }

.visible-print-inline-block {
  display: none !important; }
  @media print {
    .visible-print-inline-block {
      display: inline-block !important; } }

@media print {
  .hidden-print {
    display: none !important; } }   jai autre fichioer et je veux  modifier 004893  par var(--color-primary)
