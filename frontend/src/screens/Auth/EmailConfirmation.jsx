import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EmailConfirmation = () => {
  const { token } = useParams(); // Get the token from the URL
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/accounts/confirm-email/${token}/`);
        if (response.status === 200) {
          setStatus("success");
        }
      } catch (error) {
        setStatus("error");
      }
    };

    confirmEmail();
  }, [token]);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        {status === "loading" && <p className="text-blue-500">Verifying your email...</p>}
        {status === "success" && (
          <>
            <h2 className="text-2xl font-semibold text-green-600">Email Confirmed!</h2>
            <p className="text-gray-700 mt-2">Your email has been successfully verified.</p>
            <a href="/login" className="mt-4 block text-blue-500 hover:underline">
              Go to Login
            </a>
          </>
        )}
        {status === "error" && (
          <>
            <h2 className="text-2xl font-semibold text-red-600">Error!</h2>
            <p className="text-gray-700 mt-2">Invalid or expired confirmation link.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default EmailConfirmation;
