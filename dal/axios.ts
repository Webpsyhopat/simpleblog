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
    getPosts(): any {
        return apiRequest.get('posts')
    },
    getPost(postId: number): any {
        return apiRequest.get(`posts/${postId}?_embed=comments`)
    },
    createPost(title: string, body: string): void {
        return apiRequest.post('posts', { title, body})
    },
    updatePost(title: string, body: string, postId: number):void {
       return apiRequest.put(`posts/${postId}`, { title, body})
    },
    deletePost(postId: number): void {
        return apiRequest.delete(`posts/${postId}`)
    },
    getComments(): any {
        return apiRequest.get('comments')
    },
    createComment(postId: number, body: string): void {
        return apiRequest.post('comments', { postId, body})
    },
}