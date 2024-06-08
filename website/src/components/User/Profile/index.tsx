import { useState } from "react";
import CheckAuth from "../CheckAuth";
import { useAuth } from "../CheckAuth/AuthContext";
import Api from "./Api";
import Home from "./Home";
import "./Profile.css";
import Projects from "./Projects";
import NotificationsPage from "./NotificationPage";
import History from "./History";

const Profile = () => {
  const { userData } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("home");

  const tabs = ["Projects", "API", "Notifications", "History"];

  const renderComponent = () => {
    if (activeTab === "home") return <Home />;
    else if (activeTab === "Projects") return <Projects />;
    else if (activeTab === "API") return <Api apiKey="sample" />;
    else if (activeTab === "Notifications") return <NotificationsPage />;
    else if (activeTab === "History") return <History />;
  };

  return (
    <CheckAuth>
      {userData.user && (
        <>
          <div className="main-header">
            <h1>
              {userData?.user?.fname} {userData?.user?.sname}
            </h1>
            <div className="search">
              <input type="text" placeholder="Search" />
              <button type="submit">
                <img height="20" src="/assets/images/Profile/aeroplane.svg" />
              </button>
            </div>
          </div>
          <div className="horizontal-tabs">
            {tabs.map((tab) => (
              <a
                key={tab}
                href="#"
                className={tab === activeTab ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(tab);
                }}
              >
                {tab}
              </a>
            ))}
          </div>

          {renderComponent()}
        </>
      )}
    </CheckAuth>
  );
};

export default Profile;
