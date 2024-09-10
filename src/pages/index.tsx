import { FileCogIcon, FolderIcon, FolderOpenIcon, SaveIcon, SidebarOpenIcon } from "lucide-react";
import Control from "@/components/control";
import { useState } from "react";
import Decimal from 'decimal.js';

import Logo from "@/assets/images/index/xonar.svg";
import "@/assets/css/fonts.css"
import ProjectsSidebar from "@/components/projects-sidebar";
import { RoundedButton } from "@/components/ui/rouned-button";
import ParameterConfig from "@/components/parameter-config";
import { Profile } from "@/api/profile";
import { ConfigDataType, ConfigKeyType } from "@/components/profile";


const Index = () => {
  const [isFolderSidebarOpen, setIsFolderSidebarOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [configKey, setConfigKey] = useState<ConfigKeyType>("unselect");
  const [configData, setConfigData] = useState<Record<ConfigKeyType, ConfigDataType> | null>({
    "unselect": { origin: new Decimal(0), value: new Decimal(0), min: new Decimal(0), max: new Decimal(0), unit: "mm", step: new Decimal(1) },
    "A18": { origin: new Decimal(18.5), value: new Decimal(18.5), min: new Decimal(0), max: new Decimal(25), unit: "°", step: new Decimal(0.1) },
    "L63": { origin: new Decimal(50), value: new Decimal(50), min: new Decimal(0), max: new Decimal(100), unit: "mm", step: new Decimal(1) },
    "L50-2": { origin: new Decimal(50), value: new Decimal(50), min: new Decimal(0), max: new Decimal(100), unit: "mm", step: new Decimal(1) },
    "L50-2-R": { origin: new Decimal(50), value: new Decimal(50), min: new Decimal(0), max: new Decimal(100), unit: "mm", step: new Decimal(1) },
    "H17": { origin: new Decimal(50), value: new Decimal(50), min: new Decimal(0), max: new Decimal(100), unit: "mm", step: new Decimal(1) },
    "H30-1": { origin: new Decimal(50), value: new Decimal(50), min: new Decimal(0), max: new Decimal(100), unit: "mm", step: new Decimal(1) },
    "H30-1-R": { origin: new Decimal(50), value: new Decimal(50), min: new Decimal(0), max: new Decimal(100), unit: "mm", step: new Decimal(1) },
    "H5-1": { origin: new Decimal(50), value: new Decimal(50), min: new Decimal(0), max: new Decimal(100), unit: "mm", step: new Decimal(1) },
    "H30-2": { origin: new Decimal(50), value: new Decimal(50), min: new Decimal(0), max: new Decimal(100), unit: "mm", step: new Decimal(1) },
    "H30-2-R": { origin: new Decimal(50), value: new Decimal(50), min: new Decimal(0), max: new Decimal(100), unit: "mm", step: new Decimal(1) },
    "L53-1": { origin: new Decimal(50), value: new Decimal(50), min: new Decimal(0), max: new Decimal(100), unit: "mm", step: new Decimal(1) },
    "W7": { origin: new Decimal(50), value: new Decimal(50), min: new Decimal(0), max: new Decimal(100), unit: "mm", step: new Decimal(1) },
    "W20-2": { origin: new Decimal(50), value: new Decimal(50), min: new Decimal(0), max: new Decimal(100), unit: "mm", step: new Decimal(1) },
    "W20-2-R": { origin: new Decimal(50), value: new Decimal(50), min: new Decimal(0), max: new Decimal(100), unit: "mm", step: new Decimal(1) },
    "W20-1": { origin: new Decimal(50), value: new Decimal(50), min: new Decimal(0), max: new Decimal(100), unit: "mm", step: new Decimal(1) },
    "W20-1-R": { origin: new Decimal(50), value: new Decimal(50), min: new Decimal(0), max: new Decimal(100), unit: "mm", step: new Decimal(1) },
    "WBPRP": { origin: new Decimal(50), value: new Decimal(50), min: new Decimal(0), max: new Decimal(100), unit: "mm", step: new Decimal(1) },
    "H5-2": { origin: new Decimal(50), value: new Decimal(50), min: new Decimal(0), max: new Decimal(100), unit: "mm", step: new Decimal(1) },
    "L53-1-R": { origin: new Decimal(50), value: new Decimal(50), min: new Decimal(0), max: new Decimal(100), unit: "mm", step: new Decimal(1) },
  }
  );

  function handleFolderSidebarOpen() {
    setConfigKey("unselect");
    setIsFolderSidebarOpen(prev => !prev);
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
  }

  function handleExecute() {
    const submitData: Record<string, string> = {};
    for (const key in configData) {
      if (Object.prototype.hasOwnProperty.call(configData, key) && key !== "unselect") {
        const changeValue = configData[key as ConfigKeyType].value.minus(configData[key as ConfigKeyType].origin);
        submitData[key as ConfigKeyType] = changeValue.toString();
      }
    }
    console.log(submitData);
  }

  return (
    <div className="h-screen w-screen flex flex-col" style={{fontFamily: "PlusJakartaSans"}} onContextMenu={(e) => e.preventDefault()}>
      {/* header */}
      <header className="relative h-16 w-full flex justify-center items-center border-b-[2px] border-[#5753C6]">
        <div className="absolute h-full left-8 top-0 flex justify-center items-center gap-5">
          <SidebarOpenIcon strokeWidth={1.5}/>
        </div>

        <div className="flex items-center justify-center gap-2">
          <img className="h-full w-auto" src={Logo} alt="xonar" />
          <span className="text-2xl font-medium">XONAR</span>
        </div>

        <div className="absolute h-full right-8 top-0 flex items-center justify-center gap-8">
          <SaveIcon strokeWidth={1.5}/>
          <FolderOpenIcon strokeWidth={1.5} onClick={handleFolderSidebarOpen}/>
        </div>
      </header>

      <div className="flex flex-1 w-full">
        <div className="h-full flex-1 transition-all duration-300 ease-in-out">
          {/* adjust */}
          <div className="w-full h-48">
            { configKey !== "unselect" && (
              <ParameterConfig config={configKey} configData={configData ? configData[configKey] : null} onChange={handleParameterChange}/>
            )}
          </div>
          {/* control */}
          <Control onChange={handleChangeConfig} configKey={configKey} configData={configData}/>

          <div className="mt-6 px-20 flex items-center justify-between gap-2">
            { selectedProfile && (
            <div className="text-[#666666] font-light flex flex-col gap-2" style={{fontFamily: "MiSans"}}>
              <div className="flex items-center gap-2">
                <FolderIcon width={20} height={20} stroke="#666666" strokeWidth={1.5}/>
                <div>Project 1</div>
              </div>

              <div className="flex items-center gap-2">
                <FileCogIcon width={20} height={20} stroke="#666666" strokeWidth={1.5}/>
                <div>Tesla Model S</div>
              </div>
            </div>
            )}

            { !isFolderSidebarOpen && selectedProfile && (
              <RoundedButton className="w-56 h-12 text-lg" onClick={handleExecute}>执行</RoundedButton>
            )}
          </div>
        </div>

        <ProjectsSidebar isOpen={isFolderSidebarOpen} onSelectProfile={setSelectedProfile}/>
      </div>
    </div>
  );
};

export default Index;