import ControlBg from "@/assets/images/index/y-control-bg.png";
import { ConfigDataType, ConfigKeyType } from "./profile";

export default function YControl({
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
            viewBox="0 0 600 350"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <g id="data">
              <g id="data_2">
                <g id="lines">
                  <line
                    id="Line 286"
                    x1="292"
                    y1="198"
                    x2="292"
                    y2="8"
                    stroke="#666666"
                    strokeWidth="0.5"
                  />
                  <line
                    id="Line 305"
                    x1="74"
                    y1="237"
                    x2="74"
                    y2="8"
                    stroke="#666666"
                    strokeWidth="0.5"
                  />
                  <line
                    id="Line 294"
                    x1="495"
                    y1="196"
                    x2="495"
                    y2="8"
                    stroke="#666666"
                    strokeWidth="0.5"
                  />
                  <line
                    id="Line 299"
                    x1="252"
                    y1="198"
                    x2="332"
                    y2="198"
                    stroke="#666666"
                    strokeWidth="0.5"
                  />
                  <line
                    id="Line 302"
                    x1="455"
                    y1="196"
                    x2="535"
                    y2="196"
                    stroke="#666666"
                    strokeWidth="0.5"
                  />
                  <line
                    id="Line 284"
                    x1="193.781"
                    y1="114"
                    x2="193.781"
                    y2="55"
                    stroke="#666666"
                    strokeWidth="0.437077"
                  />
                  <path
                    id="Line 292"
                    d="M193.833 113.348L167.218 61.7253"
                    stroke="#666666"
                    strokeWidth="0.383358"
                  />
                  <line
                    id="Line 303"
                    x1="104"
                    y1="279"
                    x2="455"
                    y2="279"
                    stroke="#666666"
                    strokeWidth="0.5"
                  />
                  <g id="circle">
                    <mask
                      id="mask0_110_991"
                      style={{ maskType: "alpha" }}
                      maskUnits="userSpaceOnUse"
                      x="184"
                      y="93"
                      width="10"
                      height="5">
                      <path
                        id="Vector 1"
                        d="M185.5 97.5L184.5 95.5L186.5 94.5L189 93.5H191.5H194V95.1391H192L189.5 95.5L187.5 96.5L185.5 97.5Z"
                        fill="white"
                      />
                    </mask>
                    <g mask="url(#mask0_110_991)">
                      <path
                        id="Ellipse 6"
                        d="M213.508 113.992C213.508 124.883 204.68 133.711 193.789 133.711C182.899 133.711 174.07 124.883 174.07 113.992C174.07 103.102 182.899 94.2734 193.789 94.2734C204.68 94.2734 213.508 103.102 213.508 113.992Z"
                        stroke="#666666"
                        strokeWidth="0.5"
                      />
                    </g>
                  </g>
                </g>
                <g id="dots">
                  <circle
                    id="Ellipse 4"
                    cx="74"
                    cy="237"
                    r="3"
                    fill="#CCCCCC"
                  />
                  <circle
                    id="Ellipse 5"
                    cx="104"
                    cy="279"
                    r="3"
                    fill="#CCCCCC"
                  />
                  <circle
                    id="Ellipse 3"
                    cx="495"
                    cy="196"
                    r="3"
                    fill="#CCCCCC"
                  />
                  <circle
                    id="Ellipse 3_2"
                    cx="292"
                    cy="198"
                    r="3"
                    fill="#CCCCCC"
                  />
                  <circle
                    id="Ellipse 3_3"
                    cx="194"
                    cy="114"
                    r="3"
                    fill="#CCCCCC"
                  />
                </g>
                <g id="values">
                  <g
                    id="H5-2"
                    onClick={() => handleClickConfig("H5-2")}
                    fill={configKey === "H5-2" ? "#00EEFF" : "#CCCCCC"}>
                    <path
                      id="Line 302_2"
                      d="M535 350L537.887 345L532.113 345L535 350ZM535 196L532.113 201L537.887 201L535 196ZM535.5 345.5L535.5 200.5L534.5 200.5L534.5 345.5L535.5 345.5Z"
                    />
                    <text
                      id="657 mm"
                      transform="translate(538 331)"
                      xmlSpace="preserve"
                      style={{ whiteSpace: "pre" }}
                      fontFamily="PlusJakartaSans"
                      fontSize="11"
                      fontWeight="300"
                      letterSpacing="0em">
                      <tspan x="0" y="11.488">
                        {configData["H5-2"].value.toString()}{" "}
                        {configData["H5-2"].unit}
                      </tspan>
                    </text>
                    <text
                      id="H5-2_2"
                      transform="translate(538 319)"
                      xmlSpace="preserve"
                      style={{ whiteSpace: "pre" }}
                      fontFamily="PlusJakartaSans"
                      fontSize="12"
                      letterSpacing="0em">
                      <tspan x="0" y="12.396">
                        H5-2
                      </tspan>
                    </text>
                  </g>
                  <g
                    id="H5-1"
                    onClick={() => handleClickConfig("H5-1")}
                    fill={configKey === "H5-1" ? "#00EEFF" : "#CCCCCC"}>
                    <path
                      id="Line 291"
                      d="M332 350L334.887 345L329.113 345L332 350ZM332 198L329.113 203L334.887 203L332 198ZM332.5 345.5L332.5 202.5L331.5 202.5L331.5 345.5L332.5 345.5Z"
                    />
                    <text
                      id="653 mm"
                      transform="translate(335.5 331)"
                      xmlSpace="preserve"
                      style={{ whiteSpace: "pre" }}
                      fontFamily="PlusJakartaSans"
                      fontSize="11"
                      fontWeight="300"
                      letterSpacing="0em">
                      <tspan x="0" y="11.488">
                        {configData["H5-1"].value.toString()}{" "}
                        {configData["H5-1"].unit}
                      </tspan>
                    </text>
                    <text
                      id="H5-1_2"
                      transform="translate(335 319)"
                      xmlSpace="preserve"
                      style={{ whiteSpace: "pre" }}
                      fontFamily="PlusJakartaSans"
                      fontSize="12"
                      letterSpacing="0em">
                      <tspan x="0" y="12.396">
                        H5-1
                      </tspan>
                    </text>
                  </g>
                  <g
                    id="H30-2"
                    onClick={() => handleClickConfig("H30-2")}
                    fill={configKey === "H30-2" ? "#00EEFF" : "#CCCCCC"}>
                    <path
                      id="Line 301"
                      d="M455 279L457.887 274L452.113 274L455 279ZM455 196L452.113 201L457.887 201L455 196ZM455.5 274.5L455.5 200.5L454.5 200.5L454.5 274.5L455.5 274.5Z"
                    />
                    <text
                      id="295 mm"
                      transform="translate(458 260)"
                      xmlSpace="preserve"
                      style={{ whiteSpace: "pre" }}
                      fontFamily="PlusJakartaSans"
                      fontSize="11"
                      fontWeight="300"
                      letterSpacing="0em">
                      <tspan x="0" y="11.488">
                        {configData["H30-2"].value.toString()}{" "}
                        {configData["H30-2"].unit}
                      </tspan>
                    </text>
                    <text
                      id="H30-2_2"
                      transform="translate(458 248)"
                      xmlSpace="preserve"
                      style={{ whiteSpace: "pre" }}
                      fontFamily="PlusJakartaSans"
                      fontSize="12"
                      letterSpacing="0em">
                      <tspan x="0" y="12.396">
                        H30-2
                      </tspan>
                    </text>
                  </g>
                  <g id="H30-1"
                    onClick={() => handleClickConfig("H30-1")}
                    fill={configKey === "H30-1" ? "#00EEFF" : "#CCCCCC"}>
                    <path
                      id="Line 290"
                      d="M252 279L254.887 274L249.113 274L252 279ZM252 198L249.113 203L254.887 203L252 198ZM252.5 274.5L252.5 202.5L251.5 202.5L251.5 274.5L252.5 274.5Z"
                    />
                    <text
                      id="291 mm"
                      transform="translate(255 260)"
                      xmlSpace="preserve"
                      style={{ whiteSpace: "pre" }}
                      fontFamily="PlusJakartaSans"
                      fontSize="11"
                      fontWeight="300"
                      letterSpacing="0em">
                      <tspan x="0" y="11.488">
                        {configData["H30-1"].value.toString()}{" "}
                        {configData["H30-1"].unit}
                      </tspan>
                    </text>
                    <text
                      id="H30-1_2"
                      transform="translate(255 248)"
                      xmlSpace="preserve"
                      style={{ whiteSpace: "pre" }}
                      fontFamily="PlusJakartaSans"
                      fontSize="12"
                      letterSpacing="0em">
                      <tspan x="0" y="12.396">
                        H30-1
                      </tspan>
                    </text>
                  </g>
                  <g id="H17"
                    onClick={() => handleClickConfig("H17")}
                    fill={configKey === "H17" ? "#00EEFF" : "#CCCCCC"}>
                    <path
                      id="Line 288"
                      d="M194 279L196.887 274L191.113 274L194 279ZM194 114L191.113 119L196.887 119L194 114ZM194.5 274.5L194.5 118.5L193.5 118.5L193.5 274.5L194.5 274.5Z"
                    />
                    <text
                      id="660 mm"
                      transform="translate(197 260)"
                      xmlSpace="preserve"
                      style={{ whiteSpace: "pre" }}
                      fontFamily="PlusJakartaSans"
                      fontSize="11"
                      fontWeight="300"
                      letterSpacing="0em">
                      <tspan x="0" y="11.488">
                        {configData["H17"].value.toString()}{" "}
                        {configData["H17"].unit}
                      </tspan>
                    </text>
                    <text
                      id="H17_2"
                      transform="translate(197 248)"
                      xmlSpace="preserve"
                      style={{ whiteSpace: "pre" }}
                      fontFamily="PlusJakartaSans"
                      fontSize="12"
                      letterSpacing="0em">
                      <tspan x="0" y="12.396">
                        H17
                      </tspan>
                    </text>
                  </g>
                  <g id="L6"
                    onClick={() => handleClickConfig("L6")}
                    fill={configKey === "L6" ? "#00EEFF" : "#CCCCCC"}>
                    <path
                      id="Line 303_2"
                      d="M74 114L79 116.887L79 111.113L74 114ZM194 114L189 111.113L189 116.887L194 114ZM78.5 114.5L189.5 114.5L189.5 113.5L78.5 113.5L78.5 114.5Z"
                    />
                    <text
                      id="810 mm"
                      xmlSpace="preserve"
                      style={{ whiteSpace: "pre" }}
                      fontFamily="PlusJakartaSans"
                      fontSize="11"
                      fontWeight="300"
                      letterSpacing="0em">
                      <tspan x="79" y="140.488">
                        {configData["L6"].value.toString()}{" "}
                        {configData["L6"].unit}
                      </tspan>
                    </text>
                    <text
                      id="L6_2"
                      xmlSpace="preserve"
                      style={{ whiteSpace: "pre" }}
                      fontFamily="PlusJakartaSans"
                      fontSize="12"
                      letterSpacing="0em">
                      <tspan x="79" y="129.396">
                        L6
                      </tspan>
                    </text>
                  </g>
                  <g id="A18"
                    onClick={() => handleClickConfig("A18")}
                    fill={configKey === "A18" ? "#00EEFF" : "#CCCCCC"}>
                    <g id="circle_2">
                      <g id="Group 33871">
                        <mask
                          id="mask1_110_991"
                          style={{ maskType: "alpha" }}
                          maskUnits="userSpaceOnUse"
                          x="167"
                          y="55"
                          width="26"
                          height="8">
                          <path
                            id="Vector 1_2"
                            d="M168.576 62.2141L167.943 61.2016L174.145 58.4172L180.347 56.5187L187.687 55.3797L192.75 55V56.1391L187.941 56.6453L180.6 57.9109L175.031 59.5562L168.576 62.2141Z"
                            fill="white"
                          />
                        </mask>
                        <g mask="url(#mask1_110_991)" className="pointer-events-none">
                          <path
                            id="Ellipse 6_2"
                            d="M253.719 114.977C253.719 147.786 227.121 174.383 194.311 174.383C161.502 174.383 134.904 147.786 134.904 114.977C134.904 82.1674 161.502 55.5703 194.311 55.5703C227.121 55.5703 253.719 82.1674 253.719 114.977Z"
                            stroke={configKey === "A18" ? "#00EEFF" : "#CCCCCC"}
                          />
                        </g>
                      </g>
                      <path
                        id="Arrow 8"
                        d="M167 62.1729L173.495 62.0694L170.158 56.4969L167 62.1729Z"
                      />
                      <path
                        id="Arrow 9"
                        d="M194.311 55.3516L188.686 52.104L188.686 58.5992L194.311 55.3516Z"
                      />
                    </g>
                    <text
                      id="18.5&#194;&#176;"
                      xmlSpace="preserve"
                      style={{ whiteSpace: "pre" }}
                      fontFamily="PlusJakartaSans"
                      fontSize="11"
                      fontWeight="300"
                      letterSpacing="0em">
                      <tspan x="197" y="78.488">
                        {configData["A18"].value.toString()}{" "}
                        {configData["A18"].unit}
                      </tspan>
                    </text>
                    <text
                      id="A18_2"
                      transform="translate(197 55)"
                      xmlSpace="preserve"
                      style={{ whiteSpace: "pre" }}
                      fontFamily="PlusJakartaSans"
                      fontSize="12"
                      letterSpacing="0em">
                      <tspan x="0" y="12.396">
                        A18
                      </tspan>
                    </text>
                  </g>
                  <g id="L50-2"
                    onClick={() => handleClickConfig("L50-2")}
                    fill={configKey === "L50-2" ? "#00EEFF" : "#CCCCCC"}>
                    <path
                      id="Line 297"
                      d="M292 8.00098L297 10.8877L297 5.11423L292 8.00098ZM495 8.00099L490 5.11424L490 10.8877L495 8.00099ZM296.5 8.50098L490.5 8.50099L490.5 7.50099L296.5 7.50098L296.5 8.50098Z"
                    />
                    <text
                      id="855 mm"
                      xmlSpace="preserve"
                      style={{ whiteSpace: "pre" }}
                      fontFamily="PlusJakartaSans"
                      fontSize="11"
                      fontWeight="300"
                      letterSpacing="0em">
                      <tspan x="447.923" y="34.488">
                        {configData["L50-2"].value.toString()}{" "}
                        {configData["L50-2"].unit}
                      </tspan>
                    </text>
                    <text
                      id="L50-2_2"
                      xmlSpace="preserve"
                      style={{ whiteSpace: "pre" }}
                      fontFamily="PlusJakartaSans"
                      fontSize="12"
                      letterSpacing="0em">
                      <tspan x="452.969" y="23.396">
                        L50-2
                      </tspan>
                    </text>
                  </g>
                  <g id="L99-1"
                    onClick={() => handleClickConfig("L99-1")}
                    fill={configKey === "L99-1" ? "#00EEFF" : "#CCCCCC"}>
                    <path
                      id="Line 303_3"
                      d="M74 8L79 10.8868L79 5.11325L74 8ZM292 8.00002L287 5.11327L287 10.8868L292 8.00002ZM78.5 8.5L287.5 8.50002L287.5 7.50002L78.5 7.5L78.5 8.5Z"
                    />
                    <text
                      id="810 mm_2"
                      xmlSpace="preserve"
                      style={{ whiteSpace: "pre" }}
                      fontFamily="PlusJakartaSans"
                      fontSize="11"
                      fontWeight="300"
                      letterSpacing="0em">
                      <tspan x="79" y="34.488">
                        {configData["L99-1"].value.toString()}{" "}
                        {configData["L99-1"].unit}
                      </tspan>
                    </text>
                    <text
                      id="L99-1_2"
                      xmlSpace="preserve"
                      style={{ whiteSpace: "pre" }}
                      fontFamily="PlusJakartaSans"
                      fontSize="12"
                      letterSpacing="0em">
                      <tspan x="79" y="23.396">
                        L99-1
                      </tspan>
                    </text>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        )}
      </div>
    </div>
  );
}
