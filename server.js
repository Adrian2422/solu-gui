const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname + '/dist/solu-gui'));
app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname + '/dist/solu-gui/index.html'));
});
app.listen(process.env.PORT || 8080, () => {
	console.log(`Solu GUI listening on port ${process.env.PORT || 8080}`)
});
