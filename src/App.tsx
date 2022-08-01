//@ts-nocheck
import React, { useEffect, useState, useRef } from "react";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import logo from "./logo.svg";
import "./App.css";

const isInstallAppKey = "isInstallApp";

function App() {
  const [isShowBtn, setIsShowBtn] = useState<boolean>(true);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const deferredInstall = useRef<Event | null>(null);

  useEffect(() => {
    const isInstallApp = localStorage.getItem(isInstallAppKey);
    if (isInstallApp === "true") {
      setIsShowBtn(false);
    }
  }, []);
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
          localStorage.setItem(isInstallAppKey, "true");
        } else {
          localStorage.setItem(isInstallAppKey, "false");
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
            install app 8
          </button>
        )}
      </header>
    </div>
  );
}

export default App;
