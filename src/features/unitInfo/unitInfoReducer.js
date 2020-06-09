import { createReducer } from '../../common/utils/reducerUtils';
import { DATA_LOADED } from '../tools/toolConstant';
import { UNIT_INFO_UPDATE } from './unitInfoConstants'

const initialState = {
  name : "N/A",
  affiliation : "",
  color : "green"
};

export function dataLoaded(state, payload) {
  const {unit} = payload;

  return unit;
}

function updateUnitInfo(state, payload) {
  return {
    ...state,
    ...payload,
  }
}

export default createReducer(initialState, {
  [DATA_LOADED] : dataLoaded,
  [UNIT_INFO_UPDATE] : updateUnitInfo
});
