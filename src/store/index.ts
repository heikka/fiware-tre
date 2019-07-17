import { combineReducers } from 'redux';
import { mapreducer } from './map/mapreducers';

const rootReducer = combineReducers({
  map: mapreducer
})

export type AppState = ReturnType<typeof rootReducer>;