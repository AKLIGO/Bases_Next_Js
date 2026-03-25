export default async function ProductDetails(
    { params }: { params: { productId: string }     }
){
    const productId =(await params).productId
    return <h2>
        welcome to product details {productId}
    </h2>
}