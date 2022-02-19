import { FC } from "react";
import IconConnect from "@modules/icons/unit/shutdown_green.svg";
import IconDisconnect from "@modules/icons/unit/shutdown_red.svg";
import IconSpeed from "@modules/icons/unit/speed.png";
import IconDistance from "@modules/icons/unit/distance.png";
import IconRest from "@modules/icons/unit/rest.png";
import IconRepeat from "@modules/icons/unit/repeat.png";
import IconTempo from "@modules/icons/unit/tempo.png";

import style from "./TrackUnit.module.scss";
import { TFaceSubHeader } from "@modules/library/Typeface";

export type TTrackUnit = {
  name: string;
  isDiconnected: boolean;
  speed?: number;
  distance?: number;
  rest?: number;
  repeat?: number;
  temp?: number;
  progress?: number;
  onClick?: (e: any) => void;
  isClick: boolean;
};

export const TrackUnit: FC<TTrackUnit> = ({
  distance,
  rest,
  speed,
  temp,
  repeat,
  name,
  progress,
  isDiconnected,
  onClick,
  isClick = false,
}) => {
  // eslint-disable-next-line no-warning-comments
  // TODO сделать типографию
  const disabledStatus =
    (distance ?? rest ?? speed ?? temp ?? repeat ?? false) === false;
  const shutdownStatus = isDiconnected || disabledStatus;
  const borderColor =
    (isClick && ((isDiconnected && "#FB8888") || "#92E59B")) || "transparent";
  return (
    <div
      className={style.track_container}
      onClick={onClick}
      style={{ borderColor }}
    >
      <div className={style.track_header}>
        <TFaceSubHeader>{name}</TFaceSubHeader>
        <div className={style.icons_container}>
          {isDiconnected ? (
            <img src={IconDisconnect} alt="" />
          ) : (
            <img src={IconConnect} alt="" />
          )}
        </div>
      </div>
      {shutdownStatus ? undefined : (
        <div className={`${style.track_data_container}`}>
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
            {temp}
          </div>
        </div>
      )}

      {!shutdownStatus && progress !== undefined && (
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
