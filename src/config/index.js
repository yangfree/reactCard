let config = {};
process.env.NODE_ENV === 'development' ?
  config.baseUrl = 'http://localhost:4000' :
  config.baseUrl = 'https://jiepp.com';
export default config;

