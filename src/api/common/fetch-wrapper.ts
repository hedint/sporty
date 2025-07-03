export class FetchError extends Error {
  status: number;
  statusText: string;
  data: any;
  constructor(
    status: number,
    statusText: string,
    data: any = null,
  ) {
    super(statusText);
    this.status = status;
    this.statusText = statusText;
    this.data = data;
    this.name = "FetchError";
  }
}
// fetchWrapper.ts
type FetchOptions<Request = any> = RequestInit & {
  params?: Request
  baseUrl?: string
};

const cleanUndefinedParams = (params: Record<string, string | number | undefined>): Record<string, string | number> => {
  return Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== undefined),
  ) as Record<string, string | number>;
};
export class FetchWrapper {
  private readonly baseUrl: string;
  constructor(baseUrl: string = "") {
    this.baseUrl = baseUrl;
  }

  private buildUrl(url: string, params?: Record<string, string | number>): string {
    const query = params
      ? `?${new URLSearchParams(params as Record<string, string>).toString()}`
      : "";
    return `${this.baseUrl}${url}${query}`;
  }

  async request<Response = any, Request = any>(url: string, options: FetchOptions<Request> = {}): Promise<Response> {
    // clean options params from undefined values
    const params = cleanUndefinedParams(options.params || {});
    const fullUrl = this.buildUrl(url, params);
    const headers = {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    };

    const response = await fetch(fullUrl, {
      ...options,
      headers,
    });

    const contentType = response.headers.get("content-type");
    const isJson = contentType?.includes("application/json");
    const data = isJson ? await response.json().catch(() => null) : null;

    if (!response.ok) {
      throw new FetchError(response.status, response.statusText, data);
    }

    return data as Response;
  }

  get<Response = any, Request = any>(url: string, options?: FetchOptions<Request>) {
    return this.request<Response>(url, { ...options, method: "GET" });
  }

  post<Response = any, Request = any>(url: string, body?: any, options?: FetchOptions<Request>) {
    return this.request<Response, Request>(url, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  put<Response = any, Request = any>(url: string, body?: any, options?: FetchOptions<Request>) {
    return this.request<Response, Request>(url, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    });
  }

  delete<Response = any, Request = any>(url: string, options?: FetchOptions<Request>) {
    return this.request<Response, Request>(url, { ...options, method: "DELETE" });
  }
}
