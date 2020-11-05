/**
 * 测试环境:
 *  const apiurl = "http://10.17.1.91:9090";
 *  const client_id = "V0r2Lt9tblmYqpBUaVUXXVn7YM5V5iaBVBXaZpWr";
 *  const client_secret =  "2ZwE8ap8I7EyBNX9scIZecqM8iqXEeRA1XtWpKXU1nrLC8DkpneauHMOEJaKQmYB8dbBsIaZeg6P2YGV
 *                           EQduHRNDOLfhXxc5emh1AJYXdPlK3n3EfMHDcikU1nwANzWk";
 * 
 * 本地环境: 
 *  const apiurl = ""http://10.17.1.156:8001""
 * 
 * 线上环境:
 *  const apiurl = "http://39.99.225.130:9090"
 *  const client_id = "lSrJBvknHEe7gnrm6a881BFHbXuSIeRCUT27fFfz"
 *  const client_secret = "QoiWhweANnMgQz5dZudg88J30M3SbYie6qDRmoqKPi9idSTfAJmZsDFFpoK98VwlrV74vhCg
 *                          WGppNaqtNVZClYHYQTpVfDKSCmjpNPuBcIdmFznUEkro2eEffvGcySl2"
 *  
 **/

const apiurl = process.env.NODE_ENV === "development" ? "http://10.17.1.92:9090" : "http://39.99.225.130:9090";
const client_id = "lSrJBvknHEe7gnrm6a881BFHbXuSIeRCUT27fFfz"
const client_secret = "QoiWhweANnMgQz5dZudg88J30M3SbYie6qDRmoqKPi9idSTfAJmZsDFFpoK98VwlrV74vhCgWGppNaqtNVZClYHYQTpVfDKSCmjpNPuBcIdmFznUEkro2eEffvGcySl2"

const scope_prj001 = "prj001"
const scope_prj002 = "prj002"
const scope_prj003 = "prj003"
const scope_prj004 = "prj004"
const scope_prj005 = "prj005"
const scope_prj006 = "prj006"
const scope_prj007 = "prj007"
const scope_prj00g = "prj00g"
const scope_prj008 = "prj008"
const scope_users = "users"

module.exports.apiurl = apiurl
module.exports.client_id = client_id
module.exports.client_secret = client_secret
module.exports.scope_prj001 = scope_prj001
module.exports.scope_prj002 = scope_prj002
module.exports.scope_prj003 = scope_prj003
module.exports.scope_prj004 = scope_prj004
module.exports.scope_prj005 = scope_prj005
module.exports.scope_prj006 = scope_prj006
module.exports.scope_prj007 = scope_prj007
module.exports.scope_prj00g = scope_prj00g
module.exports.scope_prj008 = scope_prj008
module.exports.scope_users = scope_users
