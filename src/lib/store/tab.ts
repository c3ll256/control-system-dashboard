import { StateCreator } from "zustand";
import { Profile } from "@/api/profile";
import { ConfigDataType, ConfigKeyType } from "@/components/profile";
  
const createInitialBuckChangeValue = (): Record<ConfigKeyType, string> => {
  const keys: ConfigKeyType[] = [
    "A18", "L63", "L50-2", "L50-2-R", "H17", "H30-1", "H30-1-R", "H5-1",
    "H30-2", "H30-2-R", "H5-2", "L53-1", "L53-1-R", "W7", "W20-2", "W20-2-R",
    "W20-1", "W20-1-R", "WBPRP"
  ];
  
  return keys.reduce((acc, key) => {
    acc[key] = "0";
    return acc;
  }, {} as Record<ConfigKeyType, string>);
};

export class Tab {
  public buckChangeValue: Record<ConfigKeyType, string>;

  constructor(
    public id: string,
    public title: string,
    public type: "temporary" | "permanent",
    public status: "unsaved" | "saved",
    public profile: Profile,
    buckChangeValue?: Record<ConfigKeyType, string>
  ) {
    this.buckChangeValue = buckChangeValue || createInitialBuckChangeValue();
  }
}

export interface TabState {
  tabs: Tab[];
  activeTabIndex: number | null;
  addTab: (tab: Tab) => void;
  setTabs: (tabs: Tab[]) => void;
  setActiveTabById: (id: string) => void;
  setActiveTabIndex: (index: number) => void;
  closeTab: (id: string) => void;
  needExecuteIndex: number | null;
  setNeedExecuteIndex: (index: number | null) => void;
  resetBuckChangeValue: (id: string) => void;
  updateProfileData: (id: string, newConfigData: Record<ConfigKeyType, ConfigDataType>, status: "saved" | "unsaved") => void;
}

export const TabStateCreator: StateCreator<TabState> = (set, get) => ({
  tabs: [],
  activeTabIndex: 0,
  needExecuteIndex: null,
  addTab: (tab: Tab) => {
    const existTab = get().tabs.find((t: Tab) => t.id === tab.id);
    // 如果当前 tabs 中已经存在该 tab，则将 activeTab 设置为该 tab
    if (existTab) {
      set({ activeTabIndex: get().tabs.findIndex((t: Tab) => t.id === existTab.id) })
    } else {
      set({ tabs: [...get().tabs, tab], activeTabIndex: get().tabs.length });
    }
  },
  setTabs: (tabs: Tab[]) => set({ tabs }),
  setActiveTabById: (id: string) => {
    const tabIndex = get().tabs.findIndex((t: Tab) => t.id === id);
    if (tabIndex !== -1) {
      set({ activeTabIndex: tabIndex })
    }
  },
  setActiveTabIndex: (index: number) => set({ activeTabIndex: index }),
  closeTab: (id: string) => {
    const tabs = get().tabs.filter((tab: Tab) => tab.id !== id);
    const activeTabIndex = get().activeTabIndex;
    if (tabs.length === 0) { // 如果 tabs 为空，则设置 activeTab 为 null
      set({ activeTabIndex: null })
    } else if (activeTabIndex && get().tabs[activeTabIndex].id === id) { // 如果关闭的 tab 是当前激活的 tab，则设置为下一个 tab 或 上一个
      if (activeTabIndex && activeTabIndex > 0) {
        set({ activeTabIndex: activeTabIndex - 1 })
      } else {
        set({ activeTabIndex: 0 })
      }
    }
    set({ tabs })
  },
  setNeedExecuteIndex: (index: number | null) => set({ needExecuteIndex: index }),
  resetBuckChangeValue: (id: string) => {
    const tab = get().tabs.find((t: Tab) => t.id === id);
    if (tab) {
      tab.buckChangeValue = createInitialBuckChangeValue();
    }
    set({ tabs: get().tabs })
  },
  updateProfileData: (id: string, newConfigData: Record<ConfigKeyType, ConfigDataType>, status: "saved" | "unsaved") => {
    const tab = get().tabs.find((t: Tab) => t.id === id);
    if (tab) {
      tab.profile.data = newConfigData;
      tab.status = status;
    }
    set({ tabs: get().tabs })
  }
});
