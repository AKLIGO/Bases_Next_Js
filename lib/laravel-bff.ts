type ProxyMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

const FORWARDED_REQUEST_HEADERS = [
  "accept",
  "authorization",
  "content-type",
  "cookie",
  "x-requested-with",
  "x-xsrf-token",
] as const;

function getApiBaseUrl() {
  const baseUrl = process.env.LARAVEL_API_BASE_URL;

  if (!baseUrl) {
    throw new Error("Missing LARAVEL_API_BASE_URL environment variable");
  }

  return baseUrl.replace(/\/$/, "");
}

function buildTargetUrl(path: string, request: Request) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const query = new URL(request.url).search;
  return `${getApiBaseUrl()}${normalizedPath}${query}`;
}

function createForwardHeaders(request: Request) {
  const headers = new Headers();

  FORWARDED_REQUEST_HEADERS.forEach((headerName) => {
    const headerValue = request.headers.get(headerName);
    if (headerValue) {
      headers.set(headerName, headerValue);
    }
  });

  if (!headers.has("accept")) {
    headers.set("accept", "application/json");
  }

  return headers;
}

function createResponseHeaders(response: Response) {
  const headers = new Headers();

  const contentType = response.headers.get("content-type");
  if (contentType) {
    headers.set("content-type", contentType);
  }

  const cacheControl = response.headers.get("cache-control");
  if (cacheControl) {
    headers.set("cache-control", cacheControl);
  }

  const setCookie = response.headers.get("set-cookie");
  if (setCookie) {
    headers.set("set-cookie", setCookie);
  }

  return headers;
}

export async function proxyToLaravel(
  request: Request,
  method: ProxyMethod,
  path: string
) {
  try {
    const targetUrl = buildTargetUrl(path, request);
    const headers = createForwardHeaders(request);

    let body: string | undefined;
    if (method !== "GET") {
      const rawBody = await request.text();
      if (rawBody.length > 0) {
        body = rawBody;
      }
    }

    const response = await fetch(targetUrl, {
      method,
      headers,
      body,
      cache: "no-store",
    });

    const responseText = await response.text();

    return new Response(responseText, {
      status: response.status,
      headers: createResponseHeaders(response),
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected BFF proxy error";

    return Response.json(
      {
        message: "BFF proxy failed",
        detail: message,
      },
      { status: 500 }
    );
  }
}
