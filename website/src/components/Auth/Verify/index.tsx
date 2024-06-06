import { useEffect, useState } from "react";
import Result from "../../Result";

const Verify = () => {
  const [Status, setStatus] = useState<101 | 102 | 103>(101);

  const tem = window.location.search;
  const token = tem.replace("?token=", "");

  console.log(token);

  // Function to verify the token
  const verifyToken = () => {
    // You can send a request to your backend to verify the token
    // For example:
    // fetch(`/api/verify?token=${token}`)
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data);
    //     // Handle verification response
    //     setVerificationStatus('success');
    //   })
    //   .catch(error => {
    //     console.error('Error verifying token:', error);
    //     // Handle error
    //     setVerificationStatus('error');
    //     setVerificationError(error.message || 'An error occurred while verifying the token.');
    //   });

    // For demonstration purposes, simulate verification
    // Replace setTimeout with actual API call
    setTimeout(() => {
      const success = Math.random() < 0.5; // Simulate 80% success rate
      if (success) {
        setStatus(102);
      } else {
        setStatus(103);
        // setVerificationError("Failed to verify token.");
      }
    }, 1000); // Simulate 1 second delay
  };

  // Verify the token when the component mounts
  useEffect(() => {
    if (token) verifyToken();
    else setStatus(103);
  }, [token]);

  return <Result type={Status} />;
};

export default Verify;
