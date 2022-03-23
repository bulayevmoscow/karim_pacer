import { FC } from "react";
import IconEdit from "@modules/icons/edit.svg";
import IconDelete from "@modules/icons/delete.svg";
import IconSpeed from "@modules/icons/unit/speed.png";
import IconDistance from "@modules/icons/unit/distance.png";
import IconRest from "@modules/icons/unit/rest.png";
import IconRepeat from "@modules/icons/unit/repeat.png";
import IconTempo from "@modules/icons/unit/tempo.png";

import style from "./Task.module.scss";
import { TFaceSubHeader } from "@modules/library/Typeface";

export type TTaskUnit = {
  name: string;
  speed?: number;
  distance?: number;
  rest?: number;
  repeat?: number;
  tempo?: number;
  progress?: number;
  onClick?: (e: any) => void;
  isSelect: boolean;
};

export const TaskUnit: FC<TTaskUnit> = ({
  distance,
  rest,
  speed,
  tempo,
  repeat,
  name,
  progress,
  onClick,
  isSelect,
}) => {
  const borderColor = isSelect ? "#92E59B" : "transparent";
  const noData =
    speed ?? distance ?? rest ?? repeat ?? tempo ?? progress ?? true;
  return (
    <div
      className={style.lane_container}
      onClick={onClick}
      style={{ borderColor }}
    >
      <div className={style.lane_header}>
        <TFaceSubHeader>{name}</TFaceSubHeader>
        <div className={style.icons_container}>
          <img src={IconDelete} alt="" />
          <img src={IconEdit} alt="" />
        </div>
      </div>
      {noData ? undefined : (
        <div className={`${style.lane_data_container}`}>
          <div className={style.unit}>
            <img src={IconSpeed} alt="" />
            {speed}
          </div>

          <div className={style.unit}>
            <img src={IconDistance} alt="" />
            {distance}
          </div>

          <div className={style.unit}>
            <img src={IconRest} alt="" />
            {rest}
          </div>

          <div className={style.unit}>
            <img src={IconRepeat} alt="" />
            {repeat}
          </div>

          <div className={style.unit}>
            <img src={IconTempo} alt="" />
            {tempo}
          </div>
        </div>
      )}

      {!noData && progress !== undefined && (
        <div
          className={style.track_progressbar}
          style={{
            backgroundSize: `${progress}%, 0px, 0%`,
          }}
        />
      )}
    </div>
  );
};
