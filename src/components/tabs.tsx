import { useTabStore } from "@/lib/store";
import { Tab } from "@/lib/store/tab";
import { XIcon } from "lucide-react";

const Tabs = () => {
  const { tabs, setActiveTab, activeTabIndex, setActiveTabIndex,  closeTab } = useTabStore();

  function handleTabClick(tab: Tab, index: number) {
    setActiveTab(tab);
    setActiveTabIndex(index);
  }

  return (
    <div className="flex items-end bg-black h-12">
      {tabs.map((tab, index) => (
        <div 
          key={tab.id}
          className={`relative ${index === activeTabIndex ? "bg-black" : "bg-background"}`}
        >
          <div
            className={`w-52 px-6 py-2 flex items-center justify-between 
            ${ index === activeTabIndex ? "bg-background rounded-t-xl" : "bg-black text-muted" }
            ${ activeTabIndex > 0 && index === activeTabIndex - 1 ? "rounded-br-xl overflow-hidden" : ""}
            ${ activeTabIndex !== tabs.length - 1 && index === activeTabIndex + 1 ? "rounded-bl-xl overflow-hidden" : ""}`}
            onClick={() => handleTabClick(tab, index)}>
            <span>{tab.title}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeTab(tab.id);
              }}>
              <XIcon strokeWidth={1.5} className="w-4 h-4"/>
            </button>
          </div>
          { (index !== tabs.length - 1 &&
            index !== activeTabIndex - 1 &&
            index !== activeTabIndex) &&
             (
              <div className="absolute top-0 right-0 h-10 w-[2px] bg-black flex items-center">
                <div className="w-full h-4 bg-background"></div>
              </div>
            )
          }
        </div>
      ))}
      {
        activeTabIndex === tabs.length - 1 && (
          <div className="bg-background h-full">
            <div className={`w-12 h-full rounded-bl-xl bg-black`}></div>
          </div>
        )
      }
    </div>
  );
};

export default Tabs;
