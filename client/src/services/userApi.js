import axios from 'axios';
import jwtToken from './jwtToken';
const jwt = new jwtToken();

class UserApi {
  constructor() {
    this._url = 'http://localhost:5000';
  }
  async create(name, password) {
    try {
      const accountCreate = await axios.post(`${this._url}/app/users/create`, {
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
      `${this._url}/app/users/login`,
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
