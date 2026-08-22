import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("Connecting to backend...");

  useEffect(() => {
    const getServerStatus = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/`
        );

        setMessage(response.data.message);
      } catch (error) {
        console.error(error);
        setMessage("Backend connection failed");
      }
    };

    getServerStatus();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-10 text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Task Manager
        </h1>

        <p className="text-lg text-gray-700">
          {message}
        </p>
      </div>
    </div>
  );
}

export default App;