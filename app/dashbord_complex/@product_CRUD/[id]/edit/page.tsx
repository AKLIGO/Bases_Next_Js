import Link from "next/link";
import { Card } from "@/components/card";

type Props = {
    params: Promise<{ id: string }>;
};

export default async function ProductEditPage({ params }: Props) {
    const id = (await params).id;

    return (
        <Card>
            <div style={{ width: "100%" }}>
                <h2 style={{ marginTop: 0 }}>Edit Product {id}</h2>
                <p>Page update/delete du produit.</p>
                <p>
                    <Link href={`/dashbord_complex/${id}`}>Back to details</Link>
                </p>
                <Link href="/dashbord_complex">Back to products list</Link>
            </div>
        </Card>
    );
}
