import { useState } from "react"
import { MainLayout } from "../../components/MainLayout"
import { connect } from "react-redux"
import { createPostAC } from '../../redux/postReducer'
import { useRouter } from "next/router"
import s from '../../styles/new.module.css'

function AddPost(props) {

    const router = useRouter()

    let [title, setTitle] = useState('')
    let [body, setBody] = useState('')

    const changeTitle = (e) => setTitle(e.currentTarget.value)
    const changeBody = (e) => setBody(e.currentTarget.value)
    const addPost = async () => {
       let res = await props.createPostAC(title, body)
       router.push(`/posts/${res.data.id}`)
    }

    return <MainLayout title={'Add new post'}>
        <h1>Create new post</h1>
        <label>Post title</label>
        <div>
            <input type='text' name='title' value={title} 
            onChange={changeTitle} placeholder = 'Input post Title' 
            className = {s.inputTitle}/>
        </div>
        <label>Post body</label>
        <div>
            <textarea name='body' value={body} 
            onChange={changeBody} rows="4" cols="50" 
            placeholder = 'Input post text' 
            className = {s.inputBody}/>
        </div>
        <div>
            <span onClick={addPost} className = {s.submitSpan}>Create</span>
        </div>
    </MainLayout>
}

const mapStateToProps = (state) => {
    return {}
  }
  
  export default connect(mapStateToProps, { createPostAC })(AddPost)

  