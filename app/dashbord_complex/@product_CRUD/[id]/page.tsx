import Link from "next/link";
import { Card } from "@/components/card";

type Props = {
    params: Promise<{ id: string }>;
};

export default async function ProductDetailsPage({ params }: Props) {
    const id = (await params).id;

    return (
        <Card>
            <div style={{ width: "100%" }}>
                <h2 style={{ marginTop: 0 }}>Product {id}</h2>
                <p>Detail du produit (READ ONE).</p>
                <p>
                    <Link href={`/dashbord_complex/${id}/edit`}>Go to edit</Link>
                </p>
                <Link href="/dashbord_complex">Back to products list</Link>
            </div>
        </Card>
    );
}
