import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { TRequests } from "@monorepo/types";
import { axiosInstance } from "@utils/axiosInstance";

const eventStart = (func: Function) => {
  return (e: MouseEvent) => {
    func();
    e.stopPropagation();
  };
};

export const useTracks = () => {
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
  const axios = axiosInstance;
  const { data, isLoading } = useQuery(
    "Tracks",
    () => axios.post<TReq>("api/shortData1").then((data) => data.data),
    {
      enabled: true,
      // refetchInterval: 1000,
      onSuccess: () => {
        console.log("success");
      },
      onError: (err) => {
        console.log(5, err);
      },
    }
  );
  useEffect(() => {
    console.log(data && data);
  }, [data]);

  return {
    data,
    isLoading,
    showButtonPanel,
    setShowButtonPanel,
    eventStart,
  };
};
