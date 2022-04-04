import { useQuery } from "react-query";
import { axiosInstance } from "@utils/axiosInstance";
import { TRequests } from "@monorepo/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import store from "@store";

const axios = axiosInstance;

export const useLane = (laneNumber: number) => {
  const [showButtonPanel, setShowButtonPanel] = useState<number | false>(false);
  const { id: idLane } = useParams();
  console.log(idLane);
  const { data, isLoading } = useQuery("LaneData", () =>
    axios.post<Extract<TRequests, { url: "api/trackData" }>["res"]>(
      "/api/trackData",
      { id: laneNumber }
    )
  );

  useEffect(() => {
    store.laneID = Number(idLane);
  }, [idLane]);

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

  const choiceLane = (e: Event, laneNumber: number) => {
    setShowButtonPanel(laneNumber);
  };

  console.log(data?.data);

  return {
    data,
    isLoading,
    choiceLane,
    showButtonPanel,
  };
};
