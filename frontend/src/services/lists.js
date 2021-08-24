import axiosClient from "./";

export const getLists = (callback, errorCallback) => {
  return axiosClient
    .get(`/lists`)
    .then((res) => callback(res.data))
    .catch((err) => errorCallback(err));
};

export const createList = (title, dateCreated, callback, errorCallback) => {
  return axiosClient
    .post(`/lists`, { title, dateCreated })
    .then((res) => callback(res.data))
    .catch((err) => errorCallback(err));
};

export const getListById = (id, callback, errorCallback) => {
  return axiosClient
    .get(`/lists/${id}`)
    .then((res) => callback(res.data))
    .catch((err) => errorCallback(err));
};

export const createTaskInList = (listId, taskData, callback, errorCallback) => {
  return axiosClient
    .post(`/lists/${listId}/task`, taskData)
    .then((res) => callback(res.data))
    .catch((err) => errorCallback(err));
};

export const updateTaskInList = (
  listId,
  taskId,
  isComplete,
  callback,
  errorCallback
) => {
  return axiosClient
    .post(`/lists/${listId}/task/${taskId}`, { isComplete })
    .then((res) => callback(res.data))
    .catch((err) => errorCallback(err));
};
