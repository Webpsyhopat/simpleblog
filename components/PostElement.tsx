import Link from "next/link";
import s from '../styles/main.module.css'

export type CommentProps = {
    postId: number
    title: string
    body: string
}

export default function PostElement({postId, title = 'no title', body}: CommentProps): JSX.Element {
    return <div key = {postId} className = {s.postBlockDiv}>
        <div className={s.postTitleDiv}>
            <Link href={`/posts/${postId}`}><a className = {s.colorizedA}><h2>{title}</h2></a></Link>
        </div>
        <div className = {s.postTextDiv}>
            {body}
        </div>
    </div>
}