interface PreviewLayoutProps {
  children: React.ReactNode;
}

export function PreviewLayout({ children }: PreviewLayoutProps) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </main>
  );
}