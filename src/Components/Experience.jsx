
import { useTexture } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import Card from "./Card";
import { useFrame, useThree } from "@react-three/fiber";


const IMAGES_URL = [
  "https://images.unsplash.com/photo-1774606570918-aa9d70b2932b?q=80&w=1932&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1774523195578-121a2d1da490?q=80&w=1171&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1773772255047-74744067601e?q=80&w=1170&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1749303544314-cb8ec06223d5?q=80&w=1632&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1775119221769-6b0af28704ed?q=80&w=1170&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1775563655673-c28ac3802166?q=80&w=1228&auto=format&fit=crop",
];


const CARD_H = 1.2;
const CARD_W = 2;
const CARD_TOTAL = IMAGES_URL.length;
const RADIUS = 3;

const Experience = () => {
  const textures = useTexture(IMAGES_URL);

  const currentrotationref = useRef(0);
  const targetrotationref = useRef(0);
  const groupref = useRef(null);


  const {gl} = useThree();

   useEffect(() => {
    const canvas = gl.domElement;
    const wheelhandler = (e) =>{
      e.preventDefault();
      targetrotationref.current += e.deltaY * 0.01;

    }

    canvas.addEventListener("wheel",wheelhandler,{
      passive:false
    })

    return(()=>{
      canvas.removeEventListener("wheel",wheelhandler);
    })
   }, [gl]);


   useFrame((state,delta)=>{
    if (!groupref.current) return;
    currentrotationref.current = THREE.MathUtils.lerp(
      currentrotationref.current,
      targetrotationref.current,
      1  - Math.exp(-0.5 * delta))

   groupref.current.rotation.y = currentrotationref.current;



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
            CARD_W={CARD_W}
            CARD_H={CARD_H}
          />
        ))}
      </group>
    </>
  );
};

export default Experience;
