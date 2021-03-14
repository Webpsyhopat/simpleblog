import Link from 'next/link'
import { MainLayout } from '../components/MainLayout'
import PostElement from '../components/PostElement'
import { PostAPI } from '../dal/axios'
import s from '../styles/main.module.css'
import { getRecentPosts } from '../redux/postReducer'
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'

function Index({ posts, statePosts, getRecentPosts, ...props }) {

    let [localPosts, setPosts] = useState(posts)

    let postsPageData = localPosts.map(p => <PostElement key={p.id} title={p.title} postId={p.id} body={p.body} />)

    useEffect(() => {
        getRecentPosts()
    }, [])

    useEffect(() => {
        if (statePosts !== localPosts) {
            setPosts(statePosts)
        }
    },
        [statePosts])

    return <MainLayout title={'Recent posts'}>
        <Link href='/posts/new'><a className={s.colorizedA}>Add post</a></Link>
        <h1>Recent posts</h1>
        <div>
            {postsPageData}
        </div>
    </MainLayout>
}

const mapStateToProps = (state) => {
    return {
        statePosts: state.posts.posts
    }
}
const mapDispatchToProps = { getRecentPosts }

export default connect(mapStateToProps, mapDispatchToProps)(Index)

export async function getStaticProps(context) {
    const response = await PostAPI.getPosts()
    const posts = await response.data.reverse()
    return {
        props: { posts },
    }
}