import Link from "next/link";
import { Card } from "@/components/card";

const products = ["1", "2", "3"];

export default function ProductCrudPage() {
    return (
        <Card>
            <div style={{ width: "100%" }}>
                <h2 style={{ marginTop: 0 }}>Products (READ)</h2>
                <p style={{ marginTop: 0 }}>Architecture CRUD dans le slot product_CRUD</p>
                <p>
                    <Link href="/dashbord_complex/create">Create Product</Link>
                </p>
                <ul style={{ paddingLeft: "20px", marginBottom: 0 }}>
                    {products.map((id) => (
                        <li key={id}>
                            <Link href={`/dashbord_complex/${id}`}>Product {id}</Link>
                            {" - "}
                            <Link href={`/dashbord_complex/${id}/edit`}>Edit</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </Card>
    );
}