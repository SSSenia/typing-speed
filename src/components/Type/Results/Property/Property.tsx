import React from 'react';
import './Property.scss';

export default function Property(props:
  {
    name: string,
    value: string | number,
    hoverText: string,
    setHovered: (value: React.SetStateAction<string>) => void
  }) {
  return (
    <div className="property"
      onMouseEnter={() => props.setHovered(props.hoverText)}
      onMouseLeave={() => props.setHovered('')}
    >
      <div className="property__name">{props.name}</div>
      <div className="property__value">{props.value}</div>
    </div>
  );
}