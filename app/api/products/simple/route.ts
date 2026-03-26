import { proxyToLaravel } from "@/lib/laravel-bff";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  return proxyToLaravel(request, "POST", "/products/simple");
}
