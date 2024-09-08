import { ArchiveIcon, FileCogIcon, FolderIcon, FolderOpenIcon, PlusSquareIcon, SaveIcon, SidebarOpenIcon } from "lucide-react";
import Control, { ConfigType } from "@/components/control";
import { SliderHighlight } from "@/components/ui/slide-highlight";
import { useEffect, useRef, useState } from "react";
import Decimal from 'decimal.js';

import Logo from "@/assets/images/index/xonar.svg";
import "@/assets/css/fonts.css"
import { toast } from "sonner";
import ProjectsSidebar from "@/components/projects-sidebar";

export interface Config {
  origin: Decimal;
  value: Decimal;
  min: Decimal;
  max: Decimal;
  unit: string;
  step: Decimal;
}

const Index = () => {
  const [isFolderSidebarOpen, setIsFolderSidebarOpen] = useState(false);
  const [config, setConfig] = useState<ConfigType>("unselect");
  const [configData, setConfigData] = useState<Record<ConfigType, Config>>({
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
  });
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue(configData[config].value.toString());
  }, [config, configData]);

  function handleFolderSidebarOpen() {
    setConfig("unselect");
    setIsFolderSidebarOpen(prev => !prev);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!inputValue) {
      toast.error("请输入正确数值");
      return;
    }
    const newValue = new Decimal(inputValue);
    if (newValue.isNaN()) {
      toast.error("请输入正确数值");
      return;
    };
    setConfigData(prev => {
      let finalValue: Decimal;
      if (newValue.gte(prev[config].min) && newValue.lte(prev[config].max)) {
        finalValue = newValue;
      } else {
        finalValue = newValue.gt(prev[config].max) ? prev[config].max : prev[config].min;
      }
      return { ...prev, [config]: { ...prev[config], value: finalValue } };
    });
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function handleInputBlur() {
    setInputValue(configData[config].value.toString());
  }

  function handleInputFocus() {
    if (inputRef.current) {
      inputRef.current.select();
    }
  }

  function handleChangeConfig(config: ConfigType) {
    setConfig(config);
  }

  function handleChangeValue(value: number[]) {
    setConfigData(prev => ({ ...prev, [config]: { ...prev[config], value: new Decimal(value[0]) } }));
  }

  function handleChangeStep(step: number) {
    setConfigData(prev => {
      const newValue = prev[config].value.plus(prev[config].step.times(step));
      let finalValue: Decimal;
      if (newValue.gte(prev[config].min) && newValue.lte(prev[config].max)) {
        finalValue = newValue;
      } else {
        finalValue = newValue.gt(prev[config].max) ? prev[config].max : prev[config].min;
      }
      return { ...prev, [config]: { ...prev[config], value: finalValue } };
    });
  }

  function handleExecute() {
    const submitData: Record<string, string> = {};
    for (const key in configData) {
      if (Object.prototype.hasOwnProperty.call(configData, key) && key !== "unselect") {
        const changeValue = configData[key as ConfigType].value.minus(configData[key as ConfigType].origin);
        submitData[key as ConfigType] = changeValue.toString();
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
        <div className="h-full flex-1">
          {/* adjust */}
          <div className="w-full h-56 py-8">
            { config !== "unselect" && (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center gap-1">
                  <div className="mb-2 whitespace-nowrap text-lg">{ config }</div>
                  <div className="flex items-center justify-center gap-4">
                    <form 
                      className="w-56 h-12 leading-[2.5rem] text-highlight border-highlight/30 border text-2xl font-light bg-secondary rounded-full flex items-center justify-center gap-1"
                      onSubmit={handleSubmit}
                    >
                      <input
                        ref={inputRef}
                        type="number"
                        className="w-[60%] h-full outline-none bg-secondary text-center no-spinner"
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        onFocus={handleInputFocus}
                      />
                      <div className="text-xl font-light text-primary/40">{configData[config].unit}</div>
                    </form>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="flex items-center justify-center gap-6">
                    <div 
                      className="h-14 w-14 text-xl font-light bg-secondary rounded-full flex items-center justify-center" 
                      onClick={() => handleChangeStep(-10)}
                    >
                      -{configData[config].step.times(10).toString()}
                    </div>
                    <div 
                      className="h-14 w-14 text-3xl font-light bg-secondary rounded-full flex leading-[3.0rem] justify-center" 
                      onClick={() => handleChangeStep(-1)}
                    >
                      -
                    </div>
                  </div>

                  <div className="w-24 whitespace-nowrap text-center text-xl font-light text-primary/40">{configData[config].min.toString()} {configData[config].unit}</div>

                  <SliderHighlight 
                    className="w-[32rem]"
                    onValueChange={handleChangeValue}
                    value={[configData[config].value.toNumber()]}
                    min={configData[config].min.toNumber()}
                    max={configData[config].max.toNumber()}
                    step={configData[config].step.toNumber()}
                  />

                  <div className="w-24 whitespace-nowrap text-center text-xl font-light text-primary/40">{configData[config].max.toString()} {configData[config].unit}</div>

                  <div className="flex items-center justify-center gap-6">
                    <div 
                      className="h-14 w-14 text-3xl font-light bg-secondary rounded-full flex leading-[2.8rem] justify-center"
                      onClick={() => handleChangeStep(1)}
                    >
                      +
                    </div>
                    <div 
                      className="h-14 w-14 text-xl font-light bg-secondary rounded-full flex items-center justify-center" 
                      onClick={() => handleChangeStep(10)}
                    >
                      +{configData[config].step.times(10).toString()}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-8 text-lg">
                  <div className="flex items-center gap-1">
                    <PlusSquareIcon strokeWidth={1.5}/>
                    {configData[config].value.minus(configData[config].origin).toString()} {configData[config].unit}
                  </div>

                  <div className="flex items-center gap-1">
                    <ArchiveIcon strokeWidth={1.5}/>
                    {configData[config].origin.toString()} {configData[config].unit}
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* control */}
          <Control onChange={handleChangeConfig} config={config} configData={configData}/>

          <div className="mt-6 px-14 flex items-center justify-between gap-2">
            <div className="text-[#666666] text-xl font-light flex flex-col gap-2" style={{fontFamily: "MiSans"}}>
              <div className="flex items-center gap-2">
                <FolderIcon width={20} height={20} stroke="#666666" strokeWidth={1.5}/>
                <div>Project 1</div>
              </div>

              <div className="flex items-center gap-2">
                <FileCogIcon width={20} height={20} stroke="#666666" strokeWidth={1.5}/>
                <div>Tesla Model S</div>
              </div>
            </div>

            { !isFolderSidebarOpen && (
              <button
                className="w-64 h-12 rounded-full border-primary/10
                border bg-secondary text-xl font-light text-primary 
                active:bg-secondary/70 active:text-primary/70 transition-all duration-100 ease-in-out"
                style={{fontFamily: "MiSans"}}
                onClick={handleExecute}
              >
                执行
              </button>
            )}
          </div>
        </div>

        <ProjectsSidebar isOpen={isFolderSidebarOpen} onClose={() => setIsFolderSidebarOpen(false)}/>
      </div>
    </div>
  );
};

export default Index;