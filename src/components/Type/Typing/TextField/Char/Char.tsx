import React from 'react';
import IChar from '../../../../../interfaces/IChar';
import IStatus from '../../../../../interfaces/IStatus';
import './Char.scss';

export default function Char(props: { char: IChar, status: IStatus }) {

  const charWait = props.char.position.row === props.status.position.row && props.char.position.cursor === props.status.position.cursor;
  const charFailed = props.status.failed.find((value) => props.char.position.row === value.row && props.char.position.cursor === value.cursor);
  const charComplete = (props.char.position.row < props.status.position.row || (props.char.position.row === props.status.position.row && props.char.position.cursor < props.status.position.cursor)) && !charFailed;

  return (
    <span
      className={
        (charWait ? 'char--wait' : '') +
        (charFailed ? 'char--failed' : '') +
        (charComplete ? 'char--complete' : '')
      }
    >{props.char.char}
    </span>);
}