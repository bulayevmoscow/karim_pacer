import React, { FC } from "react";
import IconHome from "@modules/icons/f_home.svg";
import IconSetting from "@modules/icons/f_setting.svg";
import style from "./Footer.module.scss";
import IconDebug from "@modules/icons/debug_icon.svg";

type TBodyPath = {};
import { routerList } from "@modules/components/Index";
import { useNavigate } from "react-router-dom";

export const Footer: FC<TBodyPath> = () => {
  const navigate = useNavigate();
  return (
    <div className={style.footer}>
      <img
        src={IconHome}
        onClick={() => {
          navigate(routerList.home);
        }}
        alt=""
      />

      <div className={style.rightIcons}>
        <img
          src={IconDebug}
          onClick={() => {
            navigate(routerList.debug);
          }}
          alt=""
        />
        <img
          src={IconSetting}
          onClick={() => {
            navigate(routerList.setting);
          }}
          alt=""
        />
      </div>
    </div>
  );
};
