import { defaultStyles, defaultTitle } from "../constans"
import { storage } from "../core/utils"

const defaultState = {
  title: defaultTitle,
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles
}


const normalize = state => ({
  ...state,
  currentStyles: defaultState,
  currentText: ''
})

export const initialState = storage('excel-state')
  ? normalize(storage('excel-state'))
  : defaultState