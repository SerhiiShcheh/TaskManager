const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/dist/ProjectToDeploy'));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + "/dist/ProjectToDeploy/index.html"));
});

console.log('console listening!');

app.listen(process.env.PORT || 8080);
