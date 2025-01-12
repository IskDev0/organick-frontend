export default function handleFilters(filters: Record<string, any>): URLSearchParams {
  let params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.append(key, value);
    }
  });

  return params;
}