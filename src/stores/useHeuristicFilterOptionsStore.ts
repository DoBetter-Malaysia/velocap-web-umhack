import { create } from "zustand";
import { persist } from "zustand/middleware";

type HeuristicFilterOptions = { [key: string]: any };

export interface HeuristicFilterOptionsStore {
  heuristicFilterOptions: HeuristicFilterOptions;
  getOption: (key: string) => any;
  setOption: (key: string, value: any) => void;
}

const useHeuristicFilterOptionsStore = create<HeuristicFilterOptionsStore>()(
  persist(
    (set, get) => ({
      heuristicFilterOptions: new Map<String, any>([]),
      getOption: (key: string) => {
        return get().heuristicFilterOptions[key];
      },
      setOption: (key: string, value: any) => {
        let cur = get().heuristicFilterOptions;
        cur[key] = value;
        set({ heuristicFilterOptions: cur });
      },
    }),
    { name: "heuristic-filter-options" }
  )
);

export default useHeuristicFilterOptionsStore;
