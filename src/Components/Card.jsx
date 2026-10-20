
import { useMemo, useRef } from "react";
import * as THREE from "three";
import vertexshaders from "../Shaders/Vertexshader.glsl"
import Fragmentshaders from "../Shaders/Fragmentshader.glsl"
import { useFrame } from "@react-three/fiber";
const Card = ({
  texture,
  index,
  CARD_TOTAL,
  RADIUS,
  CARD_W,
  CARD_H,
  scrollspeedref
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
      uTime : {value: 0},
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uHover: { value: 0 },


    }),
    [texture]
  );

  const materialref = useRef(null);
  const mouseRef = useRef(new THREE.Vector2(0.5, 0.5));
  const hoverRef = useRef(0);


  // useframe for cruve 
  useFrame((state, delta) => {
    if (!materialref.current) return;
  
    const uniforms = materialref.current.uniforms;
  
    uniforms.uScrollSpeed.value = scrollspeedref.current;
    uniforms.uTime.value = state.clock.elapsedTime;
  
    uniforms.uMouse.value.copy(mouseRef.current);
  
    uniforms.uHover.value = THREE.MathUtils.damp(
      uniforms.uHover.value,
      hoverRef.current,
      8,
      delta
    );

    // Update video texture
    const texture = uniforms.uTexture.value;

    if (texture instanceof  THREE.VideoTexture) {
      texture.needsUpdate = true;

    }

  });


  return (
    <>
    <mesh
    onPointerMove={(e) => {
      mouseRef.current.set(e.uv.x, e.uv.y);
    }}

    onPointerEnter={() => {
      hoverRef.current = 1;
    }}
    
    onPointerLeave={() => {
      hoverRef.current = 0;
    }}    
      position={position}
      rotation={[0, angles,0]}
      
    >


    <planeGeometry args={[CARD_W, CARD_H, 32, 32]} />
      <shaderMaterial
      ref={materialref}
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
