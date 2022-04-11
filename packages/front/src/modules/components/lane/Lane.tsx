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
  const { data, isLoading, manageInterval, addInterval, deleteInterval } =
    useLane();
  return (
    <>
      <BodyTemplate.Container>
        <BodyTemplate.Main>
          {data?.data?.intervals?.map((interval, index) => (
            <TaskUnit
              key={index}
              tempo={interval.temp}
              repeat={interval.repeat}
              rest={interval.rest}
              distance={interval.distance}
              speed={interval.speed}
              name={"Интервал " + interval.id}
              progress={interval.progress}
              onDeleteClick={() => {
                deleteInterval({ id: interval.id });
              }}
            />
          ))}
          {!isLoading && (
            <img
              src={addIcon}
              className={style.addIcon}
              alt=""
              onClick={() => addInterval()}
            />
          )}
          {isLoading && <Loader />}
        </BodyTemplate.Main>
        <BodyTemplate.Buttons show={!isLoading}>
          {data?.data?.status === "PROGRESS" && (
            <Button
              color="red"
              onClick={(e) => {
                manageInterval();
                e.stopPropagation();
              }}
            >
              Отключить
            </Button>
          )}
          {data?.data?.status === "IDLE" && (
            <Button
              color="green"
              onClick={(e) => {
                manageInterval();
                e.stopPropagation();
              }}
            >
              Включить
            </Button>
          )}
        </BodyTemplate.Buttons>
      </BodyTemplate.Container>
    </>
  );
});
