import { MapPoint, SELECT_MAP_ID, UNSELECT_MAP_ID, MapActionTypes } from './mapactiontypes';

export function selectMapId(mapPoint: MapPoint): MapActionTypes {

    return {
        type: SELECT_MAP_ID,
        payload: mapPoint
    }
}

export function unselectMapId(mapPoint: MapPoint): MapActionTypes {
    return {
        type: UNSELECT_MAP_ID,
        payload: mapPoint
    }
}
