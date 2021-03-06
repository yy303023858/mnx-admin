// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    rec: path.resolve(__dirname, '../dist/rec.html'),
    stats: path.resolve(__dirname, '../dist/stats.html'),
    login: path.resolve(__dirname, '../dist/login.html'),
    stu: path.resolve(__dirname, '../dist/stu.html'),
    act: path.resolve(__dirname, '../dist/act.html'),
    company: path.resolve(__dirname, '../dist/company.html'),
    ad: path.resolve(__dirname, '../dist/ad.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: './[name]',
    assetsPublicPath: '/',
    // 禁止sourcemap  false
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8000,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
        '/activity': {
            target: 'http://192.168.1.166:8097',
            pathRewrite: {
            '^/activity': '/activity'
            }
        },
        '/recruiters': {
            target: 'http://192.168.1.166:8098',
            pathRewrite: {
                '^/recruiters': '/recruiters'
            }
        },
        '/applications': {
            target: 'http://192.168.1.166:8098',
            pathRewrite: {
                '^/applications': '/applications'
            }
        }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
