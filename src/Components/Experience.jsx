import { useTexture } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import Card from "./Card";
import { useFrame, useThree } from "@react-three/fiber";
const Experience = () => {
  const IMAGE_URL = [
    "https://images.unsplash.com/photo-1774606570918-aa9d70b2932b?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1774523195578-121a2d1da490?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1773772255047-74744067601e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1749303544314-cb8ec06223d5?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1775119221769-6b0af28704ed?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1775563655673-c28ac3802166?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const texture = useTexture(IMAGE_URL);

  const currentrotationref = useRef(0);
  const targetrotationref = useRef(0);
  const groupref = useRef();

  const smoothness = 5;
  const wheelSensitivity = 0.002;
  const lerp = 0.3;
  const {gl} = useThree();

  useEffect(() => {
    const canvas = gl.domElement;

    const handlerscroll =(e)=>{
      e.preventDefault();
      targetrotationref.current += e.deltaY * wheelSensitivity;

    }

    canvas.addEventListener("wheel", handlerscroll, {
      passive: false,
    });
       return()=>{
      canvas.removeEventListener("wheel",handlerscroll)
     }   
  },
  [gl])


  useFrame((state,delta)=>{
 if (!groupref.current ) return;
 const alpha = 1 - Math.exp(-smoothness * delta);

 currentrotationref.current += (targetrotationref.current - currentrotationref.current) * alpha;
groupref.current.rotation.y = currentrotationref.current;

  })



  useMemo(
    () =>
      texture.forEach((tax) => {
        tax.minFilter = THREE.LinearFilter;
        tax.magFilter = THREE.LinearFilter;
        tax.colorSpace = THREE.SRGBColorSpace;
      }),

    [texture],
  );

  return (
    <>
      <group ref={groupref}>
        {texture.map((texture, idx) => {
          return <Card texture={texture} index={idx}  />;
        })}

      </group>
    </>
  );
};

export default Experience;
