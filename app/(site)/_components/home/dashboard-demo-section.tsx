"use client";

import { useEffect, useState } from "react";
import DashboardNavbar from "./demo-section/demo-navbar";
import DashboardSidebar from "./demo-section/demo-sidebar";
import SaveSnippetModal from "./demo-section/save-snippet-modal";
import SnippetList from "./demo-section/demo-main";
import { SnippetProvider, useSnippetStore } from "./demo-section/snippet-context";

const DashboardDemoContent = () => {
  const { dispatch } = useSnippetStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Open modal on component mount
    dispatch({ type: "SET_MODAL_OPEN", payload: true });
  }, [dispatch]);

  if (!isMounted) return null;

  return (
    <section className="w-full bg-zinc-900 text-zinc-100 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHead>

        <div className="bg-zinc-800 rounded-xl shadow-2xl border border-zinc-700 overflow-hidden">
          <div className="flex h-[600px]">
            <DashboardSidebar />
            <div className="flex-1 flex flex-col">
              <DashboardNavbar />
              <main className="flex-1 p-6 overflow-auto">
                <SnippetList />
              </main>
            </div>
          </div>
        </div>
      </div>
      <SaveSnippetModal />
    </section>
  );
};

const DashboardDemoSection = () => {
  return (
    <SnippetProvider>
      <DashboardDemoContent />
    </SnippetProvider>
  );
};

export default DashboardDemoSection;
