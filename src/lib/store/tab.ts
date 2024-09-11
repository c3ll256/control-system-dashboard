import { StateCreator } from "zustand";
import { Profile } from "@/api/profile";

export type Tab = {
  id: string;
  title: string;
  type: "temporary" | "permanent";
  profile: Profile;
}

export interface TabState {
  tabs: Tab[];
  activeTab: Tab | null;
  activeTabIndex: number;
  addTab: (tab: Tab) => void;
  setTabs: (tabs: Tab[]) => void;
  setActiveTabById: (id: string) => void;
  setActiveTab: (tab: Tab) => void;
  setActiveTabIndex: (index: number) => void;
  closeTab: (id: string) => void;
}

export const TabStateCreator: StateCreator<TabState> = (set, get) => ({
  tabs: [],
  activeTab: null,
  activeTabIndex: 0,
  addTab: (tab: Tab) => {
    // 如果当前 tabs 中已经存在该 tab，则不添加
    if (get().tabs.some((t: Tab) => t.id === tab.id)) return;
    set({ tabs: [...get().tabs, tab], activeTabIndex: get().tabs.length });
  },
  setTabs: (tabs: Tab[]) => set({ tabs }),
  setActiveTabById: (id: string) => {
    const tab = get().tabs.find((t: Tab) => t.id === id);
    if (tab) {
      set({ activeTab: tab })
    }
  },
  setActiveTab: (tab: Tab) => set({ activeTab: tab }),
  setActiveTabIndex: (index: number) => set({ activeTabIndex: index }),
  closeTab: (id: string) => {
    const tabs = get().tabs.filter((tab: Tab) => tab.id !== id);
    if (get().activeTab?.id === id) { // 如果 tabs 为空，则设置 activeTab 为 null
      set({ activeTab: tabs[get().activeTabIndex - 1] })
    } else  if (tabs.length === 0) { // 如果关闭的 tab 是当前激活的 tab，则设置为下一个 tab
      set({ activeTab: null, activeTabIndex: 0 })
    }
    set({ tabs })
  },
});
