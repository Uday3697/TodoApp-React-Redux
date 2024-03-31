import React, { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import { LinearGradient } from "react-text-gradients";
import { useAppSelector } from "./store/types";

interface AlertState {
  // Define the structure of AlertState
  message: string;
}

const App: React.FC = () => {
  const alertMsgs = useAppSelector((state) => state.alert);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [currentAlertMsg, setCurrentAlertMsg] = useState<string>("");

  useEffect(() => {
    if (alertMsgs.length > 0) {
      setCurrentAlertMsg(alertMsgs[0].message); // Assuming only one message is shown at a time
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        setCurrentAlertMsg(""); // Clear the message after hiding the alert
      }, 3000); // Show alert for 3 seconds
    }
  }, [alertMsgs]);

  return (
    <div >
      <h1 style={{ textAlign: "center" }}>
        <LinearGradient gradient={["to left", "#17acff ,#ff68f0"]}>
          To Do App React & Redux
        </LinearGradient>
      </h1>
      <TodoInput />
      {showAlert && <div >{currentAlertMsg}</div>}
    </div>
  );
};

export default App;
