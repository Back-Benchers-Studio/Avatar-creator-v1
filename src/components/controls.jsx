import '../sideBar.css'
import Scene from './scene'
import { currentState, state } from '../store'
import { Canvas } from '@react-three/fiber'
import { Gltf, Tube } from '@react-three/drei'
import { Suspense, useEffect, useState } from 'react'
import { useSnapshot } from 'valtio'
import { Billboard ,Text} from '@react-three/drei'
import { ResizableBox } from 'react-resizable'
import { PresentationControls } from '@react-three/drei'
import { GetCharacterByID } from '../services/services'
import {SaveModel,PublishCharacter,GetModelDataByID,getAllDataOfClass} from '../services/services'
import { Popup } from './popup'
let SideBar = (props)=>{
let [type,setType] = useState('face')
let snap = useSnapshot(state)
const [open, setOpen] = useState(false);
const [text,setText] = useState('')
let file = null;
let Filetype = 'bodys';
let skin = 'skin2';

let faceData = {};
useEffect(()=>{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const character = urlParams.get('character')

    getAllDataOfClass({"classname":"face"}).then(res=>{
        faceData = res.data;

        console.log(faceData);
        let faceobj = {
            [`${faceData[0].name}`]:{'name':faceData[0].name,'model':faceData[0].model}
        }
        console.log(faceobj);
        state.items['face']=faceobj;
        console.log(state);

    })

    if(character){
      // We should update UI here
       GetCharacterByID({"id":character}).then((res)=>{
        currentState['face'] = snap.items['face'][res.data.face.name]
        currentState['body'] = snap.items['body'][res.data.body.name]
        currentState['legs'] = snap.items['legs'][res.data.legs.name]
        currentState['shoe'] = snap.items['shoe'][res.data.shoe.name]
        currentState['skin'] = snap.items['skin'][res.data.skin.name]

      })
    }

        


  },[])
    return(
        <>   
        {
            open&&<Popup closePopup={()=>setOpen(false)} title={'take your link'} text={text}/>
        }

  <div class="form-group">
    <input type="file" onChange={(e)=>{
            file = e.target.files[0]

    }} class="form-control-file" name="uploaded_file"/>
    <button onClick={()=>{
        console.log(file);
    if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
        const fileContent = e.target.result;    
        let data = {
            "name":file.name,
            "skin": Filetype==="face"?skin:null,
            "type":Filetype,
            "file":fileContent
        }
        SaveModel(data).then((res)=>{

        });
      };

      reader.readAsDataURL(file);;
        }

    }}>upload model</button>      
  </div>

  <select onChange={(e)=>{
        Filetype = e.target.value;
  }} id="type" name="type">
  <option selected value="bodys">bodys</option>
  <option value="face">face</option>
  <option value="legs">legs</option>
  <option value="shoe">shoe</option>
  <option value="skin">skin</option>
</select>

<select onChange={(e)=>{
        Filetype = e.target.value;
  }} id="skin" name="skin">

{
Object.keys(faceData).map((key, index) => {
        return(
            <option value={key['name']}>{key['name']}</option>
        )
    })
    }
</select>


        <div className='cont'>
        <div class="side-right" >
            <div class="con-right">
            <div className='itemsCont' onClick={()=>setType('body')}>
                <svg class="h-8 w-8 lg:h-10 lg:w-10 xl:h-12 xl:w-12 z-0 CustomizationIcons_customizationIconActive__LL_Rr" width="38"
                        height="38" viewBox="0 0 2560 2560">
                        <g>
                            <path
                                d="M1318 2110 c-17 -39 -34 -67 -38 -63 -4 4 -12 34 -19 66 -12 57 -13 58 -44 52 -18 -2 -174 -19 -347 -36 -173 -17 -316 -31 -317 -32 0 -1 17 -172 39 -380 22 -209 38 -381 35 -383 -2 -2 -34 10 -70 27 -37 17 -71 29 -76 27 -6 -1 -91 -123 -190 -270 l-180 -267 97 -59 c53 -33 219 -134 367 -224 l271 -165 363 -6 363 -5 432 140 c237 77 435 144 440 148 8 8 -225 582 -245 604 -5 6 -40 -3 -86 -21 -43 -17 -79 -30 -80 -29 -2 2 35 191 81 422 46 230 83 420 83 420 -1 1 -182 23 -402 48 -220 26 -410 49 -422 51 -20 5 -27 -3 -55 -65z">
                            </path>
                        </g>
                    </svg>
                </div>
                
                <div className='itemsCont' onClick={()=>setType('face')}>
                    <svg class="h-8 w-8 lg:h-10 lg:w-10 xl:h-12 xl:w-12 z-0 CustomizationIcons_customizationIcon__qHkrK" width="32"
                        height="38" viewBox="0 0 32 38" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12.4188 37.1437C11.2 36.3187 8.83751 34.0875 7.58126 32.5687C5.98751 30.6 5.18126 28.8187 4.58126 25.9687C4.22501 24.2062 4.05626 23.9437 3.43751 24.075C2.21876 24.3 1.93751 23.85 1.20626 20.55C0.568762 17.7187 0.493762 16.3687 0.906262 15.5625C1.24376 14.8875 1.73126 14.7375 2.63126 14.9812C3.00626 15.0937 3.36251 15.1312 3.41876 15.075C3.47501 15.0187 3.58751 13.5562 3.64376 11.85C3.77501 8.49374 3.88751 7.94999 4.86251 5.86874C5.85626 3.78749 7.76876 2.34374 10.8813 1.33124C14.2 0.243744 16.7125 0.168744 20.1063 1.04999C22.3375 1.63124 23.8375 2.36249 25.3188 3.56249C26.2563 4.31249 26.6125 4.76249 27.1375 5.86874C28.1125 7.94999 28.225 8.49374 28.3563 11.85C28.4125 13.5562 28.525 15.0187 28.6 15.0937C28.675 15.1687 29.0313 15.1312 29.3875 15C30.25 14.7187 30.7375 14.8875 31.0938 15.5625C31.5063 16.3687 31.45 17.4187 30.7938 20.4375C30.2875 22.8187 30.1375 23.2125 29.65 23.6812C29.2 24.1125 28.9938 24.1875 28.4875 24.0937C27.8875 23.9625 27.8688 23.9812 27.6438 24.8812C26.725 28.4437 26.0125 30.15 24.7375 31.95C23.7813 33.3 20.6125 36.375 19.3938 37.1437C18.5688 37.6687 18.4938 37.6875 15.9063 37.6875C13.2813 37.6875 13.2438 37.6875 12.4188 37.1437Z">
                        </path>
                    </svg>
                </div>
                <div className='itemsCont' onClick={()=>setType('legs')}>
                    <svg class="h-8 w-8 lg:h-10 lg:w-10 xl:h-12 xl:w-12 z-0 CustomizationIcons_customizationIcon__qHkrK" width="40"
                        height="38" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_6204_79367)">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M16.2533 37L20.1733 16.7308L24.7467 37L34 36.3462L30.3658 10.4515C25.2463 10.0033 23.0652 6.54909 22.5676 4.42575C22.0457 4.47184 21.5233 4.50324 21 4.52011V13H19V4.51433C18.3183 4.48869 17.634 4.43902 16.9461 4.36569C16.4906 6.41715 14.4363 9.78077 9.60974 10.4003L7 35.6923L16.2533 37ZM10.3733 3C11.9291 3.46954 13.4529 3.83394 14.9553 4.0896C14.6018 5.4082 13.2239 7.72212 9.82202 8.34298L10.3733 3ZM24.569 4.17635C24.974 5.55953 26.4602 7.91178 30.0788 8.40686L29.32 3C27.7263 3.53166 26.147 3.92226 24.569 4.17635Z">
                            </path>
                        </g>
                        <defs>
                            <clipPath id="clip0_6204_79367">
                                <rect width="40" height="40"></rect>
                            </clipPath>
                        </defs>
                    </svg>
                </div>
                {/* <div>
                    <svg class="h-8 w-8 lg:h-10 lg:w-10 xl:h-12 xl:w-12 z-0 CustomizationIcons_customizationIcon__qHkrK" width="38"
                        height="38" viewBox="0 0 2560 2560">
                        <g>
                            <path
                                d="M704 2483 c30 -99 34 -237 11 -328 -30 -115 -56 -156 -180 -281 -184 -186 -209 -262 -166 -514 11 -69 28 -172 36 -230 37 -249 83 -408 168 -575 41 -81 66 -116 131 -181 90 -91 149 -125 264 -156 67 -17 108 -20 312 -20 204 0 245 3 312 20 115 31 174 65 264 156 155 156 243 384 304 786 11 74 27 176 35 225 20 119 19 181 -3 253 -24 77 -65 135 -177 252 -177 186 -264 300 -291 383 -23 72 -29 76 -64 42 -75 -72 -107 -179 -95 -321 6 -80 7 -81 47 -112 98 -75 180 -226 198 -364 11 -82 10 -92 -13 -175 -14 -48 -37 -133 -51 -188 -45 -177 -106 -296 -208 -406 -38 -42 -54 -50 -143 -78 -107 -34 -144 -38 -149 -18 -41 132 -70 207 -131 333 -80 165 -135 240 -282 390 l-90 91 9 69 c16 120 104 276 196 346 39 30 40 33 47 107 15 176 -46 314 -204 454 -64 58 -97 72 -87 40z">
                            </path>
                        </g>
                    </svg>
                </div> */}
                {/* <div>
                    <svg width="38" height="38" viewBox="0 0 27 63"
                        class="h-8 w-8 lg:h-10 lg:w-10 xl:h-12 xl:w-12 z-0 CustomizationIcons_customizationIcon__qHkrK"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M18.3417 0.89355C18.3807 3.29467 17.7899 6.30922 16.8967 8.60143C15.8946 11.1889 11.17 12.4166 8.72278 8.33748C7.43281 6.20096 7.46425 3.9082 7.10659 1.48432C7.03667 1.00247 7.16079 0.272393 6.23613 0.35749C5.37381 0.434996 5.49033 1.05668 5.50551 1.64746C5.56784 4.04859 5.48221 6.44153 4.80632 8.77272C4.42583 10.086 3.98248 11.4301 2.66161 12.0752C1.80687 12.4947 1.85349 12.8909 2.25781 13.5825C3.58626 15.8355 4.44096 18.2756 4.99278 20.8241C5.66107 23.9086 5.97977 25.9444 4.28546 28.8041C3.29846 30.4669 2.45947 32.2388 1.72879 33.9792C1.48001 34.5618 1.48814 35.6496 2.21064 35.6653C4.37047 35.7119 10.9521 35.7428 13.6253 35.7509C16.7955 35.7585 19.9656 35.7585 23.1441 35.7509C24.6047 35.7434 24.8535 35.3856 24.3793 33.9873C24.1072 33.1791 23.7652 32.41 23.3224 31.6717C21.0145 27.7943 20.3619 23.6843 21.6053 19.294C22.1879 17.2425 22.9104 15.2457 23.7809 13.3032C23.9441 12.9379 24.3403 12.4875 23.7885 12.1921C21.1002 10.7471 20.7425 8.0815 20.2531 5.50208C19.9658 3.98662 19.7794 2.4484 19.7713 0.894506C19.7713 0.451689 19.6937 0.0164611 19.0954 0.000740359C18.6764 -0.00793172 18.3268 0.0462682 18.342 0.893423L18.3417 0.89355Z">
                        </path>
                        <path
                            d="M2.67643 37.0785C1.80597 37.0551 1.42548 37.3115 1.37129 38.2205C1.27806 39.5955 1.05259 40.9711 0.897571 42.3461C0.524672 45.7185 0.166951 56.4102 0.0119355 59.7985C-0.0503952 61.1584 0.0894419 61.3216 1.45691 61.5546C4.71275 62.1139 7.9994 62.3237 11.2938 62.4483C12.0862 62.4792 12.4282 62.1145 12.5139 61.3606C12.7312 59.3638 12.9724 50.8239 13.2288 48.6175C13.4694 50.8864 14.3323 59.4803 14.7209 61.4928C14.845 62.1535 15.0938 62.6505 15.9253 62.6662C19.3984 62.7437 22.0792 62.5107 25.4981 61.967C26.7724 61.7649 27.0602 61.05 26.9903 59.714C26.8428 56.5514 26.2288 48.3151 25.9648 46.0229C25.6461 43.2723 25.2965 40.5291 24.9626 37.779C24.9003 37.2663 24.7605 36.9552 24.0922 37.0251C18.7686 37.6072 10.0739 37.2809 2.67701 37.0787L2.67643 37.0785Z">
                        </path>
                    </svg>
                </div> */}
                <div className='itemsCont' onClick={()=>setType('shoe')}>
                    <svg class="h-8 w-8 lg:h-10 lg:w-10 xl:h-12 xl:w-12 z-0 CustomizationIcons_customizationIcon__qHkrK" width="38"
                        height="38" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_6204_79380)">
                            <path
                                d="M3.05884 27.8574H36.9412L36.288 28.5106C35.3503 29.4483 34.0786 29.9751 32.7525 29.9751H6.48526C5.03424 29.9751 3.70776 29.1553 3.05884 27.8574V27.8574Z">
                            </path>
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M3.3441 26.4175C0.261488 26.1912 3.15778 19.2859 5.28996 15.4129C5.66082 14.7393 6.60006 14.7308 7.01594 15.3776L7.34732 15.893C7.66687 16.39 8.15108 16.7588 8.71515 16.9348C9.81346 17.2773 10.9901 17.2773 12.0884 16.9348L12.9615 16.6624C11.9229 15.7508 11.8961 14.1424 12.9038 13.1967L13.0209 13.0869C13.7403 12.4118 14.7821 12.2224 15.6878 12.6135C20.9888 14.9023 35.642 21.2925 37.2062 22.2516C38.9615 23.3278 37.551 26.7993 35.451 26.7993C32.2802 26.7993 8.54744 26.7993 3.3441 26.4175ZM12.5882 25.2106L19.4705 16.2106L21.5882 17.7989L15.7647 25.2106H12.5882ZM23.7059 18.328L17.8823 25.2104H21.0588L25.8235 19.9163L23.7059 18.328Z">
                            </path>
                            <circle cx="21.0588" cy="15.1516" r="1.05882"></circle>
                            <circle cx="26.353" cy="17.2698" r="1.05882"></circle>
                            <circle cx="30.5881" cy="19.3869" r="1.05882"></circle>
                        </g>
                        <defs>
                            <clipPath id="clip0_6204_79380">
                                <rect width="40" height="40"></rect>
                            </clipPath>
                        </defs>
                    </svg>
                </div>
                {/* <div>
                    <svg class="h-8 w-8 lg:h-10 lg:w-10 xl:h-12 xl:w-12 z-0 CustomizationIcons_customizationIcon__qHkrK" width="38"
                        height="38" viewBox="0 0 2560 2560">
                        <g>
                            <path
                                d="M401 1708 c-76 -11 -132 -37 -160 -77 -27 -37 -63 -134 -86 -228 -15 -63 -21 -75 -50 -92 -47 -28 -65 -60 -77 -140 -16 -110 -13 -115 89 -140 145 -35 278 -52 469 -58 227 -7 337 9 502 73 153 59 208 60 343 5 161 -66 224 -76 464 -76 219 1 348 15 529 57 l88 20 -4 77 c-5 92 -29 146 -78 179 -31 21 -37 33 -65 135 -69 250 -104 271 -440 272 -222 0 -275 -8 -350 -56 -52 -33 -88 -97 -105 -190 -20 -105 -50 -157 -118 -200 -54 -34 -106 -38 -160 -10 -72 37 -102 87 -133 220 -34 150 -94 206 -249 230 -77 13 -319 12 -409 -1z">
                            </path>
                        </g>
                    </svg>
                </div>
                <div>
                    <svg class="h-8 w-8 lg:h-10 lg:w-10 xl:h-12 xl:w-12 z-0 CustomizationIcons_customizationIcon__qHkrK" width="38"
                        height="38" viewBox="0 0 2560 2560">
                        <g>
                            <path
                                d="M1537 2236 c-77 -28 -150 -107 -183 -198 -23 -65 -61 -251 -74 -362 l-12 -99 36 -35 35 -36 9 25 c82 214 116 269 227 379 l77 75 -47 -68 c-47 -67 -245 -412 -245 -426 0 -4 14 -20 31 -37 l31 -29 22 29 c63 87 170 208 227 257 85 73 239 192 239 184 0 -11 -376 -419 -421 -457 l-44 -37 30 -30 30 -31 160 86 c88 47 193 108 234 135 41 27 76 47 79 45 9 -10 -127 -134 -178 -163 -30 -17 -102 -50 -160 -73 -58 -24 -107 -45 -109 -47 -3 -2 6 -15 20 -29 l25 -25 135 15 c343 39 462 83 521 193 34 63 42 119 28 190 -43 206 -305 491 -518 562 -70 24 -150 26 -205 7z">
                            </path>
                            <path
                                d="M833 1123 c-511 -536 -493 -516 -493 -555 0 -27 15 -47 98 -130 123 -123 133 -125 225 -41 141 129 857 815 857 822 0 8 -293 301 -302 301 -3 0 -177 -179 -385 -397z">
                            </path>
                        </g>
                    </svg>
                </div> */}
                {/* <div>
                    <svg class="h-8 w-8 lg:h-10 lg:w-10 xl:h-12 xl:w-12 z-0 CustomizationIcons_customizationIcon__qHkrK" width="38"
                        height="38" viewBox="0 0 2560 2560">
                        <g>
                            <path
                                d="M401 1708 c-76 -11 -132 -37 -160 -77 -27 -37 -63 -134 -86 -228 -15 -63 -21 -75 -50 -92 -47 -28 -65 -60 -77 -140 -16 -110 -13 -115 89 -140 145 -35 278 -52 469 -58 227 -7 337 9 502 73 153 59 208 60 343 5 161 -66 224 -76 464 -76 219 1 348 15 529 57 l88 20 -4 77 c-5 92 -29 146 -78 179 -31 21 -37 33 -65 135 -69 250 -104 271 -440 272 -222 0 -275 -8 -350 -56 -52 -33 -88 -97 -105 -190 -20 -105 -50 -157 -118 -200 -54 -34 -106 -38 -160 -10 -72 37 -102 87 -133 220 -34 150 -94 206 -249 230 -77 13 -319 12 -409 -1z">
                            </path>
                        </g>
                    </svg>
                </div>
                <div>
                    <svg class="h-8 w-8 lg:h-10 lg:w-10 xl:h-12 xl:w-12 z-0 CustomizationIcons_customizationIcon__qHkrK" width="38"
                        height="38" viewBox="0 0 2560 2560"  >
                        
                        <g>
                            <path
                                d="M965 1900 c-269 -19 -550 -77 -678 -142 -56 -28 -115 -85 -122 -118 -7 -33 11 -74 47 -106 56 -52 222 -114 387 -145 55 -11 65 -10 72 3 16 29 94 66 171 82 62 13 148 16 438 16 422 0 475 -6 579 -72 l65 -40 110 25 c166 37 269 80 327 136 53 51 59 73 34 121 -90 174 -754 285 -1430 240z">
                            </path>
                            <path
                                d="M803 1290 c-122 -28 -126 -31 -119 -93 3 -29 13 -164 22 -302 11 -161 22 -261 31 -281 23 -52 57 -61 293 -79 118 -9 223 -18 233 -20 9 -2 61 1 115 5 53 5 164 14 246 20 160 13 186 21 211 70 13 25 24 149 51 545 l6 90 -49 18 c-121 42 -178 47 -576 46 -334 -1 -392 -3 -464 -19z">
                            </path>
                        </g>
                    </svg>
                </div> */}
            </div>
        </div>
        <div class="side-middle">
            <div class="con-middle">
                <div>
                    <svg class="h-8 w-8 lg:h-10 lg:w-10 xl:h-12 xl:w-12 z-0 CustomizationIcons_customizationIconActive__LL_Rr" width="38"
                        height="38" viewBox="0 0 2560 2560">
                        <g>
                            <path
                                d="M1318 2110 c-17 -39 -34 -67 -38 -63 -4 4 -12 34 -19 66 -12 57 -13 58 -44 52 -18 -2 -174 -19 -347 -36 -173 -17 -316 -31 -317 -32 0 -1 17 -172 39 -380 22 -209 38 -381 35 -383 -2 -2 -34 10 -70 27 -37 17 -71 29 -76 27 -6 -1 -91 -123 -190 -270 l-180 -267 97 -59 c53 -33 219 -134 367 -224 l271 -165 363 -6 363 -5 432 140 c237 77 435 144 440 148 8 8 -225 582 -245 604 -5 6 -40 -3 -86 -21 -43 -17 -79 -30 -80 -29 -2 2 35 191 81 422 46 230 83 420 83 420 -1 1 -182 23 -402 48 -220 26 -410 49 -422 51 -20 5 -27 -3 -55 -65z">
                            </path>
                        </g>
                    </svg>
                </div>
                <div>
                    <svg class="h-8 w-8 lg:h-10 lg:w-10 xl:h-12 xl:w-12 z-0 CustomizationIcons_customizationIcon__qHkrK" width="40"
                        height="38" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_6204_79367)">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M16.2533 37L20.1733 16.7308L24.7467 37L34 36.3462L30.3658 10.4515C25.2463 10.0033 23.0652 6.54909 22.5676 4.42575C22.0457 4.47184 21.5233 4.50324 21 4.52011V13H19V4.51433C18.3183 4.48869 17.634 4.43902 16.9461 4.36569C16.4906 6.41715 14.4363 9.78077 9.60974 10.4003L7 35.6923L16.2533 37ZM10.3733 3C11.9291 3.46954 13.4529 3.83394 14.9553 4.0896C14.6018 5.4082 13.2239 7.72212 9.82202 8.34298L10.3733 3ZM24.569 4.17635C24.974 5.55953 26.4602 7.91178 30.0788 8.40686L29.32 3C27.7263 3.53166 26.147 3.92226 24.569 4.17635Z">
                            </path>
                        </g>
                        <defs>
                            <clipPath id="clip0_6204_79367">
                                <rect width="40" height="40"></rect>
                            </clipPath>
                        </defs>
                    </svg>
                </div>
                <div>
                    <svg class="h-8 w-8 lg:h-10 lg:w-10 xl:h-12 xl:w-12 z-0 CustomizationIcons_customizationIcon__qHkrK" width="38"
                        height="38" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_6204_79380)">
                            <path
                                d="M3.05884 27.8574H36.9412L36.288 28.5106C35.3503 29.4483 34.0786 29.9751 32.7525 29.9751H6.48526C5.03424 29.9751 3.70776 29.1553 3.05884 27.8574V27.8574Z">
                            </path>
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M3.3441 26.4175C0.261488 26.1912 3.15778 19.2859 5.28996 15.4129C5.66082 14.7393 6.60006 14.7308 7.01594 15.3776L7.34732 15.893C7.66687 16.39 8.15108 16.7588 8.71515 16.9348C9.81346 17.2773 10.9901 17.2773 12.0884 16.9348L12.9615 16.6624C11.9229 15.7508 11.8961 14.1424 12.9038 13.1967L13.0209 13.0869C13.7403 12.4118 14.7821 12.2224 15.6878 12.6135C20.9888 14.9023 35.642 21.2925 37.2062 22.2516C38.9615 23.3278 37.551 26.7993 35.451 26.7993C32.2802 26.7993 8.54744 26.7993 3.3441 26.4175ZM12.5882 25.2106L19.4705 16.2106L21.5882 17.7989L15.7647 25.2106H12.5882ZM23.7059 18.328L17.8823 25.2104H21.0588L25.8235 19.9163L23.7059 18.328Z">
                            </path>
                            <circle cx="21.0588" cy="15.1516" r="1.05882"></circle>
                            <circle cx="26.353" cy="17.2698" r="1.05882"></circle>
                            <circle cx="30.5881" cy="19.3869" r="1.05882"></circle>
                        </g>
                        <defs>
                            <clipPath id="clip0_6204_79380">
                                <rect width="40" height="40"></rect>
                            </clipPath>
                        </defs>
                    </svg>
                </div>
                <div>
                    <svg width="38" height="38" viewBox="0 0 27 63"
                        class="h-8 w-8 lg:h-10 lg:w-10 xl:h-12 xl:w-12 z-0 CustomizationIcons_customizationIcon__qHkrK"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M18.3417 0.89355C18.3807 3.29467 17.7899 6.30922 16.8967 8.60143C15.8946 11.1889 11.17 12.4166 8.72278 8.33748C7.43281 6.20096 7.46425 3.9082 7.10659 1.48432C7.03667 1.00247 7.16079 0.272393 6.23613 0.35749C5.37381 0.434996 5.49033 1.05668 5.50551 1.64746C5.56784 4.04859 5.48221 6.44153 4.80632 8.77272C4.42583 10.086 3.98248 11.4301 2.66161 12.0752C1.80687 12.4947 1.85349 12.8909 2.25781 13.5825C3.58626 15.8355 4.44096 18.2756 4.99278 20.8241C5.66107 23.9086 5.97977 25.9444 4.28546 28.8041C3.29846 30.4669 2.45947 32.2388 1.72879 33.9792C1.48001 34.5618 1.48814 35.6496 2.21064 35.6653C4.37047 35.7119 10.9521 35.7428 13.6253 35.7509C16.7955 35.7585 19.9656 35.7585 23.1441 35.7509C24.6047 35.7434 24.8535 35.3856 24.3793 33.9873C24.1072 33.1791 23.7652 32.41 23.3224 31.6717C21.0145 27.7943 20.3619 23.6843 21.6053 19.294C22.1879 17.2425 22.9104 15.2457 23.7809 13.3032C23.9441 12.9379 24.3403 12.4875 23.7885 12.1921C21.1002 10.7471 20.7425 8.0815 20.2531 5.50208C19.9658 3.98662 19.7794 2.4484 19.7713 0.894506C19.7713 0.451689 19.6937 0.0164611 19.0954 0.000740359C18.6764 -0.00793172 18.3268 0.0462682 18.342 0.893423L18.3417 0.89355Z">
                        </path>
                        <path
                            d="M2.67643 37.0785C1.80597 37.0551 1.42548 37.3115 1.37129 38.2205C1.27806 39.5955 1.05259 40.9711 0.897571 42.3461C0.524672 45.7185 0.166951 56.4102 0.0119355 59.7985C-0.0503952 61.1584 0.0894419 61.3216 1.45691 61.5546C4.71275 62.1139 7.9994 62.3237 11.2938 62.4483C12.0862 62.4792 12.4282 62.1145 12.5139 61.3606C12.7312 59.3638 12.9724 50.8239 13.2288 48.6175C13.4694 50.8864 14.3323 59.4803 14.7209 61.4928C14.845 62.1535 15.0938 62.6505 15.9253 62.6662C19.3984 62.7437 22.0792 62.5107 25.4981 61.967C26.7724 61.7649 27.0602 61.05 26.9903 59.714C26.8428 56.5514 26.2288 48.3151 25.9648 46.0229C25.6461 43.2723 25.2965 40.5291 24.9626 37.779C24.9003 37.2663 24.7605 36.9552 24.0922 37.0251C18.7686 37.6072 10.0739 37.2809 2.67701 37.0787L2.67643 37.0785Z">
                        </path>
                    </svg>
                </div>
            </div>
        </div>
            <LeftSide item={type}/>
        <div className='scene'>
                <button style={{zIndex:30,height:'50px',background:'#162333',position:'absolute',bottom:'2%',left:'2%'}} 
                onClick={
                    ()=>{
                        setOpen(true)
                PublishCharacter({
                    "face":currentState['face'],
                    "legs":currentState['legs'],
                    "body":currentState['body'],
                    "shoe":currentState['shoe'],
                    "skin":currentState['skin']
                }).then((res)=>{
                    console.log(`link is: ${window.location.host}/?character=${res.link}`);
                        setText(`${window.location.host}/?character=${res.link}`)
                        setOpen(true)
                })
            }}>PublishCharacter</button>
                <Scene/>
            </div>
        </div>
    </>
    )
}

const LeftSide = ({item})=>{
    // item = 'skin'
    
    let snap = useSnapshot(state)
    return(<>
         <div class="side-left">
            <div class="con-left">
            {
            Object.keys(snap.items[item]).map((key, index) => {
                    return(
                    <div onClick={()=>{
                        if(item !== 'face')
                        currentState[item] = snap.items[item][key]
                        else{
                        currentState[item] = snap.items[item][key]
                        currentState['skin'] = snap.items['skin'][currentState['face'].skin]
                        }
                        } } style={{width:'150px',height:'150px',cursor:'pointer'}}>
                        {item !== 'skin'?<SmallCanvas  model={snap.items[item][key].model} item={item}/>
                        :<h1>hi</h1>}
                    </div>
                    )
                })
                }
            </div>
        </div>  
    </>)
}
function Loading() {
    return (
            <Billboard>
                <Text scale={0.6}>Loading</Text>
            </Billboard>
    )
  }
let SmallCanvas = (props)=>{
    let [position,setPosition] = useState([0,0,0])
    let [loaded,setLoaded] = useState(false)
    useEffect(()=>{
        console.log(loaded)
        if(props.item === 'shoe')
        setPosition([0,0,3])
        else if(props.item === 'body')
        setPosition([0,-1.2,3])
        else if(props.item === 'face')
        setPosition([0,-1.7,4])
        else if(props.item === 'legs')
        setPosition([0,-1,2])
    },[props,loaded])
    return(
        <>
        
            <Canvas camera={{fov: 30 }}>
                <Suspense fallback={<Loading />}>
                    <ambientLight intensity={0.2}></ambientLight>
                    <pointLight position={[0,5,6]}></pointLight>
                    <Gltf rotation={[props.item === 'shoe'?0.2:0,props.item === 'shoe'?0.7:-0.3,0]} position={position} src={props.model}></Gltf>
                </Suspense>
            </Canvas>
        </>
    )
}

// const App = () => {
//   const [open, setOpen] = useState(false);
//   return (
//    <div>
//     <button onClick={() => setOpen(true)}> Click to Open       Popup</button>
// {open ? <Popup text="Hello there!" closePopup={() => setOpen(false)} /> : null}
//    </div>
//  );
// };
export default SideBar