export default function HomeContent() {
  return (
    <>
      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">What is This Guide?</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          This is the Advanced Beginner&apos;s Guide to Guitar & Music Theory — a bridge
          between &quot;playing songs&quot; and &quot;understanding music.&quot; If you already know your
          open chords (C, A, G, E, D) and can strum a few songs, this guide will help
          you unlock the fretboard, understand why chords work together, and give you
          the tools to start improvising.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">What You Will Learn</h3>
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="p-3 bg-muted rounded">
            <strong className="text-foreground">Master the Fretboard</strong>
            <p className="text-xs mt-1">
              Learn the musical alphabet, the chromatic scale, and how to navigate the
              entire neck of the guitar.
            </p>
          </div>
          <div className="p-3 bg-muted rounded">
            <strong className="text-foreground">Understand Intervals</strong>
            <p className="text-xs mt-1">
              Intervals are the DNA of music. Learn to hear and recognize the distances
              between notes that define every chord and scale.
            </p>
          </div>
          <div className="p-3 bg-muted rounded">
            <strong className="text-foreground">Major Scale & Key Theory</strong>
            <p className="text-xs mt-1">
              The Major scale is the reference point for all Western music theory.
              Understanding it unlocks chords, progressions, and modes.
            </p>
          </div>
          <div className="p-3 bg-muted rounded">
            <strong className="text-foreground">Chord Construction</strong>
            <p className="text-xs mt-1">
              Learn how triads are built from scales, and discover the diatonic chord
              family that underpins thousands of songs.
            </p>
          </div>
          <div className="p-3 bg-muted rounded">
            <strong className="text-foreground">Move Beyond Open Chords</strong>
            <p className="text-xs mt-1">
              Barre chords and the CAGED system let you play any chord, anywhere on
              the neck.
            </p>
          </div>
          <div className="p-3 bg-muted rounded">
            <strong className="text-foreground">The Pentatonic Scale</strong>
            <p className="text-xs mt-1">
              The foundation of Blues, Rock, and Country soloing. Learn the scale that
              makes it almost impossible to play a wrong note.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Interactive Tools</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>Throughout the guide, you will find interactive tools to practice what you learn:</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Chord Explorer</strong> — Browse chords by key and type with diagrams</li>
            <li><strong>Fretboard Explorer</strong> — Visualize chord positions across the neck</li>
            <li><strong>Progression Builder</strong> — Build progressions with Roman numerals</li>
            <li><strong>Metronome Trainer</strong> — Develop precise timing and rhythm</li>
            <li><strong>Chord Studio</strong> — Explore 2D/3D diagrams with audio playback</li>
            <li><strong>Terms Glossary</strong> — Look up any music theory term instantly</li>
          </ul>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">How to Use This Guide</h3>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          <li>Work through one module per week. Master it before moving on.</li>
          <li>When playing a chord, ask: &quot;Where is the root note? Major or Minor 3rd?&quot;</li>
          <li>If you learn a new scale, find a backing track and improvise for 10 minutes.</li>
          <li>Use the interactive tools to reinforce every concept with hands-on practice.</li>
        </ul>
      </section>
    </>
  );
}
