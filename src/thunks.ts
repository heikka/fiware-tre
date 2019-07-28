import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { selectMapId } from "./store/map/mapactions";
import { AppState } from "./store";

export const thunkSendMessage = (
  id: string
): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
  const asyncResp = await mapAPI();
  dispatch(
    selectMapId({
      id: id,
      address: id
    })
  );
};

function mapAPI() {
  return Promise.resolve("Async Map Messages");
}
