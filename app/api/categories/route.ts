import { proxyToLaravel } from "@/lib/laravel-bff";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return proxyToLaravel(request, "GET", "/categories");
}
