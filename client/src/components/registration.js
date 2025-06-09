import jwtToken from '../services/jwtToken';
import UserApi from '../services/userApi';
const userapi = new UserApi();
const jwt = new jwtToken();
class Registration {
  constructor() {
    this._loginTab = document.getElementById('myapp-loginTab');
    this._registerTab = document.getElementById('myapp-registerTab');
    this._loginForm = document.getElementById('myapp-loginForm');
    this._registerForm = document.getElementById('myapp-registerForm');

    this._loginbtn = document.querySelector('.myapp-login');
    this._createbtn = document.querySelector('.myapp-create');
    //login inputs
    this._usernameLogin = document.querySelector('#myapp-loginUsername');
    this._passwordLogin = document.querySelector('#myapp-loginPassword');
    //create inputs
    this._usernameRegister = document.querySelector('#myapp-registerUsername');
    this._passwordRegister = document.querySelector('#myapp-registerPassword');
    //containers
    this._overlay = document.querySelector('.myapp-overlay-container');
    this._container = document.querySelector('.myapp-container');
    //errors
    this._error = document.querySelector('.myapp-error');
    //labels
    this._usernameRegisterLabel = document.querySelector(
      '.myapp-registerUsername'
    );
    this._usernameLoginLabel = document.querySelector('.myapp-loginUsername');
  }
  addEventListeners() {
    this._loginTab.addEventListener('click', this.loginTab.bind(this));
    this._registerTab.addEventListener('click', this.accountTab.bind(this));
    this._registerForm.addEventListener(
      'submit',
      this.accountCreate.bind(this)
    );
    this._loginForm.addEventListener('submit', this.accountLogin.bind(this));
  }
  clearErrors() {
    document.getElementById('myapp-loginError').style.display = 'none';
    document.getElementById('myapp-registerError').style.display = 'none';
  }
  accountTab() {
    this._registerTab.classList.add('myapp-tab--active');
    this._loginTab.classList.remove('myapp-tab--active');
    this._registerForm.classList.add('myapp-form--active');
    this._loginForm.classList.remove('myapp-form--active');
    this.clearErrors();
  }
  loginTab() {
    this._loginTab.classList.add('myapp-tab--active');
    this._registerTab.classList.remove('myapp-tab--active');
    this._loginForm.classList.add('myapp-form--active');
    this._registerForm.classList.remove('myapp-form--active');
    this.clearErrors();
  }
  checkEmptyLogin(e) {
    const username = this._usernameLogin.value.trim();
    const password = this._passwordLogin.value.trim();
    if (!username || !password) {
      // Inputs are empty, do nothing or show a message
      alert('Please fill in all required fields.');
      return; // stop here, no submit
    }
    return true;
  }
  checkEmptyCreate() {
    const username = this._usernameRegister.value.trim();
    const password = this._passwordRegister.value.trim();
    if (!username || !password) {
      return false; // stop here, no submit
    }
    return true;
  }
  hideRegistrationForm() {
    this._overlay.style.display = 'none';
    this._container.style.display = 'none';
  }
  showRegistrationForm() {
    this._overlay.style.display = 'flex';
    this._container.style.display = 'block';
  }
  showError() {
    this._error.style.display = 'block';
    this._error.textContent = 'Something went wrong idk where tho';
  }
  async accountCreate(e) {
    e.preventDefault();
    const empty = this.checkEmptyCreate();
    if (!empty) {
      alert('Fill in the required fields');
      return;
    }
    const name = this._usernameRegister.value.trim();
    const password = this._passwordRegister.value.trim();
    this._createbtn.style.color = 'gray';
    try {
      const account = await userapi.create(name, password);
      this._usernameRegisterLabel.style.color = '#444444';
      console.log(account.data);
      this._createbtn.style.color = 'white';
      this.accountLogin(e, name, password);
    } catch (error) {
      this._usernameRegisterLabel.style.color = 'red';
      console.log(error);
      this._createbtn.style.color = 'white';
    }
  }
  async accountLogin(e, name, pass) {
    e.preventDefault();
    if ((name == null || name === '') && (pass == null || pass === '')) {
      const empty = this.checkEmptyLogin();
      if (!empty) {
        alert('Fill in the required fields');
        return;
      }
    }
    const username = name || this._usernameLogin.value.trim();
    const password = pass || this._passwordLogin.value.trim();
    this._loginbtn.style.color = 'gray';
    try {
      const accountLogin = await userapi.login(username, password);
      this._usernameLoginLabel.style.color = 'black';
      console.log(accountLogin);
    } catch (error) {
      this._usernameLoginLabel.style.color = 'red';
      console.log(error);
    }
    this._loginbtn.style.color = 'white';
    this.hideRegistrationForm();
  }
}

export default Registration;
