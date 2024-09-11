import { StateCreator, create } from "zustand";
import { PersistOptions, devtools, persist } from "zustand/middleware";
import { MainState, MainStateCreator } from "./main";
import { TabState, TabStateCreator } from "./tab";

const middlewares = <T,>(
  f: StateCreator<T>,
  presistOptions: PersistOptions<T>
) => devtools(persist(f, presistOptions));

export const useMainStore = create<MainState>()(
  middlewares(MainStateCreator, { name: "main" })
);

export const useTabStore = create<TabState>()(
  middlewares(TabStateCreator, { name: "tab" })
);
