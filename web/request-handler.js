var fs = require("fs");
var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
    if(req.method === 'GET' && req.url === '/') {
    res.writeHead(200, {
        "Content-Type": "text/html"
    });
    fs.readFile(archive.paths.url, "utf8", function(err, data) {
        if (err) throw err;
        res.write(data);
        res.end();
    });
}
// else {
// 	res.end();
// }
         
  // res.end(archive.paths.url);
  // res.end(archive.paths.list);
};

