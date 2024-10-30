import { createContext, useEffect, useState } from "react";
import baseAxios, { METHOD_HTTP } from "../baseAxios/BaseAxios";
// import baseAxios, { METHOD_HTTP } from "../../configs/baseAxios";

export const InfoContext = createContext();

export const InfoProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    try {
      let data = await baseAxios(METHOD_HTTP.GET, "/users/get-profile");
      setUser(data);
      // console.log(data);
    } catch (e) {
      setUser(null);
    }
  };

  // console.log(user);

  return (
    <InfoContext.Provider value={{ user, setUser, getInfo }}>
      {children}
    </InfoContext.Provider>
  );
};
