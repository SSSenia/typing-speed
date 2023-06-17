import React, { useEffect, useState } from 'react';
import './Progress.scss';
import IStatus from '../../../../interfaces/IStatus';
import IParamsRun from '../../../../interfaces/IParamsRun';
import IRun from '../../../../interfaces/IRun';
import { useNavigate, useSearchParams } from 'react-router-dom';

function save(paramsRun: IParamsRun, status: IStatus, searchParams: URLSearchParams, setSearchParams: any): number {

  if (searchParams.get('saved') === 'true') return 0;

  const historyString = localStorage.getItem('history');

  let historyArray: IRun[] = [];

  if (historyString) historyArray = JSON.parse(historyString);

  const writedText = status.rows.map((row) => row.map((char) => char.char).join('')).join('').slice(0, status.count);

  historyArray.push({
    id: historyArray.length + 1,
    date: new Date,
    type: paramsRun.type,
    language: paramsRun.language,
    symbols: status.count,
    words: writedText.split(' ').length,
    mistakes: status.failed.length,
    time: +new Date() - status.timeStart,
  });

  localStorage.setItem('history', JSON.stringify(historyArray));

  searchParams.set('saved', 'true');
  setSearchParams(searchParams);

  return historyArray.length;
}

export default function Progress(props: { paramsRun: IParamsRun, status: IStatus }) {

  const now: number = +new Date();

  const [searchParams, setSearchParams] = useSearchParams();
  const [time, setTime] = useState(now);
  const navigate = useNavigate();

  const speed: number = Math.round(props.status.count / ((now - props.status.timeStart) / 60 / 1000));

  let accuracy: number = 100 - Math.round(props.status.failed.length / props.status.count * 100);

  if (isNaN(accuracy)) accuracy = 0;

  let remaining: string = '';

  if (props.paramsRun.type === 'time-end') remaining = Math.ceil((props.paramsRun.time * 1000 + props.status.timeStart - now) / 1000) + ' sec';
  if (props.paramsRun.type === 'text-end') remaining = (props.paramsRun.size - props.status.count) + ' symbols';

  function done() {
    if (!Number.parseInt(remaining) || Number.parseInt(remaining) < 0) {
      const id = save(props.paramsRun, props.status, searchParams, setSearchParams);
      navigate('/type/results/' + id);
    };
  }

  useEffect(() => {
    done();
    const interval = setInterval(() => {
      done();
      setTime(+new Date);
    }, 500);
    return () => clearInterval(interval);
  });

  return (
    <section className='progress'>

      <div className="indicator">
        <h3 className="indicator__name">Speed</h3>
        <div className="indicator__value">{speed} SPM</div>
      </div>

      <div className="indicator">
        <h3 className="indicator__name">Accuracy</h3>
        <div className="indicator__value">{accuracy}%</div>
      </div>

      <div className="indicator">
        <h3 className="indicator__name">Remaining</h3>
        <div className="indicator__value">{remaining}</div>
      </div>

    </section>
  );
}