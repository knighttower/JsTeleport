const mix = require('laravel-mix');
const path = require('path');
const fs = require('fs');

mix.js('src/JsTeleport.js', 'dist/JsTeleport.js')
.setPublicPath('dist')
.webpackConfig({
    resolve: {
        modules: ['node_modules', path.resolve(__dirname, 'src')]
    },
    output: {
        library: 'Teleport',
        libraryTarget: 'window',
    },
    stats: 'errors-only',
}).disableNotifications();
