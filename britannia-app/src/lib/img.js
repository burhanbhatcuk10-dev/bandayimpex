export const thumb = (url, w = 500) =>
  url && url.includes("/upload/")
    ? url.replace("/upload/", `/upload/f_auto,q_auto,c_limit,w_${w}/`)
    : url;
