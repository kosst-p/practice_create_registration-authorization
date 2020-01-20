// Подключаем jQuery
//= ../../../node_modules/jquery/dist/jquery.min.js

// Подключаем SlickCarousel
//= ../../../node_modules/slick-carousel/slick/slick.min.js

// Подключаем Popper
//= ../../../node_modules/popper.js/dist/umd/popper.js

// Подключаем необходимые js-файлы Bootstrap 4 <br>
//= ../../../node_modules/bootstrap/js/dist/util.js<br>
//= ../../../node_modules/bootstrap/js/dist/alert.js<br>
//= ../../../node_modules/bootstrap/js/dist/button.js<br>
//= ../../../node_modules/bootstrap/js/dist/carousel.js<br>
//= ../../../node_modules/bootstrap/js/dist/collapse.js<br>
//= ../../../node_modules/bootstrap/js/dist/dropdown.js<br>
//= ../../../node_modules/bootstrap/js/dist/modal.js<br>
//= ../../../node_modules/bootstrap/js/dist/tooltip.js<br>
//= ../../../node_modules/bootstrap/js/dist/popover.js<br>
//= ../../../node_modules/bootstrap/js/dist/scrollspy.js<br>
//= ../../../node_modules/bootstrap/js/dist/tab.js<br>
//= ../../../node_modules/bootstrap/js/dist/toast.js<br>

// Импортируем нужные SCSS исходники Bootstrap 4<br>
@import "../../../node_modules/bootstrap/scss/\_functions";<br>
@import "../../../node_modules/bootstrap/scss/\_variables";<br>
@import "../../../node_modules/bootstrap/scss/\_mixins";<br>
@import "../../../node_modules/bootstrap/scss/\_root";<br>
@import "../../../node_modules/bootstrap/scss/\_reboot";<br>
@import "../../../node_modules/bootstrap/scss/\_type";<br>
@import "../../../node_modules/bootstrap/scss/\_images";<br>
@import "../../../node_modules/bootstrap/scss/\_code";<br>
@import "../../../node_modules/bootstrap/scss/\_grid";<br>
@import "../../../node_modules/bootstrap/scss/\_tables";<br>
@import "../../../node_modules/bootstrap/scss/\_forms";<br>
@import "../../../node_modules/bootstrap/scss/\_buttons";<br>
@import "../../../node_modules/bootstrap/scss/\_transitions";<br>
@import "../../../node_modules/bootstrap/scss/\_dropdown";<br>
@import "../../../node_modules/bootstrap/scss/\_button-group";<br>
@import "../../../node_modules/bootstrap/scss/\_input-group";<br>
@import "../../../node_modules/bootstrap/scss/\_custom-forms";<br>
@import "../../../node_modules/bootstrap/scss/\_nav";<br>
@import "../../../node_modules/bootstrap/scss/\_navbar";<br>
@import "../../../node_modules/bootstrap/scss/\_card";<br>
@import "../../../node_modules/bootstrap/scss/\_breadcrumb";<br>
@import "../../../node_modules/bootstrap/scss/\_pagination";<br>
@import "../../../node_modules/bootstrap/scss/\_badge";<br>
@import "../../../node_modules/bootstrap/scss/\_jumbotron";<br>
@import "../../../node_modules/bootstrap/scss/\_alert";<br>
@import "../../../node_modules/bootstrap/scss/\_progress";<br>
@import "../../../node_modules/bootstrap/scss/\_media";<br>
@import "../../../node_modules/bootstrap/scss/\_list-group";<br>
@import "../../../node_modules/bootstrap/scss/\_close";<br>
@import "../../../node_modules/bootstrap/scss/\_toasts";<br>
@import "../../../node_modules/bootstrap/scss/\_modal";<br>
@import "../../../node_modules/bootstrap/scss/\_tooltip";<br>
@import "../../../node_modules/bootstrap/scss/\_popover";<br>
@import "../../../node_modules/bootstrap/scss/\_carousel";<br>
@import "../../../node_modules/bootstrap/scss/\_spinners";<br>
@import "../../../node_modules/bootstrap/scss/\_utilities";<br>
@import "../../../node_modules/bootstrap/scss/\_print";<br>

// Импортируем нужные SCSS файлы SlickCarousel<br>
@import "../../../node_modules/slick-carousel/slick/slick.scss";<br>
@import "../../../node_modules/slick-carousel/slick/slick-theme.scss";<br>

Создается сервер в папке build, адрес у страницы(index.php) - tesst.com.
BrowserSync делает прокси tesst.com на другом порте - External: http://192.168.0.105:3005.
BrowserSync перезагружает и следит только за страницей, которая на прокси(страница открытая напрямую не из прокси не перезагружается)
