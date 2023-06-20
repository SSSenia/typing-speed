import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createSearchParams, useNavigate } from "react-router-dom";

import './Setup.scss';
import Selector from "./Selector/Selector";
import ITypeRun from "../../../interfaces/ITypeRun";
import { Language } from "../../../assets/enums/Language.enum";
import { Type } from "../../../assets/enums/Type.enum";
import { Size } from "../../../assets/enums/Size.enum";
import { Time } from "../../../assets/enums/Time.enum";

export function Setup() {

  const VALUES = {
    language: [Language.EN, Language.RU, Language.UA],
    type: [Type.TextEnd, Type.TimeEnd],
    size: [Size.Small, Size.Medium, Size.Long],
    time: [Time.s30, Time.s60, Time.s90, Time.s120]
  };

  const DEFAULT_VALUES: ITypeRun = {
    language: Language.EN,
    type: Type.TextEnd,
    size: Size.Small,
    time: Time.s30
  };

  const { register, handleSubmit, getValues } = useForm({ defaultValues: DEFAULT_VALUES });

  const [type, setType] = useState(getValues().type);

  const navigate = useNavigate();

  const onSubmit = (data: ITypeRun) => {
    switch (data.type) {
      case Type.TextEnd:
        if (data.language && data.size)
          navigate({
            pathname: '/type/typing',
            search: createSearchParams({
              language: data.language,
              type: data.type,
              size: data.size,
              time: Time.Infinity
            }).toString()
          });
        break;
      case Type.TimeEnd:
        if (data.language && data.time)
          navigate({
            pathname: '/type/typing',
            search: createSearchParams({
              language: data.language,
              type: data.type,
              size: Size.Infinity,
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

          {type === Type.TextEnd &&
            <Selector name="size" values={VALUES.size} register={register}></Selector>
          }

          {type === Type.TimeEnd &&
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