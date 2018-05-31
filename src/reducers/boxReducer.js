
const initalState = {
    byId: [],
    byHash: {},
    currId: '0',
    showAll: true
};

const boxes = (state = initalState, action) => {
    switch (action.type) {
        case "CREATE_BOX":
            return {
                byId: [...state.byId, action.id],
                byHash: {
                    ...state.byHash,
                    [action.id]: { ...action.payload, id: action.id }
                },
                currId: action.id,
                showAll: false
            }

        case "DELETE_BOX":
            const prunedIds = state.byId.filter(box => {
                return box !== action.id
            })
            const prunedIdsByHash = Object.keys(state.byHash).reduce((result, key) => {
                if (key !== action.id) {
                    result[key] = state.byHash[key];
                }
                return result;
            }, {})
            // if(action.id===state.currId)console.log("check id, changed to "+state.byId[0]);
            var randomId;
            do {
                randomId = state.byId[Math.floor(Math.random() * state.byId.length)]
            } while (randomId === action.id && state.byId.length > 1);
            console.log("length " + state.byId.length + "new id is " + randomId);

            return {
                byId: prunedIds,
                byHash: prunedIdsByHash,
                currId: randomId,
                showAll: false
            }
        case "SELECT_CURRENT_BOX":
            return {
                ...state, currId: action.id, showAll: false
            }
        case "CHANGE_LABEL":
            state.byHash[action.id] = {
                ...state.byHash[action.id],
                ...action.payload
            }
            return {
                ...state, showAll: false, currId: action.id
            }
        case "MOVE_BOX":
            state.byHash[action.id] = {
                ...state.byHash[action.id],
                ...action.payload
            }
            return {
                ...state, showAll: false, currId: action.id
            }
        case "RESIZE_BOX":
            state.byHash[action.id] = {
                ...state.byHash[action.id],
                ...action.payload
            }
            return {
                ...state, currId: action.id, showAll: false
            }
        case "TOGGLE_SHOW_ALL":
            return { ...state, showAll: !state.showAll }
        default: return state;
    }
}

export default boxes;