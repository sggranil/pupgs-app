import { requestHandler } from "@/services/RequestServices";

export const handleGetRequest = async <T>(url: string): Promise<T> => {
    try {
        const response = await requestHandler({
            method: 'GET',
            url: url
        });

        if (!response.ok) {
            let errorMessage = `Request failed with status ${response.status} for URL: ${url}`;
            try {
                const errorBody = await response.json();
                errorMessage = errorBody.message || errorBody.error || errorMessage;
            } catch {}
            throw new Error(errorMessage);
        }
        
        return response.json() as Promise<T>; 
    } catch (err: any) {
        console.error("GET Request Error:", url, err);
        throw new Error(err.message || "A network or internal error occurred.");
    }
};

export const handlePostRequest = async <T, B = object>(url: string, body?: B): Promise<T> => {
    try {
        const response = await requestHandler({
            method: 'POST',
            body: body, 
            url: url
        });

        if (!response.ok) {
            let errorMessage = `Mutation failed with status ${response.status} for URL: ${url}`;
            try {
                const errorBody = await response.json();
                errorMessage = errorBody.message || errorBody.error || errorMessage;
            } catch {}
            throw new Error(errorMessage);
        }

        return response.json() as Promise<T>;
    } catch (err: any) {
        console.error("POST Request Error:", url, err);
        throw new Error(err.message || "A network or internal error occurred during mutation.");
    }
};