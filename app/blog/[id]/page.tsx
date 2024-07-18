'use client'
import {usePathname} from 'next/navigation'
function PostPage({ params }: { params: { id: string } }) {

    const pathname = usePathname();
    console.log(pathname)

    return (
        <>
        <h2>Post Page</h2>
          <h1 className="text-lg font-black underline">Post ID: {params.id}</h1>
        </>
        
    )
}    
export default PostPage