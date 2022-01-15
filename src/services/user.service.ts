import axios from 'axios';
import { number } from 'yup/lib/locale';
import authHeader from './auth-header';
import * as https from 'https'
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const API_URL = 'http://localhost:9990/api/test/';
const instance = axios.create({
  httpsAgent: new https.Agent({  
    rejectUnauthorized: false
  })
});

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getItem() {

    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    })
    axios.defaults.httpsAgent = httpsAgent
    // eslint-disable-next-line no-console
    console.log(process.env.NODE_ENV, `RejectUnauthorized is disabled.`)
    return instance.get("http://localhost:9998/surabi/users/ListMenu");
  }

  getbill() {
    return axios.get("http://localhost:9999/surabi/admin/ViewAllBills");
  }

  getmybill(user: string) {
    return axios.get("http://localhost:9999/surabi/admin/ViewMyBills?userName="+user);
  }

  getSales() {
    return axios.get("http://localhost:9999/surabi/admin/ViewSaleByMonth");
  }


  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
  getAllUsers() {
    return axios.get(API_URL + 'getAllUser', { headers: authHeader() });
  }

  deleteUser(id: number) {
    return axios.get(API_URL + 'deletUser?userID=' +id, { headers: authHeader() });
  }

}

export default new UserService();
