"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon, Search } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type DemoNavbarProps = {
  setSearchString: Dispatch<SetStateAction<string>>;
};

const DemoNavbar: React.FC<DemoNavbarProps> = ({ setSearchString }) => {
  return (
    <nav className="flex flex-col sm:flex-row items-center gap-4 justify-between px-4 py-3 border-b border-border bg-sidebar">
      <div
        className="flex items-center gap-2"
        onClick={() => console.log("input click")}
      >
        <div className="relative">
          <Input
            type="text"
            className="pl-8 transition text-sm w-40 sm:w-56 capitalize"
            placeholder={`Search "Python"`}
            aria-label="Search snippets"
            onChange={(e) => setSearchString(e.target.value)}
          />
          <Search className="text-border absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4" />
        </div>
      </div>

      <div className="flex flex-1 items-center gap-2 justify-end">
        <Button size="sm" variant="default">
          <PlusIcon className="size-4" />
          <span>Create Snip</span>
        </Button>
      </div>
    </nav>
  );
};

export default DemoNavbar;
