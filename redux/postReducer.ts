import { PostAPI } from "../dal/axios";

const SET_RECENT_POSTS = 'POSTS/SET_RECENT_POSTS';

let initialState = {
    posts: [
        {
            "id": 1,
            "title": "Loading...",
            "body": "Please wait"
        }
    ],
}

let postReduce = (state = initialState, action) => {
    switch (action.type) {
        case SET_RECENT_POSTS:
            return {
                ...state,
                posts: [...action.posts]
            }
        default:
            return state;
    }
}

const setPosts = (posts) => ({ type: SET_RECENT_POSTS, posts })

export const getRecentPosts = () => {
    return (dispatch) => {
        PostAPI.getPosts()
            .then(response => {
                dispatch(setPosts(response.data.reverse()));
            })
    }
}

export const deletePostAC = (postId) => {
    return (dispatch) => {
        PostAPI.deletePost(postId)
            .then(response => {
                getRecentPosts()
            })
    }
}

export const updatePostAC = (title, body, postId) => {
    return (dispatch) => {
        return PostAPI.updatePost(title, body, postId)
    }
}

export const createPostAC = (title, body) => {
    return (dispatch) => {
        return PostAPI.createPost(title, body)
    }
}

export const createCommentAC = (postId, body) => {
    return (dispatch) => {
        return PostAPI.createComment(postId, body)
    }
}

export default postReduce;