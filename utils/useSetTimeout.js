import { useEffect, useState } from "react";

let timeout;

const useSetTimeout = (callback = () => {}) => {
  const [expired, setExpiration] = useState(false);

  const resetTimeout = () => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => setExpiration(true), 20000);
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
