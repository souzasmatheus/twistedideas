export const appendUrl = (baseUrl: string, secondaryUrl: string): string => `${baseUrl}/${secondaryUrl.replace(/^https?:\/\//i, "")}`
