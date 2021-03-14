import { useRouter } from "next/router"

function Posts(): JSX.Element {
    const router = useRouter()
    return<>
    <span onClick = {() => router.push(`/`)}><h1>Click me to go home =)</h1></span>
       </>
}
export default Posts

// export async function getStaticProps(context) {
//       return {
//         redirect: {
//           destination: '/',
//           permanent: false,
//         },
//       }
//   }