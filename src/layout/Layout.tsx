export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen max-w-7xl my-0 mx-auto">
      {children}
    </div>
  );
}
