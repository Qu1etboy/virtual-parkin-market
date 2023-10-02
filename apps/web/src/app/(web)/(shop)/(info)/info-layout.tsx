import React from "react";

export default function InfoLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="container mx-auto mt-12">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-6">
        {title}
      </h1>
      <article className="prose">{children}</article>
    </main>
  );
}
