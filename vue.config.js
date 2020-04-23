const path = require('path');

module.exports = {
  // publicPath: '/',
  // outputDir: 'dist',
  // assetsDir: 'static',
  // indexPath: 'index.html',
  lintOnSave: true,
  devServer: {
    host: '127.0.0.1',
    port: 4000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOringe: true,
        ws: true
      }
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src")
      }
    }
  }
}