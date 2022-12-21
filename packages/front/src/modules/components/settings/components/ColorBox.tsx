import style from "./ColorBox.module.scss";
import { FC } from "react";

export const ColorBox: FC<{ color: string }> = ({ color }) => {
  return <div style={{ background: color }} className={style.container}></div>;
};
