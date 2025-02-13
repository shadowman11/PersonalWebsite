"use client"
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


export default function Home() {
  const blinkVidRef = useRef(null);
  
  useEffect(() => {
    blink(blinkVidRef.current);
  }, []);

  return <div id="container">
    <video id="v0" muted ref={blinkVidRef}>
      <source src="/blink.webm" type="video/webm" />
      Your browser does not support the video element.
    </video>
    <div id="box" className="z-0"></div>
    {/* <ScrollVideo/> */}
  </div>
}
