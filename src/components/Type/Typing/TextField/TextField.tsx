import React, { useEffect } from 'react';
import './TextField.scss';
import IParamsRun from '../../../../interfaces/IParamsRun';
import IChar from '../../../../interfaces/IChar';
import Char from './Char/Char';
import IStatus, { IPosition } from '../../../../interfaces/IStatus';

export default function TextField(props: { paramsRun: IParamsRun, status: IStatus, setStatus: any, rowsCount: number }) {

  const status = props.status;
  const setStatus = props.setStatus;

  useEffect(() => {

    const char: IChar = status.rows[status.position.row][status.position.cursor];

    const handleKeyDown = (event: any) => {
      const nextPosition: IPosition =
        status.rows[char.position.row].length <= char.position.cursor + 1 ?
          {
            row: char.position.row + 1,
            cursor: 0,
          } :
          {
            row: char.position.row,
            cursor: char.position.cursor + 1,
          };

      if (event.key === char.char) { }
      else if (!(event.key.length - 1))
        status.failed.push(char.position);
      else return;

      setStatus({
        ...status,
        count: status.count + 1,
        position: nextPosition,
        timeStart: status.count ? status.timeStart : Date.now()
      });
    };

    if (char.position.row === status.position.row && char.position.cursor === status.position.cursor)
      document.addEventListener('keypress', handleKeyDown);

    return () => document.removeEventListener('keypress', handleKeyDown);
  })

  return (
    <section className='text-field'>
      {status.rows.slice(-props.rowsCount).map((value, i) =>
        <div className='text-field__row' key={i}>
          {value.map((value, j) => <Char char={value} status={status} key={`${i}.${j}`} />)}
        </div>
      )}
    </section>
  );
}