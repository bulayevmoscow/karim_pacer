import { observer } from "mobx-react-lite";
import style from "./Header.module.scss";
import { Routes, Route } from "react-router-dom";
import { routerList } from "@modules/components/Index";
import { TFaceHeader } from "@modules/library/Typeface";
import iconAdd from "@modules/icons/h_plus.svg";

export const Header = observer(() => {
  // const event =
  // (page?.pageTag === "lane" && getTemplates) || (() => console.log("empty"));
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
          path={routerList.lane}
          element={<TFaceHeader>{"Lane"}</TFaceHeader>}
        />
      </Routes>
      <img src={iconAdd} alt="" />
    </div>
  );
});
