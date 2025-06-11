import axios from 'axios';
import posts from '../components/post';
// const postsJs = new posts();
class postApi {
  constructor() {
    this._url = 'http://localhost:5000';
    this._form = document.getElementById('idea-form');
    this._modalBox = document.getElementById('modal');
    this._ideaContainer = document.getElementById('idea-list');
    this._tag = document.querySelector('.tag-select');
  }
  addEventListeners() {
    this._form.addEventListener('submit', this.addItemToDb.bind(this));
  }
  async getPosts() {
    const token = localStorage.getItem('token');
    console.log(token);
    const posts = await axios.get(`${this._url}/app/ideas`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(posts);
    const postsData = await this.verifyOwnership(posts.data);
    return postsData;
  }
  async verifyOwnership(response) {
    const currentUserId = response.user;
    const data = response.data;
    const postsWithOwnership = data.map((post) => ({
      ...post,
      owner: post.author === currentUserId,
    }));
    return postsWithOwnership;
  }
  async deletePost(id) {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${this._url}/app/ideas/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
  async addItemToDb(e) {
    e.preventDefault();
    const selectedTag = document.getElementById('tag').value;
    const ideaText = document.getElementById('idea-text').value;
    const token = localStorage.getItem('token');
    try {
      const postReq = await axios.post(
        `${this._url}/app/ideas`,
        {
          text: ideaText,
          tag: selectedTag,
          owner: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const postWithOwnerShip = {
        ...postReq.data.data,
        owner: true,
      };
      console.log(postWithOwnerShip);
      this.addPostToDom(postWithOwnerShip);
      this._tag.style.outline = 'none';
      this.hideModal();
    } catch (err) {
      this._tag.style.outline = '2px solid red';
      console.log(err);
    }
  }
  hideModal() {
    this._modalBox.style.display = 'none';
  }
  addPostToDom(post) {
    const div = document.createElement('div');
    div.classList.add('card');
    div.dataset.id = post._id;

    const date = new Date(post.date).toLocaleDateString();
    const tag = post.tag ? post.tag.toUpperCase() : '';

    if (post.owner) {
      div.innerHTML = `
        <button class="delete"><i class="fas fa-times"></i></button>
        <h3>${post.text}</h3>
        <p class="tag tag-${post.tag}">${tag}</p>
        <p>
          Posted on <span class="date">${date}</span> by
          <span class="author">${post.name}</span>
        </p>
      `;
    } else {
      div.innerHTML = `
        <h3>${post.text}</h3>
        <p class="tag tag-${post.tag}">${tag}</p>
        <p>
          Posted on <span class="date">${date}</span> by
          <span class="author">${post.name}</span>
        </p>
      `;
    }

    this._ideaContainer.appendChild(div);
  }
}

export default postApi;
