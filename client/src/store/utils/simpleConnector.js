import {connect} from "react-redux";
import {dispatchs} from "../dispatchs";
import {withRouter} from "react-router-dom";

export const simpleConnector = (component) => connect(state => ({state}), dispatch => dispatchs(dispatch))(component);
export const connector = ({component}) => withRouter(simpleConnector(component));