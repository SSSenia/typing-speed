import React, { useEffect, useState } from 'react';
import './HoverInfo.scss';
import { HOVER_INFO_DATA } from '../../assets/HOVER_INFO_DATA';

export default function HoverInfo(props: { text: string }) {

  const [position, setPosition] = useState({
    show: false,
    x: 0, y: 0
  });

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      setPosition({
        show: true,
        x: document.querySelector('html')!.offsetWidth > event.clientX + 200
          ? event.clientX
          : document.querySelector('html')!.offsetWidth - 200,
        y: event.clientY
      });
    };

    document.addEventListener('mousemove', onMouseMove);
    return () => document.removeEventListener('mousemove', onMouseMove);
  });

  return (
    <>
      {position.show &&
        <div className='hover-info' style={{ top: position.y + 20, left: position.x + 20 }}>
          {HOVER_INFO_DATA.get(props.text)}
        </div>}
    </>);
}