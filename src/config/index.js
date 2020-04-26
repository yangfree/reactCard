let AxiosParams = {};
process.env.NODE_ENV === 'development' ?
  AxiosParams.baseUrl = 'http://localhost:4000' :
  AxiosParams.baseUrl = 'https://jiepp.com';
AxiosParams.timeout = 7000;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default AxiosParams;


