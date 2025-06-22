import { Button } from "@/components/ui/button";
import { demoSnippets, SnipEntity } from "@/lib/mocks/home-page";
import { ArrowLeft, Folder as FolderIcon } from "lucide-react";
import { useState } from "react";
import SnipCard from "./snip-card";
// import { useSnippetStore } from "./snippet-context";

const groupSnippets = (snippets: typeof demoSnippets) => {
  const folders: { [folder: string]: typeof demoSnippets } = {};
  const noFolder: typeof demoSnippets = [];
  snippets.forEach((snippet) => {
    if (snippet.folder) {
      if (!folders[snippet.folder]) folders[snippet.folder] = [];
      folders[snippet.folder].push(snippet);
    } else {
      noFolder.push(snippet);
    }
  });
  return { folders, noFolder };
};

const DemoMain: React.FC<{ list: SnipEntity[]; searchString: string }> = ({
  list,
  searchString,
}) => {
  const { folders, noFolder } = groupSnippets(list);
  const [openFolder, setOpenFolder] = useState<string | null>(null);

  // If searching, flatten all snippets for search results
  const allSnips = [...noFolder, ...Object.values(folders).flat()];
  const isSearching = !!searchString;

  // If a folder is open, show only its snips
  const folderSnips = openFolder ? folders[openFolder] || [] : [];

  return (
    <section className="glass-dark border shadow-2xl p-8 relative overflow-hidden h-full">
      <div
        className="absolute -top-16 -right-16 w-54 h-54 -z-10 rounded-full blur-3xl pointer-events-none animate-glow bg-primary"
        aria-hidden="true"
      />
      {/* Search results view */}
      {isSearching ? (
        <div className="space-y-8 z-10">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="font-bold drop-shadow-md tracking-tight text-chart-2 text-fluid-base">
              Search Results
              <span className="text-base font-normal text-muted-foreground ml-2">
                ({allSnips.length})
              </span>
            </h2>
          </div>
          {allSnips.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-24">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <FolderIcon className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No snips found
              </h3>
              <p className="text-muted-foreground max-w-md">
                Try a different search or check your tags.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allSnips.map((snippet) => (
                <SnipCard key={snippet.id} snippet={snippet} />
              ))}
            </div>
          )}
        </div>
      ) : openFolder ? (
        <div className="space-y-8 z-10">
          <div className="flex items-center gap-2 mb-4">
            <Button
              size="icon"
              variant="outline"
              onClick={() => setOpenFolder(null)}
              className="flex items-center gap-1 px-3 py-1 rounded-lg bg-card border border-border text-chart-2 hover:bg-muted transition-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium sr-only">Back</span>
            </Button>
            <h2 className="font-bold drop-shadow-md tracking-tight text-chart-2 text-fluid-base ml-2">
              {openFolder}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {folderSnips.map((snippet) => (
              <SnipCard key={snippet.id} snippet={snippet} />
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Folders list (only if not searching) */}
          {Object.entries(folders).length > 0 && (
            <div className="space-y-4 z-10">
              <h2 className="font-bold drop-shadow-md mb-2 tracking-tight text-chart-2">
                Folders
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Object.entries(folders).map(([folder, snippets]) => (
                  <li key={folder}>
                    <button
                      type="button"
                      onClick={() => setOpenFolder(folder)}
                      className="w-full flex items-center gap-3 rounded-xl px-5 py-4 hover:shadow-lg transition-200 shadow-md focus:outline-none focus:ring-2 backdrop-blur-md bg-card border border-border hover:border-zinc-600"
                    >
                      <span className="flex items-center justify-center rounded-lg shadow text-chart-2-foreground">
                        <FolderIcon className="size-5" />
                      </span>
                      <span className="flex-1 text-left font-semibold text-fluid-sm truncate">
                        {folder}{" "}
                        <span className="text-muted-foreground">
                          ({snippets.length})
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Non-grouped snippets */}
          {noFolder.length > 0 && (
            <div className="space-y-4 z-10 mt-8">
              <div className="flex items-center justify-between">
                <h2 className="font-bold drop-shadow-md tracking-tight text-chart-2">
                  My Snips
                  <span className="text-base font-normal text-muted-foreground">
                    ({noFolder.length})
                  </span>
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {noFolder.map((snippet) => (
                  <SnipCard key={snippet.id} snippet={snippet} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default DemoMain;
