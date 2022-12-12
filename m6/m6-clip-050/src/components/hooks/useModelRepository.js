import axios from "axios";
import { useEffect, useState } from "react";

const STATUS_LOADING = "loading";
const STATUS_ERROR = "errored";
const STATUS_SUCCESS = "success";

export default function useModelRepository(url, errorNotificationFn) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState();
  const [status, setStatus] = useState(false);

  const safely = async (action) => {
    try {
      return await action();
    } catch (error) {
      setError(error);
      setStatus(STATUS_ERROR);
      errorNotificationFn?.(error);
    }
  };

  const getAll = async () => {
    try {
      setStatus(STATUS_LOADING);
      setError(null);
      const response = await axios.get(url);
      setItems(response.data);
      setStatus(STATUS_SUCCESS);
      return response.data;
    } catch (error) {
      handleError(error);
    }
    return null;
  };
  useEffect(() => {
    getAll();
  }, [url]);

  const createItem = async (item, callbackDone) => {
    try {
      await axios.post(`${url}/${item.id}`, item);
      setItems(items.map((_) => (_.id === item.id ? item : _)));
      callbackDone?.();
      setStatus(STATUS_SUCCESS);
    } catch (error) {
      handleError(error);
    }
  };

  const updateItem = async (item, callbackDone) => {
    try {
      await axios.put(`${url}/${item.id}`, item);
      setItems(items.map((_) => (_.id === item.id ? item : _)));
      if (callbackDone) callbackDone();
      setStatus(STATUS_SUCCESS);
    } catch (error) {
      handleError(error);
    }
  };

  const deleteItem = async (item, callbackDone) => {
    try {
      await axios.delete(`${url}/${item.id}`);
      setItems(items.map((_) => (_.id === item.id ? item : _)));
      if (callbackDone) callbackDone();
      setStatus(STATUS_SUCCESS);
    } catch (error) {
      handleError(error);
    }
  };

  return {
    items,
    status,
    error,
    isLoading: () => status == STATUS_LOADING,
    createItem,
    updateItem,
    deleteItem,
  };
}
