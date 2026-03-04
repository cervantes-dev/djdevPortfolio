import { useGLTF, useAnimations } from '@react-three/drei'
import { useEffect, useRef } from 'react'

export default function Cubes() {
  const group = useRef()
  const { scene, animations } = useGLTF('/models/stylized_planet.glb')
  const { actions, names } = useAnimations(animations, group)

  useEffect(() => {
    console.log('Model loaded:', scene)
    console.log('Animations found:', names)

    names.forEach((name) => {
      actions[name]?.reset().fadeIn(0.5).play()
    })
  }, [actions, names])

  return (
    <group ref={group}>
      <primitive object={scene} scale={1.5} position={[0, 0, 0]} />
    </group>
  )
}

useGLTF.preload('/models/stylized_planet.glb')