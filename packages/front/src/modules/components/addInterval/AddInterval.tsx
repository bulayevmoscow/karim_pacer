import BodyTemplate from "@modules/library/templates/bodyTemplate/BodyTemplate";
import { ChangeEvent, FC, useState } from "react";
import speedIcon from "@modules/icons/unit/speed.png";
import distanceIcon from "@modules/icons/unit/distance.png";
import restIcon from "@modules/icons/unit/rest.png";
import repeatIcon from "@modules/icons/unit/repeat.png";
import tempoIcon from "@modules/icons/unit/tempo.png";
import style from "./AddInterval.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Button } from "@modules/library/Button";
import { TRequests } from "@monorepo/types";
import axios from "axios";

type TIntervalTemplate = {
  icon: string;
  title: string;
};

type TConfig = {
  speed: string;
  distance: string;
  rest: string;
  repeat: string;
  tempo: string;
};

type TBodyRequest = Extract<TRequests, { url: "/api/addInterval" }>["payload"];

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
  const [config, setConfig] = useState<TConfig>({
    speed: "2",
    distance: "3",
    rest: "4",
    repeat: "5",
    tempo: "6",
  });

  const { idLane } = useParams();
  const navigate = useNavigate();
  const { refetch: addInterval } = useQuery(
    "addInterval",
    () => {
      const params: TBodyRequest = {
        // eslint-disable-next-line camelcase
        track_id: Number(idLane),
        interval: {
          id: 0,
          progress: 0,
          speed: Number(config.speed),
          distance: Number(config.distance),
          rest: Number(config.rest),
          repeat: Number(config.repeat),
          temp: Number(config.tempo),
        },
      };
      return axios.post("/api/addInterval", params);
    },
    {
      enabled: false,
      onSuccess: () => navigate(-1),
      // eslint-disable-next-line no-alert
      onError: (err) => alert(err),
      retry: false,
    }
  );

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
            config.distance === "" ||
            config.tempo === "" ||
            config.repeat === "" ||
            config.rest === "" ||
            config.speed === ""
          }
          onClick={() => {
            addInterval();
          }}
        >
          Сохранить
        </Button>
        <Button color={"red"} onClick={() => navigate(-1)}>
          Назад
        </Button>
      </BodyTemplate.Buttons>
    </>
  );
};
