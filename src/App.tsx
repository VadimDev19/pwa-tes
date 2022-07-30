//@ts-nocheck
import React, { useEffect, useState, useRef } from "react";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [isShowBtn, setIsShowBtn] = useState<boolean>(true);
  // const [event, setEvent] = useState<Event | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const deferredInstall = useRef<Event | null>(null);
  useEffect(() => {
    console.log("useEffect");
    serviceWorkerRegistration.register();
    window.addEventListener("beforeinstallprompt", (event) => {
      deferredInstall.current = event;
      console.log("beforeinstallprompt app", event);
    });
  }, []);

  const handleButtonClick = () => {
    setIsShowBtn(false);
    if (deferredInstall.current) {
      console.log("evt handleButtonClick", deferredInstall.current);
      deferredInstall.current.prompt();
      deferredInstall.current.userChoice.then((choice) => {
        if (choice.outcome === "accepted") {
          console.log("installed");
        } else {
          console.log("cancel");
        }
      });
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {isShowBtn && (
          <button
            type="button"
            style={{ color: "red" }}
            ref={buttonRef}
            onClick={handleButtonClick}
          >
            install app 4
          </button>
        )}
      </header>
    </div>
  );
}

export default App;
