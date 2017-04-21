var fs = require("fs");
var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!

var collectData = function(request, callback) {
  var data = '';
  request.on('data', function(chunk) {
    data += chunk;
  });
  request.on('end', function() {
    callback(data);
  });
};

exports.handleRequest = function (req, res) {
    if(req.method === 'GET' && req.url === '/') {
    res.writeHead(200, {
        "Content-Type": "text/html"
    });
    fs.readFile(archive.paths.siteAssets + '/index.html', "utf8", function(err, data) {
        if (err) throw err;
        res.write(data);
        res.end();
    });
   }

    else if(req.method === 'GET')
    {

    archive.isUrlArchived(req.url, function(exists) {
    	if(exists) {
	      res.writeHead(200, {
	        "Content-Type": "text/html"
	      });
	      fs.readFile(archive.paths.archivedSites + req.url, "utf8", function(err, data) {
	        if (err) throw err;
	        res.write(data);
	        res.end();
	      });
	    } else {
          res.writeHead(404, {
	        "Content-Type": "text/html"
	      });
	      res.end();
	    }
       });
    }
    else if(req.method === 'POST') {

    collectData (req, function(data) {
       	archive.addUrlToList(data.slice(4)+'\n')
    	res.writeHead(302, {Location: '/www.example.com'});
	    res.end();

       });
    }
};















