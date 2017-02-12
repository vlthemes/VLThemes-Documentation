var inline = require('inline-source'),
    fs = require('filendir'),
    path = require('path') ,
    src = 'src/index.html',
    build = 'build/index.html';

inline(src, {
    compress: true,
    attribute: false,
    svgAsImage: true,
    rootpath: path.dirname(src)
}, function (err, html) {
    if (!err) {
        fs.writeFileSync(build, html);
    } else {
        throw err;
    }
});
