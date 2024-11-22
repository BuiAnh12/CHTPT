import { useState, useEffect } from "react";
import Login from "../components/login";
import io from "socket.io-client"; // Import socket.io-client for real-time logs
import axios from "axios";
import logger from "../util/logger";
import { setTimeOut, getTimeOut } from "../util/schedule";
import LogTable from "../components/event";
export default function Home() {
  const [loginStage, setLoginStage] = useState(false);
  const [logs, setLogs] = useState<string>("");
  const [timeoutValue, setTimeoutValue] = useState<number>(getTimeOut()); // Initial timeout value
  const [apiResponse, setApiResponse] = useState<string>("");
  const [eventList, setEventList] = useState<{ time: string; type: string; message: string }[]>([]);

  useEffect(() => {
    const socket = io({
      path: "/api/socket",
    });

    socket.on("connect", () => {
      console.log("Connected to server for logs.");
    });

    socket.on("serverLog", (log) => {
      setLogs(log);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server.");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const userid = localStorage.getItem("user_id");
    console.log(userid);
    if (userid != null && userid != "") {
      setLoginStage(true);
    }
  });

  useEffect(() => {
    const regex = /^\[(\d{2}:\d{2}:\d{2})\]\[(INFO|ERROR|SCHEDULE)\]: (.*?)(?:\r|\n)?$/;

    // Split logs by new lines to process each log entry
    const logEntries = logs.split("\n");
    console.log(logEntries);

    const parsedEvents = logEntries
      .map((logEntry) => {
        const match = logEntry.match(regex);

        if (match) {
          let [_, time, type, message] = match;

          // Adjust type if the message contains specific patterns
          if (message.includes("[Task scheduling]")) {
            type = "SCHEDULE"; // Change type to SCHEDULE if applicable
          }
          if (message.includes("[200]")) {
            type = "SUCCESS"; // Change type to SUCCESS for API messages
          }
          if (message.includes("[409]")) {
            type = "ABORT"; // Change type to ABORT for specific error messages
          }

          // Clean up the message by removing ANSI escape codes
          const cleanedMessage = message.replace(/\u001b\[[0-9;]*m/g, "");

          return { time, type, message: cleanedMessage.trim() }; // Remove leading/trailing whitespace
        }

        return null; // Return null for non-matching entries
      })
      .filter((event): event is { time: string; type: string; message: string } => event !== null); // Filter out nulls explicitly

    console.log(parsedEvents);
    // Update event list state
    setEventList(parsedEvents);
  }, [logs]);

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
    <>
      {loginStage ? (
        <>
          <div className='bg-gray-100 min-h-screen flex items-start'>
            <div className='w-full max-w-4xl p-5'>
              {/* Real-time Logs Section */}
              <div className='my-5 bg-gray-800 p-4 rounded shadow-md h-auto'>
                <h2 className='text-xl font-bold text-white mb-2'>Logs</h2>
                <textarea
                  className='bg-gray-900 text-green-500 p-2 rounded h-96 max-h-96 w-full resize-none overflow-auto font-mono'
                  value={logs} // Join logs with line breaks
                  readOnly // Make it read-only
                />
              </div>
            </div>
            <div className='w-full max-w-4xl p-5'>
              {/* Real-time Logs Section */}
              <div className='my-5 bg-gray-800 p-4 rounded shadow-md'>
                <h2 className='text-xl font-bold text-white mb-2'>Event</h2>
                <LogTable eventList={eventList} />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className='bg-gray-100 min-h-screen flex items-center flex-col'>
          <div className='w-full max-w-4xl p-5'>
            <Login loginStage={loginStage} onLoginSuccess={handleLoginSuccess} />
          </div>
        </div>
      )}
    </>
  );
}
