import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TryOnlineWithData from "./TryOnlineWithData";
import TryOnlineWithoutData from "./TryOnlineWithoutData";

const TryOnline = () => {
  const [urlHash, setUrlHash] = useState<string | null>(window.location.hash);
  const navigate = useNavigate();

  useEffect(() => {
    const handleHashChange = () => {
      setUrlHash(window.location.hash);
    };
    handleHashChange();
  }, [window.location.hash, navigate]);

  useEffect(() => {
    console.log(urlHash);
  }, [urlHash]);

  if (urlHash === "#own") {
    return <TryOnlineWithoutData />;
  }

  return <TryOnlineWithData />;
};

export default TryOnline;
