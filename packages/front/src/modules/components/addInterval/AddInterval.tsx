import BodyTemplate from "@modules/library/templates/bodyTemplate/BodyTemplate";
import { ChangeEvent, FC, useState } from "react";
import speedIcon from "@modules/icons/unit/speed.png";
import distanceIcon from "@modules/icons/unit/distance.png";
import restIcon from "@modules/icons/unit/rest.png";
import repeatIcon from "@modules/icons/unit/repeat.png";
import tempoIcon from "@modules/icons/unit/tempo.png";
import style from "./AddInterval.module.scss";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { Button } from "@modules/library/Button";
type TIntervalTemplate = {
  icon: string;
  title: string;
};
const IntervalTemplate: FC<TIntervalTemplate> = ({ icon, title, children }) => {
  return (
    <div className={style.add_interval_template__container}>
      <div className={style.add_interval_template__title}>
        <img src={icon} alt="" />
        <div>{title}</div>
      </div>
      <div className={style.add_interval_template__input}>{children}</div>
    </div>
  );
};

export const AddInterval: FC = () => {
  const { idLane } = useParams();
  const { data } = useQuery("addInterval", () => axios.post("/"), {
    enabled: false,
  });

  type TConfig = {
    speed: number | undefined;
    distance: number | undefined;
    rest: number | undefined;
    repeat: number | undefined;
    tempo: number | undefined;
  };

  const [config, setConfig] = useState<TConfig>({
    speed: undefined,
    distance: undefined,
    rest: undefined,
    repeat: undefined,
    tempo: undefined,
  });

  const changeEvent = (
    event: ChangeEvent<HTMLInputElement>,
    key: keyof TConfig
  ) => {
    setConfig((prevState) => ({
      ...prevState,
      [key]: event.target.value === "" ? undefined : Number(event.target.value),
    }));
  };

  return (
    <>
      <BodyTemplate.Container>
        <BodyTemplate.Main>
          <div className={style.add_interval_template__wrapper}>
            <IntervalTemplate icon={speedIcon} title="100м за время (в сек)">
              <input
                type="text"
                onChange={(e) => changeEvent(e, "speed")}
                value={config.speed}
              />
            </IntervalTemplate>
            <IntervalTemplate icon={distanceIcon} title="Дистанция (в метрах)">
              <input
                type="text"
                onChange={(e) => changeEvent(e, "distance")}
                value={config.distance}
              />
            </IntervalTemplate>
            <IntervalTemplate icon={restIcon} title="Отдых (в сек)">
              <input
                type="text"
                onChange={(e) => changeEvent(e, "rest")}
                value={config.rest}
              />
            </IntervalTemplate>
            <IntervalTemplate icon={repeatIcon} title="Кол-во поворотов">
              <input
                type="text"
                onChange={(e) => changeEvent(e, "repeat")}
                value={config.repeat}
              />
            </IntervalTemplate>
            <IntervalTemplate icon={tempoIcon} title="Темп (в м.сек)">
              <input
                type="text"
                onChange={(e) => changeEvent(e, "tempo")}
                value={config.tempo}
              />
            </IntervalTemplate>
          </div>
        </BodyTemplate.Main>
      </BodyTemplate.Container>
      <BodyTemplate.Buttons show={true}>
        <Button
          color={"blue"}
          disabled={
            config.distance === undefined ||
            config.tempo === undefined ||
            config.repeat === undefined ||
            config.rest === undefined ||
            config.speed === undefined
          }
        >
          Сохранить
        </Button>
        <Button color={"red"}>Назад</Button>
      </BodyTemplate.Buttons>
    </>
  );
};
