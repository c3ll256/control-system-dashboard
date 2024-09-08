import { Config } from "@/pages";
import ControlBg from "@/assets/images/index/control-bg.png";

export type ConfigType =
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

export default function Control({
  onChange,
  config,
  configData,
}: {
  onChange: (config: ConfigType) => void;
  config: ConfigType;
  configData: Record<ConfigType, Config>;
}) {
  function handleClickConfig(config: ConfigType) {
    onChange(config);
  }

  return (
    <div className="flex items-center justify-center w-full px-24 relative">
      <div className="absolute w-full h-full top-0 left-0 px-24 flex items-center justify-center">
        <img src={ControlBg} alt="" className="w-full h-auto" />
      </div>

      <svg
        className="w-full h-auto z-50"
        viewBox="0 0 988 380"
        xmlns="http://www.w3.org/2000/svg">
        <g id="Group 33934">
          <g id="X Plane">
            <g id="data">
              <g id="line">
                <line
                  id="Line 309"
                  x1="709"
                  y1="307"
                  x2="709"
                  y2="144"
                  stroke="#666666"
                  strokeWidth="0.5"
                />
                <line
                  id="Line 313"
                  x1="879"
                  y1="227"
                  x2="879"
                  y2="191"
                  stroke="#666666"
                  strokeWidth="0.5"
                />
                <line
                  id="Line 310"
                  x1="794"
                  y1="380"
                  x2="794"
                  y2="1"
                  stroke="#666666"
                  strokeWidth="0.5"
                />
              </g>
              <g id="Group 33937">
                <circle
                  id="Ellipse 3"
                  cx="708.799"
                  cy="227"
                  r="3"
                  fill="#CCCCCC"
                />
                <circle
                  id="Ellipse 4"
                  cx="878.799"
                  cy="227"
                  r="3"
                  fill="#CCCCCC"
                />
              </g>
              <g id="Group 33941">
                <g
                  id="W7"
                  onClick={() => handleClickConfig("W7")}
                  fill={config === "W7" ? "#00EEFF" : "#CCCCCC"}>
                  <text
                    id="430 mm"
                    xmlSpace="preserve"
                    style={{ whiteSpace: "nowrap" }}
                    fontFamily="PlusJakartaSans"
                    fontSize="11"
                    fontWeight="300"
                    letterSpacing="0em">
                    <tspan x="730.397" y="155.488">
                      {configData["W7"].value.toString()}{" "}
                      {configData["W7"].unit}
                    </tspan>
                  </text>
                  <text
                    id="W7_2"
                    xmlSpace="preserve"
                    style={{ whiteSpace: "nowrap" }}
                    fontFamily="PlusJakartaSans"
                    fontSize="12"
                    letterSpacing="0em">
                    <tspan x="742.336" y="141.396">
                      W7
                    </tspan>
                  </text>
                  <path
                    id="Line 305"
                    d="M709 144L713.5 146.598L713.5 141.402L709 144ZM794 144L789.5 141.402L789.5 146.598L794 144ZM713.05 144.45L789.95 144.45L789.95 143.55L713.05 143.55L713.05 144.45Z"
                  />
                </g>
                <g
                  id="W20-1"
                  onClick={() => handleClickConfig("W20-1")}
                  fill={config === "W20-1" ? "#00EEFF" : "#CCCCCC"}>
                  <text
                    id="436 mm"
                    xmlSpace="preserve"
                    style={{ whiteSpace: "nowrap" }}
                    fontFamily="PlusJakartaSans"
                    fontSize="11"
                    fontWeight="300"
                    letterSpacing="0em">
                    <tspan x="731.117" y="238.488">
                      {configData["W20-1"].value.toString()}{" "}
                      {configData["W20-1"].unit}
                    </tspan>
                  </text>
                  <text
                    id="W20-1_2"
                    xmlSpace="preserve"
                    style={{ whiteSpace: "nowrap" }}
                    fontFamily="PlusJakartaSans"
                    fontSize="12"
                    letterSpacing="0em">
                    <tspan x="732.236" y="224.396">
                      W20-1
                    </tspan>
                  </text>
                  <path
                    id="Line 306"
                    d="M709 227L713.5 229.598L713.5 224.402L709 227ZM794 227L789.5 224.402L789.5 229.598L794 227ZM713.05 227.45L789.95 227.45L789.95 226.55L713.05 226.55L713.05 227.45Z"
                  />
                </g>
                <g
                  id="WBPRP"
                  onClick={() => handleClickConfig("WBPRP")}
                  fill={config === "WBPRP" ? "#00EEFF" : "#CCCCCC"}>
                  <text
                    id="389 mm"
                    xmlSpace="preserve"
                    style={{ whiteSpace: "nowrap" }}
                    fontFamily="PlusJakartaSans"
                    fontSize="11"
                    fontWeight="300"
                    letterSpacing="0em">
                    <tspan x="731.123" y="318.488">
                      {configData["WBPRP"].value.toString()}{" "}
                      {configData["WBPRP"].unit}
                    </tspan>
                  </text>
                  <text
                    id="WBPRP_2"
                    xmlSpace="preserve"
                    style={{ whiteSpace: "nowrap" }}
                    fontFamily="PlusJakartaSans"
                    fontSize="12"
                    letterSpacing="0em">
                    <tspan x="730.379" y="304.396">
                      WBPRP
                    </tspan>
                  </text>
                  <path
                    id="Line 307"
                    d="M709 307L713.5 309.598L713.5 304.402L709 307ZM794 307L789.5 304.402L789.5 309.598L794 307ZM713.05 307.45L789.95 307.45L789.95 306.55L713.05 306.55L713.05 307.45Z"
                  />
                </g>
                <g
                  id="W20-2"
                  onClick={() => handleClickConfig("W20-2")}
                  fill={config === "W20-2" ? "#00EEFF" : "#CCCCCC"}>
                  <text
                    id="436 mm_2"
                    xmlSpace="preserve"
                    style={{ whiteSpace: "nowrap" }}
                    fontFamily="PlusJakartaSans"
                    fontSize="11"
                    fontWeight="300"
                    letterSpacing="0em">
                    <tspan x="731.117" y="202.488">
                      {configData["W20-2"].value.toString()}{" "}
                      {configData["W20-2"].unit}
                    </tspan>
                  </text>
                  <text
                    id="W20-2_2"
                    xmlSpace="preserve"
                    style={{ whiteSpace: "nowrap" }}
                    fontFamily="PlusJakartaSans"
                    fontSize="12"
                    letterSpacing="0em">
                    <tspan x="730.365" y="188.396">
                      W20-2
                    </tspan>
                  </text>
                  <path
                    id="Line 308"
                    d="M709 191L713.5 193.598L713.5 188.402L709 191ZM794 191L789.5 188.402L789.5 193.598L794 191ZM713.05 191.45L789.95 191.45L789.95 190.55L713.05 190.55L713.05 191.45Z"
                  />
                </g>
                <g
                  id="W20-1-R"
                  onClick={() => handleClickConfig("W20-1-R")}
                  fill={config === "W20-1-R" ? "#00EEFF" : "#CCCCCC"}>
                  <text
                    id="432 mm"
                    xmlSpace="preserve"
                    style={{ whiteSpace: "nowrap" }}
                    fontFamily="PlusJakartaSans"
                    fontSize="11"
                    fontWeight="300"
                    letterSpacing="0em">
                    <tspan x="816.133" y="238.488">
                      {configData["W20-1-R"].value.toString()}{" "}
                      {configData["W20-1-R"].unit}
                    </tspan>
                  </text>
                  <text
                    id="W20-1-R_2"
                    xmlSpace="preserve"
                    style={{ whiteSpace: "nowrap" }}
                    fontFamily="PlusJakartaSans"
                    fontSize="12"
                    letterSpacing="0em">
                    <tspan x="809.254" y="224.396">
                      W20-1-R
                    </tspan>
                  </text>
                  <path
                    id="Line 311"
                    d="M794 227L798.5 229.598L798.5 224.402L794 227ZM879 227L874.5 224.402L874.5 229.598L879 227ZM798.05 227.45L874.95 227.45L874.95 226.55L798.05 226.55L798.05 227.45Z"
                  />
                </g>
                <g
                  id="W20-2-R"
                  onClick={() => handleClickConfig("W20-2-R")}
                  fill={config === "W20-2-R" ? "#00EEFF" : "#CCCCCC"}>
                  <text
                    id="432 mm_2"
                    xmlSpace="preserve"
                    style={{ whiteSpace: "nowrap" }}
                    fontFamily="PlusJakartaSans"
                    fontSize="11"
                    fontWeight="300"
                    letterSpacing="0em">
                    <tspan x="816.133" y="202.488">
                      {configData["W20-2-R"].value.toString()}{" "}
                      {configData["W20-2-R"].unit}
                    </tspan>
                  </text>
                  <text
                    id="W20-2-R_2"
                    xmlSpace="preserve"
                    style={{ whiteSpace: "nowrap" }}
                    fontFamily="PlusJakartaSans"
                    fontSize="12"
                    letterSpacing="0em">
                    <tspan x="808.383" y="188.396">
                      W20-2-R
                    </tspan>
                  </text>
                  <path
                    id="Line 312"
                    d="M794 191L798.5 193.598L798.5 188.402L794 191ZM879 191L874.5 188.402L874.5 193.598L879 191ZM798.05 191.45L874.95 191.45L874.95 190.55L798.05 190.55L798.05 191.45Z"
                  />
                </g>
              </g>
            </g>
          </g>
          <g id="Y Plane">
            <g id="data_2">
              <g id="lines">
                <line
                  id="Line 286"
                  x1="290"
                  y1="364"
                  x2="290"
                  y2="37.9997"
                  stroke="#666666"
                  strokeWidth="0.5"
                />
                <line
                  id="Line 287"
                  x1="102"
                  y1="364"
                  x2="102"
                  y2="302"
                  stroke="#666666"
                  strokeWidth="0.5"
                />
                <line
                  id="Line 294"
                  x1="493"
                  y1="226"
                  x2="493"
                  y2="37.9997"
                  stroke="#666666"
                  strokeWidth="0.5"
                />
                <line
                  id="Line 299"
                  x1="210"
                  y1="228"
                  x2="330"
                  y2="228"
                  stroke="#666666"
                  strokeWidth="0.5"
                />
                <line
                  id="Line 302"
                  x1="413"
                  y1="226"
                  x2="533"
                  y2="226"
                  stroke="#666666"
                  strokeWidth="0.5"
                />
                <line
                  id="Line 284"
                  x1="192"
                  y1="144"
                  x2="192"
                  y2="37.9997"
                  stroke="#666666"
                  strokeWidth="0.5"
                />
                <path
                  id="Line 292"
                  d="M191.511 143.122L143.5 49.9995"
                  stroke="#666666"
                  strokeWidth="0.5"
                />
                <line
                  id="Line 303"
                  x1="351"
                  y1="314"
                  x2="453"
                  y2="314"
                  stroke="#666666"
                  strokeWidth="0.5"
                />
                <line
                  id="Line 304"
                  x1="152"
                  y1="144"
                  x2="192"
                  y2="144"
                  stroke="#666666"
                  strokeWidth="0.5"
                />
              </g>
              <g id="dots">
                <circle
                  id="Ellipse 3_2"
                  cx="102"
                  cy="305"
                  r="3"
                  fill="#CCCCCC"
                />
                <circle
                  id="Ellipse 3_3"
                  cx="493"
                  cy="226"
                  r="3"
                  fill="#CCCCCC"
                />
                <circle
                  id="Ellipse 3_4"
                  cx="290"
                  cy="228"
                  r="3"
                  fill="#CCCCCC"
                />
                <circle
                  id="Ellipse 3_5"
                  cx="192"
                  cy="144"
                  r="3"
                  fill="#CCCCCC"
                />
              </g>
              <g id="values">
                <g
                  id="H17"
                  onClick={() => handleClickConfig("H17")}
                  fill={config === "H17" ? "#00EEFF" : "#CCCCCC"}>
                  <text
                    id="660 mm"
                    transform="translate(152.001 246) rotate(-90)"
                    xmlSpace="preserve"
                    style={{ whiteSpace: "nowrap" }}
                    fontFamily="PlusJakartaSans"
                    fontSize="11"
                    fontWeight="300"
                    letterSpacing="0em">
                    <tspan x="0.106934" y="11.488">
                      {configData["H17"].value.toString()}{" "}
                      {configData["H17"].unit}
                    </tspan>
                  </text>
                  <text
                    id="H17_2"
                    transform="translate(137 235) rotate(-90)"
                    xmlSpace="preserve"
                    style={{ whiteSpace: "nowrap" }}
                    fontFamily="PlusJakartaSans"
                    fontSize="12"
                    letterSpacing="0em">
                    <tspan x="0.0976562" y="12.396">
                      H17
                    </tspan>
                  </text>
                  <path
                    id="Line 288"
                    d="M152 305L154.887 300L149.114 300L152 305ZM152 144L149.114 149L154.887 149L152 144ZM152.5 300.5L152.5 148.5L151.5 148.5L151.5 300.5L152.5 300.5Z"
                  />
                </g>
                <g
                  id="H30-1"
                  onClick={() => handleClickConfig("H30-1")}
                  fill={config === "H30-1" ? "#00EEFF" : "#CCCCCC"}>
                  <text
                    id="291 mm"
                    transform="translate(210.001 286) rotate(-90)"
                    xmlSpace="preserve"
                    style={{ whiteSpace: "nowrap" }}
                    fontFamily="PlusJakartaSans"
                    fontSize="11"
                    fontWeight="300"
                    letterSpacing="0em">
                    <tspan x="0.142578" y="11.488">
                      {configData["H30-1"].value.toString()}{" "}
                      {configData["H30-1"].unit}
                    </tspan>
                  </text>
                  <text
                    id="H30-1_2"
                    transform="translate(195 285) rotate(-90)"
                    xmlSpace="preserve"
                    style={{ whiteSpace: "nowrap" }}
                    fontFamily="PlusJakartaSans"
                    fontSize="12"
                    letterSpacing="0em">
                    <tspan x="0.166016" y="12.396">
                      H30-1
                    </tspan>
                  </text>
                  <path
                    id="Line 289"
                    d="M210 305L212.887 300L207.114 300L210 305ZM210 228L207.114 233L212.887 233L210 228ZM210.5 300.5L210.5 232.5L209.5 232.5L209.5 300.5L210.5 300.5Z"
                  />
                </g>
                <g
                  id="H30-1-R"
                  onClick={() => handleClickConfig("H30-1-R")}
                  fill={config === "H30-1-R" ? "#00EEFF" : "#CCCCCC"}>
                  <text
                    id="291 mm_2"
                    transform="translate(250.001 286) rotate(-90)"
                    xmlSpace="preserve"
                    style={{ whiteSpace: "nowrap" }}
                    fontFamily="PlusJakartaSans"
                    fontSize="11"
                    fontWeight="300"
                    letterSpacing="0em">
                    <tspan x="0.142578" y="11.488">
                      {configData["H30-1-R"].value.toString()}{" "}
                      {configData["H30-1-R"].unit}
                    </tspan>
                  </text>
                  <text
                    id="H30-1-R_2"
                    transform="translate(235 293) rotate(-90)"
                    xmlSpace="preserve"
                    style={{ whiteSpace: "nowrap" }}
                    fontFamily="PlusJakartaSans"
                    fontSize="12"
                    letterSpacing="0em">
                    <tspan x="0.183594" y="12.396">
                      H30-1-R
                    </tspan>
                  </text>
                  <path
                    id="Line 290"
                    d="M250 305L252.887 300L247.114 300L250 305ZM250 228L247.114 233L252.887 233L250 228ZM250.5 300.5L250.5 232.5L249.5 232.5L249.5 300.5L250.5 300.5Z"
                  />
                </g>
                <g
                  id="H5-1"
                  onClick={() => handleClickConfig("H5-1")}
                  fill={config === "H5-1" ? "#00EEFF" : "#CCCCCC"}>
                  <text
                    id="653 mm"
                    transform="translate(330.001 325) rotate(-90)"
                    xmlSpace="preserve"
                    style={{ whiteSpace: "nowrap" }}
                    fontFamily="PlusJakartaSans"
                    fontSize="11"
                    fontWeight="300"
                    letterSpacing="0em">
                    <tspan x="0.149414" y="11.488">
                      {configData["H5-1"].value.toString()}{" "}
                      {configData["H5-1"].unit}
                    </tspan>
                  </text>
                  <text
                    id="H5-1_2"
                    transform="translate(315 318) rotate(-90)"
                    xmlSpace="preserve"
                    style={{ whiteSpace: "nowrap" }}
                    fontFamily="PlusJakartaSans"
                    fontSize="12"
                    letterSpacing="0em">
                    <tspan x="0.0195312" y="12.396">
                      H5-1
                    </tspan>
                  </text>
                  <path
                    id="Line 291"
                    d="M330 380L332.887 375L327.114 375L330 380ZM330 228L327.114 233L332.887 233L330 228ZM330.5 375.5L330.5 232.5L329.5 232.5L329.5 375.5L330.5 375.5Z"
                  />
                </g>
                <g
                  id="H5-2"
                  onClick={() => handleClickConfig("H5-2")}
                  fill={config === "H5-2" ? "#00EEFF" : "#CCCCCC"}>
                  <text
                    id="657 mm"
                    transform="translate(533.001 324) rotate(-90)"
                    xmlSpace="preserve"
                    style={{ whiteSpace: "nowrap" }}
                    fontFamily="PlusJakartaSans"
                    fontSize="11"
                    fontWeight="300"
                    letterSpacing="0em">
                    <tspan x="0.0361328" y="11.488">
                      {configData["H5-2"].value.toString()}{" "}
                      {configData["H5-2"].unit}
                    </tspan>
                  </text>
                  <text
                    id="H5-2_2"
                    transform="translate(518 319) rotate(-90)"
                    xmlSpace="preserve"
                    style={{ whiteSpace: "nowrap" }}
                    fontFamily="PlusJakartaSans"
                    fontSize="12"
                    letterSpacing="0em">
                    <tspan x="0.148438" y="12.396">
                      H5-2
                    </tspan>
                  </text>
                  <path
                    id="Line 302_2"
                    d="M533 380L535.887 375L530.114 375L533 380ZM533 226L530.114 231L535.887 231L533 226ZM533.5 375.5L533.5 230.5L532.5 230.5L532.5 375.5L533.5 375.5Z"
                  />
                </g>
                <g
                  id="L53-1-R"
                  onClick={() => handleClickConfig("L53-1-R")}
                  fill={config === "L53-1-R" ? "#00EEFF" : "#CCCCCC"}>
                  <text
                    id="810 mm"
                    xmlSpace="preserve"
                    style={{ whiteSpace: "nowrap" }}
                    fontFamily="PlusJakartaSans"
                    fontSize="11"
                    fontWeight="300"
                    letterSpacing="0em">
                    <tspan x="176.268" y="375.488">
                      {configData["L53-1-R"].value.toString()}{" "}
                      {configData["L53-1-R"].unit}
                    </tspan>
                  </text>
                  <text
                    id="L53-1-R_2"
                    xmlSpace="preserve"
                    style={{ whiteSpace: "nowrap" }}
                    fontFamily="PlusJakartaSans"
                    fontSize="12"
                    letterSpacing="0em">
                    <tspan x="171.112" y="361.396">
                      L53-1-R
                    </tspan>
                  </text>
                  <path
                    id="Line 293"
                    d="M102 364L107 366.887L107 361.113L102 364ZM290 364L285 361.113L285 366.887L290 364ZM106.5 364.5L285.5 364.5L285.5 363.5L106.5 363.5L106.5 364.5Z"
                  />
                </g>
                <g
                  id="L53-1"
                  onClick={() => handleClickConfig("L53-1")}
                  fill={config === "L53-1" ? "#00EEFF" : "#CCCCCC"}>
                  <text
                    id="810 mm_2"
                    xmlSpace="preserve"
                    style={{ whiteSpace: "nowrap" }}
                    fontFamily="PlusJakartaSans"
                    fontSize="11"
                    fontWeight="300"
                    letterSpacing="0em">
                    <tspan x="176.268" y="335.488">
                      {configData["L53-1"].value.toString()}{" "}
                      {configData["L53-1"].unit}
                    </tspan>
                  </text>
                  <text
                    id="L53-1_2"
                    xmlSpace="preserve"
                    style={{ whiteSpace: "nowrap" }}
                    fontFamily="PlusJakartaSans"
                    fontSize="12"
                    letterSpacing="0em">
                    <tspan x="180.094" y="321.396">
                      L53-1
                    </tspan>
                  </text>
                  <path
                    id="Line 303_2"
                    d="M102 324L107 326.887L107 321.113L102 324ZM290 324L285 321.113L285 326.887L290 324ZM106.5 324.5L285.5 324.5L285.5 323.5L106.5 323.5L106.5 324.5Z"
                  />
                </g>
                <g
                  id="L63"
                  onClick={() => handleClickConfig("L63")}
                  fill={config === "L63" ? "#00EEFF" : "#CCCCCC"}>
                  <text
                    id="416 mm"
                    xmlSpace="preserve"
                    style={{ whiteSpace: "nowrap" }}
                    fontFamily="PlusJakartaSans"
                    fontSize="11"
                    fontWeight="300"
                    letterSpacing="0em">
                    <tspan x="222.036" y="49.4876">
                      {configData["L63"].value.toString()}{" "}
                      {configData["L63"].unit}
                    </tspan>
                  </text>
                  <text
                    id="L63_2"
                    xmlSpace="preserve"
                    style={{ whiteSpace: "nowrap" }}
                    fontFamily="PlusJakartaSans"
                    fontSize="12"
                    letterSpacing="0em">
                    <tspan x="231.076" y="35.396">
                      L63
                    </tspan>
                  </text>
                  <path
                    id="Line 295"
                    d="M192 38.0001L197 40.8869L197 35.1134L192 38.0001ZM290 38.0001L285 35.1134L285 40.8869L290 38.0001ZM196.5 38.5001L285.5 38.5001L285.5 37.5001L196.5 37.5001L196.5 38.5001Z"
                  />
                </g>
                <g
                  id="L50-2"
                  onClick={() => handleClickConfig("L50-2")}
                  fill={config === "L50-2" ? "#00EEFF" : "#CCCCCC"}>
                  <text
                    id="855 mm"
                    xmlSpace="preserve"
                    style={{ whiteSpace: "nowrap" }}
                    fontFamily="PlusJakartaSans"
                    fontSize="11"
                    fontWeight="300"
                    letterSpacing="0em">
                    <tspan x="370.462" y="49.4876">
                      {configData["L50-2"].value.toString()}{" "}
                      {configData["L50-2"].unit}
                    </tspan>
                  </text>
                  <text
                    id="L50-2_2"
                    xmlSpace="preserve"
                    style={{ whiteSpace: "nowrap" }}
                    fontFamily="PlusJakartaSans"
                    fontSize="12"
                    letterSpacing="0em">
                    <tspan x="373.485" y="35.396">
                      L50-2
                    </tspan>
                  </text>
                  <path
                    id="Line 297"
                    d="M290 38.0001L295 40.8869L295 35.1134L290 38.0001ZM493 38.0001L488 35.1134L488 40.8869L493 38.0001ZM294.5 38.5001L488.5 38.5001L488.5 37.5001L294.5 37.5001L294.5 38.5001Z"
                  />
                </g>
                <g
                  id="L50-2-R"
                  onClick={() => handleClickConfig("L50-2-R")}
                  fill={config === "L50-2-R" ? "#00EEFF" : "#CCCCCC"}>
                  <text
                    id="855 mm_2"
                    xmlSpace="preserve"
                    style={{ whiteSpace: "nowrap" }}
                    fontFamily="PlusJakartaSans"
                    fontSize="11"
                    fontWeight="300"
                    letterSpacing="0em">
                    <tspan x="370.462" y="89.4878">
                      {configData["L50-2-R"].value.toString()}{" "}
                      {configData["L50-2-R"].unit}
                    </tspan>
                  </text>
                  <text
                    id="L50-2-R_2"
                    xmlSpace="preserve"
                    style={{ whiteSpace: "nowrap" }}
                    fontFamily="PlusJakartaSans"
                    fontSize="12"
                    letterSpacing="0em">
                    <tspan x="365.002" y="75.396">
                      L50-2-R
                    </tspan>
                  </text>
                  <path
                    id="Line 298"
                    d="M290 78.0001L295 80.8869L295 75.1134L290 78.0001ZM493 78.0001L488 75.1134L488 80.8869L493 78.0001ZM294.5 78.5001L488.5 78.5001L488.5 77.5001L294.5 77.5001L294.5 78.5001Z"
                  />
                </g>
                <g
                  id="H30-2"
                  onClick={() => handleClickConfig("H30-2")}
                  fill={config === "H30-2" ? "#00EEFF" : "#CCCCCC"}>
                  <text
                    id="295 mm"
                    transform="translate(413.001 291) rotate(-90)"
                    xmlSpace="preserve"
                    style={{ whiteSpace: "nowrap" }}
                    fontFamily="PlusJakartaSans"
                    fontSize="11"
                    fontWeight="300"
                    letterSpacing="0em">
                    <tspan x="0.22998" y="11.488">
                      {configData["H30-2"].value.toString()}{" "}
                      {configData["H30-2"].unit}
                    </tspan>
                  </text>
                  <text
                    id="H30-2_2"
                    transform="translate(398 290) rotate(-90)"
                    xmlSpace="preserve"
                    style={{ whiteSpace: "nowrap" }}
                    fontFamily="PlusJakartaSans"
                    fontSize="12"
                    letterSpacing="0em">
                    <tspan x="0.294922" y="12.396">
                      H30-2
                    </tspan>
                  </text>
                  <path
                    id="Line 300"
                    d="M413 314L415.887 309L410.114 309L413 314ZM413 226L410.114 231L415.887 231L413 226ZM413.5 309.5L413.5 230.5L412.5 230.5L412.5 309.5L413.5 309.5Z"
                  />
                </g>
                <g
                  id="H30-2-R"
                  onClick={() => handleClickConfig("H30-2-R")}
                  fill={config === "H30-2-R" ? "#00EEFF" : "#CCCCCC"}>
                  <text
                    id="295 mm_2"
                    transform="translate(453.001 292) rotate(-90)"
                    xmlSpace="preserve"
                    style={{ whiteSpace: "nowrap" }}
                    fontFamily="PlusJakartaSans"
                    fontSize="11"
                    fontWeight="300"
                    letterSpacing="0em">
                    <tspan x="0.22998" y="11.488">
                      {configData["H30-2-R"].value.toString()}{" "}
                      {configData["H30-2-R"].unit}
                    </tspan>
                  </text>
                  <text
                    id="H30-2-R_2"
                    transform="translate(438 299) rotate(-90)"
                    xmlSpace="preserve"
                    style={{ whiteSpace: "nowrap" }}
                    fontFamily="PlusJakartaSans"
                    fontSize="12"
                    letterSpacing="0em">
                    <tspan x="0.3125" y="12.396">
                      H30-2-R
                    </tspan>
                  </text>
                  <path
                    id="Line 301"
                    d="M453 314L455.887 309L450.114 309L453 314ZM453 226L450.114 231L455.887 231L453 226ZM453.5 309.5L453.5 230.5L452.5 230.5L452.5 309.5L453.5 309.5Z"
                  />
                </g>
                <g id="A18" onClick={() => handleClickConfig("A18")}>
                  <text
                    id="A18-value"
                    transform="translate(154.969 44.7496) rotate(-13.5)"
                    fill={config === "A18" ? "#00EEFF" : "#CCCCCC"}
                    xmlSpace="preserve"
                    style={{ whiteSpace: "nowrap" }}
                    fontFamily="PlusJakartaSans"
                    fontSize="11"
                    fontWeight="300"
                    letterSpacing="0em">
                    <tspan x="0.238281" y="11.488">
                      {configData["A18"].value.toString()}{" "}
                      {configData["A18"].unit}
                    </tspan>
                  </text>
                  <text
                    id="A18_2"
                    transform="translate(152.926 29.2808) rotate(-13.5)"
                    fill={config === "A18" ? "#00EEFF" : "#CCCCCC"}
                    xmlSpace="preserve"
                    style={{ whiteSpace: "nowrap" }}
                    fontFamily="PlusJakartaSans"
                    fontSize="12"
                    letterSpacing="0em">
                    <tspan x="0.0917969" y="12.396">
                      A18
                    </tspan>
                  </text>
                  <g id="circle">
                    <g id="Group 33871">
                      <mask
                        id="mask2_6_2"
                        style={{ maskType: "alpha" }}
                        maskUnits="userSpaceOnUse"
                        x="145"
                        y="37"
                        width="45"
                        height="14">
                        <path
                          id="Vector 1"
                          d="M146.249 50.2003L145.124 48.4003L156.149 43.4503L167.174 40.0753L180.224 38.0503L189.224 37.3753V39.4003L180.674 40.3003L167.624 42.5503L157.724 45.4753L146.249 50.2003Z"
                          fill="white"
                        />
                      </mask>
                      <g mask="url(#mask2_6_2)">
                        <path
                          id="Ellipse 6"
                          d="M298.001 144C298.001 202.542 250.543 250 192.001 250C133.459 250 86.0011 202.542 86.0011 144C86.0011 85.4577 133.459 37.9998 192.001 37.9998C250.543 37.9998 298.001 85.4577 298.001 144Z"
                          stroke={config === "A18" ? "#00EEFF" : "#CCCCCC"}
                        />
                      </g>
                    </g>
                    <path
                      id="Arrow 8"
                      d="M143.449 50.1267L149.222 50.0347L146.256 45.0813L143.449 50.1267Z"
                      fill={config === "A18" ? "#00EEFF" : "#CCCCCC"}
                    />
                    <path
                      id="Arrow 9"
                      d="M192 37.9998L187 35.1131L187 40.8866L192 37.9998Z"
                      fill={config === "A18" ? "#00EEFF" : "#CCCCCC"}
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
          <line
            id="Line 322"
            x1="14"
            y1="379.75"
            x2="974"
            y2="379.75"
            stroke="#666666"
            strokeWidth="0.5"
          />
        </g>
      </svg>
    </div>
  );
}
