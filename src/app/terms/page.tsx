"use client";

import { useState } from "react";
import { useTerms } from "@/chords/hooks/use-terms";
import { Term, TermCategory } from "@/chords/types/terms.types";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpenIcon, SearchIcon } from "lucide-react";

export default function TermsPage() {
  const { data: termsData, isLoading } = useTerms();
  const [query, setQuery] = useState("");

  const filteredCategories = (() => {
    if (!termsData) return [];
    if (!query.trim()) return termsData.categories;

    const q = query.toLowerCase();
    return termsData.categories
      .map((category: TermCategory) => ({
        ...category,
        terms: category.terms.filter((term: Term) =>
          term.term.toLowerCase().includes(q) ||
          term.definition.toLowerCase().includes(q)
        ),
      }))
      .filter((category: TermCategory) => category.terms.length > 0);
  })();

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <BookOpenIcon className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Music Terms Glossary</h1>
        </div>
        <p className="text-muted-foreground">
          Search and explore guitar and music theory terms
        </p>
      </div>

      <div className="relative mb-8">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search terms or definitions..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {isLoading ? (
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse space-y-3">
              <div className="h-6 w-40 bg-muted rounded" />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="h-24 bg-muted rounded" />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : filteredCategories.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No terms found matching "{query}"</p>
        </div>
      ) : (
        <div className="space-y-8">
          {filteredCategories.map((category: TermCategory) => (
            <section key={category.name}>
              <h2 className="text-xl font-semibold mb-4 text-muted-foreground">
                {category.name}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {category.terms.map((term: Term) => (
                  <Card key={term.term} className="hover:bg-muted/50 transition-colors">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{term.term}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {term.definition}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
