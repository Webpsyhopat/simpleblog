import { PostAPI } from "../dal/axios";

const SET_RECENT_POSTS = 'SET_RECENT_POSTS';
const SET_CURRENT_POST = 'POSTS/SET_CURRENT_POST';
const SET_SUCCESS_OF_ADDING_POST = 'POSTS/SET_SUCCESS_OF_ADDING_POST';
const SET_SUCCESS_OF_UPDATING_POST = 'POSTS/SET_SUCCESS_OF_UPDATING_POST';

let initialState = {
    posts: [
        {
            "id": 1,
            "title": "Sunt aut facere repellat provident occaecati",
            "body": "Quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto"
        },
        {
            "id": 2,
            "title": "Nesciunt iure omnis dolorem tempora et accusantium",
            "body": "Consectetur animi nesciunt iure dolore enim quia ad veniam autem ut quam aut nobis et est aut quod aut provident voluptas autem voluptas"
        },
        {
            "id": 3,
            "title": "Optio molestias id quia eum",
            "body": "Quo et expedita modi cum officia vel magni doloribus qui repudiandae vero nisi sit quos veniam quod sed accusamus veritatis error"
        }
    ],
    currentPost: '',
    postSuccessfullyAdded: '',
    postSuccessfullyUpdated: '',
}

let postReduce = (state = initialState, action) => {
    switch (action.type) {
        case SET_RECENT_POSTS:
            return {
                ...state,
                posts: [action.posts]
            }
        case SET_CURRENT_POST:
            return {
                ...state,
                currentPost: { ...action.post }
            }
        case SET_SUCCESS_OF_ADDING_POST:
            return {
                ...state,
                postSuccessfullyAdded: true
            }
        case SET_SUCCESS_OF_UPDATING_POST:
            return {
                ...state,
                postSuccessfullyUpdated: true
            }
        default:
            return state;
    }

}

const setPosts = (posts) => ({ type: SET_RECENT_POSTS, posts })
const setCurrentPost = (post) => ({ type: SET_CURRENT_POST, post })
const setStatusOfAddingPost = (status) => ({ type: SET_SUCCESS_OF_ADDING_POST, status })
const setStatusOfUpdatingPost = (status) => ({ type: SET_SUCCESS_OF_UPDATING_POST, status })

export const getRecentPosts = () => {
    return (dispatch) => {
        PostAPI.getPosts()
            .then(response => {
                dispatch(setPosts(response.data));
            })
    }
}

export const getCurrentPost = (postId) => {
    return (dispatch) => {
        PostAPI.getPost(postId)
            .then(response => {
                dispatch(setPosts(response.data));
            })
    }
}

export const deletePostAC = (postId) => {
    return (dispatch) => {
        PostAPI.deletePost(postId)
            .then(response => {
            })
    }
}

export const updatePostAC = (title, body, postId) => {
    return (dispatch) => {
        PostAPI.updatePost(title, body, postId)
            .then(response => {
            })
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