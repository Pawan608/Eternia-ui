import React, { useState } from "react";
import styles from "./style.module.scss";
import MicNoneIcon from "@mui/icons-material/MicNone";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { useSearchStore } from "data/store";
function MicComponent() {
  const { setSearchedText, setSearchQuery, searchQuery, setShowMic } =
    useSearchStore();
  const [isMicActive, setIsMicActive] = useState(false);
  const [ispemissionGranted, setIspermissionGranted] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [error, setError] = useState({
    message: "",
    isError: false,
    isAccess: false,
  });
  const handleSpeechRecognition = () => {
    console.log("function called");
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.interimResults = true;
    let transcript = "";
    recognition.onstart = () => {
      setIsMicActive(true);
      console.log("start function");
      setSearchQuery("");
      setError({
        message: "",
        isError: false,
        isAccess: true,
      });
    };

    recognition.onresult = (event) => {
      transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      // handleInputChange(transcript); // Call handleInputChange to trigger action
    };

    recognition.onerror = (event) => {
      setIsMicActive(false);
      if (event.error === "no-speech") {
        setError({
          message: "No speech detected",
          isError: true,
          isAccess: true,
        });
      } else if (event.error === "audio-capture") {
        setError({
          message: "Microphone not available",
          isError: true,
          isAccess: true,
        });
      } else if (event.error === "not-allowed") {
        setError({
          message: "Microphone access denied",
          isError: true,
          isAccess: false,
        });
        // Handle microphone access denied
        requestMicrophonePermission();
      }
    };

    recognition.onend = () => {
      setIsMicActive(false);
      console.log("end function");
      //   console.log("new mic...", transcript);
      if (transcript) {
        setSearchedText(transcript);
        setShowMic(false);
      }
      // clearTimeout(timeout!);
      // console.log("Searched text----", searchQuery);
      // Clear the timeout
    };

    recognition.start();
  };

  React.useEffect(() => {
    console.log("useEffect called");
    if (!isMicActive) {
      console.log("handleSpeechRecognition called");
      setTimeout(() => {
        handleSpeechRecognition();
      }, 1000);
    }
  }, []);

  const requestMicrophonePermission = () => {
    console.log("function called");
    // navigator.mediaDevices
    //   .getUserMedia({ audio: true })
    //   .then(() => {
    //     console.log("Microphone access granted");
    //     // Microphone access granted, retry speech recognition
    //     handleSpeechRecognition();
    //   })
    //   .catch((error) => {
    //     console.error("Error accessing microphone:", error);
    //   });
  };
  console.log("mic status", isMicActive);
  return (
    <div className={styles.container}>
      <div className={styles.close_icon}>
        <CloseIcon
          fontSize="small"
          color="primary"
          onClick={() => setShowMic(false)}
        />
      </div>
      <div
        className={styles.main_container}
        style={{ visibility: `${iframeLoaded ? "visible" : "hidden"}` }}
      >
        <div className={styles.mic_container}>
          <iframe
            style={{
              border: "none",
              //   backgroundColor: "white",
              visibility: `${!isMicActive ? "hidden" : "visible"}`,
            }}
            src="https://rive.app/community/2354-4679-micon/embed"
            // allowfullscreen
            onLoad={() => setIframeLoaded(true)}
          ></iframe>
          <div
            className={styles.mic_icon_box}
            style={{ visibility: `${isMicActive ? "hidden" : "visible"}` }}
          >
            <div
              className={styles.mic_icon}
              onClick={() => {
                if (!error.isAccess) requestMicrophonePermission();
                else handleSpeechRecognition();
              }}
            >
              <MicNoneIcon color="primary" />
            </div>
          </div>
        </div>
        <div className={styles.text_container}>
          <h2>
            {error.isError
              ? error.message
              : isMicActive && searchQuery
              ? searchQuery
              : isMicActive
              ? "Listening.."
              : searchQuery
              ? searchQuery
              : "How can we help you?"}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default MicComponent;
