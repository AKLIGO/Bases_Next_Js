"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { Card } from "@/components/card";

type ValidationErrors = Record<string, string[]>;

type Category = {
    id: number;
    name: string;
};

type CategoriesResponse = Category[] | { data?: Category[] };

export default function ProductCreatePage() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [codeQr, setCodeQr] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [description, setDescription] = useState("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<ValidationErrors>({});

    const canSubmit = useMemo(() => {
        return (
            name.trim().length > 0 &&
            categoryId.trim().length > 0 &&
            codeQr.trim().length > 0 &&
            price.trim().length > 0 &&
            stock.trim().length > 0 &&
            !isSubmitting &&
            !categoriesLoading
        );
    }, [categoriesLoading, categoryId, codeQr, isSubmitting, name, price, stock]);

    useEffect(() => {
        let isMounted = true;

        const loadCategories = async () => {
            try {
                setCategoriesLoading(true);

                const response = await fetch("/api/categories", {
                    method: "GET",
                    headers: { Accept: "application/json" },
                    cache: "no-store",
                });

                if (!response.ok) {
                    throw new Error(`Categories request failed with ${response.status}`);
                }

                const payload = (await response.json()) as CategoriesResponse;
                const extracted = Array.isArray(payload)
                    ? payload
                    : Array.isArray(payload.data)
                      ? payload.data
                      : [];

                if (isMounted) {
                    setCategories(extracted);
                }
            } catch (error) {
                if (isMounted) {
                    setErrorMessage(
                        error instanceof Error
                            ? error.message
                            : "Impossible de charger les categories."
                    );
                }
            } finally {
                if (isMounted) {
                    setCategoriesLoading(false);
                }
            }
        };

        loadCategories();

        return () => {
            isMounted = false;
        };
    }, []);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setErrorMessage(null);
        setSuccessMessage(null);
        setFieldErrors({});
        setIsSubmitting(true);

        try {
            const payload = {
                name: name.trim(),
                category_id: Number(categoryId),
                code_qr: codeQr.trim(),
                price: Number(price),
                stock: Number(stock),
                description: description.trim() || null,
            };

            const response = await fetch("/api/products/simple", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                let parsed: unknown = null;
                try {
                    parsed = await response.json();
                } catch {
                    parsed = null;
                }

                const parsedObject = parsed as {
                    message?: string;
                    errors?: ValidationErrors;
                };

                if (response.status === 422 && parsedObject?.errors) {
                    setFieldErrors(parsedObject.errors);
                    throw new Error("Veuillez corriger les champs invalides.");
                }

                throw new Error(
                    parsedObject?.message ||
                        `Creation failed with status ${response.status}`
                );
            }

            setSuccessMessage("Produit cree avec succes.");

            setName("");
            setCategoryId("");
            setCodeQr("");
            setPrice("");
            setStock("");
            setDescription("");

            setTimeout(() => {
                router.push("/dashbord_complex");
                router.refresh();
            }, 700);
        } catch (error) {
            setErrorMessage(
                error instanceof Error ? error.message : "Echec de creation du produit."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputStyle = {
        width: "100%",
        border: "1px solid #d1d5db",
        borderRadius: "8px",
        padding: "10px 12px",
        boxSizing: "border-box" as const,
        outline: "none",
    };

    return (
        <Card>
            <div style={{ width: "100%" }}>
                <h2 style={{ marginTop: 0, marginBottom: "8px" }}>Create Product</h2>
                <p style={{ marginTop: 0, color: "#4b5563" }}>
                    Remplis les champs requis pour creer un produit.
                </p>

                <form onSubmit={handleSubmit} style={{ display: "grid", gap: "12px" }}>
                    <label>
                        <div style={{ marginBottom: "6px" }}>Name *</div>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={inputStyle}
                            maxLength={255}
                            required
                        />
                        {fieldErrors.name?.[0] && (
                            <small style={{ color: "#991b1b" }}>{fieldErrors.name[0]}</small>
                        )}
                    </label>

                    <label>
                        <div style={{ marginBottom: "6px" }}>Category *</div>
                        <select
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            style={inputStyle}
                            required
                            disabled={categoriesLoading}
                        >
                            <option value="">
                                {categoriesLoading
                                    ? "Chargement des categories..."
                                    : "Selectionner une categorie"}
                            </option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {fieldErrors.category_id?.[0] && (
                            <small style={{ color: "#991b1b" }}>
                                {fieldErrors.category_id[0]}
                            </small>
                        )}
                    </label>

                    <label>
                        <div style={{ marginBottom: "6px" }}>Code QR *</div>
                        <input
                            type="text"
                            value={codeQr}
                            onChange={(e) => setCodeQr(e.target.value)}
                            style={inputStyle}
                            maxLength={255}
                            required
                        />
                        {fieldErrors.code_qr?.[0] && (
                            <small style={{ color: "#991b1b" }}>{fieldErrors.code_qr[0]}</small>
                        )}
                    </label>

                    <div
                        style={{
                            display: "grid",
                            gap: "12px",
                            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                        }}
                    >
                        <label>
                            <div style={{ marginBottom: "6px" }}>Price *</div>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                style={inputStyle}
                                required
                            />
                            {fieldErrors.price?.[0] && (
                                <small style={{ color: "#991b1b" }}>{fieldErrors.price[0]}</small>
                            )}
                        </label>

                        <label>
                            <div style={{ marginBottom: "6px" }}>Stock *</div>
                            <input
                                type="number"
                                min="0"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                style={inputStyle}
                                required
                            />
                            {fieldErrors.stock?.[0] && (
                                <small style={{ color: "#991b1b" }}>{fieldErrors.stock[0]}</small>
                            )}
                        </label>
                    </div>

                    <label>
                        <div style={{ marginBottom: "6px" }}>Description</div>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            style={{ ...inputStyle, minHeight: "86px", resize: "vertical" }}
                        />
                        {fieldErrors.description?.[0] && (
                            <small style={{ color: "#991b1b" }}>
                                {fieldErrors.description[0]}
                            </small>
                        )}
                    </label>

                    {errorMessage && (
                        <p
                            style={{
                                margin: 0,
                                color: "#991b1b",
                                background: "#fee2e2",
                                border: "1px solid #fecaca",
                                padding: "10px",
                                borderRadius: "8px",
                            }}
                        >
                            {errorMessage}
                        </p>
                    )}

                    {successMessage && (
                        <p
                            style={{
                                margin: 0,
                                color: "#065f46",
                                background: "#d1fae5",
                                border: "1px solid #a7f3d0",
                                padding: "10px",
                                borderRadius: "8px",
                            }}
                        >
                            {successMessage}
                        </p>
                    )}

                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                        <button
                            type="submit"
                            disabled={!canSubmit}
                            style={{
                                border: "none",
                                borderRadius: "8px",
                                padding: "10px 14px",
                                background: canSubmit ? "#0f766e" : "#9ca3af",
                                color: "#fff",
                                fontWeight: 600,
                                cursor: canSubmit ? "pointer" : "not-allowed",
                            }}
                        >
                            {isSubmitting ? "Creating..." : "Create product"}
                        </button>
                        <Link href="/dashbord_complex">Back to products list</Link>
                    </div>
                </form>
            </div>
        </Card>
    );
}
