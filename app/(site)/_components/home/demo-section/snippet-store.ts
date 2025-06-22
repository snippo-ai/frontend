import React, { createContext, useContext, useReducer, useEffect } from "react";

export interface Snippet {
  id: string;
  title: string;
  description: string;
  code: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface SnippetState {
  snippets: Snippet[];
  isModalOpen: boolean;
  searchQuery: string;
  selectedTag: string;
}

type SnippetAction =
  | {
      type: "ADD_SNIPPET";
      payload: Omit<Snippet, "id" | "createdAt" | "updatedAt">;
    }
  | { type: "SET_MODAL_OPEN"; payload: boolean }
  | { type: "SET_SEARCH_QUERY"; payload: string }
  | { type: "SET_SELECTED_TAG"; payload: string }
  | { type: "LOAD_SNIPPETS"; payload: Snippet[] };

const snippetReducer = (
  state: SnippetState,
  action: SnippetAction
): SnippetState => {
  switch (action.type) {
    case "ADD_SNIPPET":
      const newSnippet: Snippet = {
        ...action.payload,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return {
        ...state,
        snippets: [...state.snippets, newSnippet],
      };
    case "SET_MODAL_OPEN":
      return { ...state, isModalOpen: action.payload };
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };
    case "SET_SELECTED_TAG":
      return { ...state, selectedTag: action.payload };
    case "LOAD_SNIPPETS":
      return { ...state, snippets: action.payload };
    default:
      return state;
  }
};

const SnippetContext = createContext<{
  state: SnippetState;
  dispatch: React.Dispatch<SnippetAction>;
  getFilteredSnippets: () => Snippet[];
  getAllTags: () => string[];
  exportSnippets: () => void;
  importSnippets: (file: File) => Promise<void>;
} | null>(null);

export const SnippetProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(snippetReducer, {
    snippets: [],
    isModalOpen: false,
    searchQuery: "",
    selectedTag: "",
  });

  // Load snippets from localStorage on mount
  useEffect(() => {
    const savedSnippets = localStorage.getItem("snippo-demo-snippets");
    if (savedSnippets) {
      try {
        const snippets = JSON.parse(savedSnippets);
        dispatch({ type: "LOAD_SNIPPETS", payload: snippets });
      } catch (error) {
        console.error("Failed to load snippets:", error);
      }
    }
  }, []);

  // Save snippets to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(
      "snippo-demo-snippets",
      JSON.stringify(state.snippets)
    );
  }, [state.snippets]);

  const getFilteredSnippets = () => {
    return state.snippets.filter((snippet) => {
      const matchesSearch =
        state.searchQuery === "" ||
        snippet.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        snippet.description
          .toLowerCase()
          .includes(state.searchQuery.toLowerCase()) ||
        snippet.code.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        snippet.tags.some((tag) =>
          tag.toLowerCase().includes(state.searchQuery.toLowerCase())
        );

      const matchesTag =
        state.selectedTag === "" || snippet.tags.includes(state.selectedTag);

      return matchesSearch && matchesTag;
    });
  };

  const getAllTags = () => {
    const allTags = state.snippets.flatMap((snippet) => snippet.tags);
    return [...new Set(allTags)].sort();
  };

  const exportSnippets = () => {
    const dataStr = JSON.stringify(state.snippets, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `snippo-snippets-${
      new Date().toISOString().split("T")[0]
    }.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const importSnippets = async (file: File) => {
    try {
      const text = await file.text();
      const importedSnippets: Snippet[] = JSON.parse(text);

      const isValid = importedSnippets.every(
        (snippet) =>
          snippet.title && snippet.code && Array.isArray(snippet.tags)
      );

      if (!isValid) {
        throw new Error("Invalid snippet format");
      }

      dispatch({
        type: "LOAD_SNIPPETS",
        payload: [...state.snippets, ...importedSnippets],
      });
    } catch (error) {
      console.error("Import failed:", error);
      throw error;
    }
  };

  return (
    <SnippetContext.Provider
      value={{
        state,
        dispatch,
        getFilteredSnippets,
        getAllTags,
        exportSnippets,
        importSnippets,
      }}
    >
      {children}
    </SnippetContext.Provider>
  );
};

export const useSnippetStore = () => {
  const context = useContext(SnippetContext);
  if (!context) {
    throw new Error("useSnippetStore must be used within a SnippetProvider");
  }
  return context;
};
