import ProfileAPIRequest, { Profile } from "@/api/profile";
import { Project } from "@/api/project";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FolderIcon, FileCogIcon } from "lucide-react";
import { useEffect, useState } from "react";
import "@/assets/css/fonts.css"

export default function ProjectFolder({ project }: { project: Project }) {
  const [profiles, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!project.id) return;
      const { data } = await ProfileAPIRequest.listByProjectId(project.id);
      setProfiles(data);
    };
    fetchProfile();
  }, [project]);

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <div className="flex items-center gap-3 text-lg font-light" style={{ fontFamily: "MiSans" }}>
            <FolderIcon strokeWidth={1.5} />
            <div className="w-44 whitespace-nowrap overflow-hidden text-ellipsis text-left">{project.name}</div>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          {profiles.map((profile) => (
            <div key={profile.id} className="flex items-center gap-3 text-lg">
              <FileCogIcon strokeWidth={1.5} />
              {profile.name}
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
