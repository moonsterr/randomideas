import axios from 'axios';
import jwtToken from './jwtToken';
const jwt = new jwtToken();

class UserApi {
  constructor() {
    this._url = '/app';
  }
  async create(name, password) {
    try {
      const accountCreate = await axios.post(`${this._url}/users/create`, {
        username: name,
        password,
      });
      // console.log(accountCreate.data);
      return accountCreate;
    } catch (error) {
      console.error(error);
    }
  }
  async login(name, password) {
    const accountLogin = await axios.post(
      `${this._url}/users/login`,
      {
        username: name,
        password,
      },
      { headers: { 'Content-Type': 'application/json' } }
    );
    if (accountLogin.data.success === true) {
      jwt.createToken(accountLogin.data.token);
    }
    return accountLogin.data;
  }
}

export default UserApi;
