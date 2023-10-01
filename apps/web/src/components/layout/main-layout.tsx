import React from "react";

type MainLayoutProps = {
  children: React.ReactNode;
  title: string;
  description: string;
};

export default function MainLayout({
  title,
  description,
  children,
}: MainLayoutProps) {
  return (
    <main>
      <section className="container py-8">
        <div className="border-b pb-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold">
            {title}
          </h1>
          <p className="text-gray-600">{description}</p>
        </div>
        <div className="mt-5">{children}</div>
      </section>
    </main>
  );
}
