export default async function ProductReviews(
    {params}: {params: Promise<{productId:string, reviews: string}>}
){
    const {productId, reviews} = (await params)
    return <h2>
        Reviews {reviews} for product {productId}
    </h2>
}