import agent from 'superagent';
import startsWith from 'lodash/startsWith';

const API_URL = '/';
// const API_URL = 'http://security-chaos-ci.eufylife.com/';

function toApi() {
  var args = Array.prototype.slice.call(arguments);
  return API_URL + args.join('/');
}

export const get = (url, params, headers) => {
  const fullUrl = startsWith(url, 'http') ? url : toApi(url);
  let request = agent.get(fullUrl);
  if (typeof headers === 'object') {
    request = request.set(headers);
  }
  if (typeof params === 'object') {
    request = request.query(params);
  }
  return request;
};

export const post = (url, data, headers) => {
  const fullUrl = startsWith(url, 'http') ? url : toApi(url);
  let request = agent.post(fullUrl);
  if (typeof headers === 'object') {
    request = request.set(headers);
  }
  return request.send(JSON.stringify(data));
};

export const put = (url, data, headers) => {
  const fullUrl = startsWith(url, 'http') ? url : toApi(url);
  let request = agent.put(fullUrl);
  if (typeof headers === 'object') {
    request = request.set(headers);
  }
  return request.send(JSON.stringify(data));
};

export const del = (url, data, headers) => {
  const fullUrl = startsWith(url, 'http') ? url : toApi(url);
  let request = agent.del(fullUrl);
  if (typeof headers === 'object') {
    request = request.set(headers);
  }
  // return request;
  return request.send(JSON.stringify(data));
};
