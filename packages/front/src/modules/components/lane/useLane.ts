import { useQuery } from "react-query";
import { axiosInstance } from "@utils/axiosInstance";
import { TRequests } from "@monorepo/types";
import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import store from "@store";

const axios = axiosInstance;

export const useLane = () => {
  const { idLane } = useParams();
  const navigate = useNavigate();
  const {
    data,
    isLoading,
    refetch: refreshLaneData,
  } = useQuery("LaneData", () =>
    axios.post<Extract<TRequests, { url: "api/trackData" }>["res"]>(
      "/api/trackData",
      { id: Number(idLane) }
    )
  );

  const addInterval = useCallback(() => {
    navigate(`/lane/${idLane}/addInterval`);
  }, [idLane, navigate]);

  const { refetch: manageInterval } = useQuery(
    "api/start",
    async () => {
      const body: Extract<TRequests, { url: "/api/startTrack" }>["payload"] = {
        id: Number(idLane),
        status: data?.data?.status !== "PROGRESS",
      };
      const req = await axios.post<
        Extract<TRequests, { url: "/api/startTrack" }>["res"]
      >("/api/startTrack", body);
      refreshLaneData();
      return req;
    },
    { enabled: false }
  );

  const deleteInterval = async ({ id }: { id: number }) => {
    try {
      const body: Extract<TRequests, { url: "/api/delInterval" }>["payload"] = {
        // eslint-disable-next-line camelcase
        track_id: Number(idLane),
        id,
      };
      await axios.post("/api/delInterval", body);
      refreshLaneData();
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert(e);
    }
  };

  useEffect(() => {
    store.laneID = Number(idLane);
  }, [idLane]);

  return {
    data,
    isLoading,
    addInterval,
    manageInterval,
    deleteInterval,
  };
};
