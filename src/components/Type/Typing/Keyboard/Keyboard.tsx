import React, { useEffect, useState } from "react";

import './Keyboard.scss';
import Key from "./Key/Key";

export default function Keyboard(props: { keyboard: string[][] }) {

  const pressDefault: string[] = [];

  const [press, setPress] = useState(pressDefault);

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      setPress([...press, event.key]);
    };
    const handleKeyUp = (event: any) => {
      setPress(press.filter((value)=>value !== event.key));
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  });

  return (
    <section className="keyboard">
      {props.keyboard.map((value, i) => 
        <div className="keyboard__row" key={i}>
          {value.map(((value, j) => <Key value={value} press={press} key={`${i}.${j}`}/>))}
        </div>
      )}
    </section>
  );
}