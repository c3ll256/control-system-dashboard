import { FolderOpenIcon, SaveIcon } from "lucide-react";
import Control, { ConfigType } from "@/components/control";

const Index = () => {
  function handleChangeConfig(config: ConfigType) {
    console.log(config);
  }

  return (
    <div className="h-screen w-screen text-white flex flex-col">
      {/* header */}
      <header className="relative h-16 w-full px-10 flex justify-center items-center border-b-[2px] border-[#5753C6]">
        <div className="absolute h-full left-10 top-0 flex justify-center items-center gap-5">
          <div className="text-xl">工程1</div>
          <div className="text-sm px-3 py-1 rounded-full bg-[#0D3C48]">FOMULAR 验证</div>
        </div>

        <div className="text-2xl">
          XONAR
        </div>

        <div className="absolute h-full right-10 top-0 flex items-center justify-center gap-5">
          <div className="bg-[#14151C] rounded-full p-3">
            <SaveIcon />
          </div>
          <div className="bg-[#14151C] rounded-full p-3">
            <FolderOpenIcon />
          </div>
        </div>
      </header>

      {/* adjust */}
      <div className="w-full h-48 flex items-center justify-center">
        
      </div>

      {/* control */}
      <div className="relative w-full">
        <Control onChange={handleChangeConfig}/>
      </div>
    </div>
  );
};

export default Index;