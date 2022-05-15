import { types } from "../Types/Types";



export const AuthReducer = (state = {}, action) => {
    switch (action?.type) {
        case types.login:
            return {
                ...action.payload,
                logueado: true
            }
        case types.logout:
            return {
                logueado: false
            }
        default:
            return state;
    }
}