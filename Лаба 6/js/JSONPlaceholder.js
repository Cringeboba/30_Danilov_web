document.addEventListener('DOMContentLoaded', function() {
    class PostAPI {
        constructor() {
            this.API_URL = 'https://jsonplaceholder.typicode.com/posts';
            this.initElements();
            this.bindEvents();
        }
        
        initElements() {
            this.getPostsBtn = document.getElementById('getPosts');
            this.getResult = document.getElementById('getData');
            this.getLoader = document.getElementById('getLoader');
            
            this.createPostBtn = document.getElementById('createPost');
            this.postTitle = document.getElementById('postTitle');
            this.postBody = document.getElementById('postBody');
            this.postUserId = document.getElementById('postUserId');
            this.postResult = document.getElementById('postData');
            this.postLoader = document.getElementById('postLoader');
            
            this.updatePostBtn = document.getElementById('updatePost');
            this.putId = document.getElementById('putId');
            this.putTitle = document.getElementById('putTitle');
            this.putBody = document.getElementById('putBody');
            this.putUserId = document.getElementById('putUserId');
            this.putResult = document.getElementById('putData');
            this.putLoader = document.getElementById('putLoader');
            
            this.patchPostBtn = document.getElementById('patchPost');
            this.patchId = document.getElementById('patchId');
            this.patchTitle = document.getElementById('patchTitle');
            this.patchBody = document.getElementById('patchBody');
            this.patchResult = document.getElementById('patchData');
            this.patchLoader = document.getElementById('patchLoader');
            
            this.deletePostBtn = document.getElementById('deletePost');
            this.deleteId = document.getElementById('deleteId');
            this.deleteResult = document.getElementById('deleteData');
            this.deleteLoader = document.getElementById('deleteLoader');
        }
        
        bindEvents() {
            this.getPostsBtn.addEventListener('click', () => this.getPosts());
            this.createPostBtn.addEventListener('click', () => this.createPost());
            this.updatePostBtn.addEventListener('click', () => this.updatePost());
            this.patchPostBtn.addEventListener('click', () => this.patchPost());
            this.deletePostBtn.addEventListener('click', () => this.deletePost());
        }
        
        showLoader(loader) {
            loader.classList.remove('hidden');
        }
        
        hideLoader(loader) {
            loader.classList.add('hidden');
        }
        
        showError(element, message) {
            element.innerHTML = `<div class="error">Error: ${message}</div>`;
        }
        
        showSuccess(element, message) {
            element.innerHTML = `<div class="success">${message}</div>`;
        }
        
        formatPost(post) {
            return `
                <div class="post">
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                    <p><small>Post ID: ${post.id}, User ID: ${post.userId}</small></p>
                </div>
            `;
        }
        
        async fetchData(url, options = {}) {
            try {
                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return await response.json();
            } catch (error) {
                throw error;
            }
        }
        
        async getPosts() {
            this.showLoader(this.getLoader);
            this.getResult.innerHTML = '';
            
            try {
                const data = await this.fetchData(this.API_URL);
                this.hideLoader(this.getLoader);
                if (data.length > 0) {
                    let html = '<h3>Latest Posts:</h3>';
                    data.slice(0, 5).forEach(post => {
                        html += this.formatPost(post);
                    });
                    this.getResult.innerHTML = html;
                } else {
                    this.getResult.innerHTML = '<p>Постов нет</p>';
                }
            } catch (error) {
                this.hideLoader(this.getLoader);
                this.showError(this.getResult, error.message);
            }
        }
        
        async createPost() {
            const title = this.postTitle.value.trim();
            const body = this.postBody.value.trim();
            const userId = this.postUserId.value;
            
            if (!title || !body) {
                this.showError(this.postResult, 'Заголовок и текст обязательны для заполнения');
                return;
            }
            
            this.showLoader(this.postLoader);
            this.postResult.innerHTML = '';

            const newPost = {
                title,
                body,
                userId: parseInt(userId)
            };
            
            try {
                const options = {
                    method: 'POST',
                    body: JSON.stringify(newPost),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                };
                
                const data = await this.fetchData(this.API_URL, options);
                this.hideLoader(this.postLoader);
                this.showSuccess(this.postResult, `Запись успешно создана с ID: ${data.id}`);
                this.postResult.innerHTML += this.formatPost(data);
                
                this.postTitle.value = '';
                this.postBody.value = '';
                this.postUserId.value = '1';
            } catch (error) {
                this.hideLoader(this.postLoader);
                this.showError(this.postResult, error.message);
            }
        }
        
        async updatePost() {
            const id = this.putId.value;
            const title = this.putTitle.value.trim();
            const body = this.putBody.value.trim();
            const userId = this.putUserId.value;
            
            if (!title || !body) {
                this.showError(this.putResult, 'Заголовок и текст обязательны для заполнения');
                return;
            }
            
            this.showLoader(this.putLoader);
            this.putResult.innerHTML = '';
            
            const updatedPost = {
                id: parseInt(id),
                title,
                body,
                userId: parseInt(userId)
            };
            
            try {
                const options = {
                    method: 'PUT',
                    body: JSON.stringify(updatedPost),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                };
                
                const data = await this.fetchData(`${this.API_URL}/${id}`, options);
                this.hideLoader(this.putLoader);
                this.showSuccess(this.putResult, `Пост с ID: ${data.id} полностью обновлен`);
                this.putResult.innerHTML += this.formatPost(data);
            } catch (error) {
                this.hideLoader(this.putLoader);
                this.showError(this.putResult, error.message);
            }
        }
        
        async patchPost() {
            const id = this.patchId.value;
            const title = this.patchTitle.value.trim();
            const body = this.patchBody.value.trim();
            
            if (!title && !body) {
                this.showError(this.patchResult, 'Необходимо указать как минимум заголовок или текст.');
                return;
            }
            
            this.showLoader(this.patchLoader);
            this.patchResult.innerHTML = '';
            
            const partialUpdate = {};
            if (title) partialUpdate.title = title;
            if (body) partialUpdate.body = body;
            
            try {
                const options = {
                    method: 'PATCH',
                    body: JSON.stringify(partialUpdate),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                };
                
                const data = await this.fetchData(`${this.API_URL}/${id}`, options);
                this.hideLoader(this.patchLoader);
                this.showSuccess(this.patchResult, `Запись с ID: ${data.id} была частично обновлена`);
                this.patchResult.innerHTML += this.formatPost(data);
                
                this.patchTitle.value = '';
                this.patchBody.value = '';
            } catch (error) {
                this.hideLoader(this.patchLoader);
                this.showError(this.patchResult, error.message);
            }
        }
        
        async deletePost() {
            const id = this.deleteId.value;
            
            this.showLoader(this.deleteLoader);
            this.deleteResult.innerHTML = '';
            
            try {
                const options = {
                    method: 'DELETE',
                };
                
                await this.fetchData(`${this.API_URL}/${id}`, options);
                this.hideLoader(this.deleteLoader);
                this.showSuccess(this.deleteResult, `Пост с ID: ${id} был удален`);
            } catch (error) {
                this.hideLoader(this.deleteLoader);
                this.showError(this.deleteResult, error.message);
            }
        }
    }

    new PostAPI();
});