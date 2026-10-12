import { useMemo } from "react";
import * as THREE from "three";
import vertexshaders from "../Shaders/Vertexshader.glsl"
import fragmentshaders from "../Shaders/Fragmentshader.glsl"
const card_H = 1.5;
const Card_W = 2.6;
const Card_total = 6;
const RADIUS = 3;




const Card = ({ texture, index }) => {


  // making a angle
  const angle = (index / Card_total) * 2 * Math.PI;


  // postion
  const position = useMemo(() => {
    const x = RADIUS * Math.sin(angle);
    const z = RADIUS * Math.cos(angle);
    return [x, 0, z];
  });



  return (
    <>
      {/* {index === 0 && <OrbitControls enableDamping = {true} enableZoom = {false} />} */}
      <mesh position={position} rotation={[0, angle, 0]}>
        <planeGeometry args={[Card_W,card_H,31,31]} />
        <shaderMaterial side={THREE.DoubleSide}
       vertexShader={vertexshaders}
       fragmentShader={fragmentshaders}
        map={texture}
        
        
        
        transparent />
      </mesh>
    </>
  );
};

export default Card;
