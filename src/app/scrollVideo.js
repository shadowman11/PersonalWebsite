document.addEventListener("DOMContentLoaded", (event) => {
  // select video element
  let vid = document.getElementById("v0");
  // var vid = $('#v0')[0]; // jquery option

  // pause video on load
  vid.pause();
  
  // pause video on document scroll (stops autoplay once scroll started)
  window.onscroll = function(){
      vid.pause();
  };

  // refresh video frames on interval for smoother playback
  setInterval(function(){
      vid.currentTime = window.scrollY/400;
  }, 40);
});

export default function ScrollVideo() {
  return (<>
    <div id="set-height"></div> 
    <p id="time"></p>
    <video id="v0" tabIndex="0" autobuffer="autobuffer" preload="preload">
      <source src="/typing.mp4" type="video/mp4"></source>
      <p>Your browser does not support the video element.</p>
    </video>
    </>
  );
}
