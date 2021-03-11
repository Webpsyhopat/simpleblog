import { useState } from "react"
import { useRouter } from "next/router"
import styled from "styled-components"

const Textarea = styled.textarea`
margin: 10px;
background: #f2f2f2;
  border: 1px solid gray;
  border-radius: 3px;
`
const Span = styled.span`
display: block;
margin: 10px;
background: #fff;
border: 1px solid #000;
border-radius: 3px;
width: 50px;
padding: 5px 10px
`
const H2 = styled.h2`
margin: 10px;
`

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
        <H2>Add comment</H2>
        <Textarea name='commentBody' value={commentBody}
            onChange={changeBody} rows="4" cols="50"
            placeholder='Input your comment' />
        <Span onClick={AddComment}>Create</Span>
    </div>
}


export default AddComment

