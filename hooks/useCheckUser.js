import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const useCheckUser = () => {
  const [user, setUser] = useState({});

  const router = useRouter();

  useEffect(() => {
    const userJSON = window.localStorage.getItem("user");
    const user = JSON.parse(userJSON);

    if (!user) router.push("/");
    else setUser(user);
  }, []);

  return {
    user,
  };
};

export default useCheckUser;
