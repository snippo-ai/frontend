interface MainContentProps {
  children: React.ReactNode;
}

const MainContent = ({ children }: MainContentProps) => {
  return (
    <main className="flex-1 overflow-y-auto bg-background">
      <div className="container mx-auto p-4 md:p-6">{children}</div>
    </main>
  );
};

export default MainContent;
