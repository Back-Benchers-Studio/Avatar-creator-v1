import React, { Suspense, useRef ,useEffect, useState} from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls} from '@react-three/drei'
import { Model } from './Model1'
export default function Scene(){
return(
        <>
        <Canvas style={{color:'white',position:'absolute',left:0,top:0,width:'100%',height:'100%'}} shadows camera={{ position: [0, 0.5, 4], fov: 30 }}>
        <Suspense fallback={()=>console.log('finish')}>
            <ambientLight intensity={0.5}/>
            <directionalLight position={[-3,5,0]}></directionalLight>
            <Model castshadow position={[0,-1,0]}/>
        </Suspense>
        </Canvas>
        </>
)
}
