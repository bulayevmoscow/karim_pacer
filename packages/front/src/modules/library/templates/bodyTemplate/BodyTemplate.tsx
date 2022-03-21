import style from "./BodyTemplate.module.scss";
import React, { FC } from "react";

type TBodyButtonTemplate = {
  show: boolean;
};

const BodyButtonTemplate: FC<TBodyButtonTemplate> = ({ children, show }) => {
  return show ? (
    <div className={style.tracks_buttons_container}>
      <div className={style.body_template_buttons_container}>{children}</div>
    </div>
  ) : null;
};

const BodyMainTemplate: FC = ({ children }) => {
  return (
    <div className={style.body_template_container}>
      <div>{children}</div>
    </div>
  );
};

const BodyTemplate: FC = ({ children }) => {
  return <div className={style.body_template}>{children}</div>;
};

export default {
  Container: BodyTemplate,
  Main: BodyMainTemplate,
  Buttons: BodyButtonTemplate,
};
