import { notFound } from "next/navigation"

export default async function ProductReviews(
    {params}: {params: Promise<{productId:string, reviews: string}>}
){
    const {productId, reviews} = (await params)
    if(parseInt(reviews) > 1000){
        notFound();
    }
    return <h2>
        Reviews {reviews} for product {productId}
    </h2>
}