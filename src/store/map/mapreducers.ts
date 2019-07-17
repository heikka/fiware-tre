import {
    MapState,
    MapActionTypes,
    SELECT_MAP_ID,
    UNSELECT_MAP_ID
} from './maptypes';


const initialState: MapState = {
    selectedMapPoints: []
}

export const mapreducer = (state = initialState, action: MapActionTypes) => {
    switch (action.type) {
        case SELECT_MAP_ID:
            console.log('mapreducer SELECT_MAP_ID', action);
            return {
                ...state,
                selectedMapPoints: [...state.selectedMapPoints, action.payload]
            };
        case UNSELECT_MAP_ID:
            return {
                selectedMapPoints: state.selectedMapPoints.filter(
                    mapPoint => mapPoint.id !== action.payload.id
                )
            }
        default:
            return state;
    }
};
