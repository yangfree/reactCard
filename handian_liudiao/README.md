# 流行病调查项目

> 此项目是node复合项目,Python作为底层,node作中间层,vue前端.

## 项目文件介绍

- `/build`文件夹是存放`webpack`配置,`loader`和`npm`版本检测相关.
- `config`是一些基本配置,比如端口和开发模式
- `server`存放这node代码
- `src`源码目录
- `static`静态资源文件夹
- `index.html`是入口文件

## 项目开发启动

``` bash
# 1.克隆项目到本地
> git clone http://39.101.142.197:82/epidemiological_survey/handian_liudiao.git
# 2.进入项目文件夹并切换dev分支
cd /${filename} && git checkout origin:dev
# 3.下载依赖
npm install
# 4.运行node服务
npm run server:dev
# 5.运行vue前台
npm run devdev
```

## 项目线上部署

> 打包后将`dist`文件夹放入`nginx`反向代理的路径文件

```bash
# 打包命令
npm run build
# 打包查看项目统计视图 默认8888端口
npm run build --report
```

## 包含项目介绍

|项目名称|项目介绍|备注|
|:--|:--|:--|
|prj001|排卵障碍性异常子宫出血|--|
|prj002|多囊卵巢综合症|--|
|prj003|痛经调查|--|
|prj004|滑胎(复发性流产)|--|
|prj005|盆腔炎性疾病及其后遗症|--|
|prj006|子宫内膜异位症子宫腺肌病|--|
|prj007|子宫肌瘤|--|

## api

- 后台Api: [http://apici.handianmedicine.com/api-docs/](http://apici.handianmedicine.com/api-docs/)

**注: `webpack`跨域配置`127.0.0.1`,使用`localhost`会引起不必要的跨域问题.**


