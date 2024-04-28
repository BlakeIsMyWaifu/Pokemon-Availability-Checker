import { type StateCreator, type StoreMutatorIdentifier } from 'zustand'

export type DevTools = ['zustand/devtools', never]

export type SubscribeWithSelector = ['zustand/subscribeWithSelector', never]

export type Persist<T = unknown> = ['zustand/persist', T]

export type Slice<
	Store extends CurrentSlice,
	CurrentSlice extends object,
	Middleware extends [StoreMutatorIdentifier, unknown][] = [DevTools]
> = StateCreator<Store, Middleware, [], CurrentSlice>

export const createActionName =
	<T extends string>(storeName: string) =>
	(actionName: T): [false, string] => [false, `${storeName}/${actionName}`]
