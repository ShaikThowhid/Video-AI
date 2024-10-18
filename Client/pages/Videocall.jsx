import React, { useEffect, useRef } from "react";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./App.css";

function Videocall() {
  const webcamRef = useRef(null);
  const videoRef = useRef(null);
  const micRef = useRef(null);
  const utterance = new SpeechSynthesisUtterance();
  utterance.lang = "en-US";
  utterance.rate = 1.3;

  useEffect(() => {
    // Start webcam when component mounts
    startWebcam();
    runModel("Hii! Welcome me");

    // Function to play video in a loop
    const playVideoContinuously = () => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.addEventListener("ended", () => {
          videoRef.current.currentTime = 0;
          videoRef.current.play();
        });
        videoRef.current.play();
      }
    };

    // Function to handle model response
    const speak = (inputText = "") => {
      utterance.text = inputText;
      speechSynthesis.speak(utterance);

      utterance.addEventListener("end", () => {
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
          startListening();
        }
      });
    };

    // Function to handle AI model interaction
    const runModel = async (prompt) => {
      try {
        const API_KEY = "AIzaSyCCODmV0aY2i9YLzl4k3I5ya9mygEi_85U";
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = await genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
        });
        const result = await model.generateContent(
          `${prompt} (answer with a short message, don't use emojis, and remember your name is ROSEY)`
        );
        const response = result.response.text();
        console.log(response);
        speak(response);
        playVideoContinuously();
      } catch (error) {
        console.error("Error generating content:", error);
      }
    };

    // Function to start listening to the microphone
    const startListening = () => {
      if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
        console.error(
          "Speech Recognition API is not supported in this browser."
        );
        return;
      }

      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        runModel(transcript);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
      };

      recognition.onend = () => {
        if (micRef.current) {
          micRef.current.style.backgroundColor = "white";
          micRef.current.style.padding = "0px";
        }
      };

      recognition.start();
      if (micRef.current) {
        micRef.current.style.backgroundColor = "red";
        micRef.current.style.padding = "10px";
        micRef.current.style.borderRadius = "10px";
      }
    };

    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (webcamRef.current) {
          webcamRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    // Function to handle the cut button click
    const handleCutClick = () => {
      window.close();
    };

    document.getElementById("listenn").onclick = () => {
      startListening();
    };

    document.getElementById("cutcbtn").onclick = handleCutClick;
  }, []);

  return (
    <div className="App">
      <video ref={webcamRef} autoPlay playsInline id="webcam" />
      <div className="videoele">
        <video ref={videoRef} id="myVideo" align="center">
          <source src="VIDEO.mp4" type="video/mp4" />
          Your browser does not support the video element.
        </video>
      </div>
      <div id="chat-window">
        <form id="chat-form">
          <img src="cam.png" alt="camera icon" id="cam" />
          <a id="listenn">
            click
            <br />
            <i
              className="fa-solid fa-microphone fa-2x"
              ref={micRef}
              id="micc"
            ></i>
          </a>
          <button id="cutcbtn" type="button">
            <img src="cut.jpg" alt="cut icon" id="cutp" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Videocall;
