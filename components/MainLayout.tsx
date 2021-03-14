import Head from "next/head";
import Link from "next/link";
import s from '../styles/main.module.css'
import {ReactElement} from 'react'

export type CommentProps = {
    children: ReactElement[]
    title: string
}

export function MainLayout({ children, title = 'Simple Blog' }: CommentProps): JSX.Element {
    return (
        <div className = {s.wrapper}>
            <Head>
                <title>{title} | SimpleBlog</title>
                <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
            </Head>
            <header className = {s.header}>
            <Link href="/"><a><h1>&lt;SimpleBlog &frasl;&gt;</h1></a></Link>
                <Link href="/posts/new"><a>Add Post</a></Link>
            </header>
            <main className = {s.content}>
                {children}
            </main>
            </div>
    )
}