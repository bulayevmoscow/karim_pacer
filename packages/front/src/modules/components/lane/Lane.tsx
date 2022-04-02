import { observer } from "mobx-react-lite";
import store from "@store";
import { Button } from "@modules/library/Button";
// import IconLoading from '@modules/icons/progress.png'
import React from "react";
import BodyTemplate from "@modules/library/templates/bodyTemplate/BodyTemplate";
import { Loader } from "@modules/library/Loader";
import { useLane } from "@modules/components/lane/useLane";
import { TaskUnit } from "@modules/components/lane/task/TaskUnit";

export const Lane = observer(() => {
  const { startInterval } = store;
  const { data, isLoading, choiceLane, showButtonPanel } = useLane(0);
  // const laneNumber = page.pageTag === "lane" ? page.idLine : undefined;
  const laneNumber = 0;
  // console.log(laneNumber);
  if (laneNumber === undefined) {
    throw new Error("No lane Number");
  }

  return (
    <>
      <BodyTemplate.Container>
        <BodyTemplate.Main>
          {data?.data?.intervals?.map((lane, index) => (
            <TaskUnit
              key={index}
              tempo={lane.temp}
              repeat={lane.repeat}
              rest={lane.rest}
              distance={lane.distance}
              speed={lane.speed}
              name={"no name " + index}
              progress={lane.progress}
              isSelect={showButtonPanel === index}
              onClick={(e) => choiceLane(e, index)}
            />
          ))}
          {isLoading && <Loader />}
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
              e.stopPropagation();
            }}
          >
            Редактировать
          </Button>
        </BodyTemplate.Buttons>
      </BodyTemplate.Container>
    </>
  );
});
