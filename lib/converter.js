/**
 * Created by mobinni on 08/04/15.
 */
var fs = require('fs');
var path = require('path');
iconv = require('iconv-lite');

//TODO: implement custom split character
module.exports.convertFile = function (file, output) {
    var ext = '';
    if (ext = fileExtensionCheck(file)) {
        fs.readFile(file, 'utf8', function (err, data) {
            // unnecessary parsing to utf8
            // var utf8String = iconv.decode(new Buffer(data), "utf8");
            try {
                if (ext.match('json')) {
                    convertJSON(data);
                } else {
                    var result = convertYML(data);
                    saveToFile(result, output);
                }
            } catch (e) {
                console.log('Invalid JSON structure')
            }
        });
    } else {
        /* Do nothing */
    }
};

function convertJSON(data) {
    console.log('implement')
}

function convertYML(data) {
    var array = data.split(':').join('~').split('\n');
    var result = "";
    array.forEach(function (line) {
        line = line.split('~ \'').join('~');
        line = line.split('~ ').join('~');
        if(line.charAt(line.length - 1) === '\'')
            line = line.substr(0, line.length - 1);
        result += line;
    });
    return result
}

function saveToFile(result, output) {
    fs.writeFile(output, result, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was successfully converted and saved!");
    });
}

function fileExtensionCheck(file) {
    var extension = path.extname(file);
    if (extension.match('.json')) return 'json';
    if (extension.match('.yml')) return 'yml'
}