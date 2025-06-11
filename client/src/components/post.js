// src/components/post.js
class Posts {
  constructor(postapiInstance) {
    this._postapi = postapiInstance;
    this._ideaContainer = document.getElementById('idea-list');
  }

  addEventListeners() {
    this._ideaContainer.addEventListener('click', this.deletePost.bind(this));
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

  async deletePost(e) {
    const deleteBtn = e.target.closest('.delete');
    if (!deleteBtn) return;

    const postCard = deleteBtn.closest('.card');
    const postId = postCard.dataset.id;

    const deletion = await this._postapi.deletePost(postId);
    if (deletion) {
      postCard.remove();
    } else {
      console.log('Something went wrong');
    }
  }
}

export default Posts;
