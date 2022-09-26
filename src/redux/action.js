import { TABLE_RESIZE } from "./type";
//action creator
export function tableResize(data){
  return{
    type:TABLE_RESIZE,
    data
  }
}