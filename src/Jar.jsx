import React, { useEffect, useState, useRef } from "react";
import jar from "./assets/jarvis.gif";
import "./jarvis.css";
import speak from "./jarvis";



function Jar(){

    const [content, setContent] = useState("Click here to speak...");
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    const contentTimeout = useRef(null);

    recognition.onresult = (event) => {
        const currentIndex = event.resultIndex;
        const transcript = event.results[currentIndex][0].transcript;
        setContent(transcript);
        resetContentTimeout();
    };

    const start = () => {
        setContent("Listening....");
        recognition.start();
    };


    const resetContentTimeout = () => {
        if (contentTimeout.current) {
            clearTimeout(contentTimeout.current);
        }
        contentTimeout.current = setTimeout(() => {
            setContent("Click here to speak...");
        }, 7000); 
    };

    
    const run = () => {

        if (content.includes("Hey.") || content.includes("Hey, ")){

            speak("Hello sir, How may i assist you?")

        }
        
        else if (content.includes("Google.")) {
           
            window.open("https://www.google.com/");
            speak("opening google")
        }
        else if (content.includes("Instagram.")){
            
            window.open("https://www.instagram.com/")
            speak("opening instagram")
        }

        else if (content.includes("Facebook.")){
            
            window.open("https://www.facebook.com/")
            speak("opening facebook")
        }

        else if (content.includes("Twitter.")){
            
            window.open("https://www.twitter.com/")
            speak("opening twitter")
        }

        else if (content.includes("LinkedIn.")){
            
            window.open("https://www.linkedin.com")
            speak("opening linkedin")
        }

    

        
    };
    

    useEffect(() => {
        speak();
        resetContentTimeout();
    }, []);

    useEffect(() => {
        run();
        resetContentTimeout()
    }, [content]);

    return(
        <div className="body">
            <div className="command">
                <img className="jarvis" src={jar} alt="jarvis" />
            </div>
            <div className="elements">JARVIS</div>
            <p className="ele">I'm a virtual assistant, How may I help You?</p>
            <div className="btn">
                <button onClick={start} className="btn-large">
               
                    <p className="content">{content}</p>
                </button>
            </div>
        </div>
    );
}

export default Jar;
