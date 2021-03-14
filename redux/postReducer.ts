import { PostAPI } from "../dal/axios";

const SET_RECENT_POSTS = 'POSTS/SET_RECENT_POSTS';

const initialState = {
    posts: [
        {
            "id": 1,
            "title": "Loading...",
            "body": "Please wait"
        }
    ],
}

type Post = {
    id: number
    title: string
    body: string
}

type Action = {
    type: string
    posts: Array<Post>
}

const postReduce = (state = initialState, action: Action): typeof state => {
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

const setPosts = (posts: Array<unknown>) => ({ type: SET_RECENT_POSTS, posts })

export const getRecentPosts = () => {
    return (dispatch: unknown): any => {
        PostAPI.getPosts()
            .then(response => {
                dispatch(setPosts(response.data.reverse()));
            })
    }
}

export const deletePostAC = (postId: number) => {
    return (): void => {
        PostAPI.deletePost(postId)
            .then(() => {
                getRecentPosts()
            })
    }
}

export const updatePostAC = (title: string, body: string, postId: number) => {
    return (): unknown => {
        return PostAPI.updatePost(title, body, postId)
    }
}

export const createPostAC = (title: string, body: string) => {
    return (): unknown => {
        return PostAPI.createPost(title, body)
    }
}

export const createCommentAC = (postId: number, body: string) => {
    return (): unknown => {
        return PostAPI.createComment(postId, body)
    }
}

export default postReduce;