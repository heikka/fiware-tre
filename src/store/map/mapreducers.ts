import { Reducer } from 'redux';

import {
    MapState,
    MapActionTypes,
    SELECT_MAP_ID,
    UNSELECT_MAP_ID
} from './mapactiontypes';


const initialState: MapState = {
    selectedMapPoints: []
}

export const mapreducer: Reducer<MapState, MapActionTypes>  = (state = initialState, action: MapActionTypes)=> {

    switch (action.type) {
        case SELECT_MAP_ID:
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
