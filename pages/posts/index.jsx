import { useRouter } from "next/router"

function Posts() {
    const router = useRouter()
    return<>
       {router.push(`/`)}
       </>
}
export default Posts

export async function getStaticProps(context) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
  }