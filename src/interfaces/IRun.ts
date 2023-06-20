import { Type } from "../assets/enums/Type.enum";

export default interface IRun {
  id: number,
  date: Date,
  type: Type;
  language: string,
  symbols: number,
  words: number,
  mistakes: number,
  time: number
}