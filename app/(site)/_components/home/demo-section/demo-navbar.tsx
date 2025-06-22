"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon, Search, X as XIcon } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

type DemoNavbarProps = {
  setSearchString: Dispatch<SetStateAction<string>>;
};

const DemoNavbar: React.FC<DemoNavbarProps> = ({ setSearchString }) => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setSearchString(e.target.value);
  };

  const handleClear = () => {
    setValue("");
    setSearchString("");
  };

  return (
    <nav className="flex flex-col sm:flex-row items-center gap-4 justify-between px-4 py-3 border-b border-border bg-sidebar">
      <div className="flex items-center gap-2">
        <div className="relative">
          <Input
            type="text"
            className="pl-8 pr-8 transition text-sm w-40 sm:w-56 capitalize"
            placeholder={`Search "Python"`}
            aria-label="Search snippets"
            value={value}
            onChange={handleChange}
          />
          <Search className="text-border absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4" />
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-muted transition"
              aria-label="Clear search"
            >
              <XIcon className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
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
