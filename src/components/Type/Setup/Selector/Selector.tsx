import React from "react";
import './Selector.scss';
import { UseFormRegister } from "react-hook-form";
import { ITypeRun } from "../../../../interfaces/ITypeRun";

export default function Selector(props: {name: 'language' | 'type' | 'size' | 'time', values: string[], register: UseFormRegister<ITypeRun>}) {

  function radioButtons(name: 'language' | 'type' | 'size' | 'time') {
    return (value: string) =>
      <div className="selector__radio" key={value}>
        <input
          className="selector__radio-input"
          type="radio"
          id={value}
          value={value}
          {...props.register(name)}
        />
        <label className="selector__radio-label" htmlFor={value}>{value}</label>
      </div>;
  }

  return (
    <div className="selector">
      <h2 className="selector__title">
        {props.name}
      </h2>
      <div className="selector__group">
        {props.values.map(radioButtons(props.name))}
      </div>
    </div>
  )
}