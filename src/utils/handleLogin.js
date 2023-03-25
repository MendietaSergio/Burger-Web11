import { types } from "../Types/Types"
export const handleLogin = (data, dispatch) => {
    dispatch({
        type: types.login,
        payload: {
            ...data
        }
    })
}