import { getApiUrl } from '../config/api.config';

/**
 * API utility functions for making HTTP requests
 */

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
}

/**
 * Make a GET request to the API
 * @param endpoint - API endpoint
 * @param options - Request options
 * @returns Promise with the response data
 */
export const apiGet = async <T>(endpoint: string, options: RequestOptions = {}): Promise<T> => {
  const { params, ...requestOptions } = options;
  
  // Add query parameters if provided
  let url = getApiUrl(endpoint);
  if (params) {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      queryParams.append(key, value);
    });
    url += `?${queryParams.toString()}`;
  }
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...requestOptions,
  });
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
};

/**
 * Make a POST request to the API
 * @param endpoint - API endpoint
 * @param data - Request body data
 * @param options - Request options
 * @returns Promise with the response data
 */
export const apiPost = async <T>(endpoint: string, data: any, options: RequestOptions = {}): Promise<T> => {
  const response = await fetch(getApiUrl(endpoint), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: JSON.stringify(data),
    ...options,
  });
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
};

/**
 * Make a PUT request to the API
 * @param endpoint - API endpoint
 * @param data - Request body data
 * @param options - Request options
 * @returns Promise with the response data
 */
export const apiPut = async <T>(endpoint: string, data: any, options: RequestOptions = {}): Promise<T> => {
  const response = await fetch(getApiUrl(endpoint), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: JSON.stringify(data),
    ...options,
  });
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
};

/**
 * Make a DELETE request to the API
 * @param endpoint - API endpoint
 * @param options - Request options
 * @returns Promise with the response data
 */
export const apiDelete = async <T>(endpoint: string, options: RequestOptions = {}): Promise<T> => {
  const response = await fetch(getApiUrl(endpoint), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
};

export default {
  get: apiGet,
  post: apiPost,
  put: apiPut,
  delete: apiDelete,
};
