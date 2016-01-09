"use strict";

const fmtjson = require('fmtjson');

fmtjson([
    'src/**/*.json'
], {
    sort: true
}, (err, results) => {
    /*...*/
});