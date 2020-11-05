/**
 * 官方实例:
 *    https://open.weixin.qq.com/connect/oauth2/authorize?
 *    appid=wx9a419b368eb8797a&
 *    response_type: code
 *    redirect_uri: 跳转后的url
 *    scope: snsapi_base | snsapi_userinfo(授权)
 *    state: 可以携带参数
 *    #wechat_redirect: 重定向时必带
 *
 * getCodeFn:
 *    1. 转码当前页面的url
 *    2. 页面url替换方便获取code参数
 *
 * getUrlCode:
 *    1. 根据传入的code值匹配
 *
 * Auth: Jie
 * Date: 2020-07-20
 */

function getCodeFn(urlEncode) {
  let appid = "wx5b13d615f1494342";
  let code = "code";
  let scope = "snsapi_base";
  let encodeUrl = encodeURIComponent(urlEncode);
  // let urlNow = encodeURIComponent(window.location.href);
  let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeUrl}&response_type=${code}&scope=${scope}#wechat_redirect`;

  window.location.href = url;
}

function getUrlCode(code) {
  //获取url 参数
  return (
    decodeURIComponent(
      (new RegExp("[?|&]" + code + "=" + "([^&;]+?)(&|#|;|$)").exec(
        location.href
        // eslint-disable-next-line no-sparse-arrays
      ) || [, ""])[1].replace(/\+/g, "%20")
    ) || null
  );
}

module.exports = {
  getCodeFn,
  getUrlCode
};
