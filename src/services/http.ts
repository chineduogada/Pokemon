import axios from "axios";
export const baseURL = "https://pokeapi.co/api/v2";

const defaultOptions = () => ({
  // timeout's the request in 2 minute by default
  timeout: 60 * 2 * 1000
});

const buildOptions = (options: { [x: string]: any } | undefined) => ({
  ...defaultOptions(),
  ...(options || {})
});
const buildURL = (path: string) => {
  return baseURL + path;
};

export const http = {
  get: (path: string, options?: { [x: string]: any }) =>
    axios.get(options?.url || buildURL(path), buildOptions(options)),
  //
  post: (
    path: string,
    data: { [x: string]: any },
    options?: { [x: string]: any }
  ) => axios.post(options?.url || buildURL(path), data, buildOptions(options)),
  //
  patch: (
    path: string,
    data: { [x: string]: any },
    options?: { [x: string]: any }
  ) => axios.patch(options?.url || buildURL(path), data, buildOptions(options)),

  //
  delete: (path: string, options?: { [x: string]: any }) =>
    axios.delete(options?.url || buildURL(path), buildOptions(options))
};
