import {
  FolderOpenIcon,
  SaveIcon,
} from "lucide-react";
import YControl from "@/components/y-control";
import XControl from "@/components/x-control";
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

import XIcon from "@/assets/images/index/x-icon.png";
import YIcon from "@/assets/images/index/y-icon.png";

// 先临时在这里放着了，后边写成服务端 config
const buckOriginValue: Record<string, Decimal> = {
  "L6": new Decimal(404),
  "W7": new Decimal(324),
  "A18": new Decimal(25),
  "H17": new Decimal(733),
  "H5-1": new Decimal(600),
  "H5-2": new Decimal(600),
  "H30-1": new Decimal(200),
  "H30-2": new Decimal(200),
  "L50-2": new Decimal(880),
  "L99-1": new Decimal(922),
  "W20-1": new Decimal(324),
  "W20-2": new Decimal(324),
  "W-BPRP": new Decimal(170)
}

const Index = () => {
  const { tabs, activeTabIndex, setNeedExecuteIndex, updateProfileData } = useTabStore();
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
        const currentData = currentBuckData?.[key as ConfigKeyType] || buckOriginValue[key as string];
        const changeValue = new Decimal(configItem.value).minus(currentData);
        submitData[key] = [changeValue.toString()];
      }
    }

    // 处理 L50-2 加上 L99-1 的变化值
    submitData["L50-2"] = [new Decimal(submitData["L50-2"][0]).add(submitData["L99-1"][0]).toString()];

    // 处理 H5-1 和 H5-2，分别减去 H30-1 和 H30-2 的变化值
    submitData["H5-1"] = [new Decimal(submitData["H5-1"][0]).minus(submitData["H30-1"][0]).toString()];
    submitData["H5-2"] = [new Decimal(submitData["H5-2"][0]).minus(submitData["H30-2"][0]).toString()];

    // 单独保存 H5-1
    submitData["H5-1-raw"] = [configData["H5-1"].value.toString()];

    // 单独处理 A18 和 H17，将它们合为一个叫做 A18-H17 的参数
    if (submitData["A18"] || submitData["H17"]) {
      submitData["A18-H17"] = [configData["A18"].value.toString(), configData["H17"].value.toString()];
    }

    // 把 L6 单独存起来
    submitData["L6-raw"] = [configData["L6"].value.toString()];

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

      // 去除 L6-raw
      if (submitData["L6-raw"]) {
        delete submitData["L6-raw"];
      }

      // 去除 H5-1-raw
      if (submitData["H5-1-raw"]) {
        delete submitData["H5-1-raw"];
      }

      const updatedBuckData = {
        ...(currentBuckData || {}),
      } as Record<ConfigKeyType, Decimal>;

      for (const key in submitData) {
        const changeValue = new Decimal(submitData[key][0]);
        const currentValue =
          updatedBuckData[key as ConfigKeyType] || buckOriginValue[key as string] || new Decimal(0);
        updatedBuckData[key as ConfigKeyType] = new Decimal(currentValue).add(changeValue);
      }

      // 处理 L50-2 , 减去 L99-1 的变化值
      updatedBuckData["L50-2"] = updatedBuckData["L50-2"].minus(submitData["L99-1"][0]);

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
      <header className="relative h-10 w-full flex justify-between items-center bg-black px-8">
        <div className="flex items-center justify-center gap-2">
          <img className="h-10 w-auto" src={Logo} alt="xonar" />
          <span className="text-2xl font-medium">XONAR</span>
        </div>

        <div className="h-full flex items-center justify-center gap-8">
          <SaveIcon strokeWidth={1.5} onClick={handleSave} />
          <FolderOpenIcon strokeWidth={1.5} onClick={handleFolderSidebarOpen} />
        </div>
      </header>

      <div className="flex flex-1 w-full">
        <div
          onClick={() => setIsFolderSidebarOpen(false)}
          className="h-full flex-1 flex flex-col transition-all duration-300 ease-in-out">
          {/* tabs */}
          <Tabs />

          <div className="w-full flex-1 flex flex-col gap-6 p-6">
            {/* control */}

            <div className="flex h-[70%] items-center gap-6">
              <div className="relative w-[58%] h-full bg-black rounded-2xl px-4 pb-8 flex items-end justify-center">
                <div className="absolute top-3 left-4 flex items-center gap-3">
                  <img className="h-8 w-8" src={YIcon} alt="" />
                  <div>Y平面</div>
                </div>

                <YControl
                  onChange={handleChangeConfig}
                  disabled={isFolderSidebarOpen}
                  configKey={configKey}
                  configData={configData}
                />
              </div>

              <div className="relative w-[42%] h-full bg-black rounded-2xl px-8 pb-8 flex items-end justify-center">
                <div className="absolute top-3 left-4 flex items-center gap-3">
                  <img className="h-8 w-8" src={XIcon} alt="" />
                  <div>X平面</div>
                </div>

                <XControl
                  onChange={handleChangeConfig}
                  disabled={isFolderSidebarOpen}
                  configKey={configKey}
                  configData={configData}
                />
              </div>
            </div>

            <div className="w-full h-[30%] rounded-2xl bg-black flex items-center">
              {/* adjust */}
              <div className="w-full h-36">
                {configKey !== "unselect" && (
                  <ParameterConfig
                    config={configKey}
                    configData={configData}
                    onChange={handleParameterChange}
                    onChangeBuck={handleChangeBuck}
                  />
                )}
              </div>

              <div className="mt-6 px-10 flex items-center justify-between gap-2">
                {/* {activeTab && (
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
                )} */}

                {!isFolderSidebarOpen && activeTab && (
                  <RoundedButton
                    className="w-56 h-12 text-lg rounded-md bg-white text-black"
                    onClick={handleExecute}>
                    执行
                  </RoundedButton>
                )}
              </div>
            </div>
          </div>
        </div>

        <ProjectsSidebar isOpen={isFolderSidebarOpen} />
      </div>
    </div>
  );
};

export default Index;
