import React, { useEffect, useState } from "react";

import './Keyboard.scss';
import Key from "./Key/Key";

export default function Keyboard(props: { keyboard: string[][] }) {

  return (
    <section className="keyboard">
      {props.keyboard.map((value, index) => {
        return <div className="keyboard__row">
          {value.map((value => <Key value={value} />))}
        </div>
      })}
    </section>
  );
}