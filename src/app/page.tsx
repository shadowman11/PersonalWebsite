"use client";

import { useEffect, useState } from "react";
import ScrollVideo from "./scrollVideo";
import { useRef } from "react";
import { get } from "http";

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
  {id: "experience", label: "Experience"},
  {id: "projects", label: "Projects"}
];

const barHeight = navPages.length * 2;

export default function Home() {
  const blinkVidRef = useRef(null);
  const [render, setRender] = useState(false);
  const [doc, setDoc] = useState<Document | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {

    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    blink(blinkVidRef.current);
    setDoc(document);

    const handleScroll = () => {
      setScrollY(scrollContainer.scrollTop);
      navPages.forEach(page => {
        isActiveNav(page.id);
      });
    }

    scrollContainer.addEventListener("scroll", handleScroll);

    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

  function getOffsetTop (id: string) {
    if (!doc) return 0;
    let elem = doc.getElementById(id);
    if (!elem) return 0;
    
    var distance = 0;

    // loop up the DOM, adding each element's offset relative to its parent
    if (elem.offsetParent) {
      while (elem) {
        distance += elem.offsetTop;
        if (!elem.offsetParent) break;
        elem = elem.offsetParent as HTMLElement;
      } 
    }

    return distance < 0 ? 0 : distance;
  };

  const isActiveNav = (id: string) => {
    if (!doc) return;
    const elem = doc.getElementById(id);

    if (!elem || !elem.getBoundingClientRect()) return;
    if (scrollY === getOffsetTop(id)) {
      return true;
    }
    return false;
  }

  const ballHeight = () => {
    return scrollY / getOffsetTop(navPages[navPages.length - 1].id) * (barHeight - 1.5);
  }

  return <div className="Container" ref={scrollRef}>
    <div className="Nav">
      <div className="ml-2 relative">
        <svg width={10} height={barHeight + "rem"} className="Bar">
          <rect width={4} height={barHeight + "rem"} x={3} rx={2} ry={2} fill="#ECF1DE"></rect>
        </svg>
        <svg width={10} height={"1.5rem"} opacity={50} className="Circle" style={
          {top: ballHeight() + "rem"}
        }>
          <rect width={10} height={"1.5rem"} fill="rgb(58, 59, 55)"></rect>
          <circle r={5} cx={5} cy={"0.75rem"} fill="#ECF1DE" ></circle>
        </svg>
      </div>
      <div className="flex flex-col justify-center items-start">
        {navPages.map((page, index) => {
          return <button onClick={() => {
              document.getElementById(page.id)?.scrollIntoView({ behavior: 'smooth' });
            }} className="NavItem" key={index} style={isActiveNav(page.id) ? {fontWeight: "900", color: "rgb(236, 241, 222)", textIndent: "0.5rem"} : {}}>
              {page.label}
            </button>
        })}
      </div>
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
          Solarcar, HCP, WOOF3D
        </p>
      </div>
    </div>
    <div className="Section justify-around" id="projects">
      <div className="flex flex-col justify-center items-start w-1/2">
        <div className="Title">Projects</div>
        <p className="text-2xl">
          blah blah blah
        </p>
      </div>
    </div>
  </div>
}
