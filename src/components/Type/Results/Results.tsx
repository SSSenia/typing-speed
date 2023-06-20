import React, { useState } from "react";
import './Results.scss';
import { Navigate, useParams } from "react-router-dom";
import IRun from "../../../interfaces/IRun";
import HoverInfo from "../../../UI/HoverInfo/HoverInfo";
import Property from "./Property/Property";

export function Results() {

  const [hovered, setHovered] = useState('');

  const { id } = useParams();

  const history: IRun[] = JSON.parse(localStorage.getItem('history')!);

  if (!id) return <Navigate to='/statistic'></Navigate>;

  const selectedItem: IRun | undefined = history.find((item) => item.id === +id);

  if (!selectedItem) return <Navigate to='/statistic'></Navigate>;

  const seconds = selectedItem.time / 1000;
  const minutes = seconds / 60;

  const wordsPerMinute = Math.round(selectedItem.words / minutes * 100) / 100;
  const wordsPerSecond = Math.round(selectedItem.words / seconds * 100) / 100;
  const symbolsPerMinute = Math.round(selectedItem.symbols / minutes * 100) / 100;
  const symbolsPerSecond = Math.round(selectedItem.symbols / seconds * 100) / 100;

  const mistakesPrecent = Math.round(selectedItem.mistakes / selectedItem.symbols * 100 * 100) / 100;

  return (
    <main className="results">

      <section className="properties">
        <h2 className="properties__title">Unique information</h2>
        <div className="properties__division">

          <Property
            name={'ID'} value={selectedItem.id}
            hoverText={'results.id'} setHovered={setHovered}
          />
          <Property
            name={'Date, Time'} value={new Date(selectedItem.date).toLocaleString()}
            hoverText={'results.date'} setHovered={setHovered}
          />

        </div>

        <h2 className="properties__title">Run setup information</h2>
        <div className="properties__division">

          <Property
            name={'Type'} value={selectedItem.type.toUpperCase()}
            hoverText={'results.type'} setHovered={setHovered}
          />
          <Property
            name={'Language'} value={selectedItem.language.toUpperCase()}
            hoverText={'results.language'} setHovered={setHovered}
          />

        </div>

        <h2 className="properties__title">Quantitative information</h2>
        <div className="properties__division">

          <Property
            name={'Symbols'} value={selectedItem.symbols}
            hoverText={'results.symbols'} setHovered={setHovered}
          />
          <Property
            name={'Words'} value={selectedItem.words}
            hoverText={'results.words'} setHovered={setHovered}
          />
          <Property
            name={'Mistakes'} value={selectedItem.mistakes}
            hoverText={'results.mistakes'} setHovered={setHovered}
          />
          <Property
            name={'Mistakes%'} value={mistakesPrecent}
            hoverText={'results.mistakes%'} setHovered={setHovered}
          />

        </div>

        <h2 className="properties__title">Time information</h2>
        <div className="properties__division">

          <Property
            name={'Time Min'} value={Math.round(minutes * 100) / 100}
            hoverText={'results.time.minute'} setHovered={setHovered}
          />
          <Property
            name={'Time Sec'} value={Math.round(seconds * 100) / 100}
            hoverText={'results.time.second'} setHovered={setHovered}
          />
          <Property
            name={'Time MillSec'} value={selectedItem.time}
            hoverText={'results.time.millisecond'} setHovered={setHovered}
          />

        </div>


        <h2 className="properties__title">Calculated information</h2>
        <div className="properties__division">

          <Property
            name={'WPM'} value={wordsPerMinute}
            hoverText={'results.wordsPerMinute'} setHovered={setHovered}
          />
          <Property
            name={'WPS'} value={wordsPerSecond}
            hoverText={'results.wordsPerSecond'} setHovered={setHovered}
          />
          <Property
            name={'SPM'} value={symbolsPerMinute}
            hoverText={'results.symbolsPerMinute'} setHovered={setHovered}
          />
          <Property
            name={'SPS'} value={symbolsPerSecond}
            hoverText={'results.symbolsPerSecond'} setHovered={setHovered}
          />

        </div>
      </section>

      {hovered && <HoverInfo text={hovered}></HoverInfo>}
    </main>
  );
}