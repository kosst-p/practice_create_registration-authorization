"use strict";

/* параметры для gulp-autoprefixer */
var autoprefixerList = [
    "Chrome >= 45",
    "Firefox ESR",
    "Edge >= 12",
    "Explorer >= 10",
    "iOS >= 9",
    "Safari >= 9",
    "Android >= 4.4",
    "Opera >= 30"
];

/* пути к исходным файлам (src), к готовым файлам (build), а также к тем, за изменениями которых нужно наблюдать (watch) */
var path = {
    build: {
        php: "app/build/",
        html: "app/build/",
        js: "app/build/js/",
        styles: "app/build/styles/",
        img: "app/build/img/",
        fonts: "app/build/fonts/",
        pages: "app/build/pages/",
        includes: "app/build/includes/",
        handlers: "app/build/handlers/",
        guest: "app/build/guest/", // папка guest
        all: "app/build/all/", // папка all
        auth: "app/build/auth/" // папка auth
    },
    src: {
        php: "app/src/*.php",
        html: "app/src/*.html",
        js: "app/src/js/main.js",
        styles: "app/src/styles/main.scss",
        img: "app/src/img/**/*.*",
        fonts: "app/src/fonts/**/*.*",
        pages: "app/src/pages/**/*.*",
        includes: "app/src/includes/**/*.*",
        handlers: "app/src/handlers/**/*.*",
        guest: "app/src/guest/**/*.*", // папка guest
        all: "app/src/all/**/*.*", // папка all
        auth: "app/src/auth/**/*.*" // папка auth
    },
    watch: {
        php: "app/src/**/*.php",
        html: "app/src/**/*.html",
        js: "app/src/js/**/*.js",
        styles: "app/src/styles/**/*.scss",
        img: "app/src/img/**/*.*",
        fonts: "app/srs/fonts/**/*.*",
        pages: "app/src/pages/**/*.php",
        includes: "app/src/includes/**/*.*",
        handlers: "app/src/handlers/**/*.*",
        guest: "app/src/guest/**/*.*", // папка guest
        all: "app/src/all/**/*.*", // папка all
        auth: "app/src/auth/**/*.*" // папка auth
    },
    clean: "./app/build/*"
};

/* настройки сервера */
var config = {
    port: 3005,
    open: "external",
    //host: "tesst.com",
    proxy: "tesst.com", // адрес сервера nginx -> localhost:3000
    browser: "firefox", // запуск браузера по умолчанию
    notify: false
};

/* подключаем gulp и плагины */
var gulp = require("gulp"), // подключаем Gulp
    webserver = require("browser-sync"), // сервер для работы и автоматического обновления страниц
    plumber = require("gulp-plumber"), // модуль для отслеживания ошибок
    rigger = require("gulp-rigger"), // модуль для импорта содержимого одного файла в другой
    sourcemaps = require("gulp-sourcemaps"), // модуль для генерации карты исходных файлов
    // less = require("gulp-less"), // модуль для компиляции LESS в CSS
    sass = require("gulp-sass"), // модуль для компиляции sass в CSS
    autoprefixer = require("gulp-autoprefixer"), // модуль для автоматической установки автопрефиксов
    cleanCSS = require("gulp-clean-css"), // плагин для минимизации CSS
    terser = require("gulp-terser"), // модуль для минимизации JavaScript
    babel = require("gulp-babel"), // компилятор для JavaScript
    // uglify = require("gulp-uglify"), // модуль для минимизации JavaScript
    cache = require("gulp-cache"), // модуль для кэширования
    imagemin = require("gulp-imagemin"), // плагин для сжатия PNG, JPEG, GIF и SVG изображений
    jpegrecompress = require("imagemin-jpeg-recompress"), // плагин для сжатия jpeg
    pngquant = require("imagemin-pngquant"), // плагин для сжатия png
    rimraf = require("gulp-rimraf"), // плагин для удаления файлов и каталогов
    rename = require("gulp-rename");
//php = require("gulp-connect-php");

/* описание задач */

// запуск сервера
gulp.task("webserver", function() {
    webserver(config);
});

// сбор PHP
gulp.task("php:build", function() {
    return gulp
        .src(path.src.php) // выбор всех php файлов по указанному пути
        .pipe(plumber()) // отслеживание ошибок
        .pipe(rigger()) // импорт вложений
        .pipe(gulp.dest(path.build.php)) // выкладывание готовых файлов
        .pipe(webserver.reload({ stream: true })); // перезагрузка сервера
});

// сбор HTML
gulp.task("html:build", function() {
    return gulp
        .src(path.src.html) // выбор всех html файлов по указанному пути
        .pipe(plumber()) // отслеживание ошибок
        .pipe(rigger()) // импорт вложений
        .pipe(gulp.dest(path.build.html)) // выкладывание готовых файлов
        .pipe(webserver.reload({ stream: true })); // перезагрузка сервера
});

// сбор CSS
gulp.task("css:build", function() {
    return (
        gulp
            .src(path.src.styles) // получим main.scss
            .pipe(plumber()) // для отслеживания ошибок
            .pipe(sourcemaps.init()) // инициализируем sourcemap
            /* .pipe(less()) // less -> css */
            .pipe(sass()) // scss -> css
            .pipe(
                autoprefixer({
                    // добавим префиксы
                    overrideBrowserslist: autoprefixerList
                })
            )
            .pipe(gulp.dest(path.build.styles))
            .pipe(rename({ suffix: ".min" }))
            .pipe(cleanCSS()) // минимизируем CSS
            .pipe(sourcemaps.write("./")) // записываем sourcemap
            .pipe(gulp.dest(path.build.styles)) // выгружаем в build
            .pipe(webserver.reload({ stream: true }))
    ); // перезагрузим сервер
});

// сбор JS
gulp.task("js:build", function() {
    return (
        gulp
            .src(path.src.js) // получим файл main.js
            .pipe(plumber()) // для отслеживания ошибок
            .pipe(rigger()) // импортируем все указанные файлы в main.js
            .pipe(gulp.dest(path.build.js))
            .pipe(rename({ suffix: ".min" }))
            .pipe(sourcemaps.init()) //инициализируем sourcemap
            .pipe(babel()) //компилятор для js
            //.pipe(uglify()) // минимизируем js
            .pipe(terser()) // минимизируем js
            .pipe(sourcemaps.write("./")) //  записываем sourcemap
            .pipe(gulp.dest(path.build.js)) // положим готовый файл
            .pipe(webserver.reload({ stream: true }))
    ); // перезагрузим сервер
});

// перенос шрифтов
gulp.task("fonts:build", function() {
    return gulp.src(path.src.fonts).pipe(gulp.dest(path.build.fonts));
});

// обработка картинок
gulp.task("image:build", function() {
    return gulp
        .src(path.src.img) // путь с исходниками картинок
        .pipe(
            cache(
                imagemin([
                    // сжатие изображений
                    imagemin.gifsicle({ interlaced: true }),
                    jpegrecompress({
                        progressive: true,
                        max: 90,
                        min: 80
                    }),
                    pngquant(),
                    imagemin.svgo({ plugins: [{ removeViewBox: false }] })
                ])
            )
        )
        .pipe(gulp.dest(path.build.img)); // выгрузка готовых файлов
});

// удаление каталога build
gulp.task("clean:build", function() {
    return gulp.src(path.clean, { read: false }).pipe(rimraf());
});

// перенос содержимого папки pages
gulp.task("pages:build", function() {
    return gulp.src(path.src.pages).pipe(gulp.dest(path.build.pages));
});

// перенос содержимого папки includes
gulp.task("includes:build", function() {
    return gulp.src(path.src.includes).pipe(gulp.dest(path.build.includes));
});

// перенос содержимого папки handlers
gulp.task("handlers:build", function() {
    return gulp.src(path.src.handlers).pipe(gulp.dest(path.build.handlers));
});

// перенос содержимого папки guest
gulp.task("guest:build", function() {
    return gulp.src(path.src.guest).pipe(gulp.dest(path.build.guest));
});

// перенос содержимого папки all
gulp.task("all:build", function() {
    return gulp.src(path.src.all).pipe(gulp.dest(path.build.all));
});

// перенос содержимого папки auth
gulp.task("auth:build", function() {
    return gulp.src(path.src.auth).pipe(gulp.dest(path.build.auth));
});

// очистка кэша
gulp.task("cache:clear", function() {
    cache.clearAll();
});

// сборка
gulp.task(
    "build",
    gulp.series(
        "clean:build",
        gulp.parallel(
            "php:build",
            "html:build",
            "css:build",
            "js:build",
            "fonts:build",
            "image:build",
            "pages:build",
            "includes:build",
            "handlers:build",
            "guest:build",
            "all:build",
            "auth:build"
        )
    )
);

// запуск задач при изменении файлов
gulp.task("watch", function() {
    gulp.watch(path.watch.php, gulp.series("php:build"));
    gulp.watch(path.watch.html, gulp.series("html:build"));
    gulp.watch(path.watch.styles, gulp.series("css:build"));
    gulp.watch(path.watch.js, gulp.series("js:build"));
    gulp.watch(path.watch.img, gulp.series("image:build"));
    gulp.watch(path.watch.fonts, gulp.series("fonts:build"));
    gulp.watch(path.watch.pages, gulp.series("pages:build"));
    gulp.watch(path.watch.includes, gulp.series("includes:build"));
    gulp.watch(path.watch.handlers, gulp.series("handlers:build"));
    gulp.watch(path.watch.guest, gulp.series("guest:build"));
    gulp.watch(path.watch.all, gulp.series("all:build"));
    gulp.watch(path.watch.auth, gulp.series("auth:build"));
});

// задача по умолчанию
gulp.task("default", gulp.series("build", gulp.parallel("webserver", "watch")));
