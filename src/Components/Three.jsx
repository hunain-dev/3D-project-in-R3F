import { Canvas } from '@react-three/fiber'
import Experience from './Experience'

const Three = () => {
  return (
    <div className='h-screen w-full'>
        <Canvas>
            <Experience/>
        </Canvas>
      
    </div>
  )
}

export default Three
