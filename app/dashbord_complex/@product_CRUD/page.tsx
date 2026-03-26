"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Card } from "@/components/card";

type Product = {
    id: number;
    name: string;
    code_qr?: string | null;
    price?: number | string | null;
    stock?: number | null;
};

type PaginatedProductsResponse = {
    data: Product[];
    current_page?: number;
    last_page?: number;
    total?: number;
};

const formatPrice = (value: Product["price"]) => {
    const amount = Number(value);
    if (Number.isNaN(amount)) {
        return "-";
    }

    return new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 2,
    }).format(amount);
};

export default function ProductCrudPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const loadProducts = async () => {
            try {
                setIsLoading(true);
                setErrorMessage(null);

                const response = await fetch("/api/products", {
                    method: "GET",
                    headers: { Accept: "application/json" },
                    cache: "no-store",
                });

                if (!response.ok) {
                    throw new Error(`Request failed with status ${response.status}`);
                }

                const payload = (await response.json()) as PaginatedProductsResponse;
                if (isMounted) {
                    setProducts(Array.isArray(payload.data) ? payload.data : []);
                }
            } catch (error) {
                if (isMounted) {
                    const message =
                        error instanceof Error
                            ? error.message
                            : "Unable to load products";
                    setErrorMessage(message);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        loadProducts();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <Card>
            <div style={{ width: "100%", height: "100%", display: "flex" }}>
                <section
                    style={{
                        width: "100%",
                        borderRadius: "18px",
                        border: "1px solid #d4dae3",
                        padding: "18px",
                        background:
                            "linear-gradient(155deg, #fdfdfd 0%, #f6f9ff 45%, #f2f7f0 100%)",
                        boxShadow: "0 8px 28px rgba(40, 51, 66, 0.08)",
                        boxSizing: "border-box",
                    }}
                >
                    <header
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: "12px",
                            flexWrap: "wrap",
                            marginBottom: "12px",
                        }}
                    >
                        <div>
                            <h2
                                style={{
                                    margin: 0,
                                    fontSize: "1.45rem",
                                    letterSpacing: "0.01em",
                                    color: "#1f2937",
                                }}
                            >
                                Products (READ)
                            </h2>
                            <p style={{ margin: "4px 0 0", color: "#4b5563" }}>
                                Liste chargee ---------------------------------------
                            </p>
                        </div>
                        <Link
                            href="/dashbord_complex/create"
                            style={{
                                textDecoration: "none",
                                backgroundColor: "#0f766e",
                                color: "#ffffff",
                                padding: "10px 14px",
                                borderRadius: "10px",
                                fontWeight: 600,
                            }}
                        >
                            + Create Product
                        </Link>
                    </header>

                    {isLoading && (
                        <p style={{ margin: "14px 0", color: "#374151" }}>
                            Loading products...
                        </p>
                    )}

                    {errorMessage && (
                        <p
                            style={{
                                margin: "14px 0",
                                color: "#991b1b",
                                background: "#fee2e2",
                                border: "1px solid #fecaca",
                                padding: "10px",
                                borderRadius: "8px",
                            }}
                        >
                            Erreur: {errorMessage}
                        </p>
                    )}

                    <ul
                        style={{
                            listStyle: "none",
                            padding: 0,
                            margin: "12px 0 0",
                            display: "grid",
                            gap: "10px",
                        }}
                    >
                        {!isLoading && !errorMessage && products.length === 0 && (
                            <li
                                style={{
                                    border: "1px dashed #c7cdd8",
                                    borderRadius: "10px",
                                    padding: "12px",
                                    color: "#4b5563",
                                }}
                            >
                                No products found.
                            </li>
                        )}

                        {products.map((product) => (
                            <li
                                key={product.id}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    gap: "10px",
                                    padding: "12px",
                                    borderRadius: "12px",
                                    border: "1px solid #dbe3ee",
                                    backgroundColor: "#ffffff",
                                }}
                            >
                                <div>
                                    <Link
                                        href={`/dashbord_complex/${product.id}`}
                                        style={{
                                            color: "#0f172a",
                                            textDecoration: "none",
                                            fontWeight: 600,
                                        }}
                                    >
                                        {product.name} (#{product.id})
                                    </Link>
                                    <div
                                        style={{
                                            marginTop: "4px",
                                            color: "#475569",
                                            fontSize: "0.92rem",
                                            display: "flex",
                                            gap: "10px",
                                            flexWrap: "wrap",
                                        }}
                                    >
                                        <span>Code: {product.code_qr || "-"}</span>
                                        <span>Prix: {formatPrice(product.price)}</span>
                                        <span>Stock: {product.stock ?? "-"}</span>
                                    </div>
                                </div>

                                <Link
                                    href={`/dashbord_complex/${product.id}/edit`}
                                    style={{
                                        textDecoration: "none",
                                        color: "#0f766e",
                                        border: "1px solid #99f6e4",
                                        backgroundColor: "#f0fdfa",
                                        padding: "8px 10px",
                                        borderRadius: "8px",
                                        fontWeight: 600,
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    Edit
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </Card>
    );
}