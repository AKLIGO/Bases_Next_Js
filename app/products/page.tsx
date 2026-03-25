import Link from "next/link"

export default function ProductsList(){

    const productId=100;
    return <>
    <Link href="/">Go to Home  </Link>
    <br />
    
    <h2>
        welcome to products list page
    </h2>
    <div>
        <h1>Products List</h1>
        <h3><Link href="/products/1">Product 1</Link></h3>
        <h3><Link href="/products/2">Product 2</Link></h3>
        <h3><Link href="/products/3">Product 3</Link></h3>
        <h3><Link href={`/products/${productId}`}>Product {productId}</Link></h3>
    </div></> 
}