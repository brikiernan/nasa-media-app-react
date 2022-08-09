const request = async <T>(url: string, config?: RequestInit): Promise<T> => {
  const response = await fetch(url, config);

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const error = await response.json();
    const status = response.status;
    const statusText = response.statusText;
    return Promise.reject({ ...error, status, statusText });
  }
};

export const client = {
  get: <T>(url: string) => request<T>(url),
};
