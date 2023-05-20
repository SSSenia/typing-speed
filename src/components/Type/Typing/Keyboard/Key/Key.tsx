import React, { useEffect, useState } from 'react';

export default function Key(props: { value: string }) {

  const [press, setPress] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === props.value || (props.value === 'Space' && event.key === ' ')) setPress(true);
    };
    const handleKeyUp = (event: any) => {
      if (event.key === props.value || (props.value === 'Space' && event.key === ' ')) setPress(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [props.value]);

  return (
    <div
      className={
        "keyboard__key" +
        (props.value == "Space" ? " keyboard__key--space" : "") +
        (press ? " keyboard__key--active" : "")
      }
      key={props.value}
    >
      {props.value}
    </div>
  );

}