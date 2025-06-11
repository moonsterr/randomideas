import './css/style.css';
import '@fortawesome/fontawesome-free/css/all.css';
import Registration from './components/registration';
import userApi from './services/userApi';
import jwtToken from './services/jwtToken';
import modal from './components/modal';
import postApi from './services/postApi';
import posts from './components/post';
const registrationInstance = new Registration();
const jwt = new jwtToken();
const token = jwt.getToken();
const modalInstance = new modal();
const post = new postApi();
const postJs = new posts(post);

async function init() {
  if (!token) {
    registrationInstance.addEventListeners();
    registrationInstance.showRegistrationForm();
  } else {
    await getThePosts(); // ✅ Load posts if token exists
    postJs.addEventListeners(); // ✅ Attach delete event listener
    post.addEventListeners();
  }
  modalInstance.addEventListeners();

  // post.getPosts().then((postsData));
}
async function getThePosts() {
  const postsData = await post.getPosts();
  postsData.forEach((post) => postJs.addPostToDom(post));
}

document.addEventListener('DOMContentLoaded', init);
