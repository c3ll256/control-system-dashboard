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
        updateProfileData(activeTab.id, saveData, "saved");
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
      updateProfileData(activeTab.id, newConfigData, "unsaved");
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
    if (!configData) return;

    const submitData = {} as Record<string, string[]>;
    for (const key in configData) {
      if (key !== "unselect") {
        const configItem = configData[key as ConfigKeyType];
        const currentData = currentBuckData?.[key as ConfigKeyType] || configItem.origin;
        const changeValue = new Decimal(configItem.value).minus(currentData);
        submitData[key] = [changeValue.toString()];
      }
    }

    // 处理 L50-2 和 L50-2-R, 分别加上 L53-1 和 L53-1-R 的变化值
    submitData["L50-2"] = [new Decimal(submitData["L50-2"][0]).add(submitData["L53-1"][0]).toString()];
    submitData["L50-2-R"] = [new Decimal(submitData["L50-2-R"][0]).add(submitData["L53-1-R"][0]).toString()];

    // 处理 H5-1 和 H5-2，分别减去 H30-1 和 H30-2 的变化值
    submitData["H5-1"] = [new Decimal(submitData["H5-1"][0]).minus(submitData["H30-1"][0]).toString()]; 
    submitData["H5-2"] = [new Decimal(submitData["H5-2"][0]).minus(submitData["H30-2"][0]).toString()];

    // 单独处理 A18 和 H17，将它们合为一个叫做 A18-H17 的参数
    if (submitData["A18"] || submitData["H17"]) {
      submitData["A18-H17"] = [configData["A18"].value.toString(), configData["H17"].value.toString()];
    }

    // 单独计算离地高度，是 configData 中的 H5-1 减去 H30-1
    submitData["lift"] = [configData["H5-1"].value.minus(configData["H30-1"].value).toString()];

    // 把 H30-1 和 H30-2 单独存起来
    submitData["H30-1-raw"] = [configData["H30-1"].value.toString()];
    submitData["H30-2-raw"] = [configData["H30-2"].value.toString()];

    try {
      await BuckAPIRequest.submitAction(submitData);

      // 去除 A18-H17，防止后续操作问题
      if (submitData["A18-H17"]) {
        delete submitData["A18-H17"];
      }

      // 去除 lift
      if (submitData["lift"]) {
        delete submitData["lift"];
      }
      
      // 去除 H30-1 和 H30-2
      if (submitData["H30-1-raw"]) {
        delete submitData["H30-1-raw"];
      }
      if (submitData["H30-2-raw"]) {
        delete submitData["H30-2-raw"];
      }

      const updatedBuckData = {
        ...(currentBuckData || {}),
      } as Record<ConfigKeyType, Decimal>;

      for (const key in submitData) {
        const changeValue = new Decimal(submitData[key][0]);
        const currentValue =
          updatedBuckData[key as ConfigKeyType] || configData?.[key as ConfigKeyType]?.origin || new Decimal(0);
        updatedBuckData[key as ConfigKeyType] = new Decimal(currentValue).add(changeValue);
      }

      // 处理 L50-2 和 L50-2-R, 分别减去 L53-1 和 L53-1-R 的变化值
      updatedBuckData["L50-2"] = updatedBuckData["L50-2"].minus(submitData["L53-1"][0]);
      updatedBuckData["L50-2-R"] = updatedBuckData["L50-2-R"].minus(submitData["L53-1-R"][0]);

      // 处理 H5-1 和 H5-2，分别减去 H30-1 和 H30-2 的变化值
      updatedBuckData["H5-1"] = updatedBuckData["H5-1"].add(submitData["H30-1"][0]);
      updatedBuckData["H5-2"] = updatedBuckData["H5-2"].add(submitData["H30-2"][0]);

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

        <div className="absolute w-full h-[2px] bottom-0 left-0 bg-gradient-to-r from-[#000] via-[#fff] to-[#000]"></div>
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
