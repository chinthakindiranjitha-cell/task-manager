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
    <div>
      <h1>Task Manager</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;