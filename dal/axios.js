import * as axios from 'axios';

const axiosParams = {
    baseURL: 'https://simple-blog-api.crew.red/',
    headers: {
        ContentType: 'application/json'
    },
    withCredentials: true
}

const apiRequest = axios.create(axiosParams);

export const PostAPI = {
    getPosts() {
        return apiRequest.get('posts')
    },
    getPost(postId) {
        return apiRequest.get(`posts/${postId}?_embed=comments`)
    },
    createPost(title, body) {
        return apiRequest.post('posts', { title, body})
    },
    updatePost(title, body, postId) {
       return apiRequest.put(`posts/${postId}`, { title, body})
    },
    deletePost(postId) {
        return apiRequest.delete(`posts/${postId}`)
    },
    getComments() {
        return apiRequest.get('comments')
    },
    createComment(postId, body) {
        return apiRequest.post('comments', { postId, body})
    },
}