# faceauth.js

`faceauth.js` is a React-based library designed to provide face authentication capabilities. This package offers a set of components and utilities to seamlessly integrate face authentication into your React applications.

## Installation

You can install `faceauth.js` via npm:

```bash
npm install faceauth.js
```

Or via yarn:

```bash
yarn add faceauth.js
```

## Usage

### Basic Example

Below is a basic example of how to use `faceauth.js` in your React application:

```jsx
import React, { useEffect } from "react";
import "faceauth.js/css"; // Import the CSS styles for faceauth.js
import {
  initFaceAuth,
  deleteUserFromProject,
  handleFaceAuth,
} from "faceauth.js"; // Import necessary functions from faceauth.js

const App = () => {
  useEffect(() => {
    handleFaceAuth(); // Initialize the face authentication process when the component mounts
  }, []);

  const handleAuth = () => {
    // Initialize face authentication for login or registration
    initFaceAuth({
      endPoint: "authenticate", // Use "authenticate" for login and "authorization" for registering a new user
      projectId: "YOUR_PROJECT_ID", // Your project ID
      apiKey: "YOUR_API_KEY", // Your API key
      payload: {
        // Any additional data for registration
      },
    })
      .then((user) => {
        console.log("Operation successful", user); // Handle success
      })
      .catch((error) => {
        console.error("An error occurred", error); // Handle error
      });
  };

  const handleDelete = async () => {
    try {
      const userId = "USER_ID_IN_YOUR_PROJECT"; // The ID of the user to be deleted
      const projectId = "YOUR_PROJECT_ID"; // Your project ID
      const apiKey = "YOUR_API_KEY"; // Your API key

      const response = await deleteUserFromProject(userId, projectId, apiKey);
      console.log(response.message); // Handle the response as needed
    } catch (error) {
      console.error(error.message); // Handle the error as needed
    }
  };

  return (
    <div className="container">
      <div id="faceauth-js" />
      <h1>This is Face Authentication</h1>
      <button className="btn" onClick={handleAuth}>
        Open Face Log
      </button>
      <button className="btn" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default App;
```

### API

#### `initFaceAuth` Function

The `initFaceAuth` function is used to initialize the face authentication process. This can be for either logging in an existing user or registering a new user.

##### Parameters

- `config` (object): Configuration object for initializing face authentication.
  - `endPoint` (string): The API endpoint for authentication ("authenticate" for login or "authorization" for registration).
  - `projectId` (string): Your project ID.
  - `apiKey` (string): Your API key.
  - `payload` (object): Any additional data for registration.

##### Returns

- A promise that resolves with the authenticated user data or rejects with an error.

##### Example

```js
initFaceAuth({
  endPoint: "authenticate",
  projectId: "YOUR_PROJECT_ID",
  apiKey: "YOUR_API_KEY",
  payload: {
    /* additional data */
  },
})
  .then((user) => {
    console.log("Operation successful", user);
  })
  .catch((error) => {
    console.error("An error occurred", error);
  });
```

#### `deleteUserFromProject` Function

The `deleteUserFromProject` function allows you to remove a user from your project.

##### Parameters

- `userId` (string): The ID of the user to be deleted.
- `projectId` (string): Your project ID.
- `apiKey` (string): Your API key.

##### Returns

- A promise that resolves with the server response or rejects with an error.

##### Example

```js
const userId = "USER_ID_IN_YOUR_PROJECT";
const projectId = "YOUR_PROJECT_ID";
const apiKey = "YOUR_API_KEY";

deleteUserFromProject(userId, projectId, apiKey)
  .then((response) => {
    console.log(response.message);
  })
  .catch((error) => {
    console.error(error.message);
  });
```

#### `handleFaceAuth` Function

The `handleFaceAuth` function initializes the face authentication process. This is typically called when the component mounts.

##### Description

- Initializes the face authentication process when the component mounts.

##### Example

```js
useEffect(() => {
  handleFaceAuth();
}, []);
```

## Contributing

We welcome contributions! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.

## License

`faceauth.js` is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more information.

## Documentation

For more detailed documentation, visit our [website](https://faceauth-js.vercel.app/).
