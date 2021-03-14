import { useState } from "react"
import { MainLayout } from "../../components/MainLayout"
import { PostAPI } from "../../dal/axios"
import { connect } from "react-redux"
import { deletePostAC, updatePostAC, createCommentAC } from '../../redux/postReducer'
import { useRouter } from "next/router"
import AddComment from "../../components/AddComment"
import s from '../../styles/post.module.css'

function Post({ post, comments, deletePostAC, updatePostAC, createCommentAC }): JSX.Element {
  const router = useRouter()

  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState(post.title)
  const [body, setBody] = useState(post.body)
  const [postId, ] = useState(post.id)

  const activateEditMode = () => setEditMode(true)
  const deactivateEditMode = () => setEditMode(false)
  const changeTitle = (e) => setTitle(e.currentTarget.value)
  const changeBody = (e) => setBody(e.currentTarget.value)
  const deletePost = async (postId) => {
    await deletePostAC(postId)
    router.push('/')
  }
  const updatePost = () => {
    updatePostAC(title, body, postId)
    setEditMode(false)
  }

  const commentsArr = comments.map(c => <div key={c.id} className={s.commentLine}>{c.body}</div>)

  return (
    <MainLayout title={title}>
      <div>
        <span onClick={() => deletePost(postId)} className={s.submitSpan}>Delete post</span>
        {!editMode
          ? <span onClick={activateEditMode} className={s.submitSpan}>Modify post</span>
          : <span onClick={deactivateEditMode} className={s.submitSpan}>Cancel</span>
        }
      </div>
      {!editMode
        ? <><h1 className={s.postTitle}>{title}</h1>
          <p className={s.postBody}>{body}</p></>
        : <><h2>Edit post {title}</h2>
          <label>Post title</label>
          <div>
            <input type='text' name='title' value={title}
              onChange={changeTitle} className={s.inputTitle} />
          </div>
          <label>Post body</label>
          <div>
            <textarea name='body' value={body} onChange={changeBody} className={s.inputBody} />
          </div>
          <div>
            <span onClick={updatePost} className={s.submitSpan}>Save changes</span>
          </div>
        </>
      }
      {!editMode && <div>
        <AddComment postId={postId} createCommentAC={createCommentAC} />
        <div>
          <div><h2 className={s.commentsTitle}>{(commentsArr.length > 0)
            ? 'Lastest comments:'
            : 'Your comment may be the first'}</h2></div>
          {commentsArr}
        </div>
      </div>}
    </MainLayout>
  )
}

const mapStateToProps = () => {
  return {}
}

export default connect(mapStateToProps, { deletePostAC, updatePostAC, createCommentAC })(Post)

type Params = {params:{postId: number}}
type GetServerSideProps = Promise<{ props: { post: any[]; comments: any[]; }; }>

export async function getServerSideProps({ params }: Params): GetServerSideProps {
  const postResponse = await PostAPI.getPost(params.postId)
  const post = await postResponse.data
  const commentsResponse = await PostAPI.getComments()
  const comments = await commentsResponse.data.filter(c => c.postId == Number(params.postId))
  return {
    props: { post, comments },
  }
}