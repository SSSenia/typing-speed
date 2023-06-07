import React from 'react';
import './Run.scss';
import IRun from '../../../interfaces/IRun';
import { Link } from 'react-router-dom';

export default function Run(props: { run: IRun }) {
  return (
    <Link to={''}>
      <article className='run'>
        <div className="run__property">
          {props.run.id}
        </div>
        <div className="run__property">
          {new Date(props.run.date).toLocaleString()}
        </div>
        <div className="run__property">
          {props.run.type}
        </div>
        <div className="run__property">
          {props.run.language}
        </div>
        <div className="run__property">
          {props.run.symbols}
        </div>
        <div className="run__property">
          {props.run.words}
        </div>
        <div className="run__property">
          {props.run.mistakes}
        </div>
        <div className="run__property">
          {Math.floor(props.run.time / 1000)} seconds
        </div>
      </article>
    </Link>
  );
}