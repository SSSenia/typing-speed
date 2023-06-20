import { Language } from "../assets/enums/Language.enum";
import { Size } from "../assets/enums/Size.enum";
import { Time } from "../assets/enums/Time.enum";
import { Type } from "../assets/enums/Type.enum";

export default interface ITypeRun {
  language: Language,
  type: Type;
  size: Size;
  time: Time;
}