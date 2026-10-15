
import { useTexture, OrbitControls } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";
import Card from "./Card";


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

  useEffect(() => {
    textures.forEach((tex) => {
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.colorSpace = THREE.SRGBColorSpace;
    });
  }, [textures]);

  return (
    <>
      <OrbitControls enableDamping />

      <group>

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
