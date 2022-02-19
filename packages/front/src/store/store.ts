import { makeAutoObservable, runInAction, spy } from "mobx";
import {
  TInterval,
  TLaneInfo,
  TLanesInfo,
  TModalManager,
  TNavigation,
} from "./storeTypes";
import { TRequests } from "@monorepo/types";

import axios from "axios";

/* eslint-disable new-cap */

const TIMEOUT = (time: number = 1000) =>
  // eslint-disable-next-line no-promise-executor-return
  new Promise<void>((resolve) => setTimeout(resolve, time));

class TodoStore {
  constructor(
    public page: TNavigation = { pageTag: "main", title: "Дорожки" },
    // public page: TNavigation = { pageTag: 'lane', title: 'Дорожка', idLine: 0 },
    public modalManager: TModalManager = {},
    public lanesInfo: TLanesInfo = [
      {
        id: 0,
        name: "Дорожка 13",
        status: true,
        progress: 10,
        connected: true,
        intervals: [
          {
            id: 0,
            speed: 90,
            distance: 500,
            rest: 20,
            repeat: 2,
            temp: 400,
            progress: 30,
          },
        ],
      },
      {
        status: true,
        id: 1,
        name: "Дорожка 2",
        intervals: [],
        progress: 0,
        connected: true,
      },
      {
        status: true,
        id: 2,
        name: "Дорожка 2",
        intervals: [],
        progress: 0,
        connected: true,
      },
    ],
    public laneInfo: TLaneInfo = undefined
  ) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  // Смена страницы
  goToPage = (page: TNavigation["pageTag"]) => {
    switch (page) {
      case "main":
        this.page = {
          pageTag: "main",
          title: "Дорожки",
        };
        break;

      case "setting": {
        this.page = {
          pageTag: "setting",
          title: "Настройки",
        };
        break;
      }

      default:
        break;
    }
  };

  goToLane = (
    pageNumber: Extract<TNavigation, { title: "Дорожка" }>["idLine"]
  ) => {
    runInAction(() => {
      // Изменияем страницу
      this.page = {
        pageTag: "lane",
        title: "Дорожка",
        idLine: pageNumber,
      };
      // Делаем дефолтные настройки страницы
      this.laneInfo = undefined;
    });
  };

  getTemplates = async () => {
    await TIMEOUT(200);
    await axios.get<TInterval[]>("/task_templates.json").then((data) => {
      console.log(data);
      // @ts-ignore
      this.laneInfo.intervals = data.data;
    });
  };

  toggleLaneStatus = (laneId: number, action: "OFF" | "ON") => {
    // TODO REQ
    // const lane = this.lanesInfo[laneId]
    // if (lane) {
    //   lane.status = action === 'ON'
    // }
  };
  // Данные о странице

  startInterval = (
    body: Extract<TRequests, { url: "api/trackConnect" }>["payload"]
  ) => {
    axios.post("/api/startTrack", body).then((x) => console.log(x.data));
  };

  // getIntervalsOfLane = (body: Extract<TRequests, { url: 'api/trackData' }>['payload']) => {
  //   axios.post('/api/starttrack', body).then(x => console.log(x.data))
  // }
}

const store = new TodoStore();
export default store;

if (import.meta.env.MODE === "development") {
  spy((event) => {
    if (event.type === "action") {
      // console.log(`${event.name} with args: ${JSON.stringify(event.arguments)}`)
      // console.log(JSON.parse(JSON.stringify(store)))
    }
  });
}
