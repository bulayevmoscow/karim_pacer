import { useEffect, useState } from "react";
import store from "@store";
import { useQuery } from "react-query";
import axios from "axios";
import { TRequests } from "@monorepo/types";

const eventStart = (func: Function) => {
  return (e: MouseEvent) => {
    func();
    e.stopPropagation();
  };
};

export const useTracks = () => {
  const { lanesInfo, goToLane, startInterval } = store;
  const [showButtonPanel, setShowButtonPanel] = useState<number | false>(false);
  useEffect(() => {
    const event = () => {
      if (showButtonPanel !== false) {
        setShowButtonPanel(false);
      }
    };

    if (document.body) {
      document.body.addEventListener("click", event);
    }

    return () => {
      document.body.removeEventListener("click", event);
    };
  }, [showButtonPanel]);

  type TReq = Extract<TRequests, { url: "api/shortData" }>["res"];
  const { data } = useQuery(
    "Tracks",
    () => axios.post<TReq>("api/shortData").then((data) => data.data),
    {
      enabled: false,
      refetchInterval: 10000,
      onSuccess: () => {
        console.log("success");
      },
    }
  );
  useEffect(() => {
    console.log(data && data);
  }, [data]);

  return {
    lanesInfo,
    showButtonPanel,
    setShowButtonPanel,
    eventStart,
    goToLane,
    startInterval,
  };
};
