export const createBox=(id,x,y,w,h,minW,minH,maxW,maxH)=>{
    return{
        type : "CREATE_BOX",
        id : id,
        payload :{
            width: w,
            height: h,
            x: x,
            y: y,
            maxWidth : maxW,
            maxHeight : maxH,
            minHeight : minH,
            minWidth : minW
        }
    }
}
export const deleteBox=(id)=>{
    return{
        type : "DELETE_BOX",
        id : id
    }
}
export const resizeBox=(id,w,h,x,y)=>{
    return {
        type : "RESIZE_BOX",
        id : id,
        payload : {
            width : w,
            height : h,
            x : x,
            y : y
        }
    }
}
export const moveBox =(id,x,y)=>{
    return{
        type : "MOVE_BOX",
        id:id,
        payload :{
            x : x,
            y : y
        }
    }
}

export const changeImage=(url)=>{
    return{
        type: "CHANGE_IMAGE",
        url : url 
    }
}