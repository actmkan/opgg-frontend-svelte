import request from "./request";

export const getTalks = () => {
  return request.get("/talks");
};

export const getTalk = (id) => {
  return request.get(`/talks/${id}`);
};

export const getChannels = (id) => {
  return request.get(`/talks/${id}/channels`);
};
