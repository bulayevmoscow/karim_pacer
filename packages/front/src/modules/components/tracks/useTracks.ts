import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { TRequests } from "@monorepo/types";
import { axiosInstance } from "@utils/axiosInstance";
import { AxiosError } from "axios";
const eventStart = (func: Function) => {
  return (e: MouseEvent) => {
    func();
    e.stopPropagation();
  };
};

export const useTracks = () => {
  const [showButtonPanel, setShowButtonPanel] = useState<number | false>(false);
  const [refetchInterval, setRefetchInterval] = useState<false | 5000>(false);
  const axios = axiosInstance;

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
  const { data, isLoading, refetch, isError, remove } = useQuery(
    "Tracks",
    () => axios.post<TReq>("/api/shortData"),
    {
      enabled: true,
      retry: false,
      refetchInterval,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      onSuccess: (data) => {
        return data;
      },
      onError: (err: AxiosError) => {},
    }
  );
  useEffect(() => {
    return () => remove();
  }, [remove]);

  useEffect(() => {
    if (isError && refetchInterval === 5000) {
      setRefetchInterval(false);
    }

    if (!isError && refetchInterval === false) {
      setRefetchInterval(5000);
    }
  }, [refetchInterval, isError]);
  return {
    data: data?.data,
    isLoading,
    showButtonPanel,
    setShowButtonPanel,
    eventStart,
  };
};
