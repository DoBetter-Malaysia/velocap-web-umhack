import { create } from "zustand";
import { persist } from "zustand/middleware";

export type HeuristicFilterOptions = { [key: string]: any };

export interface HeuristicFilterOptionsStore {
  heuristicFilterOptions: HeuristicFilterOptions;
  getOption: (key: string) => any;
  setOption: (key: string, value: any) => void;
  setOptions: (options: Partial<HeuristicFilterOptions>) => void;
}

const useHeuristicFilterOptionsStore = create<HeuristicFilterOptionsStore>()(
  persist(
    (set, get) => ({
      heuristicFilterOptions: {},
      getOption: (key: string) => {
        return get().heuristicFilterOptions[key];
      },
      setOption: (key: string, value: any) => {
        let cur = get().heuristicFilterOptions;
        cur[key] = value;
        set({ heuristicFilterOptions: cur });
      },
      setOptions: (options: Partial<HeuristicFilterOptions>) => {
        set({ heuristicFilterOptions: options });
      },
    }),
    { name: "heuristic-filter-options" }
  )
);

export default useHeuristicFilterOptionsStore;
