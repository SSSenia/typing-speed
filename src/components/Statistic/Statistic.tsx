import React, { useState } from "react";
import './Statistic.scss';
import IRun from "../../interfaces/IRun";
import Run from "./Run/Run";
import HoverInfo from "../../UI/HoverInfo/HoverInfo";
import Delete from "../../assets/img/Delete";
import Export from "../../assets/img/Export";
import Import from "../../assets/img/Import";

export function Statistic() {

  const [hovered, setHovered] = useState('');

  const history = localStorage.getItem('history');

  let parsedHistory: IRun[] = [];

  if (history) parsedHistory = JSON.parse(history);

  const DEFAULT_SELECTED: number[] = [];

  const [selected, setSelected] = useState(DEFAULT_SELECTED);

  const [sortProperty, setSortProperty] = useState('id');
  const [sortOrder, setSortOrder] = useState(false);

  switch (sortOrder) {
    case true:
      switch (sortProperty) {
        case 'id':
          parsedHistory.sort((a, b) => b.id - a.id);
          break;
        case 'date':
          parsedHistory.sort((a, b) => +new Date(b.date) - +new Date(a.date));
          break;
        case 'type':
          parsedHistory.sort((a, b) => b.type > a.type ? 1 : -1);
          break;
        case 'language':
          parsedHistory.sort((a, b) => b.language > a.language ? 1 : -1);
          break;
        case 'symbols':
          parsedHistory.sort((a, b) => b.symbols - a.symbols);
          break;
        case 'words':
          parsedHistory.sort((a, b) => b.words - a.words);
          break;
        case 'mistakes':
          parsedHistory.sort((a, b) => b.mistakes - a.mistakes);
          break;
        case 'time':
          parsedHistory.sort((a, b) => b.time - a.time);
          break;
      }
      break;
    case false:
      switch (sortProperty) {
        case 'id':
          parsedHistory.sort((a, b) => a.id - b.id);
          break;
        case 'date':
          parsedHistory.sort((a, b) => +new Date(a.date) - +new Date(b.date));
          break;
        case 'type':
          parsedHistory.sort((a, b) => a.type > b.type ? 1 : -1);
          break;
        case 'language':
          parsedHistory.sort((a, b) => a.language > b.language ? 1 : -1);
          break;
        case 'symbols':
          parsedHistory.sort((a, b) => a.symbols - b.symbols);
          break;
        case 'words':
          parsedHistory.sort((a, b) => a.words - b.words);
          break;
        case 'mistakes':
          parsedHistory.sort((a, b) => a.mistakes - b.mistakes);
          break;
        case 'time':
          parsedHistory.sort((a, b) => a.time - b.time);
          break;
      }
      break;
  }


  function changeSorting(property: string) {
    return () => {
      if (sortProperty === property) setSortOrder(!sortOrder)
      else setSortProperty(property)
    }
  }

  function classesPropertyName(name: string) {
    return 'runs__property-name' + (sortProperty === name ? (' runs__property-name--' + (sortOrder ? 'ascending' : 'descending')) : '');
  }

  function deleteSelected() {
    const selectedItems = parsedHistory
      .filter((item) => selected.find(x => x !== item.id))
      .map((item, index) => ({
        ...item,
        id: index + 1
      }));

    localStorage.setItem('history', JSON.stringify(selectedItems));

    setSelected([]);
  }

  function exportSelected() {
    const selectedItems = parsedHistory
      .filter((item) => selected.find(x => x !== item.id))
      .map((item, index) => ({
        ...item,
        id: index + 1
      }));

    navigator.clipboard.writeText(JSON.stringify(selectedItems))
  }

  async function importItems() {
    const importItems = JSON.parse(await navigator.clipboard.readText());

    parsedHistory = parsedHistory
      .concat(importItems)
      .map((item, index) => ({ ...item, id: index + 1 }));


    localStorage.setItem('history', JSON.stringify(parsedHistory));
    setSelected([]);
  }

  return (
    <main className='statistic'>
      <div className='table'>

        <section className="selection">
          <div className={'selection__selector selection__selector--head' + (selected.length === parsedHistory.length ? ' selection__selector--active' : '')} onClick={() => {
            if (selected.length !== parsedHistory.length) setSelected(parsedHistory.map((item) => item.id));
            else setSelected([]);
          }}
            onMouseEnter={() => setHovered('statistic.actions.select-all')}
            onMouseLeave={() => setHovered('')}
          >
          </div>

          {parsedHistory.map((items) =>
            <div className={'selection__selector' + (selected.find((value) => value === items.id) ? ' selection__selector--active' : '')} onClick={() => {
              if (selected.find((value) => value === items.id)) setSelected(selected.filter((value) => value !== items.id));
              else setSelected(selected.concat([items.id]));
            }}>
            </div>

          )}
        </section>
        <section className='runs'>
          <div className="runs__property-header">
            {['ID', 'Date', 'Type', 'Language', 'Symbols', 'Words', 'Mistakes', 'Time']
              .map((name) =>
                <button
                  className={classesPropertyName(name.toLowerCase())}
                  onClick={changeSorting(name.toLowerCase())}
                  onMouseEnter={() => setHovered(`statistic.head.${name.toLowerCase()}`)}
                  onMouseLeave={() => setHovered('')}
                >{name}</button>
              )}
          </div>
          {parsedHistory.map((run) =>
            <Run run={run} key={run.id}></Run>
          )}
        </section>
      </div>
      <section className="actions">
        <button
          className="actions__button"
          onClick={deleteSelected}
          onMouseEnter={() => setHovered('statistic.actions.delete')}
          onMouseLeave={() => setHovered('')}
        >
          <span className="actions__inscription">Delete</span>
          <Delete />
        </button>
        <button
          className="actions__button"
          onClick={exportSelected}
          onMouseEnter={() => setHovered('statistic.actions.export')}
          onMouseLeave={() => setHovered('')}
          >
            <span className="actions__inscription">Export</span>
            <Export />
          </button>
        <button
          className="actions__button"
          onClick={importItems}
          onMouseEnter={() => setHovered('statistic.actions.import')}
          onMouseLeave={() => setHovered('')}
          >
            <span className="actions__inscription">Import</span>
            <Import />
          </button>

      </section>
      {hovered && <HoverInfo text={hovered}></HoverInfo>}
    </main>
  );
}