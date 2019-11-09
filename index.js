var sm = require('sitemap'),
    fs = require('fs'),
    path = require('path');

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

fs.writeFileSync('./public/sitemap.xml', sitemap.toString())
