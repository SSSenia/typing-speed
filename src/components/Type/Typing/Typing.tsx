import React from "react";
import { Navigate, useSearchParams } from "react-router-dom";

import './Typing.scss';
import Keyboard from "./Keyboard/Keyboard";
import TextField from "./TextField/TextField";
import { EN } from "../../../assets/keyboards/EN";
import { RU } from "../../../assets/keyboards/RU";
import { UA } from "../../../assets/keyboards/UA";
import IParamsRun from "../../../interfaces/IParamsRun";

export function Typing() {

  const [searchParams, setSearchParams] = useSearchParams();

  const languageParsed: string | null = searchParams.get('language');
  const typeParsed: string | null = searchParams.get('type');
  const sizeParsed: string | null = searchParams.get('size');
  const timeParsed: string | null = searchParams.get('time');

  if (!languageParsed || !typeParsed || !sizeParsed || !timeParsed) return <Navigate to="/type/setup"></Navigate>;

  const paramsRun: IParamsRun = {
    language: "en",
    type: "text-end",
    size: 0,
    time: 0,
    keyboard: []
  };

  switch (languageParsed) {
    case 'en':
      paramsRun.language = 'en';
      paramsRun.keyboard = EN;
      break;
    case 'ru':
      paramsRun.language = 'ru';
      paramsRun.keyboard = RU;
      break;
    case 'ua':
      paramsRun.language = 'ua';
      paramsRun.keyboard = UA;
      break;
    default:
      return <Navigate to="/type/setup"></Navigate>;
  }

  switch (sizeParsed) {
    case 'small':
      paramsRun.size = 50;
      break;
    case 'medium':
      paramsRun.size = 100;
      break;
    case 'long':
      paramsRun.size = 150;
      break;
    default:
      return <Navigate to="/type/setup"></Navigate>;
  }

  if (timeParsed === 'infinity') paramsRun.time = 'infinity';
  else if (Number.parseInt(timeParsed)) paramsRun.time = Number.parseInt(timeParsed);
  else return <Navigate to="/type/setup"></Navigate>;

  return (
    <main className="typing">

      <TextField paramsRun={paramsRun} />

      {searchParams.get("a")}

      <Keyboard keyboard={paramsRun.keyboard} />
    </main>
  );
}