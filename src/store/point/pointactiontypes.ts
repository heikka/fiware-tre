import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

export const SELECT_MAP_ID = 'SELECT_MAPPOINT';
export const UNSELECT_MAP_ID = 'UNSELECT_MAPPOINT';
export const CLEAR_MAP_POINTS = 'CLEAR_MAP_POINTS';

export interface MapPoint {
    id: string,
    address: string
}

export interface MapState {
    selectedMapPoints: MapPoint[];
}

interface SelectMapPointAction {
    type: typeof SELECT_MAP_ID
    payload: MapPoint
}

interface UnselectMapPointAction {
    type: typeof UNSELECT_MAP_ID
    payload: MapPoint
}

interface ClearMapPoints {
    type: typeof CLEAR_MAP_POINTS
}

export type PointActionTypes = SelectMapPointAction | UnselectMapPointAction | ClearMapPoints;
