import { ChordDiagram } from "@/chords/components/chord-diagram";
import { Card, CardContent } from "@/components/ui/card";

const CHORD_DIAGRAM_CONTENT = (
  <>
    <section className="mb-6">
      <h3 className="text-lg font-semibold mb-2">What is a Chord Diagram?</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        A chord diagram (also called a chord chart or chord box) is a visual
        representation showing exactly where to place your fingers on the fretboard
        to play a specific chord. It&apos;s like a map of the guitar neck from the player&apos;s
        perspective, showing strings and frets from above.
      </p>
    </section>

    <section className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Reading the Diagram</h3>
      <div className="space-y-3 text-sm text-muted-foreground">
        <div className="p-3 bg-muted rounded">
          <strong className="text-foreground">Vertical Lines = Strings</strong>
          <p className="text-xs mt-1">The 6 vertical lines represent the 6 guitar strings. The left line is the low E (thickest string), and the right line is the high e (thinnest string).</p>
        </div>
        <div className="p-3 bg-muted rounded">
          <strong className="text-foreground">Horizontal Lines = Frets</strong>
          <p className="text-xs mt-1">The horizontal lines represent the metal frets. The top line is the nut (headstock end) or first fret. Each space between lines is one fret.</p>
        </div>
        <div className="p-3 bg-muted rounded">
          <strong className="text-foreground">Dots = Finger Positions</strong>
          <p className="text-xs mt-1">Black dots show where to place your fingers. The number inside the dot indicates which finger (1=index, 2=middle, 3=ring, 4=pinky).</p>
        </div>
        <div className="p-3 bg-muted rounded">
          <strong className="text-foreground">O = Open String</strong>
          <p className="text-xs mt-1">An &quot;O&quot; above a string means play it open (without pressing any fret).</p>
        </div>
        <div className="p-3 bg-muted rounded">
          <strong className="text-foreground">X = Muted String</strong>
          <p className="text-xs mt-1">An &quot;X&quot; above a string means don&apos;t play that string (mute it with your fretting hand).</p>
        </div>
      </div>
    </section>

    <section className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Barre Indicators</h3>
      <div className="space-y-2 text-sm text-muted-foreground">
        <p>A barre (or bar) is when one finger presses multiple strings across the fretboard. In diagrams:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>A curved line connects dots that are played by the same finger</li>
          <li>The number on the barre shows which finger holds it</li>
          <li>Barres allow you to move chord shapes up and down the neck</li>
        </ul>
      </div>
    </section>

    <section className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Finger Number Reference</h3>
      <div className="grid grid-cols-4 gap-2 text-sm">
        <div className="text-center p-2 bg-muted rounded">
          <div className="font-bold">1</div>
          <div className="text-xs text-muted-foreground">Index</div>
        </div>
        <div className="text-center p-2 bg-muted rounded">
          <div className="font-bold">2</div>
          <div className="text-xs text-muted-foreground">Middle</div>
        </div>
        <div className="text-center p-2 bg-muted rounded">
          <div className="font-bold">3</div>
          <div className="text-xs text-muted-foreground">Ring</div>
        </div>
        <div className="text-center p-2 bg-muted rounded">
          <div className="font-bold">4</div>
          <div className="text-xs text-muted-foreground">Pinky</div>
        </div>
      </div>
    </section>

    <section>
      <h3 className="text-lg font-semibold mb-2">Base Fret Indicator</h3>
      <div className="space-y-2 text-sm text-muted-foreground">
        <p>When a chord uses frets higher than the first fret, a number appears on the left side showing the &quot;base fret.&quot;</p>
        <p>Example: If you see &quot;3&quot; on the left, the chord starts at the 3rd fret. All finger positions are relative to that base fret.</p>
      </div>
    </section>
  </>
);

const DEMO_POSITION = {
  frets: [0, 2, 2, 1, 0, -1],
  fingers: [0, 2, 3, 1, 0, 0],
  baseFret: 1,
  barres: [],
  midi: [40, 45, 50, 55, 59, 0],
};

export default function ChordDiagramContent() {
  return CHORD_DIAGRAM_CONTENT;
}

export function ChordDiagramDemo() {
  return (
    <div className="p-4 md:p-8">
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Chord Diagram</h1>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto">
            Visual representation of guitar chord fingerings
          </p>
        </div>
        <Card className="border border-border/50 shadow-lg bg-card/50 backdrop-blur-sm">
          <CardContent className="p-8 flex justify-center">
            <ChordDiagram
              position={DEMO_POSITION}
              width={200}
              height={240}
              className="text-foreground"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}