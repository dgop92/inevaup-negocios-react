import React from "react";
import { useHistory } from "react-router";

export default function NotFound() {
  const history = useHistory();

  const goBackToDashboard = () => {
    history.replace("/dashboard");
    history.go(0);
  };

  return (
    <div>
      Not Found <button onClick={goBackToDashboard}>GO back</button>
    </div>
  );
}
