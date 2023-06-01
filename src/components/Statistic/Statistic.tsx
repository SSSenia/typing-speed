import React from "react";
import './Statistic.scss';

export function Statistic() {

  const loadDate = localStorage.getItem('history');

  return (
    <main>
      {loadDate}
    </main>
  );
}