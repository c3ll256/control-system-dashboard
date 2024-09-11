import { useTabStore } from "@/lib/store";
import { Tab } from "@/lib/store/tab";
import { XIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Tabs = () => {
  const { tabs, setActiveTab, activeTabIndex, setActiveTabIndex, closeTab } =
    useTabStore();

  function handleTabClick(tab: Tab, index: number) {
    setActiveTab(tab);
    setActiveTabIndex(index);
  }

  return (
    <div className="flex items-end bg-black h-12 relative">
      <AnimatePresence initial={false}>
        {tabs.map((tab, index) => (
          <motion.div
            key={tab.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className={`relative ${
              index === activeTabIndex ? "bg-black z-10" : "bg-background z-0"
            }`}>
            <motion.div
              className={`w-52 px-6 py-2 flex items-center justify-between cursor-pointer
              ${
                index === activeTabIndex
                  ? "bg-background rounded-t-xl"
                  : "bg-black text-muted"
              }`}
              onClick={() => handleTabClick(tab, index)}
              layoutId={`tab-${tab.id}`}>
              <span>{tab.title}</span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  closeTab(tab.id);
                }}>
                <XIcon strokeWidth={1.5} className="w-4 h-4" />
              </motion.button>
            </motion.div>
            {index !== tabs.length - 1 &&
              index !== activeTabIndex - 1 &&
              index !== activeTabIndex && (
                <motion.div
                  className="absolute top-0 right-0 h-10 w-[2px] bg-black flex items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}>
                  <div className="w-full h-4 bg-background"></div>
                </motion.div>
              )}
            {index === activeTabIndex && (
              <div className="absolute z-50 top-0 -right-4 bg-background h-full">
                <div className={`w-4 h-full rounded-bl-xl bg-black`}></div>
              </div>
            )}
            {index === activeTabIndex && (
              <div className="absolute z-50 top-0 -left-4 bg-background h-full">
                <div className={`w-4 h-full rounded-br-xl bg-black`}></div>
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Tabs;
