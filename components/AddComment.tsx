import { useState } from "react"
import { useRouter } from "next/router"
import s from '../styles/post.module.css'

function AddComment({ postId, createCommentAC, ...props }) {

    const router = useRouter()

    let [id, setpostId] = useState(postId)
    let [commentBody, setBody] = useState('')

    const changeBody = (e) => setBody(e.currentTarget.value)
    const AddComment = async () => {
        let res = await createCommentAC(id, commentBody)
        if (res.status === 201) {
            setBody('')
            router.push(`/posts/${id}`)
        }
    }

    return <div>
        <h2 className={s.postTitle}>Add comment</h2>
        <textarea name='commentBody' value={commentBody}
            onChange={changeBody} className={s.inputBody}
            placeholder='Input your comment' />
        <div>
            <span className={s.submitSpan} onClick={AddComment}>Post Comment</span>
        </div>
    </div>
}

export default AddComment

