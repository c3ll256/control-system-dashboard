import { useTabStore } from "@/lib/store";
import { Tab } from "@/lib/store/tab";
import { DotIcon, XIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { RoundedButton } from "@/components/ui/rouned-button";
import { ConfigKeyType } from "./profile";
import ProfileAPIRequest from "@/api/profile";
import { toast } from "sonner";

const Tabs = () => {
  const { tabs, activeTabIndex, setActiveTabIndex, closeTab } =
    useTabStore();

  function handleTabClick(index: number) {
    setActiveTabIndex(index);
  }

  async function saveThenClose(tab: Tab) {
    const profileData = tab.profile.data;
    if (tab.status === "unsaved" && profileData) {
      for (const key in profileData) {
        if (Object.prototype.hasOwnProperty.call(profileData, key)) {
          profileData[key as ConfigKeyType].origin =
            profileData[key as ConfigKeyType].value;
        }
      }

      try {
        await ProfileAPIRequest.update(tab.profile.id || "", {
          data: profileData,
        });
        closeTab(tab.id);
        toast.success("保存成功");
      } catch (error) {
        toast.error("保存失败");
      }
    }
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
              onClick={() => handleTabClick(index)}
              layoutId={`tab-${tab.id}`}>
              <span>{tab.title}</span>
              {tab.status === "saved" && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    closeTab(tab.id);
                  }}>
                  <XIcon strokeWidth={1.5} className="w-4 h-4" />
                </button>
              )}
              {tab.status === "unsaved" && (
                <Dialog>
                  <DialogTrigger>
                    <DotIcon strokeWidth={12} className="w-4 h-4" />
                  </DialogTrigger>
                  <DialogContent className="w-96">
                    <DialogHeader>
                      <DialogTitle>配置未保存</DialogTitle>
                      <DialogDescription>是否保存配置？</DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2 mt-6">
                      <RoundedButton
                        className="text-destructive bg-red-800/10"
                        onClick={(e) => {
                          e.stopPropagation();
                          closeTab(tab.id);
                        }}>
                        不保存并关闭
                      </RoundedButton>
                      <RoundedButton
                        onClick={(e) => {
                          e.stopPropagation();
                          saveThenClose(tab);
                        }}>
                        保存并关闭
                      </RoundedButton>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </motion.div>
            {index !== tabs.length - 1 &&
              activeTabIndex !== null &&
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
