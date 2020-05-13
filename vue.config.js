const path = require('path');

module.exports = {
  lintOnSave: true,
  devServer: {
    host: '127.0.0.1',
    port: 4000,
    open: true,
    proxy: {
      '/admin': {
        target: 'http://localhost:3001/',
        changeOringe: true,
        ws: true,
        pathRewrite: {
          '^admin': ''
        }
      }
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src")
      }
    }
  },
  // css: {
  //   extract: true,
  //   modules: false
  // }
}