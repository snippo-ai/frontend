import Typography from "@/components/shared/typography";

const DemoSection = () => {
  return (
    <section className="w-full max-w-4xl px-4 py-16 flex flex-col items-center">
      <Typography as="h2" fluidSize="fluid-2xl" className="font-semibold mb-4">
        See Snippo AI in Action
      </Typography>
      <div className="w-full bg-zinc-950 rounded-xl shadow-lg overflow-auto border border-zinc-200 dark:border-zinc-800 mb-4 animate-fade-in">
        <pre
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
        </pre>
      </div>
      <Typography as="p" className="text-muted-foreground">
        Developer-friendly, syntax-highlighted, and blazing fast.
      </Typography>
    </section>
  );
};

export default DemoSection;
