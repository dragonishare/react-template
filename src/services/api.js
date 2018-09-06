import { post } from './request.js';

export default {
  login(data) {
    return post('/admin/login', data);
  }
};
