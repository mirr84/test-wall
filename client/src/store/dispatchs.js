import {actionExcution, actionSetter} from "./actions/actions";

export const dispatchs = (dispatch) =>
    (
        {
            dispatch:
                {
                    setter: (reducer, v) => dispatch(actionSetter(reducer, v)),
                    execute: (reducer, f) => dispatch(actionExcution(reducer, f))
                }
        }
    )