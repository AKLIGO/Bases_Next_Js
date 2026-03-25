import Link from "next/link"

export default function Home() {
  return (
    <>
      <h2>
           welcome to nextjs 13 app router
     </h2>
     <Link href="/blog">Go to Blog  </Link>
     <br />
     <Link href="/products">Go to Products  </Link>

    </>
  )
}