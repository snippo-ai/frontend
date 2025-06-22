"use client";

import { Container } from "@/components/shared/container";
import Divider from "@/components/shared/divider";
import SectionHeading from "@/components/shared/section-heading";
import Typography from "@/components/shared/typography";
import { LockIcon } from "lucide-react";
import DemoNavbar from "./demo-navbar";
import DemoSidebar from "./demo-sidebar";
import SnippetList from "./snippet-list";

const DemoSection: React.FC = () => {
  return (
    <Container className="relative w-full px-4 py-16 flex flex-col items-center">
      <SectionHeading
        as="h2"
        subtitle="Experience how easily you can save, search, and organize your code snippets with Snippo AI."
      >
        See Snippo AI in Action
      </SectionHeading>
      <Divider />
      {/* <Safari url="Snippo Dashboard" className="size-full">
        <div className="flex h-full">
          <DemoSidebar />
          <div className="flex-1 flex flex-col">
            <DemoNavbar />
            <main className="flex-1 p-6 overflow-auto">
              <SnippetList />
            </main>
          </div>
        </div>
      </Safari> */}
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
                  <DemoNavbar />
                  <main className="flex-1 p-6 overflow-auto">
                    <SnippetList />
                  </main>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <div className="w-full bg-zinc-950 rounded-xl shadow-lg overflow-auto border border-zinc-200 dark:border-zinc-800 mb-4 animate-fade-in"> */}
      {/* <pre
          className="text-left text-sm md:text-base p-6 text-zinc-100 overflow-x-auto whitespace-pre language-ts"
          style={{ background: "#18181b" }}
        >
          <code>
            {`// Save and search your code instantly
const snippet = await snippo.save({
  title: "Debounce Hook",
  code: "function useDebounce(fn, delay) { ... }",
  language: "js",
});
const results = await snippo.search("debounce");
console.log(results); // [ { title: "Debounce Hook", ... } ]`}
          </code>
        </pre> */}
      {/* <div className="flex h-[600px]">
          <DashboardSidebar />
          <div className="flex-1 flex flex-col">
            <DashboardNavbar />
            <main className="flex-1 p-6 overflow-auto">
              <SnippetList />
            </main>
          </div>
        </div> */}
      {/* </div> */}
      <Typography as="p" className="text-muted-foreground mt-4">
        Developer-friendly, syntax-highlighted, and blazing fast.
      </Typography>
    </Container>
  );
};

export default DemoSection;
