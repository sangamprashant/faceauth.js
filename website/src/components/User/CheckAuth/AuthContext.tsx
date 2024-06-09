import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { SERVER } from "../../../config";
import { Error as ErrorComp } from "../../Result/Tag";
import { notification } from "antd";

type AuthContextType = {
  token: {
    setAuthToken: (token: string) => void;
    authToken: string | undefined;
  };
  userData: {
    setUser: (user: any) => void;
    user: any;
  };
  authenticate: {
    setIsAuthenticated: (value: boolean) => void;
    isAuthenticated: boolean;
  };
  model: {
    setModelState: (value: boolean) => void;
    modelState: boolean;
    modelData: React.ReactNode;
    setModelData: (value: React.ReactNode) => void;
  };
  loading: boolean;
  checkAuth: () => void;
  logout: () => void;
  handleNotification: (message: string, description: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | undefined>(
    Cookies.get("accessToken")
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!authToken);
  const [modelState, setModelState] = useState<boolean>(false);
  const [modelData, setModelData] = useState<React.ReactNode>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (!user && authToken) {
      checkAuth();
    } else setLoading(false);
  }, [authToken, user]);

  const logout = () => {
    Cookies.remove("accessToken");
    setAuthToken(undefined);
    setUser(null);
    setIsAuthenticated(false);
  };

  const checkAuth = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${SERVER}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.data.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      } else {
        logout();
      }
    } catch (error: any) {
      setModelState(true);
      setModelData(
        <ErrorComp
          text={
            error?.response?.data?.message ||
            error?.response?.data?.msg ||
            "Something went wrong."
          }
        />
      );
      if (error?.response?.status === 401) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token: { setAuthToken, authToken },
        userData: { setUser, user },
        authenticate: { setIsAuthenticated, isAuthenticated },
        model: {
          setModelState,
          modelState,
          modelData,
          setModelData,
        },
        loading,
        checkAuth,
        logout,
        handleNotification,
      }}
    >
      {contextHolder}
      {children}
    </AuthContext.Provider>
  );
  function handleNotification(message: string, description: string) {
    const audio = new Audio("./assets/audio/notify.mp3");
    audio.play().catch((error) => {
      console.error("Error playing sound:", error);
    });
    api.info({
      message,
      description,
      placement: "bottomRight",
    });
  }
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
