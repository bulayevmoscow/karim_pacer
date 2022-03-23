import { makeAutoObservable, runInAction, spy } from "mobx";
import { TInterval, TModalManager, TNavigation } from "./storeTypes";
import { TRequests } from "@monorepo/types";

import axios, { AxiosError } from "axios";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";

/* eslint-disable new-cap */

type TErrorModal = {
  title: string;
  description?: string;
  url?: string;
  onClick?: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, AxiosError<any, any>>>;
}[];

const TIMEOUT = (time: number = 1000) =>
  // eslint-disable-next-line no-promise-executor-return
  new Promise<void>((resolve) => setTimeout(resolve, time));

class TodoStore {
  constructor(
    // public page: TNavigation = { pageTag: "main", title: "Дорожки" },
    public page: TNavigation = { pageTag: "lane", title: "Дорожка", idLine: 0 },
    public modalManager: TModalManager = {}
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

  startInterval = (
    body: Extract<TRequests, { url: "api/trackConnect" }>["payload"]
  ) => {
    axios.post("/api/startTrack", body).then((x) => console.log(x.data));
  };
}

const store = new TodoStore();
export default store;

if (import.meta.env.MODE === "development") {
  spy((event) => {
    if (event.type === "action") {
      console.log(
        `${event.name} with args: ${JSON.stringify(event.arguments)}`
      );
      console.log(JSON.parse(JSON.stringify(store)));
    }
  });
}
