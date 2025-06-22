"use client";

import { Container } from "@/components/shared/container";
import Divider from "@/components/shared/divider";
import SectionHeading from "@/components/shared/section-heading";
import Typography from "@/components/shared/typography";
import { demoSnippets } from "@/lib/mocks/home-page";
import { LockIcon } from "lucide-react";
import { useMemo, useState } from "react";
import DemoNavbar from "./demo-navbar";
import DemoSidebar from "./demo-sidebar";
import SnipList from "./snip-list";

const DemoSection: React.FC = () => {
  const [searchString, setSearchString] = useState("");

  const filteredSnips = useMemo(() => {
    const snips = demoSnippets.filter((s) => s.tags.includes(searchString));
    if (snips?.length > 0) {
      return snips;
    }
    return demoSnippets;
  }, [searchString]);

  return (
    <Container className="relative w-full px-4 py-16 flex flex-col items-center">
      <SectionHeading
        as="h2"
        subtitle="Experience how easily you can save, search, and organize your code snippets with Snippo AI."
      >
        See Snippo AI in Action
      </SectionHeading>
      <Divider />
      <section className="w-full h-[760px]">
        <div className="mx-auto h-full">
          <div className="rounded-xl border border-zinc-300 dark:border-zinc-700 overflow-hidden shadow-lg bg-white dark:bg-zinc-800 h-full">
            <div className="flex items-center justify-between px-4 py-2 bg-[#262626] border-b border-zinc-300 dark:border-zinc-600 ">
              <div className="flex space-x-2">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
              </div>
              <div className="flex items-center justify-center gap-2 w-1/2 text-fluid-xs py-2 rounded-lg bg-[#404040]">
                <LockIcon className="size-4" />
                <span>Snippo Dashboard</span>
              </div>
              <div className="w-6"></div>
            </div>

            <div className="text-zinc-800 dark:text-zinc-100 bg-white dark:bg-zinc-900 h-full">
              <div className="flex h-full">
                <DemoSidebar />
                <div className="flex-1 flex flex-col">
                  <DemoNavbar setSearchString={setSearchString} />
                  <main className="flex-1 overflow-auto">
                    <SnipList
                      list={filteredSnips}
                      searchString={searchString}
                    />
                  </main>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Typography as="p" className="text-muted-foreground mt-4">
        Developer-friendly, syntax-highlighted, and blazing fast.
      </Typography>
    </Container>
  );
};

export default DemoSection;
