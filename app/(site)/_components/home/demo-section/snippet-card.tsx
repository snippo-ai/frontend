import { Calendar, Tag } from "lucide-react";
// import { Snippet } from "./snippet-context";

interface SnippetCardProps {
  snippet: any;
}

const SnippetCard = ({ snippet }: SnippetCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const truncateCode = (code: string, maxLength: number = 150) => {
    if (code.length <= maxLength) return code;
    return code.substring(0, maxLength) + "...";
  };

  return (
    <div className="bg-zinc-800 rounded-lg border border-zinc-700 p-4 hover:border-zinc-600 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-zinc-200 text-lg line-clamp-1">
          {snippet.title}
        </h3>
      </div>

      {snippet.description && (
        <p className="text-zinc-400 text-sm mb-3 line-clamp-2">
          {snippet.description}
        </p>
      )}

      {snippet.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {snippet.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-violet-900/50 text-violet-300 text-xs font-medium"
            >
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="bg-zinc-900 rounded-md p-3 mb-3">
        <pre className="text-zinc-300 text-sm font-mono whitespace-pre-wrap overflow-hidden">
          <code>{truncateCode(snippet.code)}</code>
        </pre>
      </div>

      <div className="flex items-center justify-between text-xs text-zinc-500">
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          <span>Created {formatDate(snippet.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default SnippetCard;
