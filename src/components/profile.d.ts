export type ConfigKeyType =
  | "L99-1"
  | "L50-2"
  | "L6"
  | "A18"
  | "H17"
  | "H30-1"
  | "H30-2"
  | "H5-1"
  | "H5-2"
  | "W7"
  | "W20-1"
  | "W20-2"
  | "W-BPRP"
  | "unselect";

export type ConfigDataType = {
  origin: Decimal;
  value: Decimal;
  min: Decimal;
  max: Decimal;
  unit: string;
  step: Decimal;
};

export type ConfigDataStringType = {
  origin: string;
  value: string;
  min: string;
  max: string;
  unit: string;
  step: string;
};