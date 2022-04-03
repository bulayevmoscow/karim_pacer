import style from "./Header.module.scss";
import { Routes, Route } from "react-router-dom";
import { routerList } from "@modules/components/Index";
import { TFaceHeader } from "@modules/library/Typeface";
import iconAdd from "@modules/icons/h_plus.svg";
import { matchPath } from "react-router";

export const Header = () => {
  const matchLaneId = matchPath({ path: "/lane/:id" }, location.pathname)
    ?.params.id;
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
          element={<TFaceHeader>{"Линия " + matchLaneId}</TFaceHeader>}
        />
      </Routes>
      <img src={iconAdd} alt="" />
    </div>
  );
};
