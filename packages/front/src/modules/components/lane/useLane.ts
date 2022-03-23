import { useQuery } from "react-query";
import { axiosInstance } from "@utils/axiosInstance";
import { TRequests } from "@monorepo/types";
import { useEffect, useState } from "react";

export const useLane = (laneNumber: number) => {
  const axios = axiosInstance;
  const [showButtonPanel, setShowButtonPanel] = useState<number | false>(false);

  const { data, isLoading } = useQuery("LaneData", () =>
    axios.post<Extract<TRequests, { url: "api/trackData" }>["res"]>(
      "/api/trackData",
      { id: laneNumber }
    )
  );

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
