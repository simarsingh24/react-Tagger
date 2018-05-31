const initalState = {
    src : require('../1.jpg'),
    mFactor:1,
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
