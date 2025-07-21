import Typography from "@/components/shared/typography";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Workspace } from "@/lib/types/workspace";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const WorkspaceSelector = ({ workspaces }: { workspaces: Workspace[] }) => {
  // const { loading, error } = useWorkspace();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<string>("");

  // Preselect first workspace if available and not already selected
  useEffect(() => {
    if (workspaces.length > 0) {
      const urlSelected = searchParams.get("workspace");
      if (urlSelected && workspaces.some((ws) => ws._id === urlSelected)) {
        setSelected(urlSelected);
      } else {
        setSelected(workspaces[0]._id);
        // Update URL with first workspace
        const params = new URLSearchParams(Array.from(searchParams.entries()));
        params.set("workspace", workspaces[0]._id);
        router.replace(`?${params.toString()}`);
      }
    }
  }, [workspaces, searchParams, router]);

  // Update URL when selection changes
  const handleSelect = (id: string) => {
    setSelected(id);
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("workspace", id);
    router.replace(`?${params.toString()}`);
  };

  return (
    <div>
      <Typography as="label" className="mb-2 block text-sm">
        Select Workspace
      </Typography>
      <Select
        value={selected}
        onValueChange={handleSelect}
        aria-label="Workspace selector"
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choose workspace" />
        </SelectTrigger>
        <SelectContent>
          {workspaces.length === 0 ? (
            <SelectItem value="" disabled>
              No workspaces found
            </SelectItem>
          ) : (
            workspaces.map((ws) => (
              <SelectItem key={ws._id} value={ws._id}>
                {ws.name}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default WorkspaceSelector;
