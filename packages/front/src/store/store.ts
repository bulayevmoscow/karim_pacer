import {makeAutoObservable, runInAction, spy} from 'mobx';
import {
	TInterval,
	TLaneInfo,
	TLanesInfo,
	TModalManager,
	TNavigation,
} from './storeTypes';
import {TRequests} from '@monorepo/types';

import axios, {AxiosError} from 'axios';
import {
	QueryObserverResult,
	RefetchOptions,
	RefetchQueryFilters,
} from 'react-query';

/* eslint-disable new-cap */

type TErrorModal = {
  title: string;
  description?: string;
  url?: string;
  onClick?: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, AxiosError<any, any>>>;
}[];

const TIMEOUT = (time: number = 1000) =>
// eslint-disable-next-line no-promise-executor-return
	new Promise<void>(resolve => setTimeout(resolve, time));

class TodoStore {
	// eslint-disable-next-line max-params
	constructor(
    public page: TNavigation = {pageTag: 'main', title: 'Дорожки'},
    // public page: TNavigation = { pageTag: 'lane', title: 'Дорожка', idLine: 0 },
    public modalManager: TModalManager = {},
    public lanesInfo: TLanesInfo = [
    	{
    		id: 0,
    		name: 'Дорожка 13',
    		status: true,
    		progress: 10,
    		connected: true,
    		intervals: [
    			{
    				id: 0,
    				speed: 90,
    				distance: 500,
    				rest: 20,
    				repeat: 2,
    				temp: 400,
    				progress: 30,
    			},
    		],
    	},
    	{
    		status: true,
    		id: 1,
    		name: 'Дорожка 2',
    		intervals: [],
    		progress: 0,
    		connected: true,
    	},
    	{
    		status: true,
    		id: 2,
    		name: 'Дорожка 2',
    		intervals: [],
    		progress: 0,
    		connected: true,
    	},
    ],
    public laneInfo: TLaneInfo = undefined,
    public fetchErrorList: TErrorModal = [
    	// {
    	//   title: "Some",
    	//   description: "Description",
    	//   onClick: () => console.log("1234567"),
    	// },
    ],
	) {
		makeAutoObservable(this, {}, {autoBind: true});
	}

	// Смена страницы
	goToPage = (page: TNavigation['pageTag']) => {
		switch (page) {
			case 'main':
				this.page = {
					pageTag: 'main',
					title: 'Дорожки',
				};
				break;

			case 'setting': {
				this.page = {
					pageTag: 'setting',
					title: 'Настройки',
				};
				break;
			}

			default:
				break;
		}
	};

	goToLane = (
		pageNumber: Extract<TNavigation, { title: 'Дорожка' }>['idLine'],
	) => {
		runInAction(() => {
			// Изменияем страницу
			this.page = {
				pageTag: 'lane',
				title: 'Дорожка',
				idLine: pageNumber,
			};
			// Делаем дефолтные настройки страницы
			this.laneInfo = undefined;
		});
	};

	getTemplates = async () => {
		await TIMEOUT(200);
		await axios.get<TInterval[]>('/task_templates.json').then(data => {
			console.log(data);
			// @ts-ignore
			this.laneInfo.intervals = data.data;
		});
	};

	startInterval = (
		body: Extract<TRequests, { url: 'api/trackConnect' }>['payload'],
	) => {
		axios.post('/api/startTrack', body).then(x => console.log(x.data));
	};

	setFetchError = ({
		onClick,
		err,
	}: {
    err: AxiosError;
    onClick: TErrorModal[number]['onClick'];
  }) => {
		const indexRepeat = this.fetchErrorList?.findIndex(
			itemOfError => itemOfError.url === err?.response?.config.url,
		);
		const itemError = {
			title: 'Ошибка подключения',
			description: `${err?.response?.statusText ?? err.message} ${
				err?.response?.config.url ?? ''
			}`,
			onClick,
			url: err?.response?.config.url,
		};
		if (indexRepeat === -1) {
			this.fetchErrorList?.push(itemError);
		} else {
			this.fetchErrorList[indexRepeat] = itemError;
		}
	};

	clearFetchError = (url: string) => {
		this.fetchErrorList = this.fetchErrorList.filter(err => err.url !== url);
	};
}

const store = new TodoStore();
export default store;

if (import.meta.env.MODE === 'development') {
	spy(event => {
		if (event.type === 'action') {
			console.log(
				`${event.name} with args: ${JSON.stringify(event.arguments)}`,
			);
			console.log(JSON.parse(JSON.stringify(store)));
		}
	});
}
