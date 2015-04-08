#!/usr/bin/env node
var program = require('commander');
var converter = require('./lib/converter.js');
program
    .version('0.0.1')
    .option('-f, --file', 'Add file to parse')
   // .option('-F, --folder', 'Add folder to parse')
    .option('-o, --output', 'Determine output file')
    .parse(process.argv);

if (program.file && program.output) converter.convertFile(program.args[0], program.args[1]);
