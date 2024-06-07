import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { SERVER } from "../../../config";
import Result from "../../Result";
import { Error } from "../../Result/Tag";
import { useAuth } from "../../User/CheckAuth/AuthContext";

const Verify = () => {
  const [status, setStatus] = useState<101 | 102 | 103>(101);
  const { model, token, userData, authenticate } = useAuth();

  const tem = window.location.search;
  const LinkToken = tem.replace("?token=", "");

  // Function to verify the token
  const verifyToken = async () => {
    try {
      const response = await axios.get(`${SERVER}/auth/verify`, {
        headers: {
          Authorization: "Bearer " + LinkToken,
        },
      });
      if (response.data.success) {
        setStatus(102);
        console.log(response.data.token);
        Cookies.set("accessToken", response.data.token, { expires: 1 });
        token.setAuthToken(response.data.token);
        userData.setUser(response.data.user);
        authenticate.setIsAuthenticated(true);
      }
    } catch (error: any) {
      setStatus(103);
      model.setModelState(true);
      model.setModelData(
        <Error
          text={
            error?.response?.data?.message ||
            error?.response?.data?.msg ||
            "Something went wrong, please try later."
          }
        />
      );
    }
  };

  useEffect(() => {
    if (LinkToken) verifyToken();
    else setStatus(103);
  }, [LinkToken]);

  return <Result type={status} />;
};

export default Verify;
