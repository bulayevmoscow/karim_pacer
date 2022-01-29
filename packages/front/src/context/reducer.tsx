import React, { createContext, FC, useReducer } from 'react';

type TAction =
    | { type: 'changePage', page: 0 | 1 | 2 | 3 };

type TContext = { appInfo: { tab: number }}

const initionalData: TContext = { appInfo: { tab: 0 } };

const reducer = (prev: TContext, action: TAction): TContext => {
	console.log('reducer: ', action);
	switch (action.type) {
		case 'changePage':
			return { ...prev, appInfo: { ...prev.appInfo, tab: action.page } };
		default: {
			console.log('no change');
			return prev;
		}
	}
};

export const MyContext = createContext<{state: TContext, dispatch: React.Dispatch<TAction> }>({ state: { appInfo: { tab: 0 } }, dispatch: () => {} });

export const Provider: FC = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initionalData);

	return (
		<MyContext.Provider value={{ state, dispatch }}>
			{children}
		</MyContext.Provider>);
};
