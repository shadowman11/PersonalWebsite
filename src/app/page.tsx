"use client";

import { useEffect, useState } from "react";
import ScrollVideo from "./scrollVideo";
import { useRef } from "react";
import { get } from "http";
import Image from "next/image";

// Waits for the given number of milliseconds.
function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Restarts and plays a video including a blink animation at random intervals
async function blink(blinkVid: any) {
  while (window.scrollY === 0) {
    blinkVid.currentTime = 0;
    await sleep((Math.random() * 3000) + 2000);
    blinkVid.play();
  }
}

// The pages to show in the nav bar.
const navPages = [
  {id: "welcome", label: "Welcome"},
  {id: "about", label: "About Me"},
  {id: "experience", label: "Experience"},
  {id: "projects", label: "Projects"}
];

export default function Home() {
  const blinkVidRef = useRef(null);
  const doc = useRef<Document>(null);
  const [scrollY, setScrollY] = useState(0);
  const scrollYRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const barHeight = navPages.length * 2;
  const [currentNav, setCurrentNav] = useState(0);
  
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    doc.current = document;

    blink(blinkVidRef.current);

    const handleScroll = async () => {
      setScrollY(scrollContainer.scrollTop);
      scrollYRef.current = scrollContainer.scrollTop;
      navPages.forEach((page, index) => {
        if (isActiveNav(page.id)) {
          setCurrentNav(index);
        }
      });
    }

    scrollContainer.addEventListener("scroll", handleScroll);

    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

  // Returns the offset from the top of the page to the element with  the given id.
  function getOffsetTop (id: string) {
    // no doc yet means the page has just been accessed, so it will be displaying the first section
    if (!doc.current) {
      // first section has offset of 0, so return 0 if the id matches the first section
      if (id === navPages[0].id) return 0;
      else return 1; // random number if it doesn't match
    }
    let elem = doc.current.getElementById(id);
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
  }

  // Returns true if the element with the given id is currently being viewed.
  const isActiveNav = (id: string) => {
    const x = scrollYRef.current;
    const y = getOffsetTop(id);
    if (x === y) {
      return true;
    }
    return false;
  }

  const nextNav = () => {
    if (currentNav >= navPages.length - 1) return;
    setNav(currentNav + 1);
  }

  const prevNav = () => {
    if (currentNav <= 0) return;
    setNav(currentNav - 1);
  }

  const setNav = (index: number) => {
    if (index < 0 || index >= navPages.length) return;
    document.getElementById(navPages[index].id)?.scrollIntoView({ behavior: 'smooth' });
    setCurrentNav(index);
  }

  // Returns the number of rem that the circle in the nav should be from the top.
  const circleHeight = () => {
    const offset = getOffsetTop(navPages[navPages.length - 1].id);
    // prevent division by zero
    if (offset === 0) return 0;

    return scrollY / getOffsetTop(navPages[navPages.length - 1].id) * (barHeight - 1.5);
  }

  return <div className="Container" ref={scrollRef}>
    <div className="Nav">
      <div className="flex flex-col justify-center items-center ml-4">
        <Image className="ArrowButton mb-2" src="/up-arrow.svg" alt="up arrow" width={15} height={15}
          style={isActiveNav(navPages[0].id) ? {visibility: "hidden"} : {}}
          onClick={() => prevNav()}/>
        <div className="relative">
          <svg width={10} height={barHeight + "rem"} className="Bar">
            <rect width={4} height={barHeight + "rem"} x={3} rx={2} ry={2} fill="#ECF1DE"></rect>
          </svg>
          <svg width={10} height={"1.5rem"} opacity={50} className="Circle" style={
            {top: circleHeight() + "rem"}
          }>
            <rect width={10} height={"1.5rem"} fill="rgb(58, 59, 55)"></rect>
            <circle r={5} cx={5} cy={"0.75rem"} fill="#ECF1DE" ></circle>
          </svg>
        </div>
        <Image className="ArrowButton rotate-180 mt-2" src="/up-arrow.svg" alt="up arrow" width={15} height={15}
          style={isActiveNav(navPages[navPages.length - 1].id) ? {visibility: "hidden"} : {}}
          onClick={() => nextNav()}
          />
      </div>
      <div className="flex flex-col justify-center items-start">
        {navPages.map((page, index) => {
          return <button onClick={() => setNav(index)} className="NavItem" key={index} style={isActiveNav(page.id) ? {fontWeight: "900", color: "rgb(236, 241, 222)", textIndent: "0.5rem"} : {}}>
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
