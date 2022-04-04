import style from "./Header.module.scss";
import { Routes, Route } from "react-router-dom";
import { routerList } from "@modules/components/Index";
import { TFaceHeader } from "@modules/library/Typeface";
import iconAdd from "@modules/icons/h_plus.svg";
import { observer } from "mobx-react-lite";
import store from "@store";

export const Header = observer(() => {
  const { laneID } = store;
  return (
    <div className={style.header_container}>
      <Routes>
        <Route
          path={routerList.home}
          element={<TFaceHeader>{"Home"}</TFaceHeader>}
        />
        <Route
          path={routerList.setting}
          element={<TFaceHeader>{"Setting"}</TFaceHeader>}
        />
        <Route
          path={routerList.lane + "/:id"}
          element={<TFaceHeader>{"Линия " + laneID}</TFaceHeader>}
        />
        <Route
          path={routerList.addInterval}
          element={<TFaceHeader>{"Добавить интервал " + laneID}</TFaceHeader>}
        />
      </Routes>
      <img src={iconAdd} alt="" />
    </div>
  );
});
