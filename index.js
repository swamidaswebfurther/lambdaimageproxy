const express = require('express')
const serverless = require('serverless-http')
var jimp = require('jimp');
var url = require('url');

const binaryMimeTypes = {binary: [
  'image/*',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
]};

const app = express()

app.get('/image', async (req, res) => {
  var parts = url.parse(req.url, true);
  var imageUrl = parts.query.url;
  parts = url.parse(imageUrl);

  const image = await jimp.read(imageUrl);
  const buffer = await image.getBufferAsync(jimp.MIME_JPEG);

  res.writeHead(200, {'Content-Type': 'image/jpg'});
  res.end(buffer,'Base64');

});

app.all('*', function (req, res) {
  const response = { data: null, message: 'Route not found!!' }
  res.status(400).send(response)
});


module.exports.handler = serverless(app,binaryMimeTypes)
