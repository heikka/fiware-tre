import { Reducer } from 'redux';

import {
    MapState,
    PointActionTypes,
    SELECT_MAP_ID,
    UNSELECT_MAP_ID,
    CLEAR_MAP_POINTS
} from './pointactiontypes';

const initialState: MapState = {
    selectedMapPoints: []
}

export const pointreducer: Reducer<MapState, PointActionTypes> = (state = initialState, action: PointActionTypes) => {

    switch (action.type) {
        case SELECT_MAP_ID:

            if (state.selectedMapPoints.includes(action.payload)) {
                return state;
            }

            return {
                ...state,
                selectedMapPoints: [...state.selectedMapPoints, action.payload]
            }
        case UNSELECT_MAP_ID:
            return {
                selectedMapPoints: state.selectedMapPoints.filter(
                    mapPoint => mapPoint.id !== action.payload.id
                )
            }
        case CLEAR_MAP_POINTS:
            return {
                ...state,
                selectedMapPoints: []
            }

        default:
            return state;
    }
};
