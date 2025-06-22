import { demoSnippets, SnipEntity } from "@/lib/mocks/home-page";
import { Folder as FolderIcon } from "lucide-react";
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

const SnipList: React.FC<{ list: SnipEntity[]; searchString: string }> = ({
  list,
  searchString,
}) => {
  const { folders, noFolder } = groupSnippets(list);

  return (
    <section className="glass-dark border shadow-2xl p-8 relative overflow-hidden h-full">
      <div
        className="absolute -top-16 -right-16 w-54 h-54 -z-10 rounded-full blur-3xl pointer-events-none animate-glow bg-primary"
        aria-hidden="true"
      />
      {Object.entries(folders).length > 0 && !searchString && (
        <div className="space-y-4 z-10">
          <h2 className="font-bold drop-shadow-md mb-2 tracking-tight text-chart-2">
            Folders
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(folders).map(([folder, snippets]) => (
              <li key={folder}>
                <button
                  type="button"
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
              {searchString ? (
                "Search Results"
              ) : (
                <>
                  My Snips
                  <span className="text-base font-normal text-muted-foreground">
                    ({noFolder.length})
                  </span>
                </>
              )}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {noFolder.map((snippet) => (
              <SnipCard key={snippet.id} snippet={snippet} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default SnipList;
