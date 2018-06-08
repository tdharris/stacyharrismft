var express = require('express'),
    sm = require('sitemap'),
    fs = require('fs'),
    path = require('path'),
    app = express(),
    router = express.Router();

var public = __dirname + '/public/';

// generate sitemap
const sitemap = sm.createSitemap({
    hostname: 'https://stacyharrismft.com',
    urls: fs.readdirSync(public).reduce((urls, f) => {
        let name = path.parse(f).name;
        if (path.parse(f).ext === '.html') {
            urls.push({
                url: name === 'index' ? '' : name,
                priority: 0.5,
                lastmodISO: fs.statSync(path.join(public, f)).mtime
            });
        }
        return urls;
    }, [])
})

router
    .get('/sitemap.xml', (req, res) => {
        res.header('Content-Type', 'application/xml');
        res.send(sitemap.toString());
    })
    .get('/', (req, res) => {
        res.sendFile(public + 'index.html');
    })
    .get('/index(.php|.html)?$', (req, res) => {
        res.sendFile(public + 'index.html');
    })
    .get('/about_me(.php|.html)?$', (req, res) => {
        res.sendFile(public + 'about_me.html');
    })
    .get('/contact(.php|.html)?$', (req, res) => {
        res.sendFile(public + 'contact.html');
    })
    .get('/faq(.php|.html)?$', (req, res) => {
        res.sendFile(public + 'faq.html');
    })
    .get('/intake_forms(.php|.html)?$', (req, res) => {
        res.sendFile(public + 'intake_forms.html');
    })
    .get('/learning_center(.php|.html)?$', (req, res) => {
        res.sendFile(public + 'learning_center.html');
    })
    .get('/rates(.php|.html)?$', (req, res) => {
        res.sendFile(public + 'rates.html');
    })
    .get('/services(.php|.html)?$', (req, res) => {
        res.sendFile(public + 'services.html');
    });

// redirect `www` https://zeit.co/docs/guides/redirect
// function redirect(req, res, next) {
// 	// if the request doesn't come from stacyharrismft.com or from the deployment URL
// 	if (req.hostname !== 'stacyharrismft.com' || req.hostname !== process.env.NOW_URL) {
// 		// redirect to stacyharrismft.com keeping the pathname and querystring
// 		return res.redirect(`https://stacyharrismft.com${req.originalUrl}`);
// 	}
// 	return next();
// }

app
// .use(redirect)
    .use(express.static('public'))
    .use('/', router)
    .use('*', (req, res) => {
        res.sendFile(public + '404.html');
    });

var server = app.listen(process.env.PORT || 5000, () => {
    console.log('Listening on port ' + server.address().port);
});