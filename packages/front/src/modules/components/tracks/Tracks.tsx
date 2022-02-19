import { observer } from "mobx-react-lite";
import { useTracks } from "@modules/components/tracks/useTracks";
import BodyTemplate from "@modules/library/templates/bodyTemplate/BodyTemplate";
import { Button } from "@modules/library/Button";
import React from "react";
import { Loader } from "@modules/library/Loader";

export const Tracks = observer(() => {
  const {
    setShowButtonPanel,
    showButtonPanel,
    lanesInfo,
    eventStart,
    goToLane,
    startInterval,
  } = useTracks();
  // console.log(query)
  console.log(JSON.parse(JSON.stringify(lanesInfo)));

  return (
    <BodyTemplate.Container>
      {/* <BodyTemplate.Main> */}
      {/*  {lanesInfo?.length > 0 && */}
      {/*    lanesInfo.map((lane) => ( */}
      {/*      <TrackUnit */}
      {/*        key={lane.id} */}
      {/*        name={lane.name ?? "Дорожка"} */}
      {/*        isDiconnected={!lane.connected} */}
      {/*        {...lane.intervals[0]} */}
      {/*        progress={lane.progress} */}
      {/*        onClick={eventStart(() => */}
      {/*          showButtonPanel === lane.id */}
      {/*            ? undefined */}
      {/*            : setShowButtonPanel(lane.id) */}
      {/*        )} */}
      {/*        isClick={lane.id === showButtonPanel} */}
      {/*      /> */}
      {/*    ))} */}
      {/* </BodyTemplate.Main> */}
      <BodyTemplate.Main>
        <Loader />
      </BodyTemplate.Main>
      <BodyTemplate.Buttons>
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
            e.stopPropagation();
          }}
        >
          Редактировать
        </Button>
      </BodyTemplate.Buttons>
    </BodyTemplate.Container>
  );
});
