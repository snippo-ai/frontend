import { Container } from "@/components/shared/container";
import Divider from "@/components/shared/divider";
import SectionHeading from "@/components/shared/section-heading";
import Typography from "@/components/shared/typography";

const DemoSection = () => {
  return (
    <Container className="w-full px-4 py-16 flex flex-col items-center">
      <SectionHeading
        as="h2"
        subtitle="Experience how easily you can save, search, and organize your code snippets with Snippo AI."
      >
        See Snippo AI in Action
      </SectionHeading>
      <Divider />
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
    </Container>
  );
};

export default DemoSection;
