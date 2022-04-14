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

const axios = axiosInstance;

export const useTracks = () => {
  const [showButtonPanel, setShowButtonPanel] = useState<number | false>(false);
  const [refetchInterval, setRefetchInterval] = useState<false | 5000>(false);

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
      onError: (err: AxiosError) => {},
    }
  );
  useEffect(() => {
    return () => remove();
  }, [remove]);

  const { refetch: manageInterval } = useQuery(
    "api/start",
    async () => {
      const body: Extract<TRequests, { url: "/api/startTrack" }>["payload"] = {
        id: Number(showButtonPanel),
        status: data?.data[Number(showButtonPanel)].status !== "PROGRESS",
      };
      const req = await axios.post<
        Extract<TRequests, { url: "/api/startTrack" }>["res"]
      >("/api/startTrack", body);
      await refetch();
      return req;
    },
    { enabled: false, retry: false }
  );

  console.log(data?.data[Number(showButtonPanel)].status);

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
    manageInterval,
  };
};
