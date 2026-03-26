import { proxyToLaravel } from "@/lib/laravel-bff";

type ProductRouteContext = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: ProductRouteContext) {
  const { id } = await params;
  return proxyToLaravel(request, "GET", `/products/${id}`);
}

export async function PUT(request: Request, { params }: ProductRouteContext) {
  const { id } = await params;
  return proxyToLaravel(request, "PUT", `/products/${id}`);
}

export async function PATCH(request: Request, { params }: ProductRouteContext) {
  const { id } = await params;
  return proxyToLaravel(request, "PATCH", `/products/${id}`);
}

export async function DELETE(request: Request, { params }: ProductRouteContext) {
  const { id } = await params;
  return proxyToLaravel(request, "DELETE", `/products/${id}`);
}
