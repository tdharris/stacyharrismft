var express = require("express"),
		sitemap = require('express-sitemap-html'),
		app = express(),
		router = express.Router();

var path = __dirname + '/public/';

router
	.get("/", (req, res) => {
	  res.sendFile(path + "index.html");
	})
	.get("/index(.php|.html)?$", (req, res) => {
	  res.sendFile(path + "index.html");
	})
	.get("/about_me(.php|.html)?$", (req, res) => {
	  res.sendFile(path + "about_me.html");
	})
	.get("/contact(.php|.html)?$", (req, res) => {
	  res.sendFile(path + "contact.html");
	})
	.get("/faq(.php|.html)?$", (req, res) => {
	  res.sendFile(path + "faq.html");
	})
	.get("/intake_forms(.php|.html)?$", (req, res) => {
	  res.sendFile(path + "intake_forms.html");
	})
	.get("/learning_center(.php|.html)?$", (req, res) => {
	  res.sendFile(path + "learning_center.html");
	})
	.get("/rates(.php|.html)?$", (req, res) => {
	  res.sendFile(path + "rates.html");
	})
	.get("/services(.php|.html)?$", (req, res) => {
	  res.sendFile(path + "services.html");
	});

// redirect `www` https://zeit.co/docs/guides/redirect
function redirect(req, res, next) {
	// if the request doesn't come from stacyharrismft.com or from the deployment URL
	if (req.hostname !== 'stacyharrismft.com' || req.hostname !== process.env.NOW_URL) {
		// redirect to stacyharrismft.com keeping the pathname and querystring
		return res.redirect(`https://stacyharrismft.com${req.originalUrl}`);
	}
	return next();
}

app
  .use(redirect)
  .use(express.static("public"))
  .use("/", router)
  .use("*", (req, res) => {
    res.sendFile(path + "404.html");
  });

var server = app.listen( process.env.PORT || 5000, () => {
  console.log('Listening on port ' + server.address().port);
});