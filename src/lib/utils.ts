import { ConfigDataStringType, ConfigDataType, ConfigKeyType } from "@/components/profile";
import { clsx, type ClassValue } from "clsx"
import Decimal from "decimal.js";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertDecimalDataToStringData(data: Record<ConfigKeyType, ConfigDataType>) {
  const stringData: Record<ConfigKeyType, ConfigDataStringType> = {} as Record<ConfigKeyType, ConfigDataStringType>;
  
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const configKey = key as ConfigKeyType;
      stringData[configKey] = {
        origin: data[configKey].origin?.toString() ?? '',
        value: data[configKey].value?.toString() ?? '',
        min: data[configKey].min?.toString() ?? '',
        max: data[configKey].max?.toString() ?? '',
        unit: data[configKey].unit ?? '',
        step: data[configKey].step.toString() 
      };
    }
  }
  return stringData as Record<ConfigKeyType, Record<keyof ConfigDataType, string>>;
}

export function convertStringDataToDecimalData(data: Record<ConfigKeyType, ConfigDataStringType>) {
  const decimalData: Record<ConfigKeyType, ConfigDataType> = {} as Record<ConfigKeyType, ConfigDataType>;
  
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const configKey = key as ConfigKeyType;
      decimalData[configKey] = {
        origin: new Decimal(data[configKey].origin),
        value: new Decimal(data[configKey].value),
        min: new Decimal(data[configKey].min),
        max: new Decimal(data[configKey].max),
        unit: data[configKey].unit,
        step: new Decimal(data[configKey].step)
      };
    }
  }
  return decimalData as Record<ConfigKeyType, ConfigDataType>;
}