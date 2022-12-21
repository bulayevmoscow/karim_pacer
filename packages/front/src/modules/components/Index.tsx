import { Tracks } from "@modules/components/tracks/Tracks";
import style from "./index.module.scss";
import { Lane } from "@modules/components/lane/Lane";
import { Debug } from "@modules/components/debug/Debug";
import { Routes, Route } from "react-router-dom";
import { Footer } from "@modules/components/footer/Footer";
import { Header } from "@modules/components/header/Header";
import { observer } from "mobx-react-lite";
import { AddInterval } from "@modules/components/addInterval/AddInterval";
import { Settings } from "@modules/components/settings";

export const routerList = {
  home: "/",
  lane: "/lane",
  addInterval: "/lane/:idLane/addInterval",
  setting: "/setting",
  editInterval: "/lane/:idLane/editInterval",
  debug: "/debug",
} as const;

export const Index = observer(() => {
  return (
    <div className={style.app_container}>
      <Header />
      <Routes>
        <Route path={routerList.home} element={<Tracks />} />
        <Route path={routerList.lane + "/:idLane"} element={<Lane />} />
        <Route path={routerList.debug} element={<Debug />} />
        <Route path={routerList.setting} element={<Settings />} />
        <Route
          path={routerList.addInterval}
          element={<AddInterval isEdit={false} />}
        />
        <Route
          path={routerList.editInterval}
          element={<AddInterval isEdit={true} />}
        />
      </Routes>
      <Footer />
    </div>
  );
});
