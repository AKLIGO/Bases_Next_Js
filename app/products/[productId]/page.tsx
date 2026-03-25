import { Metadata } from "next"


type Props = {
    params: Promise<{ productId: string }>;
}

export const generateMetadata = async ({params,}: Props): Promise<Metadata> => {
    const id=(await params).productId;
    return {
        title:`Product ${id} details page`,
        description:`This is the details page for product ${id}`
    }
}

export default async function ProductDetails(
    { params }: Props
){
    const productId =(await params).productId
    return <h2>
        welcome to product details {productId}
    </h2>
}