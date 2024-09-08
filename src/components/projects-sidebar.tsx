import { motion } from "framer-motion";
import ProjectFolder from "@/components/project";
import { FolderPlusIcon, FilePlus2Icon, FileInputIcon } from "lucide-react";
import ProjectAPIRequest, { Project } from "@/api/project";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RoundedButton } from "@/components/ui/rouned-button";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import IconSpinner from "@/components/icon/IconSpinner";
import "@/assets/css/fonts.css"
import ProfileAPIRequest, { Profile } from "@/api/profile";

interface ProjectsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "项目名称不得少于2个字符",
  }),
});

const CreateProjectDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    try {
      setIsLoading(true);
      const { data } = await ProjectAPIRequest.create({
        name: formData.name,
      });

      console.log(data);
      toast.success("新建项目成功");
      setIsOpen(false);
    } catch (error) {
      toast.error("新建项目失败");
    } finally {
      setIsLoading(false);
    }
  }

  function onOpenChange(open: boolean) {
    setIsOpen(open);
    if (!open) {
      form.reset();
    }
  }

  function onFocus(e: React.FocusEvent<HTMLInputElement>) {
    window.scrollTo({
      top: e.target.offsetTop + e.target.offsetHeight + 50,
      behavior: 'smooth'
    });
  }

  return (
    <Dialog onOpenChange={onOpenChange} open={isOpen}>
      <DialogTrigger>
        <div className="flex items-center gap-2">
          <FolderPlusIcon strokeWidth={1.5} />
          新建项目
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>新建项目</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>名称</FormLabel>
                  <FormControl>
                    <Input placeholder="名称" {...field} onFocus={onFocus} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <RoundedButton type="submit" disabled={isLoading}>
                {isLoading && <IconSpinner className="mr-2" />} 新建
              </RoundedButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

const CreateConfigDialog = ({ projectId }: { projectId: string | null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    if (!projectId) {
      toast.error("请先选择项目");
      return;
    }
    try {
      setIsLoading(true);
      await ProfileAPIRequest.create({
        name: formData.name,
        projectId: projectId,
        buckVersion: "1.0.0",
      });
      toast.success("新建配置文件成功");
      setIsOpen(false);
    } catch (error) {
      toast.error("新建配置文件失败");
    } finally {
      setIsLoading(false);
    }
  }

  function onOpenChange(open: boolean) {
    setIsOpen(open);
    if (!open) {
      form.reset();
    }
  }

  function onFocus(e: React.FocusEvent<HTMLInputElement>) {
    window.scrollTo({
      top: e.target.offsetTop + e.target.offsetHeight + 50,
      behavior: 'smooth'
    });
  }

  return (
    <Dialog onOpenChange={onOpenChange} open={isOpen}>
      <DialogTrigger disabled={!projectId}>
        <div className={`flex items-center gap-2 ${projectId ? "" : "text-muted"}`}>
          <FilePlus2Icon strokeWidth={1.5} />
          新建配置文件
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>新建配置文件</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
            <FormField 
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>名称</FormLabel>
                  <FormControl>
                    <Input placeholder="名称" {...field} onFocus={onFocus} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <RoundedButton type="submit" disabled={isLoading}>
                {isLoading && <IconSpinner className="mr-2" />} 新建
              </RoundedButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default function ProjectsSidebar({
  isOpen,
  onClose,
}: ProjectsSidebarProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await ProjectAPIRequest.list();
      setProjects(data);
    };
    fetchProjects();
  }, []);

  function handleSelectProject(projectId: string) {
    setSelectedProfile(null);
    setSelectedProjectId(projectId);
  }

  function handleSelectProfile(profile: Profile) {
    setSelectedProjectId(profile.projectId);
    setSelectedProfile(profile);
  }

  return (
    <motion.div
      style={{ fontFamily: "MiSans", willChange: "width"}}
      className="h-full border-l overflow-hidden bg-black font-light"
      initial={false}
      animate={{
        width: isOpen ? "20rem" : 0,
      }}
      transition={{
        type: "tween",
        ease: "easeInOut",
        duration: 0.3,
      }}>
      <div className="w-[20rem] h-full flex flex-col">
        <div className="px-8 py-6 border-b text-lg flex flex-col gap-4">
          {/* 新建项目 */}
          <CreateProjectDialog />

          {/* 新建配置文件 */}
          <CreateConfigDialog projectId={selectedProjectId} />

          {/* 导入配置文件 */}
          <div className="flex items-center gap-2">
            <FileInputIcon strokeWidth={1.5} />
            导入配置文件
          </div>
        </div>

        <div className="py-4">
          {projects.map((project) => (
            <ProjectFolder
              project={project}
              selectedProjectId={selectedProjectId}
              onSelectProject={handleSelectProject}
              selectedProfile={selectedProfile}
              onSelectProfile={handleSelectProfile}
              type="single" 
              key={project.id} 
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
