const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  productionSourceMap: false,
  devServer: {
    host: "127.0.0.1",
    port: "8089",
    https: false,
    open: false
    // proxy: {
    //     '/': {
    //         target: "",
    //         changeOrigin: true,
    //         pathRewrite: {}
    //     }
    // }
  },
  lintOnSave: true,
  chainWebpack: config => {
    config.resolve.alias.set("@", resolve("src"));
  }
};
