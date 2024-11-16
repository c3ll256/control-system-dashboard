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

interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

export function checkA18H17Validity(A18: Decimal, H17: Decimal): ValidationResult {
  const PI = new Decimal(Math.PI);
  
  function rad(degree: Decimal): Decimal {
    return degree.mul(PI).div(180);
  }

  function solveEquation(thetaDegrees: Decimal): Decimal {
    const thetaRadians = rad(thetaDegrees);
    
    // 简化版的二分法求解，实际使用时可能需要更精确的实现
    let low = new Decimal(0);
    let high = new Decimal(1000);
    while (high.sub(low).greaterThan(0.0001)) {
      const mid = low.add(high).div(2);
      const value = new Decimal(270).pow(2)
        .sub(mid.pow(2))
        .sub(new Decimal(180).pow(2))
        .add(mid.mul(2).mul(180).mul(PI.div(2).add(thetaRadians).cos()));
      
      if (value.greaterThan(0)) {
        low = mid;
      } else {
        high = mid;
      }
    }
    return low.add(high).div(2);
  }

  function calcZ(angle: Decimal): Decimal {
    return new Decimal(180).mul(angle.sin()).div(new Decimal(90).sub(angle).sin());
  }

  try {
    // 检查 A18 是否在合理范围内（假设范围是 0 到 90 度）
    if (A18.lessThan(0) || A18.greaterThan(90)) {
      return { isValid: false, errorMessage: 'A18 角度超出合理范围（0-90度）' };
    }

    // 检查 H17 是否为正数
    if (H17.lessThanOrEqualTo(0)) {
      return { isValid: false, errorMessage: 'H17 必须是正数' };
    }

    const AB = solveEquation(A18);
    const z = calcZ(rad(A18));
    const ABMove = new Decimal(583.6).sub(H17).add(z);
    const BFinal = AB.add(ABMove).sub(139.6);

    console.log('AB', AB.toString());
    console.log('z', z.toString());
    console.log('ABMove', ABMove.toString());
    console.log('BFinal', BFinal.toString());

    // 检查 B 电机移动距离是否超出范围
    // if (BFinal.greaterThan(270)) {
    //   return { isValid: false, errorMessage: '电机移动距离超出范围' };
    // }

    return { isValid: true };
  } catch (error) {
    return { isValid: false, errorMessage: '计算过程中发生错误' };
  }
}