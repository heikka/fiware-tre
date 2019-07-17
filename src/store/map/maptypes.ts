export const SELECT_MAP_ID = 'SELECT_MAP_ID';
export const UNSELECT_MAP_ID = 'UNSELECT_MAP_ID';

export interface MapPoint {
    id: string
}

export interface MapState {
    selectedMapPoints: MapPoint[];
}

interface SelectMapIdAction {
    type: typeof SELECT_MAP_ID
    payload: MapPoint
}

interface UnselectMapIdAction {
    type: typeof UNSELECT_MAP_ID
    payload: MapPoint
}

export type MapActionTypes = SelectMapIdAction | UnselectMapIdAction;