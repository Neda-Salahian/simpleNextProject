import Link from 'next/link'
import Shop from './shop/page'
function Home() {
  return (
    <>
      <div>
        <ul>
          <li>
            <Link href="/about">About Link</Link>
            <Shop />
          </li>
        </ul>

      </div>
    </>

  )
}
export default Home