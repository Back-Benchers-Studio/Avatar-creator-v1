import { proxy } from 'valtio'
const state = proxy({
        items:{
            face:{
                "face3": {
                    "name": "face3",
                    "model": "models/face/face3.glb"
                }
                
            },
            body:{
                't-shirt':{
                    "name":"t-shirt",
                    'model':'models/bodys/body1.glb'
                },
                'sweatshirt':{
                    "name":"sweatshirt",
                    'model':'models/bodys/body2.glb'
                },
                'sweatshirt2':{
                    "name":"sweatshirt2",
                    'model':'models/bodys/body3.glb'
                },
                'sweatshirt3':{
                    "name":"sweatshirt3",
                    'model':'models/bodys/body4.glb'
                },
                'sweatshirt4':{
                    "name":"sweatshirt4",
                    'model':'models/bodys/body6.glb'
                },
                'sweatshirt5':{
                    "name":"sweatshirt5",
                    'model':'models/bodys/body7.glb'
                },
                'sweatshirt6':{
                    "name":"sweatshirt6",
                    'model':'models/bodys/body8.glb'
                },
            },
            legs:{
                'pants1':{
                    "name":"pants1",
                    'model':'models/legs/leg1.glb'
                },
                'pants2':{
                    "name":"pants2",
                    'model':'models/legs/leg2.glb'
                },
                'pants3':{
                    "name":"pants3",
                    'model':'models/legs/leg3.glb'
                },
                'pants4':{
                    "name":"pants4",
                    'model':'models/legs/leg4.glb'
                },
                'pants5':{
                    "name":"pants5",
                    'model':'models/legs/leg5.glb'
                },
                'pants6':{
                    "name":"pants6",
                    'model':'models/legs/leg6.glb'
                },
            },
            shoe:{
                '9dhwjbbdsa':{
                    "name":"shoe1",
                    'model':'models/shoe/shoe1.glb'
                },
                'shoe2':{
                    "name":"shoe2",
                    'model':'models/shoe/shoe2.glb'
                },
                'shoe3':{
                    "name":"shoe3",
                    'model':'models/shoe/shoe3.glb'
                },
                'shoe4':{
                    "name":"shoe4",
                    'model':'models/shoe/shoe4.glb'
                },
                'shoe5':{
                    "name":"shoe5",
                    'model':'models/shoe/shoe5.glb'
                },
                'shoe6':{
                    "name":"shoe6",
                    'model':'models/shoe/shoe6.glb'
                },
            },
            skin:{
                'skin1':{
                    "name":"skin1",
                    'model':'models/skin/skin1.glb'
                },

                'skin2':{
                    "name":"skin2",
                    'model':'models/skin/skin2.glb'
                },
                'skin3':{
                    "name":"skin3",
                    'model':'models/skin/skin4.glb'
                }
        
            }
        }
})



let currentState = proxy({
    face:state.items.face["face3"],
    body:state.items.body['sweatshirt'],
    legs:state.items.legs['pants1'],
    shoe:state.items.shoe['shoe6'],
    skin:state.items.skin['skin3'],
})

export { state,currentState }