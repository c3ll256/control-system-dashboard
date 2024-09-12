import { FileCogIcon, FolderIcon, FolderOpenIcon, SaveIcon } from "lucide-react";
import Control from "@/components/control";
import { useEffect, useState } from "react";

import Logo from "@/assets/images/index/xonar.svg";
import "@/assets/css/fonts.css"
import ProjectsSidebar from "@/components/projects-sidebar";
import { RoundedButton } from "@/components/ui/rouned-button";
import ParameterConfig from "@/components/parameter-config";
import { ConfigDataType, ConfigKeyType } from "@/components/profile";
import Tabs from "@/components/tabs";
import { useMainStore, useTabStore } from "@/lib/store";
import { convertDecimalDataToStringData, convertStringDataToDecimalData } from "@/lib/utils";
import ProfileAPIRequest from "@/api/profile";
import { toast } from "sonner";

const Index = () => {
  const { activeTab, updateTab } = useTabStore();
  const { fetchProjects } = useMainStore();
  const [isFolderSidebarOpen, setIsFolderSidebarOpen] = useState(false);
  const [configKey, setConfigKey] = useState<ConfigKeyType>("unselect");
  const [configData, setConfigData] = useState<Record<ConfigKeyType, ConfigDataType> | null>(null);

  useEffect(() => {
    if (activeTab && activeTab.profile.data) {
      setConfigData(convertStringDataToDecimalData(activeTab.profile.data));
    } else {
      setConfigData(null);
    }
  }, [activeTab]);

  useEffect(() => {
    if (isFolderSidebarOpen) {
      fetchProjects();
    }
  }, [fetchProjects, isFolderSidebarOpen]);

  function handleFolderSidebarOpen() {
    setConfigKey("unselect");
    setIsFolderSidebarOpen(prev => !prev);
  }

  async function handleSave() {
    if (!configData) return;
    const saveData = convertDecimalDataToStringData(configData);
    // 把 所有的 origin 改为现在的 value
    for (const key in saveData) {
      if (Object.prototype.hasOwnProperty.call(saveData, key)) {
        saveData[key as ConfigKeyType].origin = saveData[key as ConfigKeyType].value;
      }
    }

    try {
      await ProfileAPIRequest.update(activeTab?.profile.id || "", {
        data: saveData,
      });
      if (activeTab) {
        updateTab({
          ...activeTab,
          profile: {
            ...activeTab.profile,
            data: saveData,
          },
        });
      }
      toast.success("保存成功");
    } catch (error) {
      toast.error("保存失败");
    }
  }

  function handleChangeConfig(config: ConfigKeyType) {
    setConfigKey(config);
  }

  function handleParameterChange(newConfigData: ConfigDataType) {
    setConfigData(prev => {
      if (!prev) return null;
      const newConfig = { ...prev[configKey], value: newConfigData.value};
      return { ...prev, [configKey]: newConfig };
    });

    // 更新 tab
    if (activeTab && configData) {
      updateTab({
        ...activeTab,
        status: "unsaved",
        profile: {
          ...activeTab.profile,
          data: convertDecimalDataToStringData({ ...configData, [configKey]: newConfigData}),
        },
      });
    }
  }

  function handleExecute() {
    const submitData: Record<string, string> = {};
    for (const key in configData) {
      if (Object.prototype.hasOwnProperty.call(configData, key) && key !== "unselect") {
        const changeValue = configData[key as ConfigKeyType].value.minus(configData[key as ConfigKeyType].origin);
        submitData[key as ConfigKeyType] = changeValue.toString();
      }
    }
  }

  return (
    <div className="h-screen w-screen flex flex-col" style={{fontFamily: "PlusJakartaSans"}} onContextMenu={(e) => e.preventDefault()}>
      {/* header */}
      <header className="relative h-14 w-full flex justify-center items-center bg-black">
        <div className="flex items-center justify-center gap-2">
          <img className="h-14 w-auto" src={Logo} alt="xonar" />
          <span className="text-2xl font-medium">XONAR</span>
        </div>

        <div className="absolute h-full right-8 top-0 flex items-center justify-center gap-8">
          <SaveIcon strokeWidth={1.5} onClick={handleSave}/>
          <FolderOpenIcon strokeWidth={1.5} onClick={handleFolderSidebarOpen}/>
        </div>

        <div className="absolute w-full h-[2px] bottom-0 left-0 bg-gradient-to-r from-[#2A2860] via-[#8080FF] to-[#2A2860]"></div>
      </header>

      <div className="flex flex-1 w-full">
        <div onClick={() => setIsFolderSidebarOpen(false)} className="h-full flex-1 transition-all duration-300 ease-in-out">
          {/* tabs */}
          <Tabs />
          {/* adjust */}
          <div className="w-full h-48">
            { configKey !== "unselect" && (
              <ParameterConfig config={configKey} configData={configData ? configData[configKey] : null} onChange={handleParameterChange}/>
            )}
          </div>
          {/* control */}
          <Control onChange={handleChangeConfig} disabled={isFolderSidebarOpen} configKey={configKey} configData={configData}/>

          <div className="mt-6 px-20 flex items-center justify-between gap-2">
            { activeTab && (
            <div className="text-[#666666] font-light flex flex-col gap-2" style={{fontFamily: "MiSans"}}>
              <div className="flex items-center gap-2">
                <FolderIcon width={20} height={20} stroke="#666666" strokeWidth={1.5}/>
                <div>{activeTab.profile.name}</div>
              </div>

              <div className="flex items-center gap-2">
                <FileCogIcon width={20} height={20} stroke="#666666" strokeWidth={1.5}/>
                <div>{activeTab.profile.projectName}</div>
              </div>
            </div>
            )}

            { !isFolderSidebarOpen && activeTab && (
              <RoundedButton className="w-56 h-12 text-lg" onClick={handleExecute}>执行</RoundedButton>
            )}
          </div>
        </div>

        <ProjectsSidebar isOpen={isFolderSidebarOpen} />
      </div>
    </div>
  );
};

export default Index;