const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === "development" ? "/" : "/wechat/",
  pages: {
    index: {
      entry: "src/main.js",
      template: "public/index.html",
      filename: "index.html",
      title: "主页"
      // chunks: ["chunk-vendors", "chunk-common", "index"]
    },
    doctor: {
      entry: "src/pages/doctor/doctor.js",
      template: "public/doctor.html",
      filename: "doctor.html",
      title: "医生页面"
      // chunks: ["chunk-vendors", "chunk-common", "doctor"]
    },
    personel: {
      entry: "src/pages/personel/personel.js",
      template: "public/personel.html",
      filename: "personel.html",
      title: "个人中心页面",
      chunks: ["chunk-vendors", "chunk-common", "personel"]
    },
    experts: {
      entry: "src/pages/experts/experts.js",
      template: "public/experts.html",
      filename: "experts.html",
      title: "专家页面",
      chunks: ["chunk-vendors", "chunk-common", "experts"]
    },
    medical: {
      entry: "src/pages/medical/medical.js",
      template: "public/medical.html",
      filename: "medical.html",
      title: "医助页面",
      chunks: ["chunk-vendors", "chunk-common", "medical"]
    },
    patients: {
      entry: "src/pages/patients/patients.js",
      template: "public/patients.html",
      filename: "patients.html",
      title: "患者页面",
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ["chunk-vendors", "chunk-common", "patients"]
    }
  },
  devServer: {
    host: "127.0.0.1",
    port: "8080",
    https: false,
    open: false,
    proxy: {
      "/doctor": {
        // 10.17.1.156:8001   http://10.17.1.92/   http://192.168.43.33/  39.99.225.130
        target: "http://10.17.1.92/",
        changeOrigin: true,
        pathRewrite: {
          "^/doctor": "/doctor"
        }
      }
    }
  },
  lintOnSave: true,
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@ass", resolve("src/assets"));
  }
};
