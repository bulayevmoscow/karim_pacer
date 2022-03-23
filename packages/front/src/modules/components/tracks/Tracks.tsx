import { observer } from "mobx-react-lite";
import { useTracks } from "@modules/components/tracks/useTracks";
import BodyTemplate from "@modules/library/templates/bodyTemplate/BodyTemplate";
import { Button } from "@modules/library/Button";
import React from "react";
import { TrackUnit } from "@modules/components/tracks/unit/TrackUnit";
import { Loader } from "@modules/library/Loader";
import store from "@store";

export const Tracks = observer(() => {
  const { data, isLoading, setShowButtonPanel, showButtonPanel, eventStart } =
    useTracks();
  const { goToLane } = store;
  return (
    <BodyTemplate.Container>
      <BodyTemplate.Main>
        {data &&
          data?.length > 0 &&
          data.map((lane) => (
            <TrackUnit
              key={lane.id}
              name={lane.name ?? "No track name"}
              isDiconnected={!lane.connected}
              {...lane.intervals[0]}
              progress={lane.progress}
              onClick={eventStart(() =>
                showButtonPanel === lane.id
                  ? undefined
                  : setShowButtonPanel(lane.id)
              )}
              isClick={lane.id === showButtonPanel}
            />
          ))}
        {!data && isLoading && <Loader />}
      </BodyTemplate.Main>
      <BodyTemplate.Buttons show={showButtonPanel !== false}>
        <Button
          color="red"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          Отключить
        </Button>
        <Button
          color="green"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          Включить
        </Button>
        <Button
          color="gray"
          onClick={(e) => {
            goToLane(Number(showButtonPanel));
            e.stopPropagation();
          }}
        >
          Редактировать
        </Button>
      </BodyTemplate.Buttons>
    </BodyTemplate.Container>
  );
});
