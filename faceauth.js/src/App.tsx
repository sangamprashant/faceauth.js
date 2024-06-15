import "./App.css";
import { initFaceAuth } from "./Components/FaceAuth";
const App = () => {
  
  const handleAuth = () => {
    initFaceAuth({
      endPoint: "authorization",
      projectId: "61315f6f-d27f-44f3-9dc4-6ca2672bcd9c",
      apiKey: "432339ed-4c3f-42d2-910e-404100e4fd51",
      pin: "123456",
      payload: {
        /* any additional data for registration */
      },
    })
      .then((user) => {
        console.log("Operation successful", user);
      })
      .catch((error) => {
        console.error("An error occurred", error);
      });
  };

  return (
    <>
      <div id="faceauth-js" />
      <h1>this is face auth </h1>
      <button className="" onClick={handleAuth}>
        open face log
      </button>
    </>
  );
};

export default App;
