import { useEffect, useState } from "react";

let timeout;

const useSetTimeout = (callback = () => {}, time = 20000) => {
  const [expired, setExpiration] = useState(false);

  const resetTimeout = () => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => setExpiration(true), time);
  };

  useEffect(() => {
    if (expired) {
      callback();
    }
  }, [expired]);

  useEffect(() => {
    resetTimeout();
  }, []);

  return {
    resetTimeout,
  };
};

export default useSetTimeout;
