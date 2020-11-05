// 线上环境
module.exports.BaseUrl = "https://hdmp.hdzyhosp.com"
// 测试环境
// module.exports.BaseUrl = 'http://127.0.0.1:8000'
module.exports.Client_Id = "g9SRwajKqTsi3xS2nvZlXCN5m1vpWDD4SlFMFQqH"
module.exports.Client_Secret = "mtddPiE6UanwnEj7MZ6O6qhC02RPRslwNd6tA1ax1bLx2ZqTvXd01U8YBl6O3RPtd9lWy00OcK10zaVgaW20GKgvk1c6pYJcZmUdKj2GxoeJfkiKzB8cvm0FsMB4xfPk"
module.exports.Grant_Type = "password"
module.exports.Scope = "doctor"
module.exports.VideoSDKAppID = 1400344140
module.exports.VideoSDKSecretKey = "ed05454a99fdf163d36e1a89c76de843a0f8cbca2f2c9d1e37a67d265cf057ff"

module.exports.LoginUrl = "/o/token/";
module.exports.SignupUrl = "/doctor/register/";
module.exports.ResetPasswordUrl = "/doctor/resetpassword/";
module.exports.ForgetPasswordUrl = "/forgetpassword/";
module.exports.SMSUrl = "/sms/";
module.exports.TreatmentListUrl = "/diag/review/";
module.exports.GetHistoryUrl = "/diag/history/{patient_id}/";
module.exports.CreateHistoryUrl = "/diag/history/{patient_id}/{diagdetail_id}/";
module.exports.CreateRecipelUrl = "/diag/recipe/create/{history_id}/";
module.exports.GetRecipelUrl = "/diag/recipe/{history_id}/";
module.exports.GetIllnessUrl = "/diag/review/{id}/";
module.exports.OrderTimeUrl = "/doctor/time/";
module.exports.DeleteAppointmentTimeUrl = "/doctor/time/{id}/" ;
module.exports.GetDoctorInfoUrl = "/doctor/info/";
module.exports.UpdateDoctorInfoUrl = "/doctor/update/";
module.exports.GetMedicineListUrl  = "/medicine/";
module.exports.GetMedicineSortUrl = "/medicine/type/{type_level}/";
module.exports.GetMedicineChildrenSortUrl = "/medicine/type/children/{father_id}/";
module.exports.GetMedicineDetailUrl = "/medicine/{id}/";
module.exports.UploadImageUrl = "/uploadimage/";
module.exports.GetPrescriptionListUrl = "/diag/prescription/";
module.exports.GetPrescriptionDetailUrl = "/diag/prescription/{id}/";
module.exports.CreatePrescriptionHistoryUrl = "/diag/history/create/{patient_id}/{prep_id}/";
module.exports.ArticleUrl = "/article/";
module.exports.ArticleDetailUrl = "/article/{id}/";
