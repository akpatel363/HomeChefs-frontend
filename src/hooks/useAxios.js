import { useCallback, useEffect, useState } from 'react';
import { getErrorMessage } from '../utils/apiHelpers';
import axios from '../utils/axios';

const fetchResource = async (url) => {
  try {
    const res = await axios.get(url);
    return { loading: false, response: res.data };
  } catch (err) {
    return { loading: false, error: getErrorMessage(err) };
  }
};

const useAxios = (url) => {
  const [req, setReq] = useState({ loading: true });

  const retry = useCallback(() => {
    setReq({ loading: true });
    fetchResource(url).then((res) => setReq(res));
  }, [setReq, url]);

  useEffect(() => {
    fetchResource(url).then((res) => setReq(res));
  }, [url]);

  return [req, retry];
};

export default useAxios;
