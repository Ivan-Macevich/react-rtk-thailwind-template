export function paramsSerializer(params: any, prefix?: string): string {
  const query = Object.keys(params).map((key) => {
    const value = params[key];

    if (params.constructor === Array) key = `${prefix}[]`;
    else if (params.constructor === Object)
      key = prefix ? `${prefix}[${key}]` : key;

    if (typeof value === "object") return paramsSerializer(value, key);
    else return `${key}=${encodeURIComponent(value)}`;
  });

  return ([] as any).concat.apply([], query).join("&");
}
