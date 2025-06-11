import postApi from '../services/postApi';
const ideaApi = new postApi();
class modal {
  constructor() {
    this._btn = document.getElementById('modal-btn');
    this._modalBox = document.getElementById('modal');
    this._modalForm = document.getElementById('idea-form');
  }

  addEventListeners() {
    this._btn.addEventListener('click', this.showModal.bind(this));
    window.addEventListener('click', this.outsideClickModal.bind(this));
    // this._modalForm.addEventListener('submit', this.submitPost.bind(this));
  }
  showModal() {
    this._modalBox.style.display = 'flex';
  }
  hideModal() {
    this._modalBox.style.display = 'none';
  }
  outsideClickModal(e) {
    if (e.target === this._modalBox) {
      this.hideModal();
      return;
    }
  }
  // async submitPost(e) {
  //   e.preventDefault();
  //   const ideas = await ideaApi.getPosts();
  //   console.log(ideas);
  // }
}
export default modal;
