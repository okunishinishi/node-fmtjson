var fmtjson = require('fmtjson');

fmtjson([
    'src/**/*.json'
], {
    sort: true
}, function (err, results) {
    /*...*/
});