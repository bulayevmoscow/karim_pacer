import React, { FC, useEffect, useState } from 'react'
import BodyTemplate from "@modules/library/templates/bodyTemplate/BodyTemplate";
import { useSetting } from "@modules/components/settings/api/useSetting";
import { Loader } from "@modules/library/Loader";
import { ColorBox } from "@modules/components/settings/components/ColorBox";
import style from "./Settings.module.scss";
import { TSetting } from "@modules/components/settings/types";
import { InputNumber } from "@modules/components/settings/components/InputNumber";
export const Settings: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState<TSetting | undefined>(undefined);

  const {data} = useSetting({});

  useEffect(() => {
    if (data){
      setForm(JSON.parse(JSON.stringify(data))?.data);
      setIsLoading(false);
    }
  }, [data])

  if (isLoading) {
    return <Loader />;
  }

  if (!form) {
    return null;
  }

  return (
    <BodyTemplate.Container>
      <BodyTemplate.Main>
        <div className={style.color_container}>
          <div className={style.color_row}>
            <div className={style.color_row_text}>Маячок</div>
            <ColorBox color={form.color.pace} />
          </div>
          <div className={style.color_row}>
            <div className={style.color_row_text}>Ожидание</div>
            <ColorBox color={form.color.delay} />
          </div>
          <div className={style.color_row}>
            <div className={style.color_row_text}>Обрат. отс.</div>
            <ColorBox color={form.color.wait} />
          </div>
          <div className={style.color_row}>
            <div className={style.color_row_text}>Обрат. отс.</div>
            <InputNumber
              value={form.delay ?? 0}
              onChange={(e) => {
                setForm((prevState) => {
                  if (!prevState) {
                    return prevState;
                  }

                  return {
                    ...prevState,
                    delay: Number(e.target.value),
                  };
                });
              }}
            />
          </div>
        </div>
      </BodyTemplate.Main>
    </BodyTemplate.Container>
  );
};
