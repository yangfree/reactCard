const BaseUrl           = 'https://hdmp.hdzyhosp.com';
// const BaseUrl           = 'http://10.17.1.156:8000';
const Client_Id         = 'g9SRwajKqTsi3xS2nvZlXCN5m1vpWDD4SlFMFQqH';
const Client_Secret     = 'mtddPiE6UanwnEj7MZ6O6qhC02RPRslwNd6tA1ax1bLx2ZqTvXd01U8YBl6O3RPtd9lWy00OcK10zaVgaW20GKgvk1c6pYJcZmUdKj2GxoeJfkiKzB8cvm0FsMB4xfPk';
const Grant_Type        = 'password';
const Scope             = 'patient';
const VideoSDKAppID     = 1400344140;
const VideoSDKSecretKey = 'ed05454a99fdf163d36e1a89c76de843a0f8cbca2f2c9d1e37a67d265cf057ff';

//登录 获取token
const GetTokenUrl       = '/o/token/';
//注册
const SignupUrl         = '/patient/register/';
//忘记密码
const ForgetPasswordUrl = '/forgetpassword/';
//短信验证码
const SMSUrl            = '/sms/';
//获取小程序openid
const OpenIdUrl         = '/order/openid/'
//支付
const PayUrl            = '/order/pay/'
//上传图片统一接口
const UploadImageUrl    = '/uploadimage/';

//搜索医生+获取有复诊资格的医生列表
const SearchDoctorUrl   = '/doctor/review/'
//获取用户信息
const PatientInfoUrl    = '/patient/info/'
//创建患者的病历
const CreateDiagUrl     = '/diag/review/create/'
//获取医生可预约时间段
const GetDoctorTimeUrl  = '/patient/time/'
//获取拍方抓药的医生
const AllDoctorUrl      = '/doctor/'
//获取资讯文章列表
const ArticleUrl        = '/article/'
//复诊订单 包括复诊订单列表 和 某个特定复诊订单
const ConsultOrderUrl   = '/order/question/'
//处方订单 包括处方订单列表 和 某个特定处方订单
const RecipeOrderUrl    = '/order/recipe/'
// 地址管理接口
const AddressUrl = '/patient/ext/'

export default {
  BaseUrl,
  Client_Id,
  Client_Secret,
  Grant_Type,
  Scope,
  VideoSDKAppID,
  VideoSDKSecretKey,

  GetTokenUrl,
  SignupUrl,
  ForgetPasswordUrl,
  SMSUrl,
  OpenIdUrl,
  PayUrl,
  UploadImageUrl,

  SearchDoctorUrl,
  PatientInfoUrl,
  CreateDiagUrl,
  GetDoctorTimeUrl,
  AllDoctorUrl,
  ArticleUrl,
  ConsultOrderUrl,
  RecipeOrderUrl,
  AddressUrl
}