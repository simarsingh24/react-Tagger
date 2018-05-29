const initalState = {
    src : '../room.jpg',
    offsetX:0,
    offsetY:0
}

const image=(state=initalState,action)=>{
    switch(action.type){
        case "CHANGE_IMAGE":
             return  Object.assign({},state,{
                src : action.url
            });
        default : return state;
    }
}

export default image;
