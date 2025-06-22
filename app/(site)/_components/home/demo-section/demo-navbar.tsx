"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, Download, Search, TagIcon, Upload } from "lucide-react";

const DemoNavbar: React.FC = () => {
  return (
    <nav className="flex flex-col sm:flex-row items-center gap-4 justify-between px-4 py-3 border-b border-border bg-sidebar">
      <div
        className="flex items-center gap-2"
        onClick={() => console.log("input click")}
      >
        <div className="relative">
          <Input
            type="text"
            className="pl-8 transition text-sm w-40 sm:w-56"
            placeholder="Search snippets..."
            aria-label="Search snippets"
          />
          <Search className="text-border absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4" />
        </div>
      </div>

      <div className="flex flex-1 items-center gap-2 justify-end">
        <Button size="sm" variant="outline">
          <TagIcon className="size-3" />
          <span>All Tags</span>
          <ChevronDown className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="outline" disabled>
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Export</span>
        </Button>
        <Button size="sm" variant="outline" disabled>
          <Upload className="w-4 h-4" />
          <span className="hidden sm:inline">Import</span>
        </Button>
      </div>
    </nav>
  );
};

export default DemoNavbar;
