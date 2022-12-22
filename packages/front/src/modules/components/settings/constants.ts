import imagePool1 from './components/img/pool_1.svg';
import imagePool2 from './components/img/pool_2.svg';
import imagePool3 from './components/img/pool_3.svg';
import { TSetting } from '@modules/components/settings/types';

export const typeOfPool: {
  alias: string;
  image: string | undefined;
  fieldsOfPool: (keyof Omit<TSetting['pool'], 'type'>)[];
}[] = [
  {
    alias: 'Не выбран',
    image: undefined,
    fieldsOfPool: [],
  },
  {
    alias: 'ТИП 1',
    image: imagePool1,
    fieldsOfPool: ['L', 'H1'],
  },
  {
    alias: 'ТИП 2',
    image: imagePool2,
    fieldsOfPool: ['L', 'L1', 'L2', 'H1', 'H2'],
  },
  {
    alias: 'ТИП 3',
    image: imagePool3,
    fieldsOfPool: ['L', 'L1', 'L2', 'L3', 'H1', 'H2'],
  },
];
