import React, { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { SliderHighlight } from "@/components/ui/slide-highlight";
import PlusMinusSquareIcon from "@/components/icon/PlusMinusSquareIcon";
import { ArchiveIcon } from "lucide-react";
import Decimal from "decimal.js";
import { ConfigDataType, ConfigKeyType } from "./profile";
import { checkA18H17Validity } from "@/lib/utils";

interface ParameterConfigProps {
  configData: Record<ConfigKeyType, ConfigDataType> | null;
  onChange: (newConfigData: Record<ConfigKeyType, ConfigDataType>) => void;
  onChangeBuck: (newBuckData: Record<string, Decimal>) => void;
  config: ConfigKeyType;
}


export default function ParameterConfig({configData, onChange, onChangeBuck, config}: ParameterConfigProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const currentConfig = useMemo(() => configData?.[config], [config, configData]);

  useEffect(() => {
    if (currentConfig) {
      setInputValue(currentConfig.value.toString());
    }
  }, [currentConfig]);

  function handleValueChange(newValue: Decimal | number) {
    if (!currentConfig) {
      toast.error("请先选择一个配置");
      return;
    }

    const decimalValue = new Decimal(newValue);
    if (decimalValue.isNaN()) {
      toast.error("请输入正确数值");
      return;
    }

    if (!configData) return;

    let finalValue: Decimal;
    if (decimalValue.gte(currentConfig.min) && decimalValue.lte(currentConfig.max)) {
      finalValue = decimalValue;
    } else {
      finalValue = decimalValue.gt(currentConfig.max) ? currentConfig.max : currentConfig.min;
    }

    const changeDis = finalValue.minus(currentConfig.value);
    const changeBuck = { [config]: changeDis };

    if (config === "L53-1") {
      configData["L50-2"].value = configData["L50-2"].value.minus(changeDis);
    }

    if (config === "L53-1-R") {
      configData["L50-2-R"].value = configData["L50-2-R"].value.minus(changeDis);
    }

    if (config === "H5-1") {
      configData["H5-2"].value = configData["H5-2"].value.add(changeDis);
    }

    if (config === "H5-2") {
      configData["H5-1"].value = configData["H5-1"].value.add(changeDis);
    }

    if (config === "H30-1") {
      configData["H5-1"].value = configData["H5-1"].value.add(changeDis);
    }

    if (config === "H30-2") {
      configData["H5-2"].value = configData["H5-2"].value.add(changeDis);
    }

    if (config === "A18" || config === "H17") {
      let validationResult;
      if (config === "A18") {
        validationResult = checkA18H17Validity(finalValue, configData["H17"].value);
      }

      if (config === "H17") {
        validationResult = checkA18H17Validity(configData["A18"].value, finalValue);
      }

      if (validationResult && !validationResult.isValid) {
        toast.error(validationResult.errorMessage);
        return;
      }
    }

    configData[config].value = finalValue;
    onChangeBuck(changeBuck);

    onChange(configData);
    setInputValue(finalValue.toString());
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleValueChange(new Decimal(inputValue));
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function handleInputBlur() {
    handleValueChange(new Decimal(inputValue));
  }

  function handleInputFocus() {
    if (inputRef.current) {
      inputRef.current.select();
    }
  }

  function handleSliderChange(value: number[]) {
    handleValueChange(value[0]);
  }

  function handleStepChange(step: number) {
    if (!currentConfig) return;
    const newValue = currentConfig.value.plus(currentConfig.step.times(step));
    handleValueChange(newValue);
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
              {currentConfig?.unit}
            </div>
          </form>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="flex items-center justify-center gap-6">
          <div
            className="h-14 w-14 text-xl font-light bg-secondary rounded-full flex items-center justify-center"
            onClick={() => handleStepChange(-10)}>
            -{currentConfig?.step.times(10).toString()}
          </div>
          <div
            className="h-14 w-14 text-3xl font-light bg-secondary rounded-full flex leading-[3.0rem] justify-center"
            onClick={() => handleStepChange(-1)}>
            -
          </div>
        </div>

        <div className="w-24 whitespace-nowrap text-center text-xl font-light text-primary/40">
          {currentConfig?.min.toString()} {currentConfig?.unit}
        </div>

        <SliderHighlight
          className="w-[32rem]"
          onValueChange={handleSliderChange}
          value={[currentConfig?.value.toNumber() ?? 0]}
          min={currentConfig?.min.toNumber() ?? 0}
          max={currentConfig?.max.toNumber() ?? 0}
          step={currentConfig?.step.toNumber() ?? 0}
        />

        <div className="w-24 whitespace-nowrap text-center text-xl font-light text-primary/40">
          {currentConfig?.max.toString()} {currentConfig?.unit}
        </div>

        <div className="flex items-center justify-center gap-6">
          <div
            className="h-14 w-14 text-3xl font-light bg-secondary rounded-full flex leading-[2.8rem] justify-center"
            onClick={() => handleStepChange(1)}>
            +
          </div>
          <div
            className="h-14 w-14 text-xl font-light bg-secondary rounded-full flex items-center justify-center"
            onClick={() => handleStepChange(10)}>
            +{currentConfig?.step.times(10).toString()}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-8 text-lg">
        <div className="flex items-center gap-1">
          <PlusMinusSquareIcon />
          {currentConfig?.value
            .minus(currentConfig?.origin)
            .toString()}{" "}
          {currentConfig?.unit}
        </div>

        <div className="flex items-center gap-1">
          <ArchiveIcon strokeWidth={1.5} />
          {currentConfig?.origin.toString()} {currentConfig?.unit}
        </div>
      </div>
    </div>
  );
}
