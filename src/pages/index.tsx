import { FolderOpenIcon, Redo2Icon, SaveIcon, Undo2Icon } from "lucide-react";
import Control, { ConfigType } from "@/components/control";
import { SliderHighlight } from "@/components/ui/slide-highlight";

const Index = () => {
  function handleChangeConfig(config: ConfigType) {
    console.log(config);
  }

  return (
    <div className="h-screen w-screen flex flex-col">
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
          <div className="bg-secondary rounded-full p-3">
            <SaveIcon />
          </div>
          <div className="bg-secondary rounded-full p-3">
            <FolderOpenIcon />
          </div>
        </div>
      </header>

      {/* adjust */}
      <div className="w-full h-64 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-1">
          <div className="flex items-center justify-center gap-4">
            <div className="h-10 w-10 flex items-center justify-center bg-secondary rounded-full"><Undo2Icon /></div>
            <div className="w-48 h-10 leading-[2.5rem] text-center text-highlight text-2xl font-light bg-secondary rounded-full">1035 mm</div>
            <div className="h-10 w-10 flex items-center justify-center bg-secondary rounded-full"><Redo2Icon /></div>
          </div>
          <div className="text-md text-highlight">+128 mm</div>
        </div>

        <div className="flex items-center justify-center gap-6">
          <div className="flex items-center justify-center gap-6">
            <div className="h-14 w-14 text-2xl font-light bg-secondary rounded-full flex items-center justify-center">-10</div>
            <div className="h-14 w-14 text-4xl font-light bg-secondary rounded-full flex leading-[3.1rem] justify-center">-</div>
          </div>

          <div className="w-24 whitespace-nowrap text-center text-xl font-light text-primary/40">741 mm</div>

          <SliderHighlight className="w-[32rem]" defaultValue={[33]} max={100} step={1} />

          <div className="w-24 whitespace-nowrap text-center text-xl font-light text-primary/40">1080 mm</div>

          <div className="flex items-center justify-center gap-6">
            <div className="h-14 w-14 text-4xl font-light bg-secondary rounded-full flex leading-[3.1rem] justify-center">+</div>
            <div className="h-14 w-14 text-2xl font-light bg-secondary rounded-full flex items-center justify-center">+10</div>
          </div>
        </div>
      </div>

      {/* control */}
      <Control onChange={handleChangeConfig}/>
    </div>
  );
};

export default Index;