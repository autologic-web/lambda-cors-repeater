const https = require('https');
const { URL } = require('url');

exports.handler = async (event) => {
  return makeRequest(event).then(body => {
    return JSON.parse(body);
  }, (error) => {
    return { message: error.message, event };
  });
};

function makeRequest(event) {
  return new Promise((resolve, reject) => {
    let responseBody = '';
    const url = new URL(event.url);
    const options = {
      host: url.hostname,
      path: url.pathname,
      port: url.protocol === 'https:' ? 443 : 80,
      protocol: url.protocol,
      method: event.method,
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const req = https.request(options, (res) => {
      res.on('data', (d) => {
        responseBody+=d;
      });
      res.on('end',function(){
        resolve(responseBody);
      });
    });
    req.on('error', (e) => {
      reject(Error(e.message));
    });
    req.write(JSON.stringify(event.data));
    req.end();
  });
}
