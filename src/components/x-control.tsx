import ControlBg from "@/assets/images/index/x-control-bg.png";
import { ConfigDataType, ConfigKeyType } from "./profile";

export default function Control({
  disabled,
  onChange,
  configKey,
  configData,
}: {
  disabled: boolean;
  onChange: (config: ConfigKeyType) => void;
  configKey: ConfigKeyType;
  configData: Record<ConfigKeyType, ConfigDataType> | null;
}) {
  function handleClickConfig(config: ConfigKeyType) {
    if (disabled) return;
    onChange(config);
  }

  return (
    <div className="flex items-center justify-center w-full relative">
      <img src={ControlBg} alt="" className="w-full h-auto" />

      <div className="absolute z-50 w-full h-full top-0 left-0 flex items-center justify-center">
        {configData && (
          <svg
            className="w-full h-full"
            viewBox="0 0 388 380"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <g id="data">
              <g id="line">
                <line
                  id="Line 309"
                  x1="108.75"
                  y1="264"
                  x2="108.75"
                  y2="144"
                  stroke="#666666"
                  strokeWidth="0.5"
                />
                <line
                  id="Line 310"
                  x1="193.75"
                  y1="380"
                  x2="193.75"
                  y2="144"
                  stroke="#666666"
                  strokeWidth="0.5"
                />
              </g>
              <g id="dots">
                <circle id="Ellipse 3" cx="109" cy="227" r="3" fill="#CCCCCC" />
                <circle id="Ellipse 5" cx="131" cy="309" r="3" fill="#CCCCCC" />
                <circle id="Ellipse 4" cx="109" cy="144" r="3" fill="#CCCCCC" />
              </g>
              <g id="values">
                <g
                  id="W-BPRP"
                  onClick={() => handleClickConfig("W-BPRP")}
                  fill={configKey === "W-BPRP" ? "#00EEFF" : "#CCCCCC"}>
                  <path
                    id="Line 307"
                    d="M131 309L135.5 311.598L135.5 306.402L131 309ZM194 309L189.5 306.402L189.5 311.598L194 309ZM135.05 309.45L189.95 309.45L189.95 308.55L135.05 308.55L135.05 309.45Z"
                  />
                  <text
                    id="389 mm"
                    xmlSpace="preserve"
                    style={{ whiteSpace: "pre" }}
                    fontFamily="PlusJakartaSans"
                    fontSize="11"
                    fontWeight="300"
                    letterSpacing="0em">
                    <tspan x="136" y="335.488">
                      {configData["W-BPRP"].value.toString()}{" "}
                      {configData["W-BPRP"].unit}
                    </tspan>
                  </text>
                  <text
                    id="W-BPRP_2"
                    xmlSpace="preserve"
                    style={{ whiteSpace: "pre" }}
                    fontFamily="PlusJakartaSans"
                    fontSize="12"
                    letterSpacing="0em">
                    <tspan x="136" y="324.396">
                      W-AHP
                    </tspan>
                  </text>
                </g>
                <g
                  id="W20-2"
                  onClick={() => handleClickConfig("W20-2")}
                  fill={configKey === "W20-2" ? "#00EEFF" : "#CCCCCC"}>
                  <path
                    id="Line 308"
                    d="M109 264L113.5 266.598L113.5 261.402L109 264ZM194 264L189.5 261.402L189.5 266.598L194 264ZM113.05 264.45L189.95 264.45L189.95 263.55L113.05 263.55L113.05 264.45Z"
                  />
                  <text
                    id="436 mm"
                    xmlSpace="preserve"
                    style={{ whiteSpace: "pre" }}
                    fontFamily="PlusJakartaSans"
                    fontSize="11"
                    fontWeight="300"
                    letterSpacing="0em">
                    <tspan x="114" y="290.488">
                      {configData["W20-2"].value.toString()}{" "}
                      {configData["W20-2"].unit}
                    </tspan>
                  </text>
                  <text
                    id="W20-2_2"
                    xmlSpace="preserve"
                    style={{ whiteSpace: "pre" }}
                    fontFamily="PlusJakartaSans"
                    fontSize="12"
                    letterSpacing="0em">
                    <tspan x="114" y="279.396">
                      W20-2
                    </tspan>
                  </text>
                </g>
                <g
                  id="W20-1"
                  onClick={() => handleClickConfig("W20-1")}
                  fill={configKey === "W20-1" ? "#00EEFF" : "#CCCCCC"}>
                  <path
                    id="Line 306"
                    d="M109 227L113.5 229.598L113.5 224.402L109 227ZM194 227L189.5 224.402L189.5 229.598L194 227ZM113.05 227.45L189.95 227.45L189.95 226.55L113.05 226.55L113.05 227.45Z"
                  />
                  <text
                    id="436 mm_2"
                    xmlSpace="preserve"
                    style={{ whiteSpace: "pre" }}
                    fontFamily="PlusJakartaSans"
                    fontSize="11"
                    fontWeight="300"
                    letterSpacing="0em">
                    <tspan x="114" y="253.488">
                      {configData["W20-1"].value.toString()}{" "}
                      {configData["W20-1"].unit}
                    </tspan>
                  </text>
                  <text
                    id="W20-1_2"
                    xmlSpace="preserve"
                    style={{ whiteSpace: "pre" }}
                    fontFamily="PlusJakartaSans"
                    fontSize="12"
                    letterSpacing="0em">
                    <tspan x="114" y="242.396">
                      W20-1
                    </tspan>
                  </text>
                </g>
                <g
                  id="W7"
                  onClick={() => handleClickConfig("W7")}
                  fill={configKey === "W7" ? "#00EEFF" : "#CCCCCC"}>
                  <path
                    id="Line 305"
                    d="M109 144L113.5 146.598L113.5 141.402L109 144ZM194 144L189.5 141.402L189.5 146.598L194 144ZM113.05 144.45L189.95 144.45L189.95 143.55L113.05 143.55L113.05 144.45Z"
                  />
                  <text
                    id="430 mm"
                    xmlSpace="preserve"
                    style={{ whiteSpace: "pre" }}
                    fontFamily="PlusJakartaSans"
                    fontSize="11"
                    fontWeight="300"
                    letterSpacing="0em">
                    <tspan x="114" y="170.488">
                    {configData["W7"].value.toString()}{" "}
                    {configData["W7"].unit}
                    </tspan>
                  </text>
                  <text
                    id="W7_2"
                    xmlSpace="preserve"
                    style={{ whiteSpace: "pre" }}
                    fontFamily="PlusJakartaSans"
                    fontSize="12"
                    letterSpacing="0em">
                    <tspan x="114" y="159.396">
                      W7
                    </tspan>
                  </text>
                </g>
              </g>
            </g>
          </svg>
        )}
      </div>
    </div>
  );
}
