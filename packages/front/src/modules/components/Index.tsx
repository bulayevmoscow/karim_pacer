import { observer } from "mobx-react-lite";
import { Tracks } from "@modules/components/tracks/Tracks";
import style from "./index.module.scss";
import { Lane } from "@modules/components/lane/Lane";
import { Settings } from "@modules/components/settings/Settings";
import { Routes, Route } from "react-router-dom";
import { Footer } from "@modules/components/footer/Footer";
import { Header } from "@modules/components/header/Header";

export const routerList = {
  home: "/",
  lane: "/lane",
  setting: "/setting",
} as const;

export const Index = observer(() => {
  return (
    <div className={style.app_container}>
      <Header />
      <Routes>
        <Route path={routerList.home} element={<Tracks />} />
        <Route path={routerList.lane + "/:id"} element={<Lane />} />
        <Route path={routerList.setting} element={<Settings />} />
      </Routes>
      <Footer />
    </div>
  );
});
