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
import { AccordionSingleProps } from "@radix-ui/react-accordion";
import React from "react";
import { useMainStore, useTabStore } from "@/lib/store";

export interface ProjectFolderProps extends AccordionSingleProps {
  project: Project;
}

const ProjectFolder = React.forwardRef<HTMLDivElement, ProjectFolderProps>(({
  project,
  ...props
}, ref) => {
  const { 
    selectedProfile,
    setSelectedProfile,
    selectedProject,
    setSelectedProject
  } = useMainStore();
  const { addTab, setActiveTabById } = useTabStore();
  const [profiles, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!project.id) return;
      const { data } = await ProfileAPIRequest.listByProjectId(project.id);
      setProfiles(data);
    };
    fetchProfile();
  }, [project]);

  async function handleSelectProfile(profile: Profile) {
    try {
      setSelectedProfile(profile);
      setSelectedProject(project);

      const { data } = await ProfileAPIRequest.get(profile.id || "");
      addTab({
        id: profile.id || "",
        title: profile.name || "",
        type: "temporary",
        profile: data,
      });
      setActiveTabById(profile.id || "");
    } catch (error) {
      console.error(error);
    }
  }

  function handleSelectProject() {
    setSelectedProject(project);
    setSelectedProfile(null);
  }

  return (
    <Accordion collapsible {...props} ref={ref}>
      <AccordionItem value="item-1">
        <AccordionTrigger onClick={handleSelectProject} className={selectedProject?.id === project.id && selectedProfile === null ? "project-trigger bg-secondary" : "project-trigger"}>
          <div className="flex items-center gap-2 text-lg font-light" style={{ fontFamily: "MiSans" }}>
            <FolderIcon strokeWidth={1.5} />
            <div className="w-44 whitespace-nowrap overflow-hidden text-ellipsis text-left">{project.name}</div>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          {profiles.map((profile) => (
            <div key={profile.id} onClick={() => handleSelectProfile(profile)} className="px-2">
              <div className={`flex items-center gap-2 py-3 px-3 rounded-lg overflow-hidden text-lg ${selectedProfile?.id === profile.id ? "bg-secondary" : ""}`}>
                <FileCogIcon className="ml-10" strokeWidth={1.5} />
                {profile.name}
              </div>
            </div>
          ))}
          { profiles.length === 0 &&
            <div className="flex items-center gap-2 py-3 px-16 text-lg">
              <div className="w-44 whitespace-nowrap overflow-hidden text-ellipsis text-left text-primary/50">暂无配置文件</div>
            </div>
          }
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
})
ProjectFolder.displayName = "ProjectFolder"

export default ProjectFolder;