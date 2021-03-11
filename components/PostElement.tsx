import Link from "next/link";
import s from '../styles/main.module.css'

export default function PostElement({postId, title, body}) {
    return <div key = {postId}>
        <div>
            <Link href={`/posts/${postId}`}><a className = {s.colorizedA}><h2>{title}</h2></a></Link>
        </div>
        <div>
            {body}
        </div>
    </div>
}