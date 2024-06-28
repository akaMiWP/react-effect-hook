import apiClient from "./api-client";

class HTTPService {
  endpoints: string;

  constructor(endpoints: string) {
    this.endpoints = endpoints;
  }

  getAll<T>() {
    const controller = new AbortController();
    const request = apiClient.get<T[]>(this.endpoints, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  add<T>(entity: T) {
    return apiClient.post(this.endpoints, entity);
  }

  update<T>(id: number, entity: T) {
    return apiClient.patch(this.endpoints + "/" + id, entity);
  }

  delete(id: number) {
    return apiClient.delete(this.endpoints + "/" + id);
  }
}

const create = (endpoints: string) => new HTTPService(endpoints);

export default create;
