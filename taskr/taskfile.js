var bs = require('browser-sync');
var historyApiFallback = require('connect-history-api-fallback');

export default async function (task) {
    await task.clear(['dist']).parallel(['html', 'js', 'css']).start('serve')
    await task.watch('src/html/index.html', 'html')
    await task.watch('src/js/**/*.*', 'js')
    await task.watch('src/css/**/*.*', 'css')
}

export async function css(task) {
    await task.source('src/css/app.sass').sass().autoprefixer().target('dist')
    bs.reload('app.css')
}

export async function js(task) {
    await task.source('src/js/app.js').browserify({
        transform: [require("babelify")]
    }).target('dist');
    bs.reload('app.js')
}

export async function html(task) {
    await task.source('src/html/index.html').target('dist')
    bs.reload('index.html')
}

export async function serve(task) {
    bs({
        server: 'dist',
        middleware: [historyApiFallback()]
    });
}