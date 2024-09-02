import { FolderOpenIcon, Redo2Icon, SaveIcon, Undo2Icon } from "lucide-react";
import Control, { ConfigType } from "@/components/control";
import { SliderHighlight } from "@/components/ui/slide-highlight";
import Logo from "@/assets/images/index/xonar.svg";
import "@/assets/css/fonts.css"
import { useState } from "react";

interface Config {
  origin: number;
  value: number;
  min: number;
  max: number;
  unit: string;
}

const Index = () => {
  const [config, setConfig] = useState<ConfigType>("unselect");
  const [configData, setConfigData] = useState<Record<ConfigType, Config>>({
    "unselect": { origin: 0, value: 0, min: 0, max: 0, unit: "mm" },
    "A18": { origin: 50, value: 50, min: 0, max: 100, unit: "mm" },
    "L53-L11": { origin: 50, value: 50, min: 0, max: 100, unit: "mm" },
    "L50-2": { origin: 50, value: 50, min: 0, max: 100, unit: "mm" },
    "L50-2-R": { origin: 50, value: 50, min: 0, max: 100, unit: "mm" },
    "H17": { origin: 50, value: 50, min: 0, max: 100, unit: "mm" },
    "H30-1": { origin: 50, value: 50, min: 0, max: 100, unit: "mm" },
    "H30-1-R": { origin: 50, value: 50, min: 0, max: 100, unit: "mm" },
    "H5-1": { origin: 50, value: 50, min: 0, max: 100, unit: "mm" },
    "H30-2": { origin: 50, value: 50, min: 0, max: 100, unit: "mm" },
    "H30-2-R": { origin: 50, value: 50, min: 0, max: 100, unit: "mm" },
    "L53-1": { origin: 50, value: 50, min: 0, max: 100, unit: "mm" },
    "W7": { origin: 50, value: 50, min: 0, max: 100, unit: "mm" },
    "W20-2": { origin: 50, value: 50, min: 0, max: 100, unit: "mm" },
    "W20-2-R": { origin: 50, value: 50, min: 0, max: 100, unit: "mm" },
    "W20-1": { origin: 50, value: 50, min: 0, max: 100, unit: "mm" },
    "W20-1-R": { origin: 50, value: 50, min: 0, max: 100, unit: "mm" },
    "W8": { origin: 50, value: 50, min: 0, max: 100, unit: "mm" },
  });

  function handleChangeConfig(config: ConfigType) {
    setConfig(config);
  }

  function handleChangeValue(value: number[]) {
    setConfigData(prev => ({ ...prev, [config]: { ...prev[config], value: value[0] } }));
  }

  function handleChangeStep(step: number) {
    setConfigData(prev => {
      const newValue = prev[config].value + step;
      if (newValue >= prev[config].min && newValue <= prev[config].max) {
        return { ...prev, [config]: { ...prev[config], value: newValue } };
      }
      return prev;
    });
  }

  return (
    <div className="h-screen w-screen flex flex-col" style={{fontFamily: "PlusJakartaSans"}}>
      {/* header */}
      <header className="relative h-16 w-full px-10 flex justify-center items-center border-b-[2px] border-[#5753C6]">
        <div className="absolute h-full left-10 top-0 flex justify-center items-center gap-5">
          <div className="text-xl">工程1</div>
          <div className="text-sm px-3 py-1 rounded-full bg-[#0D3C48]">FOMULAR 验证</div>
        </div>

        <div className="flex items-center justify-center gap-2">
          <img className="h-full w-auto" src={Logo} alt="xonar" />
          <span className="text-2xl font-medium">XONAR</span>
        </div>

        <div className="absolute h-full right-10 top-0 flex items-center justify-center gap-5">
          <div className="bg-secondary rounded-full p-3">
            <SaveIcon />
          </div>
          <div className="bg-secondary rounded-full p-3">
            <FolderOpenIcon />
          </div>
        </div>
      </header>

      {/* adjust */}
      <div className="w-full h-64 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-1">
          <div className="mb-2 whitespace-nowrap">{ config !== "unselect" ? config : "未选择" }</div>
          <div className="flex items-center justify-center gap-4">
            <div className="h-10 w-10 flex items-center justify-center bg-secondary rounded-full"><Undo2Icon /></div>
            <div className="w-48 h-10 leading-[2.5rem] text-center text-highlight text-2xl font-light bg-secondary rounded-full">{configData[config].value} mm</div>
            <div className="h-10 w-10 flex items-center justify-center bg-secondary rounded-full"><Redo2Icon /></div>
          </div>
          <div className="text-md text-highlight">{configData[config].value - configData[config].origin} mm</div>
        </div>

        <div className="flex items-center justify-center gap-6">
          <div className="flex items-center justify-center gap-6">
            <div className="h-14 w-14 text-2xl font-light bg-secondary rounded-full flex items-center justify-center" onClick={() => handleChangeStep(-10)}>-10</div>
            <div className="h-14 w-14 text-4xl font-light bg-secondary rounded-full flex leading-[3.0rem] justify-center" onClick={() => handleChangeStep(-1)}>-</div>
          </div>

          <div className="w-24 whitespace-nowrap text-center text-xl font-light text-primary/40">{configData[config].min} mm</div>

          <SliderHighlight className="w-[32rem]" onValueChange={handleChangeValue} value={[configData[config].value]} min={configData[config].min} max={configData[config].max} step={1} />

          <div className="w-24 whitespace-nowrap text-center text-xl font-light text-primary/40">{configData[config].max} mm</div>

          <div className="flex items-center justify-center gap-6">
            <div className="h-14 w-14 text-4xl font-light bg-secondary rounded-full flex leading-[2.8rem] justify-center" onClick={() => handleChangeStep(1)}>+</div>
            <div className="h-14 w-14 text-2xl font-light bg-secondary rounded-full flex items-center justify-center" onClick={() => handleChangeStep(10)}>+10</div>
          </div>
        </div>
      </div>

      {/* control */}
      <Control onChange={handleChangeConfig}/>
    </div>
  );
};

export default Index;