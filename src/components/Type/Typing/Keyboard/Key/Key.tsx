import React from 'react';

export default function Key(props: { value: string, press: string[] }) {

  const isSpace = props.value === 'Space';
  const isPressed = props.press.find((value)=> value === props.value || (value === ' ' && props.value === 'Space'));

  return (
    <div
      className={
        "keyboard__key" +
        (isSpace ? " keyboard__key--space" : "") +
        (isPressed ? " keyboard__key--active" : "")
      }
      key={props.value}
    >
      {props.value}
    </div>
  );

}