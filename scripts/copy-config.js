#! /usr/bin/env nodeconsole.log("copying ngconfig file")

var copy = require('copy-files');

copy({
    files: {
        'config.ts': 'config/prod/config.ts'
     },
    dest: 'src/app',
}, function (err) {

});