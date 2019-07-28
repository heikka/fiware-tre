import { MapPoint, SELECT_MAP_ID, UNSELECT_MAP_ID, PointActionTypes, CLEAR_MAP_POINTS } from './pointactiontypes';

export function selectMapId(mapPoint: MapPoint): PointActionTypes {

    return {
        type: SELECT_MAP_ID,
        payload: mapPoint
    }
}

export function unselectMapId(mapPoint: MapPoint): PointActionTypes {
    return {
        type: UNSELECT_MAP_ID,
        payload: mapPoint
    }
}

export function clearMapPoints(): PointActionTypes {
    return {
        type: CLEAR_MAP_POINTS
    }
}
