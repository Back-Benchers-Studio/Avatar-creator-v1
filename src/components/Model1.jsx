import { state } from '../store'
import { useSnapshot } from 'valtio'
import React, { useRef, useState } from 'react'
import { Gltf, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { PresentationControls } from '@react-three/drei'
import { currentState } from '../store'
import { mergeGLBFiles } from './downloader'
import {GetCharacterByID} from '../services/services'


export function Model(props) {
  let snap = useSnapshot(currentState)
  let group = useRef()
  let face = useGLTF(snap.face.model)
  let body = useGLTF(snap.body.model)
  let leg = useGLTF(snap.legs.model)
  let shoe = useGLTF(snap.shoe.model)
  let skin = useGLTF(snap.skin.model)

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const character = urlParams.get('character')
  if(character){
    // We should update UI here
     GetCharacterByID({"id":character}).then((res)=>{
        if(res.status==200){
          console.log(res);
        face = useGLTF(res.data.face.model)
        body = useGLTF(res.data.body.model)
        leg = useGLTF(res.data.legs.model)
        shoe = useGLTF(res.data.sshoe.model)
        skin = useGLTF(res.data.skin.model)
        }else{
          console.log("error");
        }
    })


  }

  
  return (
    <>
     <PresentationControls speed={2.5} snap={true} polar={[0,Math.PI/3]}>
      <group  castShadow ref={group} {...props}>
        <primitive castShadow object={face.scene}/>
        <primitive castShadow object={body.scene}/>
        <primitive castShadow object={leg.scene}/>
        <primitive castShadow object={shoe.scene}/>
        <primitive castShadow object={skin.scene}/>
      </group>
      </PresentationControls>
    </>
  )
}

useGLTF.preload('models/model1.glb')
