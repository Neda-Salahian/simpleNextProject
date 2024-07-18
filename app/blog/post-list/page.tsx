import Link from 'next/link'
interface Post {
    id: number
    title: string

}
async function PostList() {

    const response = await fetch('https://jsonplaceholder.typicode.com/posts' ,
     {
        next: {
            revalidate: 10
        }
    })

    let posts: Post[] = await response.json()

    posts = posts.splice(0,10)

    return (
        <ul>
            {posts.map((post) => (
                <li key={post.id}>
                    <Link href={`/blog/${post.id}`}>
                        {post.title}
                    </Link>
                </li>
            ))}
        </ul>
    ) 
}

export default PostList