import { Language } from "../assets/enums/Language.enum";
import { Type } from "../assets/enums/Type.enum";

export default interface IParamsRun {
  language: Language,
  type: Type,
  size: number,
  time: number,
  keyboard: string[][],
  text: string
}