
const initalState ={
    byId:['1'],
    byHash:{
        '1' : { 
            width: 100,
            height: 100,
            x: 0,
            y: 0,
            maxWidth : 400,
            maxHeight : 400,
            minHeight : 50,
            minWidth : 50,
            id:'1'
        }
    },
    currId : '1'
};

const boxes=(state=initalState,action)=>{
    switch(action.type){
        case "CREATE_BOX":
        return {
            byId: [ ...state.byId, action.id],
            byHash: {
              ...state.byHash,
              [action.id]: {...action.payload,id :action.id}
            },
            currId : action.id
          }
            
        case "DELETE_BOX":
            const prunedIds = state.byId.filter(box => {
                return box !== action.id 
            })
            const prunedIdsByHash= Object.keys(state.byHash).reduce((result, key) => {
                if (key !== action.id) {
                    result[key] = state.byHash[key];
                }
                return result;
            }, {})
            //delete state.byHash[action.id] // delete the hash associated with the action.id
            
            return {
                byId: prunedIds,
                byHash: prunedIdsByHash,
                currId : (action.id===state.currId)?state.byId[0]:state.currId
            }
        case "SELECT_CURRENT_BOX":
            return {
                ...state,currId : action.id
            }

            
        case "MOVE_BOX" :
            state.byHash[action.id] = {
                ...state.byHash[action.id],
                ...action.payload
            }
            return {
                ...state
            }
        case "RESIZE_BOX":
            state.byHash[action.id] = {
                ...state.byHash[action.id],
                ...action.payload
            }
            return{
                ...state
            }
        default : return state;
    }
}

export default boxes;