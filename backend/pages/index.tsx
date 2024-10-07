import { useState, useEffect } from "react";
import Login from "../components/login";
import io from "socket.io-client"; // Import socket.io-client for real-time logs
import axios from "axios";
import logger from "../util/logger";
import { setTimeOut, getTimeOut } from "../util/schedule";
export default function Home() {
  const [loginStage, setLoginStage] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [timeoutValue, setTimeoutValue] = useState<number>(getTimeOut()); // Initial timeout value
  const [apiResponse, setApiResponse] = useState<string>("");

  useEffect(() => {
    const socket = io({
      path: "/api/socket",
    });


    socket.on("connect", () => {
      console.log("Connected to server for logs.");
    });

    socket.on("serverLog", (log) => {
      setLogs(log); // Append new log
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server.");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleLoginSuccess = (userData) => {
    setLoginStage(true);
  };

  const handleTimeoutChange = (event) => {
    setTimeoutValue(event.target.value);
  };

  const handleApiCall = async () => {
    try {
      const response = await axios.post("/api/your-endpoint", { timeout: timeoutValue });
      setApiResponse(response.data);
    } catch (error) {
      setApiResponse("Error making API call.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-4xl p-5">
        {loginStage ? (
          <>
            {/* Real-time Logs Section */}
            <div className="my-5 bg-white p-4 rounded shadow-md">
              <h2 className="text-xl font-bold mb-2">Server Logs (Real-time)</h2>
              <textarea
                className="bg-gray-900 text-white p-2 rounded h-48 w-full resize-none overflow-auto"
                value={logs} // Join logs with line breaks
                readOnly // Make it read-only
              />
            </div>

            {/* Modify Timeout Section */}
            {/* <div className="my-5 bg-white p-4 rounded shadow-md">
              <h2 className="text-xl font-bold mb-2">Modify Timeout Variable</h2>
              <input
                type="number"
                value={timeoutValue}
                onChange={handleTimeoutChange}
                className="border rounded p-2 w-full"
                placeholder="Enter timeout in seconds"
              />
              <button
                onClick={handleApiCall}
                className="mt-3 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Update Timeout & Call API
              </button>
              {apiResponse && <p className="mt-2">{apiResponse}</p>}
            </div> */}
          </>
        ) : (
          <Login loginStage={loginStage} onLoginSuccess={handleLoginSuccess} />
        )}
      </div>
    </div>
  );
}
