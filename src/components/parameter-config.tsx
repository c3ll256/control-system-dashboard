import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { SliderHighlight } from "@/components/ui/slide-highlight";
import PlusMinusSquareIcon from "@/components/icon/PlusMinusSquareIcon";
import { ArchiveIcon } from "lucide-react";
import Decimal from "decimal.js";
import { ConfigDataType, ConfigKeyType } from "./profile";

interface ParameterConfigProps {
  configData: ConfigDataType | null;
  onChange: (config: ConfigDataType) => void;
  config: ConfigKeyType;
}


export default function ParameterConfig({configData, onChange, config}: ParameterConfigProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (configData) {
      setInputValue(configData.value.toString());
    }
  }, [config, configData]);

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
    if (!configData) {
      toast.error("请先选择一个配置");
      return;
    }
    let finalValue: Decimal;
    if (newValue.gte(configData.min) && newValue.lte(configData.max)) {
      finalValue = newValue;
    } else {
      finalValue = newValue.gt(configData.max) ? configData.max : configData.min;
    }
    onChange({ ...configData, value: finalValue });
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function handleInputBlur() {
    if (!configData) {
      toast.error("请先选择一个配置");
      return;
    }
    setInputValue(configData.value.toString());
  }

  function handleInputFocus() {
    if (!configData) {
      toast.error("请先选择一个配置");
      return;
    }
    if (inputRef.current) {
      inputRef.current.select();
    }
  }

  function handleChangeValue(value: number[]) {
    if (!configData) {
      toast.error("请先选择一个配置");
      return;
    }
    onChange({ ...configData, value: new Decimal(value[0]) });
  }

  function handleChangeStep(step: number) {
    if (!configData) {
      toast.error("请先选择一个配置");
      return;
    }
    const newValue = configData.value.plus(configData.step.times(step));
    let finalValue: Decimal;
    if (newValue.gte(configData.min) && newValue.lte(configData.max)) {
      finalValue = newValue;
    } else {
      finalValue = newValue.gt(configData.max) ? configData.max : configData.min;
    }
    onChange({ ...configData, value: finalValue });
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-1">
        <div className="flex items-center justify-center gap-4">
          <form
            className="w-52 h-10 leading-[2.5rem] text-highlight border-highlight/30 border text-2xl font-light bg-secondary rounded-full flex items-center justify-center gap-1"
            onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="number"
              className="w-[60%] h-full outline-none bg-secondary text-center no-spinner"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onFocus={handleInputFocus}
            />
            <div className="text-xl font-light text-primary/40">
              {configData?.unit}
            </div>
          </form>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="flex items-center justify-center gap-6">
          <div
            className="h-14 w-14 text-xl font-light bg-secondary rounded-full flex items-center justify-center"
            onClick={() => handleChangeStep(-10)}>
            -{configData?.step.times(10).toString()}
          </div>
          <div
            className="h-14 w-14 text-3xl font-light bg-secondary rounded-full flex leading-[3.0rem] justify-center"
            onClick={() => handleChangeStep(-1)}>
            -
          </div>
        </div>

        <div className="w-24 whitespace-nowrap text-center text-xl font-light text-primary/40">
          {configData?.min.toString()} {configData?.unit}
        </div>

        <SliderHighlight
          className="w-[32rem]"
          onValueChange={handleChangeValue}
          value={[configData?.value.toNumber() ?? 0]}
          min={configData?.min.toNumber() ?? 0}
          max={configData?.max.toNumber() ?? 0}
          step={configData?.step.toNumber() ?? 0}
        />

        <div className="w-24 whitespace-nowrap text-center text-xl font-light text-primary/40">
          {configData?.max.toString()} {configData?.unit}
        </div>

        <div className="flex items-center justify-center gap-6">
          <div
            className="h-14 w-14 text-3xl font-light bg-secondary rounded-full flex leading-[2.8rem] justify-center"
            onClick={() => handleChangeStep(1)}>
            +
          </div>
          <div
            className="h-14 w-14 text-xl font-light bg-secondary rounded-full flex items-center justify-center"
            onClick={() => handleChangeStep(10)}>
            +{configData?.step.times(10).toString()}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-8 text-lg">
        <div className="flex items-center gap-1">
          <PlusMinusSquareIcon />
          {configData?.value
            .minus(configData?.origin)
            .toString()}{" "}
          {configData?.unit}
        </div>

        <div className="flex items-center gap-1">
          <ArchiveIcon strokeWidth={1.5} />
          {configData?.origin.toString()} {configData?.unit}
        </div>
      </div>
    </div>
  );
}
