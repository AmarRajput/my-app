import * as constants from '../constants';


export function getEventData() {
    return (dispatch, getState) => {
        let eventdata =  JSON.parse(localStorage.getItem("Data"));
        dispatch({
            type: constants.GET_EVENT_DATA,
            payload : { "eventdata" : eventdata }
        })
    }
}
