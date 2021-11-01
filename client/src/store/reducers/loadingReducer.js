import {ACTION_SETTER} from "../actions/actionConst";
import {getStorage} from "../utils/getStorage";

const initState = {

    loginPage: false,
    homePage: false,
    accountPage: false

}

export const loadingReducer = (state = getStorage().getInitStorage('loadingReducer', initState), action) => {

    let newState = Object.assign({}, state);

    if (action.reducer === 'loadingReducer') {
        if (action.type === ACTION_SETTER) {
            newState = Object.assign(newState, action.payload);
        }
    }

    return newState;

}