import { defaultStyles } from "../constans"
import { storage } from "../core/utils"
const defaultState = {
  rowState: {},
  colState: {},
  dataState:{},
  currentText:'',
  currentStyles: defaultStyles
}

export const initialState = storage('excel-state')
  ? storage('excel-state')
  : defaultState