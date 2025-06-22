import { demoSnippets } from "@/lib/mocks/home-page";
import SnippetCard from "./snippet-card";
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

const SnippetList = () => {
  const { folders, noFolder } = groupSnippets(demoSnippets);

  if (demoSnippets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-zinc-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-zinc-200 mb-2">
          No snippets found
        </h3>
        <p className="text-zinc-400 max-w-md">
          Start by saving your first code snippet using the modal above!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {noFolder.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-zinc-200">
              Saved Snippets ({noFolder.length})
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {noFolder.map((snippet) => (
              <SnippetCard key={snippet.id} snippet={snippet} />
            ))}
          </div>
        </div>
      )}
      {Object.entries(folders).map(([folder, snippets]) => (
        <div key={folder} className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-violet-300">
              Folder: {folder} ({snippets.length})
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {snippets.map((snippet) => (
              <SnippetCard key={snippet.id} snippet={snippet} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SnippetList;
