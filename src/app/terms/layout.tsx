import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Music Terms Glossary | Chrod Viewer",
  description: "Search and explore guitar and music theory terms",
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
