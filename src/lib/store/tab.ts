import { StateCreator } from "zustand";
import { Profile } from "@/api/profile";

export type Tab = {
  id: string;
  title: string;
  type: "temporary" | "permanent";
  status: "unsaved" | "saved";
  profile: Profile;
}

export interface TabState {
  tabs: Tab[];
  activeTab: Tab | null;
  activeTabIndex: number;
  addTab: (tab: Tab) => void;
  updateTab: (tab: Tab) => void;
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
    const existTab = get().tabs.find((t: Tab) => t.id === tab.id);
    // 如果当前 tabs 中已经存在该 tab，则将 activeTab 设置为该 tab
    if (existTab) {
      set({ activeTab: existTab })
      set({ activeTabIndex: get().tabs.findIndex((t: Tab) => t.id === existTab.id) })
    } else {
      set({ tabs: [...get().tabs, tab], activeTabIndex: get().tabs.length });
    }
  },
  updateTab: (tab: Tab) => {
    const tabs = get().tabs.map((t: Tab) => t.id === tab.id ? tab : t);
    set({ tabs })

    // 如果当前激活的 tab 是该 tab，则更新 activeTab
    if (get().activeTab?.id === tab.id) {
      set({ activeTab: tab })
    }
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
    if (tabs.length === 0) { // 如果 tabs 为空，则设置 activeTab 为 null
      set({ activeTab: null, activeTabIndex: 0 })
    } else if (get().activeTab?.id === id) { // 如果关闭的 tab 是当前激活的 tab，则设置为下一个 tab 或 上一个
      if (get().activeTabIndex > 0) {
        set({ activeTab: tabs[get().activeTabIndex - 1], activeTabIndex: get().activeTabIndex - 1 })
      } else {
        set({ activeTab: tabs[0], activeTabIndex: 0 })
      }
    }
    set({ tabs })
  },
});
