import React, { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";

import './Typing.scss';
import Keyboard from "./Keyboard/Keyboard";
import TextField from "./TextField/TextField";
import { EN } from "../../../assets/keyboards/EN";
import { RU } from "../../../assets/keyboards/RU";
import { UA } from "../../../assets/keyboards/UA";
import IParamsRun from "../../../interfaces/IParamsRun";
import Progress from "./Progress/Progress";
import IStatus from "../../../interfaces/IStatus";
import IChar from "../../../interfaces/IChar";
import { EN_TEXT } from "../../../assets/text/EN_TEXT";
import { RU_TEXT } from "../../../assets/text/RU_TEXT";
import { UA_TEXT } from "../../../assets/text/UA_TEXT";
import { Type } from "../../../assets/enums/Type.enum";
import { Language } from "../../../assets/enums/Language.enum";
import { Size } from "../../../assets/enums/Size.enum";
import { Time } from "../../../assets/enums/Time.enum";

export function Typing() {

  const [searchParams] = useSearchParams();

  const DEFAULT_STATUS: IStatus = {
    count: 0,
    position: { row: 0, cursor: 0 },
    failed: [],
    timeStart: +Date.now(),
    rows: [],
  };


  const ROWS_COUNT = 10;
  const COLUMN_COUNT = 60;

  const [status, setStatus] = useState(DEFAULT_STATUS);


  const languageParsed: string | null = searchParams.get('language');
  const typeParsed: string | null = searchParams.get('type');
  const sizeParsed: string | null = searchParams.get('size');
  const timeParsed: string | null = searchParams.get('time');

  const paramsRun: IParamsRun = {
    language: Language.EN,
    type: Type.TextEnd,
    size: 0,
    time: 0,
    keyboard: [],
    text: ''
  };

  switch (languageParsed) {
    case Language.EN:
      paramsRun.language = Language.EN;
      paramsRun.keyboard = EN;
      paramsRun.text = EN_TEXT;
      break;
    case Language.RU:
      paramsRun.language = Language.RU;
      paramsRun.keyboard = RU;
      paramsRun.text = RU_TEXT;
      break;
    case Language.UA:
      paramsRun.language = Language.UA;
      paramsRun.keyboard = UA;
      paramsRun.text = UA_TEXT;
      break;
    default:
      paramsRun.language = Language.EN;
      paramsRun.keyboard = EN;
      paramsRun.text = EN_TEXT;
  }

  function shuffle(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function createRow(): string {
    let row = '';
    let randomStrings = shuffle(paramsRun.text.split(' '));
    while (true) {
      const word = randomStrings.pop() + ' ';
      if ((row + word).length > COLUMN_COUNT) break;
      else row += word;
    }
    return row;
  }

  function addRow(): void {
    status.rows
      .push(createRow().split('')
        .map((char, index) => (
          {
            char,
            position: {
              row: status.rows.length,
              cursor: index
            }
          }
        )));
    setStatus(status);
  }

  if (!status.rows.length) {
    const rows: IChar[][] = [];

    for (let i = 0; i < ROWS_COUNT; i++)
      rows.push(createRow().split('').map((char, index) => ({
        char,
        position: {
          row: i,
          cursor: index
        }
      })));

    setStatus({
      ...status,
      rows: rows
    });
  }

  useEffect(() => {
    if (status.position.row > status.rows.length - ROWS_COUNT / 2) addRow();
  });


  if (!languageParsed || !typeParsed || !sizeParsed || !timeParsed) return <Navigate to="/type/setup"></Navigate>;

  switch (typeParsed) {
    case Type.TextEnd:
      paramsRun.type = Type.TextEnd;
      break;
    case Type.TimeEnd:
      paramsRun.type = Type.TimeEnd;
      break;
    default:
      return <Navigate to="/type/setup"></Navigate>;
  }

  switch (sizeParsed) {
    case Size.Small:
      paramsRun.size = 100;
      break;
    case Size.Medium:
      paramsRun.size = 250;
      break;
    case Size.Long:
      paramsRun.size = 500;
      break;
    case Size.Infinity:
      paramsRun.size = Infinity;
      break;
    default:
      return <Navigate to="/type/setup"></Navigate>;
  }

  if (timeParsed === Time.Infinity) paramsRun.time = Infinity;
  else if (Number.parseInt(timeParsed)) paramsRun.time = Number.parseInt(timeParsed);
  else return <Navigate to="/type/setup"></Navigate>;

  return (
    <main className="typing">
      <Progress paramsRun={paramsRun} status={status}></Progress>

      <TextField paramsRun={paramsRun} status={status} setStatus={setStatus} rowsCount={ROWS_COUNT} />

      <Keyboard keyboard={paramsRun.keyboard} />
    </main>
  );
}