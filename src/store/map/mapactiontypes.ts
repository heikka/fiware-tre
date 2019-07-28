import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

export const SELECT_MAP_ID = 'SELECT_MAP_ID';
export const UNSELECT_MAP_ID = 'UNSELECT_MAP_ID';

export interface MapPoint {
    id: string,
    address: string
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

export const doSelectMapId: ActionCreator<
  ThunkAction<Promise<any>, MapState, null, SelectMapIdAction>
> = () => {
  return async (dispatch: Dispatch) => {
    try {
      //const response = await axios.get('https://swapi.co/api/people/');
      dispatch({
        id: 'XYZ123',
        type: SELECT_MAP_ID,
      });
    } catch (err) {
      console.error(err);
    }
  };
};