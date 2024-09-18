import {
  FileCogIcon,
  FolderIcon,
  FolderOpenIcon,
  SaveIcon,
} from "lucide-react";
import Control from "@/components/control";
import { useEffect, useMemo, useState } from "react";

import Logo from "@/assets/images/index/xonar.svg";
import "@/assets/css/fonts.css";
import ProjectsSidebar from "@/components/projects-sidebar";
import { RoundedButton } from "@/components/ui/rouned-button";
import ParameterConfig from "@/components/parameter-config";
import { ConfigDataType, ConfigKeyType } from "@/components/profile";
import Tabs from "@/components/tabs";
import { useMainStore, useTabStore } from "@/lib/store";
import {
  convertDecimalDataToStringData,
  convertStringDataToDecimalData,
} from "@/lib/utils";
import ProfileAPIRequest from "@/api/profile";
import { toast } from "sonner";
import BuckAPIRequest from "@/api/buck";
import Decimal from "decimal.js";

const Index = () => {
  const { tabs, activeTabIndex, needExecuteIndex, setNeedExecuteIndex, updateProfileData } = useTabStore();
  const activeTab = useMemo(() => {
    return activeTabIndex !== null ? tabs[activeTabIndex] : null;
  }, [activeTabIndex, tabs]);
  const { currentBuckData, fetchProjects, setCurrentBuckData } = useMainStore();
  const [isFolderSidebarOpen, setIsFolderSidebarOpen] = useState(false);
  const [configKey, setConfigKey] = useState<ConfigKeyType>("unselect");
  const [configData, setConfigData] = useState<Record<
    ConfigKeyType,
    ConfigDataType
  > | null>(null);

  useEffect(() => {
    if (activeTab && activeTab.profile.data) {
      setConfigData(convertStringDataToDecimalData(activeTab.profile.data));
    } else {
      setConfigData(null);
      setConfigKey("unselect");
    }
  }, [activeTab]);

  useEffect(() => {
    if (isFolderSidebarOpen) {
      fetchProjects();
    }
  }, [fetchProjects, isFolderSidebarOpen]);

  function handleFolderSidebarOpen() {
    setConfigKey("unselect");
    setIsFolderSidebarOpen((prev) => !prev);
  }

  async function handleSave() {
    if (!configData) return;
    const saveData = convertDecimalDataToStringData(configData);
    // 把 所有的 origin 改为现在的 value
    for (const key in saveData) {
      if (Object.prototype.hasOwnProperty.call(saveData, key)) {
        saveData[key as ConfigKeyType].origin =
          saveData[key as ConfigKeyType].value;
      }
    }

    try {
      await ProfileAPIRequest.update(activeTab?.profile.id || "", {
        data: saveData,
      });
      if (activeTab) {
        updateProfileData(activeTab.id, saveData);
        activeTab.status = "saved";
      }
      toast.success("保存成功");
    } catch (error) {
      toast.error("保存失败");
    }
  }

  function handleChangeConfig(config: ConfigKeyType) {
    setConfigKey(config);
  }

  function handleParameterChange(
    newConfigData: Record<ConfigKeyType, ConfigDataType>
  ) {
    setConfigData(newConfigData);

    if (activeTab && configData) {
      updateProfileData(activeTab.id, newConfigData);
      activeTab.status = "unsaved";
    }
  }

  function handleChangeBuck(newBuckData: Record<string, Decimal>) {
    if (!activeTab) return;
    const currentBuckChangeValue = activeTab.buckChangeValue;
    for (const key in newBuckData) {
      if (Object.prototype.hasOwnProperty.call(newBuckData, key)) {
        currentBuckChangeValue[key as ConfigKeyType] = new Decimal(
          currentBuckChangeValue[key as ConfigKeyType]
        ).plus(newBuckData[key as ConfigKeyType]).toString();
      }
    }

    setNeedExecuteIndex(activeTabIndex);
  }

  async function handleExecute() {
    const submitData = {} as Record<ConfigKeyType, string>;
    for (const key in configData) {
      if (key !== "unselect") {
        const configItem = configData[key as ConfigKeyType];
        const currentData = currentBuckData?.[key as ConfigKeyType] || configItem.origin;
        const changeValue = new Decimal(configItem.value).minus(currentData);
        submitData[key as ConfigKeyType] = changeValue.toString();
      }
    }

    // 处理 L50-2 和 L50-2-R, 分别加上 L53-1 和 L53-1-R 的变化值
    submitData["L50-2"] = new Decimal(submitData["L50-2"]).add(submitData["L53-1"]).toString();
    submitData["L50-2-R"] = new Decimal(submitData["L50-2-R"]).add(submitData["L53-1-R"]).toString();

    try {
      await BuckAPIRequest.submitAction(submitData);

      const updatedBuckData = {
        ...(currentBuckData || {}),
      } as Record<ConfigKeyType, Decimal>;

      for (const key in submitData) {
        const changeValue = new Decimal(submitData[key as ConfigKeyType]);
        const currentValue =
          updatedBuckData[key as ConfigKeyType] || configData?.[key as ConfigKeyType]?.origin || new Decimal(0);
        updatedBuckData[key as ConfigKeyType] = currentValue.add(changeValue);
      }

      // 处理 L50-2 和 L50-2-R, 分别减去 L53-1 和 L53-1-R 的变化值
      updatedBuckData["L50-2"] = updatedBuckData["L50-2"].minus(submitData["L53-1"]);
      updatedBuckData["L50-2-R"] = updatedBuckData["L50-2-R"].minus(submitData["L53-1-R"]);

      setCurrentBuckData(updatedBuckData);
      toast.success("执行成功");
    } catch (error) {
      console.error(error);
      toast.error("执行失败");
    }
  }

  return (
    <div
      className="h-screen w-screen flex flex-col"
      style={{ fontFamily: "PlusJakartaSans" }}
      onContextMenu={(e) => e.preventDefault()}>
      {/* header */}
      <header className="relative h-14 w-full flex justify-center items-center bg-black">
        <div className="flex items-center justify-center gap-2">
          <img className="h-14 w-auto" src={Logo} alt="xonar" />
          <span className="text-2xl font-medium">XONAR</span>
        </div>

        <div className="absolute h-full right-8 top-0 flex items-center justify-center gap-8">
          <SaveIcon strokeWidth={1.5} onClick={handleSave} />
          <FolderOpenIcon strokeWidth={1.5} onClick={handleFolderSidebarOpen} />
        </div>

        <div className="absolute w-full h-[2px] bottom-0 left-0 bg-gradient-to-r from-[#2A2860] via-[#8080FF] to-[#2A2860]"></div>
      </header>

      <div className="flex flex-1 w-full">
        <div
          onClick={() => setIsFolderSidebarOpen(false)}
          className="h-full flex-1 transition-all duration-300 ease-in-out">
          {/* tabs */}
          <Tabs />
          {/* adjust */}
          <div className="w-full h-48">
            {configKey !== "unselect" && (
              <ParameterConfig
                config={configKey}
                configData={configData}
                onChange={handleParameterChange}
                onChangeBuck={handleChangeBuck}
              />
            )}
          </div>
          {/* control */}
          <Control
            onChange={handleChangeConfig}
            disabled={isFolderSidebarOpen}
            configKey={configKey}
            configData={configData}
          />

          <div className="mt-6 px-20 flex items-center justify-between gap-2">
            {activeTab && (
              <div
                className="text-[#666666] font-light flex flex-col gap-2"
                style={{ fontFamily: "MiSans" }}>
                <div className="flex items-center gap-2">
                  <FolderIcon
                    width={20}
                    height={20}
                    stroke="#666666"
                    strokeWidth={1.5}
                  />
                  <div>{activeTab.profile.name}</div>
                </div>

                <div className="flex items-center gap-2">
                  <FileCogIcon
                    width={20}
                    height={20}
                    stroke="#666666"
                    strokeWidth={1.5}
                  />
                  <div>{activeTab.profile.projectName}</div>
                </div>
              </div>
            )}

            {!isFolderSidebarOpen && activeTab && (
              <RoundedButton
                className="w-56 h-12 text-lg"
                onClick={handleExecute}>
                执行
              </RoundedButton>
            )}
          </div>
        </div>

        <ProjectsSidebar isOpen={isFolderSidebarOpen} />
      </div>
    </div>
  );
};

export default Index;
