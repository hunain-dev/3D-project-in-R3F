
import { useTexture } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import Card from "./Card";
import { useFrame, useThree } from "@react-three/fiber";


const IMAGES_URL = [
  "https://hunaunfolio.vercel.app/assets/images/twogoodco.webp",
  "https://hunaunfolio.vercel.app/assets/images/Jeskojets.webp",
  "https://hunaunfolio.vercel.app/assets/images/Klearmindtherapy.webp",
  "https://hunaunfolio.vercel.app/assets/images/Tobacco.webp",
  "https://hunaunfolio.vercel.app/assets/images/jobs.webp",
  "https://hunaunfolio.vercel.app/assets/images/ochidesign.webp",
  "https://hunaunfolio.vercel.app/assets/images/Christmas.webp",
  "https://hunaunfolio.vercel.app/assets/images/tictac.webp",
  "https://hunaunfolio.vercel.app/assets/images/spacer.webp",
  "https://hunaunfolio.vercel.app/assets/images/weather.webp"
];



const CARD_H = 1.3;
const CARD_W = 1.9;
const CARD_TOTAL = IMAGES_URL.length;
const RADIUS = 3.4;

const Experience = () => {
  const textures = useTexture(IMAGES_URL);

  // for rotation
  const currentrotationref = useRef(0);
  const targetrotationref = useRef(0);
  const groupref = useRef(null);
  
  
  
  // for scrolling

  const scrollspeedref = useRef(0);
  const targetscrollspeedref = useRef(0);


  // for provding a canvas

  const {gl} = useThree();



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
  const mousemoveref = useRef({x:0, z: 0});
  const targetmousemoveref = useRef({x:0, z: 0});



  // mouse move x to end and z to end

  useEffect(() => {
    const handleMouseMove = (e) => {
      targetmousemoveref.current.x =
        (e.clientX / window.innerWidth - 0.3) * 1;
  
      targetmousemoveref.current.z =
        (e.clientY / window.innerHeight - 0.5) * 2;
    };
  
    window.addEventListener("mousemove", handleMouseMove);
  
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);


   useFrame((state,delta)=>{
    if (!groupref.current) return;
    const smoothFactor = 1 - Math.exp(-4 * delta);

    // formula lerp

    currentrotationref.current = THREE.MathUtils.lerp(
      currentrotationref.current,
      targetrotationref.current,
      1  - Math.exp(-0.5 * delta))


      scrollspeedref.current = THREE.MathUtils.lerp(
        scrollspeedref.current,
        targetscrollspeedref.current,
        1  - Math.exp(-0.5 * delta))

   groupref.current.rotation.y = currentrotationref.current;


  // mouse move x to end and z to end

   mousemoveref.current.x = THREE.MathUtils.lerp(
    mousemoveref.current.x,
    targetmousemoveref.current.x,
    smoothFactor
  );
 
  mousemoveref.current.z = THREE.MathUtils.lerp(
    mousemoveref.current.z,
    targetmousemoveref.current.z,
    smoothFactor
  );
   
  // mouse move x to end and z to end




  groupref.current.rotation.x = -mousemoveref.current.x * 0.3;
  groupref.current.rotation.z = -mousemoveref.current.z * 0.05;

   targetscrollspeedref.current *= 0.08;



   })
   

  useEffect(() => {
    textures.forEach((tex) => {
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.colorSpace = THREE.SRGBColorSpace;
    });
  }, [textures]);

  return (
    <>
      {/* <OrbitControls enableDamping /> */}

      <group ref={groupref}>

        {textures.map((texture, index) => (
          <Card
            key={IMAGES_URL[index]}
            texture={texture}
            index={index}
            CARD_TOTAL={CARD_TOTAL}
            RADIUS={RADIUS}
            scrollspeedref={scrollspeedref}
            CARD_W={CARD_W}
            CARD_H={CARD_H}
          />
        ))}
      </group>
    </>
  );
};

export default Experience;
