import { useEffect, useState } from "react";
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
  const { data, isLoading } = useQuery(
    "Tracks",
    () => axios.post<TReq>("api/shortData").then((data) => data.data),
    {
      enabled: true,
      refetchInterval: 1000,
      onSuccess: () => {
        console.log("success");
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
