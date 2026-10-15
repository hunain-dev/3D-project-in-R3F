
import { useMemo } from "react";
import * as THREE from "three";
import vertexshaders from "../Shaders/Vertexshader.glsl"
import Fragmentshaders from "../Shaders/Fragmentshader.glsl"
const Card = ({
  texture,
  index,
  CARD_TOTAL,
  RADIUS,
  CARD_W,
  CARD_H,
}) => {


  // Har card ka angle

  const angles = (index / CARD_TOTAL) * 2 * Math.PI;

  // Har card ki position

  const position = useMemo(() => {
    const x = RADIUS * Math.sin(angles);
    const z = RADIUS * Math.cos(angles);

    return [x, 0, z];

  }, [angles, RADIUS]);


  // unifrom


  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uScrollSpeed: { value: 0 },
    }),
    [texture]
  );


  return (
    <>
       {/* <OrbitControls/> */}
    <mesh
      position={position}
      rotation={[0, angles,0]}
    >


    <planeGeometry args={[CARD_W, CARD_H, 32, 32]} />

      <shaderMaterial
      vertexShader={vertexshaders}
      fragmentShader={Fragmentshaders}
      uniforms={uniforms}
        map={texture}
        side={THREE.DoubleSide}
      />
    </mesh>
    </>
 
  );
};

export default Card;
