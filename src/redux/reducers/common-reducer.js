import * as actionConstants from '../constants';

const initialState = { eventdata: []};

export const commonReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionConstants.GET_EVENT_DATA:
            return {
                ...state,
                eventdata: action.payload.eventdata
            }
        default:
            return state
    }
}