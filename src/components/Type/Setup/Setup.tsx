import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createSearchParams, useNavigate } from "react-router-dom";

import './Setup.scss';
import Selector from "./Selector/Selector";
import { ITypeRun } from "../../../interfaces/ITypeRun";

export function Setup() {

  const VALUES = {
    language: ['en', 'ru', 'ua'],
    type: ['text-end', 'time-end'],
    size: ['small', 'medium', 'long'],
    time: ['30s', '60s', '90s', '120s']
  };

  const DEFAULT_VALUES: ITypeRun = {
    language: 'en',
    type: 'text-end',
    size: 'small',
    time: '30s'
  };

  const { register, handleSubmit, getValues } = useForm({ defaultValues: DEFAULT_VALUES });

  const [type, setType] = useState(getValues().type);

  const navigate = useNavigate();

  const onSubmit = (data: ITypeRun) => {
    switch (data.type) {
      case 'text-end':
        if (data.language && data.size)
          navigate({
            pathname: '/type/typing',
            search: createSearchParams({
              language: data.language,
              type: data.type,
              size: data.size
            }).toString()
          });
        break;
      case 'time-end':
        if (data.language && data.time)
          navigate({
            pathname: '/type/typing',
            search: createSearchParams({
              language: data.language,
              type: data.type,
              time: data.time
            }).toString()
          });
        break;
    }
  };

  return (
    <main className="setup">
      <section className="menu">
        <form className="form" onSubmit={handleSubmit(onSubmit)} onChange={() => setType(() => getValues().type)}>

          <Selector name="language" values={VALUES.language} register={register}></Selector>
          <Selector name="type" values={VALUES.type} register={register}></Selector>

          {type === 'text-end' &&
            <Selector name="size" values={VALUES.size} register={register}></Selector>
          }

          {type === 'time-end' &&
            <Selector name="time" values={VALUES.time} register={register}></Selector>
          }

          <button className="form__submit" type="submit">
            Start!
          </button>
        </form>
      </section>
    </main>
  );
}