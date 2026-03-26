import Link from "next/link";
import { Card } from "@/components/card";

export default function ProductCreatePage() {
    return (
        <Card>
            <div style={{ width: "100%" }}>
                <h2 style={{ marginTop: 0 }}>Create Product</h2>
                <p>Page de creation du produit.</p>
                <Link href="/dashbord_complex">Back to products list</Link>
            </div>
        </Card>
    );
}
