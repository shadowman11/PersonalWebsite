"use client";

import { useEffect } from "react";
import ScrollVideo from "./scrollVideo";
import { useRef } from "react";

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function blink(blinkVid: any) {
  while (window.scrollY === 0) {
    blinkVid.currentTime = 0;
    await sleep((Math.random() * 3000) + 2000);
    blinkVid.play();
  }
}

const navPages = [
  {id: "welcome", label: "Welcome"},
  {id: "about", label: "About Me"},
  {id: "experience", label: "Experience"}
];

export default function Home() {
  const blinkVidRef = useRef(null);
  
  useEffect(() => {
    blink(blinkVidRef.current);
  }, []);

  return <div className="Container">
    <div className="Nav">
      {navPages.map(page => {
        return <button onClick={() => {
            document.getElementById(page.id)?.scrollIntoView({ behavior: 'smooth' });
          }} className="NavItem">{page.label}</button>
      })}
    </div>
    <div className="Section justify-around" id="welcome">
      <div className="Title">Welcome</div>
      <div className="Graphic">
        <video className="v0" muted ref={blinkVidRef}>
          <source src="/blink.webm" type="video/webm" />
          Your browser does not support the video element.
        </video>
        <div className="Shadow"></div>
      </div>
    </div>
    <div className="Section justify-around" id="about">
      <div className="flex flex-col justify-center items-start w-1/2">
        <div className="Title">About Me</div>
        <p className="text-2xl">
          My name is Vashon Mavrinac. I am a software developer currently
          studying Computer Science at the University of Washington. 
          Some of my hobbies include building LEGO (shocker), longboarding,
          and reading.
        </p>
      </div>
    </div>
    <div className="Section justify-around" id="experience">
      <div className="flex flex-col justify-center items-start w-1/2">
        <div className="Title">Experience</div>
        <p className="text-2xl">
          My name is Vashon Mavrinac. I am a software developer currently
          studying Computer Science at the University of Washington. 
          Some of my hobbies include building LEGO (shocker), longboarding,
          and reading.
        </p>
      </div>
    </div>
  </div>
}
