
import { useMemo } from "react";
import * as THREE from "three";

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

  return (
    <mesh
      position={position}
      rotation={[0, angles,0]}
    >


    <planeGeometry args={[CARD_W, CARD_H, 32, 32]} />

      <meshBasicMaterial
        map={texture}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export default Card;
