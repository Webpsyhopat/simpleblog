import Link from 'next/link'
import { MainLayout } from '../components/MainLayout'
import PostElement from '../components/PostElement'
import { PostAPI } from '../dal/axios'
import s from '../styles/main.module.css'

function Index({ posts }) {

    let postsPageData = posts.map(p => <PostElement key={p.id} title={p.title} postId={p.id} body={p.body} />)

    return <MainLayout title={'Recent posts'}>
        <Link href='/posts/new'><a className = {s.colorizedA}>Add post</a></Link>
        <h1>Recent posts</h1>
        <div>
            {postsPageData}
        </div>
    </MainLayout>
}

export default Index

export async function getStaticProps(context) {
    const response = await PostAPI.getPosts()
    const posts = await response.data.reverse()
    return {
        props: { posts },
    }
}