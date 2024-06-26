import React from "react";
import { useAuth } from "./AuthContext";
import Result from "../../Result";

type Props = {
  children: React.ReactNode;
};

const CheckAuth = ({ children }: Props) => {
  const { authenticate, loading } = useAuth();

  if (loading) {
    return <Result type={100} />;
  }

  if (!authenticate.isAuthenticated) {
    return <Result type={401} />;
  }

  return (
    <div className="pt-7">
      <div className="container">{children}</div>
    </div>
  );
};

export default CheckAuth;
