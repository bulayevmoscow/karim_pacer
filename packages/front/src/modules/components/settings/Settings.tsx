import React, { FC } from 'react';
import BodyTemplate from '@modules/library/templates/bodyTemplate/BodyTemplate';
import { Loader } from '@modules/library/Loader';
import { ColorInput } from '@modules/components/settings/components/ColorInput';
import style from './Settings.module.scss';
import { NumberInput } from '@modules/components/settings/components/NumberInput';
import { useSetting } from '@modules/components/settings/useSetting';
import { Select } from '@modules/components/settings/components/Select';
import { typeOfPool } from '@modules/components/settings/constants';
import { Button } from '@modules/library/Button';
import { Modal, ModalErrorConnectModule } from '@modules/modal/Modal';

export const Settings: FC = () => {
  const {
    form,
    isLoading,
    onChangeColor,
    onChangeDelay,
    onChangeKeyOfPool,
    poolSelectValue,
    mutate,
    isErrorLoading,
    isErrorMutating,
    isMutating,
    refetchGetData,
  } = useSetting();

  if (isErrorLoading) {
    return (
      <Modal isOpen={true}>
        <ModalErrorConnectModule
          code={'GET'}
          url={'/api/setting'}
          refetch={refetchGetData}
          status={false}
        ></ModalErrorConnectModule>
      </Modal>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  if (!form) {
    return null;
  }

  return (
    <BodyTemplate.Container>
      <BodyTemplate.Main>
        <div className={style.color_container}>
          <div className={style.color_row}>
            <div className={style.color_row_text}>Маячок</div>
            <ColorInput value={form.color.pace} onChange={onChangeColor('pace')} className={style.color_row_input} />
          </div>
          <div className={style.color_row}>
            <div className={style.color_row_text}>Ожидание</div>
            <ColorInput value={form.color.wait} onChange={onChangeColor('wait')} className={style.color_row_input} />
          </div>
          <div className={style.color_row}>
            <div className={style.color_row_text}>Обрат. отс.</div>
            <ColorInput value={form.color.delay} onChange={onChangeColor('delay')} className={style.color_row_input} />
          </div>
          <div className={style.color_row}>
            <div className={style.color_row_text}>Обрат. отс, сек</div>
            <NumberInput value={String(form.delay) ?? 0} className={style.color_row_input} onChange={onChangeDelay} />
          </div>
          {/* Выбор типа бассейна */}
          <div className={style.color_row}>
            <div className={style.color_row_text}>Тип Бассейна</div>
            <Select
              current={form.pool.type}
              value={poolSelectValue}
              className={style.color_row_input}
              onChange={(e) => {
                onChangeKeyOfPool('type')(e.target.value);
              }}
            />
          </div>
          {/* Изображение бассейна */}
          {typeOfPool[form.pool.type] && (
            <>
              {typeOfPool[form.pool.type].image && (
                <div className={style.pool_image_container}>
                  <img src={typeOfPool[form.pool.type].image} alt="pool image" />
                </div>
              )}
              {typeOfPool[form.pool.type].fieldsOfPool.map((field) => {
                return (
                  <div className={style.color_row} key={field}>
                    <div className={style.color_row_text}>{field}, м</div>
                    <div>
                      <NumberInput
                        value={String(form.pool[field]) ?? '0'}
                        className={style.color_row_input}
                        onChange={(e) => {
                          onChangeKeyOfPool(field)(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </BodyTemplate.Main>
      <BodyTemplate.Buttons show={true}>
        <Button color={'green'} onClick={() => mutate(form)}>
          Сохранить
        </Button>
      </BodyTemplate.Buttons>
      {isErrorMutating && (
        <Modal isOpen={true}>
          <ModalErrorConnectModule
            code={'POST'}
            url={'/api/setting'}
            refetch={() => {
              if (form) {
                mutate(form);
              }
            }}
            status={false}
          ></ModalErrorConnectModule>
        </Modal>
      )}
    </BodyTemplate.Container>
  );
};
