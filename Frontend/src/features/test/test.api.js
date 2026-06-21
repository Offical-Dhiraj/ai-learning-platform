export const generateTestAPI = (data) =>
  API.post("/test/generate", data);

export const getCurrentTestAPI = () =>
  API.get("/test/current");

export const deleteCurrentTestAPI = () =>
  API.delete("/test/current");