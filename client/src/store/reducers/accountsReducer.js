import {ACTION_SETTER} from "../actions/actionConst";
import {getStorage} from "../utils/getStorage";

const initState = {

    loading: false,

}

export const accountsReducer = (state = getStorage().getInitStorage('accountsReducer', initState), action) => {

    let newState = Object.assign({}, state);

    if (action.reducer === 'accountsReducer') {
        if (action.type === ACTION_SETTER) {
            newState = Object.assign(newState, action.payload);
        }
    }

    return newState;

}