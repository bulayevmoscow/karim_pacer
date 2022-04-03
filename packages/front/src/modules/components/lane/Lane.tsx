import { observer } from "mobx-react-lite";
import { Button } from "@modules/library/Button";
// import IconLoading from '@modules/icons/progress.png'
import React from "react";
import BodyTemplate from "@modules/library/templates/bodyTemplate/BodyTemplate";
import { Loader } from "@modules/library/Loader";
import { useLane } from "@modules/components/lane/useLane";
import { TaskUnit } from "@modules/components/lane/task/TaskUnit";
import addIcon from "@modules/icons/plus.png";
import style from "./Lane.module.scss";

export const Lane = observer(() => {
  const { data, isLoading, choiceLane, showButtonPanel } = useLane(0);

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
          {!isLoading && <img src={addIcon} className={style.addIcon} alt="" />}
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
