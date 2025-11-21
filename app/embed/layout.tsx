import "@/styles/globals.css";

export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="m-0 p-0 bg-transparent">
        <main className="w-[293px] h-[50px] m-0 p-0">{children}</main>
      </body>
    </html>
  );
}
