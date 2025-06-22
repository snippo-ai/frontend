import { X } from "lucide-react";
import { useRef } from "react";

const DEFAULT_CODE = `function helloWorld() {
  console.log('Hello, world!');
}`;

const SaveSnippetModal = () => {
  // const { state, dispatch } = useSnippetStore();
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Trap focus
  // useEffect(() => {
  //   if (state.isModalOpen && firstInputRef.current) {
  //     firstInputRef.current.focus();
  //   }
  //   const handleFocus = (e: KeyboardEvent) => {
  //     if (!state.isModalOpen) return;
  //     const focusableEls = modalRef.current?.querySelectorAll<HTMLElement>(
  //       'input, textarea, button, [tabindex]:not([tabindex="-1"])'
  //     );
  //     if (!focusableEls || focusableEls.length === 0) return;
  //     const first = focusableEls[0];
  //     const last = focusableEls[focusableEls.length - 1];
  //     if (e.key === "Tab") {
  //       if (e.shiftKey) {
  //         if (document.activeElement === first) {
  //           e.preventDefault();
  //           last.focus();
  //         }
  //       } else {
  //         if (document.activeElement === last) {
  //           e.preventDefault();
  //           first.focus();
  //         }
  //       }
  //     }
  //   };
  //   document.addEventListener("keydown", handleFocus);
  //   return () => document.removeEventListener("keydown", handleFocus);
  // }, [state.isModalOpen]);

  // Close on Esc
  // useEffect(() => {
  //   const handleEsc = (e: KeyboardEvent) => {
  //     if (e.key === "Escape" && state.isModalOpen) {
  //       dispatch({ type: "SET_MODAL_OPEN", payload: false });
  //     }
  //   };
  //   document.addEventListener("keydown", handleEsc);
  //   return () => document.removeEventListener("keydown", handleEsc);
  // }, [state.isModalOpen, dispatch]);

  // if (!state.isModalOpen) return null;

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const form = e.currentTarget;
  //   const title = (
  //     form.elements.namedItem("title") as HTMLInputElement
  //   ).value.trim();
  //   const description = (
  //     form.elements.namedItem("description") as HTMLInputElement
  //   ).value.trim();
  //   const tags = (form.elements.namedItem("tags") as HTMLInputElement).value
  //     .split(",")
  //     .map((t) => t.trim())
  //     .filter(Boolean);
  //   const code = (form.elements.namedItem("code") as HTMLTextAreaElement).value;
  //   if (!title || !code) return;
  //   dispatch({
  //     type: "ADD_SNIPPET",
  //     payload: { title, description, tags, code },
  //   });
  //   dispatch({ type: "SET_MODAL_OPEN", payload: false });
  // };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        className="bg-zinc-900 rounded-xl shadow-2xl border border-zinc-700 w-full max-w-md p-6 relative animate-fade-in"
      >
        <button
          className="absolute top-3 right-3 p-2 rounded-md hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-violet-400"
          aria-label="Close modal"
          // onClick={() => dispatch({ type: "SET_MODAL_OPEN", payload: false })}
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold mb-2 text-violet-400">
          Save a Snippet
        </h2>
        <form
          // onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title <span className="text-violet-400">*</span>
            </label>
            <input
              ref={firstInputRef}
              id="title"
              name="title"
              type="text"
              required
              className="w-full rounded-md bg-zinc-800 border border-zinc-700 px-3 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-violet-400"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-1"
            >
              Description
            </label>
            <input
              id="description"
              name="description"
              type="text"
              className="w-full rounded-md bg-zinc-800 border border-zinc-700 px-3 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-violet-400"
            />
          </div>
          <div>
            <label htmlFor="tags" className="block text-sm font-medium mb-1">
              Tags <span className="text-zinc-400">(comma separated)</span>
            </label>
            <input
              id="tags"
              name="tags"
              type="text"
              className="w-full rounded-md bg-zinc-800 border border-zinc-700 px-3 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-violet-400"
            />
          </div>
          <div>
            <label htmlFor="code" className="block text-sm font-medium mb-1">
              Code <span className="text-violet-400">*</span>
            </label>
            <textarea
              id="code"
              name="code"
              required
              rows={5}
              defaultValue={DEFAULT_CODE}
              className="w-full rounded-md bg-zinc-800 border border-zinc-700 px-3 py-2 text-zinc-100 font-mono focus:outline-none focus:ring-2 focus:ring-violet-400"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-md bg-violet-600 hover:bg-violet-500 text-white font-semibold transition focus:outline-none focus:ring-2 focus:ring-violet-400"
          >
            Save Snippet
          </button>
        </form>
      </div>
    </div>
  );
};

export default SaveSnippetModal;
