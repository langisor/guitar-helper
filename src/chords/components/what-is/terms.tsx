"use client";

export default function TermsContent() {
  return (
    <>
      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">What is the Terms Glossary?</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          The Terms Glossary is a comprehensive reference of guitar and music theory
          terminology. Whether you are reading a lesson, watching a tutorial, or
          discussing music with other musicians, this glossary helps you understand
          the language of music.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">How to Use the Glossary</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            Search for any term by typing in the search box. You can search by the
            term name or by keywords found in the definition. Terms are organized into
            categories to help you browse related concepts.
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Type a word to filter terms instantly</li>
            <li>Browse by category to explore related concepts</li>
            <li>Click a term card to read the full definition</li>
            <li>Use the glossary while using other tools for quick reference</li>
          </ul>
        </div>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Categories Covered</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="p-2 bg-muted rounded">
            <strong className="text-foreground">Theory</strong>
            <p className="text-xs text-muted-foreground">Scales, intervals, keys, and harmony</p>
          </div>
          <div className="p-2 bg-muted rounded">
            <strong className="text-foreground">Technique</strong>
            <p className="text-xs text-muted-foreground">Playing methods and fingerings</p>
          </div>
          <div className="p-2 bg-muted rounded">
            <strong className="text-foreground">Notation</strong>
            <p className="text-xs text-muted-foreground">Reading music, tabs, and diagrams</p>
          </div>
          <div className="p-2 bg-muted rounded">
            <strong className="text-foreground">Gear</strong>
            <p className="text-xs text-muted-foreground">Guitar parts, accessories, and tone</p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">Why Learn the Language?</h3>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          <li>Communicate clearly with other musicians</li>
          <li>Understand lessons, books, and videos faster</li>
          <li>Make sense of chord names and scale formulas</li>
          <li>Build a solid foundation for advanced study</li>
        </ul>
      </section>
    </>
  );
}
