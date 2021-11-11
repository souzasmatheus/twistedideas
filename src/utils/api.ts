import { appendUrl } from './string';

export const handleCorsErrors = async <KData>(url: string, onSuccess: (res: KData) => void, onError: () => void) => {
  const urlWithProxy = appendUrl(process.env.REACT_APP_CORS_API_URL ?? '', url);

  try {
    const res = await fetch(urlWithProxy);
    const parsedData = await res.json();
    onSuccess(parsedData);
  } catch {
    onError();
  }
};
