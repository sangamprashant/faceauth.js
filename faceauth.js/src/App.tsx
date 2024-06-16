import "./App.css";
import { deleteUserFromProject, initFaceAuth } from "./Components/FaceAuth";
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
  const handleDelete = async () => {
    try {
      const userId = "8e07947b-8666-412e-9cb1-445a01d2581a";
      const projectId = "61315f6f-d27f-44f3-9dc4-6ca2672bcd9c";
      const apiKey = "432339ed-4c3f-42d2-910e-404100e4fd51";

      const response = await deleteUserFromProject(userId, projectId, apiKey);
      console.log(response.message); // Handle the response as needed
    } catch (error: any) {
      console.error(error.message); // Handle the error as needed
    }
  };

  return (
    <>
      <div id="faceauth-js" />
      <h1>this is face auth </h1>
      <button className="" onClick={handleAuth}>
        open face log
      </button>
      <button onClick={handleDelete}>deelete</button>
    </>
  );
};

export default App;
