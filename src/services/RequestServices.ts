interface CMSRequest {
    method: "POST" | "GET" | "PATCH" | "DELETE";
    url: string;
    body?: any;
    params?: any;
  }
  
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  async function requestHandler(req: CMSRequest) {
    const params = new URLSearchParams(req.params).toString()
    const response = await fetch(apiUrl + req.url + params, {
      method: req.method,
      body: req.body,
      cache: "no-store",
      next: { revalidate: 0 },
    });
  
    return response;
  }
  
  export { requestHandler };
  