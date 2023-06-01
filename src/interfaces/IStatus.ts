import IChar from "./IChar";

export interface IPosition{
  row: number,
  cursor: number
}

export default interface IStatus {
  count: number,
  position: IPosition,
  failed: IPosition[],
  timeStart: number,
  rows: IChar[][]
}