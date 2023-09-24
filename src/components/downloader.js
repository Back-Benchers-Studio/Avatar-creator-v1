import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
import { useEffect } from 'react';
const Downloader = ({model})=>{
    const exporter = new GLTFExporter();
        useEffect(() =>{
    exporter.parse( model.current, function ( gltf ) {
        downloadJSON( gltf );
    }); // you will have to provide the options here
    })
}

export {Downloader}