import './css/style.css';
import '@fortawesome/fontawesome-free/css/all.css';
import Registration from './components/registration';
import userApi from './services/userApi';
import jwtToken from './services/jwtToken';
const registrationInstance = new Registration();
const jwt = new jwtToken();
const token = jwt.getToken();

function init() {
  if (!token) {
    registrationInstance.addEventListeners();
    registrationInstance.showRegistrationForm();
  }
}

document.addEventListener('DOMContentLoaded', init);
