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

      if (event.key === 'Backspace') {
        const prevPosition: IPosition =
          status.position.cursor > 0
            ? {
              row: char.position.row,
              cursor: char.position.cursor - 1
            }
            : char.position.row > 0
              ? {
                row: char.position.row - 1,
                cursor: status.rows[status.position.row - 1].length - 1
              } : {
                row: 0,
                cursor: 0
              };

        const lastFailed = status.failed[status.failed.length - 1];

        if (lastFailed.cursor === prevPosition.cursor && lastFailed.row === prevPosition.row) status.failed.pop();

        setStatus({
          ...status,
          count: status.count ? status.count - 1 : 0,
          position: prevPosition,
          timeStart: status.count ? status.timeStart : Date.now()
        });
      }

      else if (event.key.length === 1) {
        const nextPosition: IPosition =
          status.rows[char.position.row].length <= char.position.cursor + 1
            ? {
              row: char.position.row + 1,
              cursor: 0,
            } : {
              row: char.position.row,
              cursor: char.position.cursor + 1,
            };

        if (event.key !== char.char)
          status.failed.push(char.position);

        setStatus({
          ...status,
          count: status.count + 1,
          position: nextPosition,
          timeStart: status.count ? status.timeStart : Date.now()
        });
      }
    };

    if (char.position.row === status.position.row && char.position.cursor === status.position.cursor) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  });

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