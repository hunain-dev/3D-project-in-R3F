import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import Card from "./Card";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

const PROJECTS = [
  {
    type: "video",
    src: "/Assets/Videos/commingsoon.mp4",
  },

  {
    type: "image",
    src: "https://hunaunfolio.vercel.app/assets/images/Jeskojets.webp",
  },

  {
    type: "image",
    src: "https://hunaunfolio.vercel.app/assets/images/Klearmindtherapy.webp",
  },

  {
    type: "image",
    src: "https://hunaunfolio.vercel.app/assets/images/Tobacco.webp",
  },

  {
    type: "image",
    src: "https://hunaunfolio.vercel.app/assets/images/jobs.webp",
  },

  {
    type: "image",
    src: "https://hunaunfolio.vercel.app/assets/images/ochidesign.webp",
  },

  {
    type: "image",
    src: "https://hunaunfolio.vercel.app/assets/images/Christmas.webp",
  },

  {
    type: "image",
    src: "https://hunaunfolio.vercel.app/assets/images/tictac.webp",
  },

  {
    type: "image",
    src: "https://hunaunfolio.vercel.app/assets/images/spacer.webp",
  },

  {
    type: "image",
    src: "https://hunaunfolio.vercel.app/assets/images/weather.webp",
  },

  {
    type: "image",
    src: "https://hunaunfolio.vercel.app/assets/images/rejouices.webp",
  },

  {
    type: "image",
    src: "https://hunaunfolio.vercel.app/assets/images/twogoodco.webp",
  },
];

const CARD_H = 1;
const CARD_W = 1.5;
const CARD_TOTAL = PROJECTS.length;
const RADIUS = 3.1;



const Experience = () => {
  // for rotation
  const currentrotationref = useRef(0);
  const targetrotationref = useRef(0);
  const groupref = useRef(null);

  // for scrolling
  const scrollspeedref = useRef(0);
  const targetscrollspeedref = useRef(0);


  const mousemoveref = useRef({ x: 0, z: 0 });
  const targetmousemoveref = useRef({ x: 0, z: 0 });
  

  // for image and video texture 

  const textures = PROJECTS.map((project) => {
    if (project.type === "video") {
      return null;
    }
  
    return project.src;
  });
  
  const imageTextures = useTexture(
    textures.map(
      (src) =>
        src ??
        "https://hunaunfolio.vercel.app/assets/images/twogoodco.webp"
    )
  );
  
  const videoTexture = useMemo(() => {
    const videoProject = PROJECTS.find(
      (project) => project.type === "video"
    );
  
    if (!videoProject) return null;
  
    const video = document.createElement("video");
  
    video.src = videoProject.src;
    video.crossOrigin = "anonymous";
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
  
    const texture = new THREE.VideoTexture(video);
    texture.colorSpace = THREE.SRGBColorSpace;
  
    return texture;
  }, []);
  
  useEffect(() => {
    if (!videoTexture) return;
  
    const video = videoTexture.image;
  
    video.play().catch((error) => {
      console.warn("video playback failed:", error);
    });
  
    return () => {
      video.pause();
      videoTexture.dispose();
    };
  }, [videoTexture]);
  

  // for provding a canvas

  const { gl } = useThree();

  useEffect(() => {
    const canvas = gl.domElement;
    let isDragging = false;
    let previousX = 0;

    const pointerDown = (e) => {
      isDragging = true;
      previousX = e.clientX;
      canvas.setPointerCapture(e.pointerId);
    };

    const pointerMove = (e) => {
      if (!isDragging) return;

      const deltaX = e.clientX - previousX;
      previousX = e.clientX;

      targetrotationref.current += deltaX * 0.01;
      targetscrollspeedref.current += deltaX * 0.01;
    };

    const pointerUp = () => {
      isDragging = false;
    };

    canvas.addEventListener("pointerdown", pointerDown);
    canvas.addEventListener("pointermove", pointerMove);
    canvas.addEventListener("pointerup", pointerUp);
    canvas.addEventListener("pointercancel", pointerUp);

    // const wheelhandler = (e) =>{
    //   e.preventDefault();
    //   targetrotationref.current += e.deltaY * 0.01;
    //   targetscrollspeedref.current += e.deltaY * 0.01;

    // }

    // canvas.addEventListener("dragstart",wheelhandler,{
    //   passive:false
    // })

    return () => {
      canvas.removeEventListener("pointerdown", pointerDown);
      canvas.removeEventListener("pointermove", pointerMove);
      canvas.removeEventListener("pointerup", pointerUp);
      canvas.removeEventListener("pointercancel", pointerUp);
    };
  }, [gl]);

  //  for moving


  // mouse move x to end and z to end

  useEffect(() => {
    const handleMouseMove = (e) => {
      targetmousemoveref.current.x = (e.clientX / window.innerWidth - 0.3) * 1;

      targetmousemoveref.current.z = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame((state, delta) => {
    if (!groupref.current) return;
    const smoothFactor = 1 - Math.exp(-4 * delta);

    // formula lerp

    currentrotationref.current = THREE.MathUtils.lerp(
      currentrotationref.current,
      targetrotationref.current,
      1 - Math.exp(-0.5 * delta),
    );

    scrollspeedref.current = THREE.MathUtils.lerp(
      scrollspeedref.current,
      targetscrollspeedref.current,
      1 - Math.exp(-0.5 * delta),
    );

    groupref.current.rotation.y = currentrotationref.current;

    // mouse move x to end and z to end

    mousemoveref.current.x = THREE.MathUtils.lerp(
      mousemoveref.current.x,
      targetmousemoveref.current.x,
      smoothFactor,
    );

    mousemoveref.current.z = THREE.MathUtils.lerp(
      mousemoveref.current.z,
      targetmousemoveref.current.z,
      smoothFactor,
    );

    // mouse move x to end and z to end

    groupref.current.rotation.x = -mousemoveref.current.x * 0.3;
    groupref.current.rotation.z = -mousemoveref.current.z * 0.05;

    targetscrollspeedref.current *= 0.08;
  });

  useEffect(() => {
    PROJECTS.forEach((tex) => {
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.colorSpace = THREE.SRGBColorSpace;
    });
  }, [PROJECTS]);

  return (
    <>
      {/* <OrbitControls enableDamping /> */}


      <group ref={groupref}>
  {PROJECTS.map((project, index) => {
    const texture =
      project.type === "video"
        ? videoTexture
        : imageTextures[index];

    return (
      <Card
        key={project.src}
        texture={texture}
        index={index}
        CARD_TOTAL={CARD_TOTAL}
        RADIUS={RADIUS}
        scrollspeedref={scrollspeedref}
        CARD_W={CARD_W}
        CARD_H={CARD_H}
      />
    );
  })}
</group>

    </>
  );
};

export default Experience;
