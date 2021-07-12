import { useReducer } from "react";

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_DISPLAY_TEXT":
            return {
                ...state,
                displayText: action.payload
            }
        default:
            return state;
    }
};

const useGlobalState = () => {
    const [globalState, globalDispatch] = useReducer(reducer, {
        displayText: "Initial Value",
    });

    return { globalState, globalDispatch };
};

export default useGlobalState;
