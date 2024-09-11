import { Profile } from "@/api/profile";
import ProjectAPIRequest, { Project } from "@/api/project";
import { StateCreator } from "zustand";

export interface MainState {
  projects: Project[];
  selectedProject: Project | null;
  selectedProfile: Profile | null;
  setSelectedProject: (project: Project | null) => void;
  setSelectedProfile: (profile: Profile | null) => void;
  fetchProjects: () => Promise<void>;
}

export const MainStateCreator: StateCreator<MainState> = (set) => ({
  projects: [],
  selectedProject: null,
  selectedProfile: null,
  setSelectedProject: (project: Project | null) => set({ selectedProject: project }),
  setSelectedProfile: (profile: Profile | null) => set({ selectedProfile: profile }),
  fetchProjects: async () => {
    const { data } = await ProjectAPIRequest.list();
    set({ projects: data });
  },
});