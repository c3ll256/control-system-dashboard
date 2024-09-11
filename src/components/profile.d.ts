export type ConfigKeyType =
  | "A18"
  | "L63"
  | "L50-2"
  | "L50-2-R"
  | "H17"
  | "H30-1"
  | "H30-1-R"
  | "H5-1"
  | "H30-2"
  | "H30-2-R"
  | "H5-2"
  | "L53-1"
  | "L53-1-R"
  | "W7"
  | "W20-2"
  | "W20-2-R"
  | "W20-1"
  | "W20-1-R"
  | "WBPRP"
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