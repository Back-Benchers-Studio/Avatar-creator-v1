import { proxy } from 'valtio'
const state = proxy({
        items:{
            face:{
                'face3':{
                    'skin':'skin2',
                    "name":"face3",
                    "model":'models/face/face3.glb',
                },             
            },
            body:{
                'body1':{
                    "name":"body1",
                    'model':'models/bodys/body1.glb'
                },
            },
            legs:{
                'leg1':{
                    "name":"leg1",
                    'model':'models/legs/leg1.glb'
                },
            
            },
            shoe:{
                'shoe1':{
                    "name":"shoe1",
                    'model':'models/shoe/shoe1.glb'
                },
                
            },
            skin:{
                'skin3':{
                    "name":"skin3",
                    'model':'models/skin/skin3.glb'
                }
        
            }
        }
})

let ModelUrl = proxy({
    link:'m'
})

let currentState = proxy({
    face:state.items.face["face3"],
    body:state.items.body['body1'],
    legs:state.items.legs['leg1'],
    shoe:state.items.shoe['shoe1'],
    skin:state.items.skin['skin3'],
})

export { state,currentState,ModelUrl }