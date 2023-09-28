import { useEffect, useState,Suspense,useRef } from "react"
import {Popup} from './popup'
import {SaveModel,getAllDataOfClass} from '../services/services'
import { Canvas } from "@react-three/fiber"
import { useFrame } from "@react-three/fiber"
import { Gltf } from "@react-three/drei"
let style = `

.upload-container {
    height: 100vh;
    width: 100%;
    align-items: center;
    display: flex;
    justify-content: center;
    background-color: #fcfcfc;
    flex-direction:column;
  }
  .upload-container select{
    border: 2px black solid;
    margin-bottom: 20px;
    width: 86px;
  }
  .card {
    border-radius: 10px;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.3);
    width: 600px;
    height: 360px;
    background-color: #ffffff;
    padding: 10px 30px 40px;
  }
  
  .card h3 {
    font-size: 22px;
    font-weight: 600;
    
  }
  
  .drop_box {
    margin: 10px 0;
    padding: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border: 3px dotted #a3a3a3;
    border-radius: 5px;
  }
@media(max-width:768px) {
    .card{
        width:80%;
    }
}
  .drop_box h4 {
    font-size: 16px;
    font-weight: 400;
    color: #2e2e2e;
  }
  
  .drop_box p {
    margin-top: 10px;
    margin-bottom: 20px;
    font-size: 12px;
    color: #a3a3a3;
  }
  
  .btn {
    text-decoration: none;
    background-color: #005af0;
    color: #ffffff;
    padding: 10px 20px;
    border: none;
    outline: none;
    transition: 0.3s;
  }
  
  .btn:hover{
    text-decoration: none;
    background-color: #ffffff;
    color: #005af0;
    padding: 10px 20px;
    border: none;
    outline: 1px solid #010101;
  }
  .form input {
    margin: 10px 0;
    width: 100%;
    background-color: #e2e2e2;
    border: none;
    outline: none;
    padding: 12px 20px;
    border-radius: 4px;
  }
  `
 
  
let Upload = ()=>{
    let [file,setFile] = useState(null);
    let [filetype,setFiletype] = useState('face');
    let [skin,setSkin] = useState('');
    let [open,setOpen] = useState(false)
    let [err,setErr] = useState(false)
    let [msg,setMsg] = useState('')
    let [done,setDone] = useState(false)
    let [fileName,setFileName] = useState('')
    let [passcode,setPasscode] = useState('')
    let [skinOption,setSkinOption] = useState(false)
    let [skinobj,setSkinObj] = useState({})
    useEffect(()=>{
        getAllDataOfClass({"classname":"skin"}).then(res=>{
            let skinData = res.data;
            let currentSkinobj = {}
            for(let i=0;i<skinData.length;i++){
                currentSkinobj[`${skinData[i].name}`] = {'name':skinData[i].name,'model':skinData[i].model}
                if(i===0)
                  setSkin(skinData[i].name)
            }
            setSkinObj(currentSkinobj)
        })
    },[])
    useEffect(()=>{
        setSkinOption(filetype === 'face')
    },[filetype])
    return(<>
    {
        err&& <Popup closePopup={()=>setErr(false)} title={'ERROR'} text={msg}/>
    }
    {
        done&& <Popup closePopup={()=>setDone(false)} title={'Done!'} text={'File uploaded'}/>
    }
         <div class="upload-container">
         <div className="viwer">
                {file&&<SmallCanvas file={file} item={filetype}/>}
            </div>
        <div class="card">
        <h3>Upload Files</h3>
        <div class="drop_box">
            <div style={{display:'flex',gap:'1px',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <span>File Type</span>
            <select onChange={(e)=>{
                    setFiletype(e.target.value);
            }} id="type" name="type">
            <option selected value="face">face</option>
            <option  value="bodys">bodys</option>
            <option value="legs">legs</option>
            <option value="shoe">shoe</option>
            <option value="skin">skin</option>
            </select>
            {
                skinobj&&skinOption&&<select 
                onChange={(e)=>setSkin(e.target.value)}>
                    {
                         Object.keys(skinobj).map((key, index) => (
                             <option selected={index === 0 ? 'selected' : ''} value={skinobj[key].name}>{skinobj[key].name}</option>
                        ))
                    }
                </select>
            }
            </div>
            {
                open&&<div class="form" style={{position:'relative'}}>
                <h4>{fileName}</h4>
                <input type="password" onChange={(e)=>setPasscode(e.target.value)} placeholder="Enter passcode to upload file"/>
                <button class="btn" onClick={()=>{
                    //  if(passcode !== '1234'){
                    //   setErr(true)
                    //   return
                    //  }
                    if (file && !err) {
                        const reader = new FileReader();
                        reader.onload = function (e) {
                            const fileContent = e.target.result;

                          if(filetype === 'skin' && skin === '') {
                            setErr(true)
                            setMsg('Please select skin')
                            return
                          }

                            let data = {
                                "name":file.name,
                                "skin": filetype==="face"?skin:null,
                                "type":filetype,
                                "file":fileContent,
                                "passcode":passcode
                            }
                            SaveModel(data).then((res)=>{
                                setDone(true)
                                // setOpen(false)
                            }).catch(err=>{
                                setErr(true)
                                setMsg(err.response.data.message);
                            })
                           
                          };
                    
                          reader.readAsDataURL(file);;
                        }
                }}>Upload</button>
                <button class="btn" style={{position:'absolute',right:'10px'}} onClick={()=>setOpen(false)}>Back</button>
                </div>
            }
            { !open&&
            <>
            <header>
                <h4>Select File here</h4>
            </header>
            <p>Files Supported: .GLB,.GLTF</p>
            <input type="file" onChange={(e)=>{
              setOpen(true)
              setFile(e.target.files[0])
              setFileName(e.target.files[0].name)
              
            }} hidden accept=".glb,.gltf" id="fileID"/>
            <button onClick={(e)=>{
              const dropArea = document.querySelector(".drop_box");
              let input = dropArea.querySelector("input");
              input.click();

            }} class="btn">Choose File</button>
            </>
            }
    </div>
  </div>
</div>
<style>{style}</style>
</>)
}
let SmallCanvas = (props)=>{
    let [position,setPosition] = useState([0,0,0])
    let [loaded,setLoaded] = useState(false)
    let [url,setUrl] = useState(undefined)
    useEffect(()=>{
        console.log(loaded)
        if(props.item === 'shoe')
        setPosition([0,0,3])
        else if(props.item === 'bodys')
        setPosition([0,-1.2,3])
        else if(props.item === 'face')
        setPosition([0,-1.7,4])
        else if(props.item === 'legs')
        setPosition([0,-1,2])
    },[props,loaded])
     function previewFile() {
                const file =props.file;
                const reader = new FileReader();
                reader.addEventListener("load", function () {
                    setUrl(reader.result)
                }, false);
                 reader.readAsDataURL(file)
              }
              previewFile()
    return(
        <>
        
            <Canvas style={{width:"30vw",height:'30vh'}} camera={{fov: 30 }}>
                <Suspense>
                    <ambientLight intensity={0.2}></ambientLight>
                    <pointLight position={[0,5,6]}></pointLight>
                  {url&&<Model snap={props.snap} position={position} item={props.item} model={url}/>}
                </Suspense>
            </Canvas>
        </>
    )
}
let Model = (props)=>{
    const modelRef = useRef();
    const rotateModel = () => {
      modelRef.current.rotation.y += 0.01;
    };
  
    useFrame(() => {
      rotateModel();
    });
    return <Gltf ref={modelRef} rotation={[props.item === 'shoe'?0.2:0,props.item === 'shoe'?0.7:-0.3,0]} position={props.position} src={props.model}></Gltf>
     
}
export default Upload