"use client";

import { usePathname } from "next/navigation";

export default function NotFound() {
    const pathname = usePathname();
    const productId = pathname.split("/")[2];
    const reviews = pathname.split("/")[4];
    return <>
        <h1>404 - Not Found</h1>
        <p>Custom not-found page rendered.</p>
        <p>The page you are looking for does not exist.</p>
        <p>Pathname: {pathname}</p>
        <h3>Reviews: {reviews}</h3>
        <h3>Product ID: {productId}</h3>
       
    </>
}