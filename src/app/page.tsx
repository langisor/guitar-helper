import Image from "next/image";
import Link from "next/link";
import {
  Music,
  GitBranch,
  Layers,
  BookOpen,
  Guitar,
  GraduationCap,
  ArrowRight,
  Timer,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TermDefinition } from "@/chords/components/term-tooltip";

const tools = [
  {
    title: "Chord Explorer",
    description: "Browse chords by key and suffix with interactive diagrams",
    href: "/chords-nav",
    icon: Music,
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    title: "Progression Builder",
    description: "Build progressions with Roman numerals and advanced harmony",
    href: "/progressions",
    icon: GitBranch,
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    title: "Fretboard Explorer",
    description: "Visualize chord positions across the fretboard",
    href: "/fretboard",
    icon: Layers,
    color: "bg-green-500/10 text-green-600",
  },
  {
    title: "Metronome Trainer",
    description: "Precision timing practice with mute modes and auto tempo",
    href: "/metro-trainer",
    icon: Timer,
    color: "bg-red-500/10 text-red-600",
  },
  {
    title: "Terms Glossary",
    description: "Comprehensive reference for guitar and music theory terms",
    href: "/terms",
    icon: BookOpen,
    color: "bg-amber-500/10 text-amber-600",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="px-4 md:px-8 py-16 md:py-20">
        <div className="mx-auto max-w-4xl text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <GraduationCap className="h-4 w-4" />
            <span>Advanced Beginner&apos;s Guide</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            The Advanced Beginner&apos;s Guide to
            <br />
            <span className="text-muted-foreground">Guitar & Music Theory</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Welcome to the bridge between &quot;playing songs&quot; and &quot;understanding music.&quot; 
            As an advanced beginner, you likely know your open chords (C, A, G, E, D) and can play a few riffs. 
            This guide will help you unlock the fretboard, understand why chords work together, 
            and give you the tools to start improvising.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <Link href="/chords-nav">
              <Button>
                <Guitar className="mr-2 h-4 w-4" />
                Explore Chords
              </Button>
            </Link>
            <Link href="/fretboard">
              <Button variant="outline">
                <Layers className="mr-2 h-4 w-4" />
                Fretboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Separator />

      {/* Module 1 */}
      <section className="px-4 md:px-8 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
              1
            </div>
            <h2 className="text-2xl font-bold">Mastering the Fretboard</h2>
          </div>
          <p className="text-muted-foreground mb-6">
            Before you can apply music theory, you need to know the &quot;map&quot; of your instrument.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">1.1 The Musical Alphabet & The Chromatic Scale</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>
                  In Western music, there are only 12 <TermDefinition term="Note" />s. 
                  After G#, we start over at A.
                </p>
                <p className="font-mono text-xs bg-muted p-2 rounded">
                  A - A# - B - C - C# - D - D# - E - F - F# - G - G#
                </p>
                <div className="mt-4 rounded-lg overflow-hidden border">
                  <Image
                    src="/images/into/1.1.png"
                    alt="The Musical Alphabet and Chromatic Scale"
                    width={800}
                    height={450}
                    className="w-full h-auto"
                  />
                </div>
                <p>
                  <strong>The Rule of B/C and E/F:</strong> There is no <TermDefinition term="Sharp (#)" /> between 
                  B and C or E and F. They are naturally only one <TermDefinition term="Interval" /> (one <TermDefinition term="Fret" />) apart.
                </p>
              </CardContent>
            </Card>

            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">1.2 Steps and Half-Steps</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>
                  <strong>Half-Step (H):</strong> A distance of one fret.
                </p>
                <p>
                  <strong>Whole Step (W):</strong> A distance of two frets.
                </p>
                <p className="pt-2 text-xs">
                  These form the building blocks of <TermDefinition term="Scale" />s and <TermDefinition term="Interval" />s.
                </p>
              </CardContent>
            </Card>

            <Card className="border shadow-sm md:col-span-2">
              <CardHeader>
                <CardTitle className="text-base">1.3 The Power of the Low E and A Strings</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p className="mb-4">
                  To play <TermDefinition term="Barre Chord" />s and <TermDefinition term="Scale" />s, 
                  you must memorize the notes on the lowest two <TermDefinition term="String" />s. 
                  These are your &quot;anchor strings.&quot;
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-muted p-3 rounded">
                    <p className="font-semibold mb-1">Low E String</p>
                    <p className="font-mono text-xs">
                      E (0), F (1), G (3), A (5), B (7), C (8), D (10), E (12)
                    </p>
                  </div>
                  <div className="bg-muted p-3 rounded">
                    <p className="font-semibold mb-1">A String</p>
                    <p className="font-mono text-xs">
                      A (0), B (2), C (3), D (5), E (7), F (8), G (10), A (12)
                    </p>
                  </div>
                </div>
                <div className="mt-4 rounded-lg overflow-hidden border">
                  <Image
                    src="/images/into/1.3.png"
                    alt="Power of the Low E and A Strings"
                    width={800}
                    height={450}
                    className="w-full h-auto"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Module 2 */}
      <section className="px-4 md:px-8 py-12 bg-muted/30">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
              2
            </div>
            <h2 className="text-2xl font-bold">Understanding Intervals</h2>
          </div>
          <p className="text-muted-foreground mb-6">
            An <TermDefinition term="Interval" /> is the distance between any two notes. 
            Intervals are the &quot;DNA&quot; of music; they determine the emotional quality of a sound.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">2.1 The Major Third vs. The Minor Third</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>This is the most important interval for a beginner to hear:</p>
                <p>
                  <strong>Major 3rd:</strong> Sounds bright, happy, and stable. (4 frets distance)
                </p>
                <p>
                  <strong>Minor 3rd:</strong> Sounds dark, sad, or &quot;bluesy.&quot; (3 frets distance)
                </p>
                <p className="text-xs pt-2">
                  This distinction defines whether a <TermDefinition term="Triad" /> is <TermDefinition term="Major Chord" /> or <TermDefinition term="Minor Chord" />.
                </p>
                <div className="mt-4 rounded-lg overflow-hidden border">
                  <Image
                    src="/images/into/2.1.png"
                    alt="Major Third vs Minor Third"
                    width={800}
                    height={450}
                    className="w-full h-auto"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">2.2 The Perfect Fifth</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>
                  The 5th is the most stable interval. When you play a <TermDefinition term="Power Chord" />, 
                  you are playing only the Root note and the Perfect 5th.
                </p>
                <p>
                  It is neither major nor minor; it is pure strength and works in any context.
                </p>
                <div className="mt-4 rounded-lg overflow-hidden border">
                  <Image
                    src="/images/into/2.2.png"
                    alt="The Perfect Fifth"
                    width={800}
                    height={450}
                    className="w-full h-auto"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Module 3 */}
      <section className="px-4 md:px-8 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
              3
            </div>
            <h2 className="text-2xl font-bold">The Major Scale & Key Theory</h2>
          </div>
          <p className="text-muted-foreground mb-6">
            Almost everything in music theory is compared back to the Major <TermDefinition term="Scale" />.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">3.1 The Major Scale Formula</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>
                  Every Major scale, regardless of the starting <TermDefinition term="Note" />, 
                  follows this pattern of steps:
                </p>
                <p className="font-mono text-center bg-muted p-2 rounded">
                  W - W - H - W - W - W - H
                </p>
                <p className="text-xs">
                  W = Whole Step (2 frets), H = Half Step (1 fret)
                </p>
                <p className="pt-2">
                  <strong>Example (C Major):</strong>{" "}
                  <span className="font-mono">C (W) D (W) E (H) F (W) G (W) A (W) B (H) C</span>
                </p>
                <div className="mt-4 rounded-lg overflow-hidden border">
                  <Image
                    src="/images/into/3.png"
                    alt="Major Scale Formula"
                    width={800}
                    height={450}
                    className="w-full h-auto"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">3.2 What is a &quot;Key&quot;?</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>
                  When we say a song is in the &quot;<TermDefinition term="Key" /> of G,&quot; 
                  it means the notes and <TermDefinition term="Chord" />s are primarily drawn from the G Major Scale.
                </p>
                <p>
                  The Root (I) note feels like &quot;home&quot;—the resolution point of the music.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Module 4 */}
      <section className="px-4 md:px-8 py-12 bg-muted/30">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
              4
            </div>
            <h2 className="text-2xl font-bold">Chord Construction</h2>
          </div>
          <p className="text-muted-foreground mb-6">
            <TermDefinition term="Chord" />s aren&apos;t random; they are built using specific formulas from the Major Scale.
          </p>

          <div className="grid gap-4">
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">4.1 Triads</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p className="mb-4">
                  A basic chord is called a <TermDefinition term="Triad" /> because it contains three notes:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-muted p-3 rounded">
                    <p className="font-semibold text-green-600 mb-1">Major Triad</p>
                    <p>1st, 3rd, and 5th notes of the scale</p>
                    <p className="text-xs mt-1 text-muted-foreground">Example: C (1), E (3), G (5)</p>
                  </div>
                  <div className="bg-muted p-3 rounded">
                    <p className="font-semibold text-blue-600 mb-1">Minor Triad</p>
                    <p>1st, flatted 3rd (b3), and 5th notes</p>
                    <p className="text-xs mt-1 text-muted-foreground">Example: C (1), Eb (b3), G (5)</p>
                  </div>
                </div>
                <div className="mt-4 rounded-lg overflow-hidden border">
                  <Image
                    src="/images/into/4.1.png"
                    alt="Triads - Major and Minor"
                    width={800}
                    height={450}
                    className="w-full h-auto"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">4.2 Diatonic Chords (The Chord Family)</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p className="mb-4">
                  In any major <TermDefinition term="Key" />, you can build a chord starting on each <TermDefinition term="Scale Degree" />. 
                  The pattern always stays the same:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-2">Scale Degree</th>
                        <th className="text-center py-2 px-2">I</th>
                        <th className="text-center py-2 px-2">ii</th>
                        <th className="text-center py-2 px-2">iii</th>
                        <th className="text-center py-2 px-2">IV</th>
                        <th className="text-center py-2 px-2">V</th>
                        <th className="text-center py-2 px-2">vi</th>
                        <th className="text-center py-2 px-2">vii°</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-2 px-2 font-medium">Chord Quality</td>
                        <td className="text-center py-2 px-2 text-green-600">Major</td>
                        <td className="text-center py-2 px-2 text-blue-600">minor</td>
                        <td className="text-center py-2 px-2 text-blue-600">minor</td>
                        <td className="text-center py-2 px-2 text-green-600">Major</td>
                        <td className="text-center py-2 px-2 text-green-600">Major</td>
                        <td className="text-center py-2 px-2 text-blue-600">minor</td>
                        <td className="text-center py-2 px-2 text-red-600">dim</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-sm bg-primary/5 p-3 rounded">
                  <strong>Theory Tip:</strong> This is why the G, C, and D chords (I, IV, and V) sound so good together in the <TermDefinition term="Key" /> of G! Try it in the{" "}
                  <Link href="/progressions" className="text-primary hover:underline">Progression Builder</Link>.
                </p>
                <div className="mt-4 rounded-lg overflow-hidden border">
                  <Image
                    src="/images/into/4.2.png"
                    alt="Diatonic Chords - The Chord Family"
                    width={800}
                    height={450}
                    className="w-full h-auto"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Module 5 */}
      <section className="px-4 md:px-8 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
              5
            </div>
            <h2 className="text-2xl font-bold">Moving Beyond Open Chords</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">5.1 Barre Chords (The E and A Shapes)</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>
                  <TermDefinition term="Barre Chord" />s allow you to play any chord anywhere on the neck 
                  by using your index finger as a &quot;movable <TermDefinition term="Nut" />.&quot;
                </p>
                <p>
                  <strong>E-Shape:</strong> Build a chord based on your open E Major shape. 
                  The note on the Low E <TermDefinition term="String" /> determines the chord name.
                </p>
                <p>
                  <strong>A-Shape:</strong> Build a chord based on your open A Major shape. 
                  The note on the A string determines the chord name.
                </p>
                <p className="text-xs pt-2">
                  Check the <Link href="/fretboard" className="text-primary hover:underline">Fretboard Explorer</Link> to visualize these shapes.
                </p>
                <div className="mt-4 rounded-lg overflow-hidden border">
                  <Image
                    src="/images/into/5.png"
                    alt="Barre Chords and CAGED System"
                    width={800}
                    height={450}
                    className="w-full h-auto"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">5.2 Introduction to the CAGED System</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>
                  The CAGED system is a way to see how the five basic open chord shapes 
                  (C, A, G, E, and D) connect across the entire <TermDefinition term="Fretboard" />.
                </p>
                <p>
                  Any chord can be played in any of these five shapes. Learning how they 
                  &quot;interlock&quot; is the key to professional-level fretboard visualization.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Module 6 */}
      <section className="px-4 md:px-8 py-12 bg-muted/30">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
              6
            </div>
            <h2 className="text-2xl font-bold">The Pentatonic Scale</h2>
          </div>
          <p className="text-muted-foreground mb-6">
            The Pentatonic <TermDefinition term="Scale" /> is a 5-note scale that is the foundation of Blues, Rock, and Country soloing.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">6.1 The Minor Pentatonic (Pattern 1)</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>This is the most used scale in guitar history.</p>
                <p>
                  <strong>Formula:</strong> 1, b3, 4, 5, b7
                </p>
                <p>
                  <strong>Why it works:</strong> It removes the &quot;tricky&quot; notes of the full scale 
                  (the 2nd and 6th), making it almost impossible to play a &quot;wrong&quot; note during a solo.
                </p>
                <div className="mt-4 rounded-lg overflow-hidden border">
                  <Image
                    src="/images/into/6.1.png"
                    alt="Minor Pentatonic Pattern 1"
                    width={800}
                    height={450}
                    className="w-full h-auto"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">6.2 Relative Major and Minor</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>
                  Every Major <TermDefinition term="Key" /> has a{" "}
                  <TermDefinition term="Relative Minor" /> <TermDefinition term="Key" /> that uses the exact same notes.
                </p>
                <p>
                  <strong>Example:</strong> C Major and A Minor contain the same notes.
                </p>
                <p className="pt-2">
                  <strong>Application:</strong> You can play the A Minor Pentatonic over a song in C Major, 
                  and it will sound great!
                </p>
                <div className="mt-4 rounded-lg overflow-hidden border">
                  <Image
                    src="/images/into/6.2.png"
                    alt="Relative Major and Minor"
                    width={800}
                    height={450}
                    className="w-full h-auto"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Module 7 */}
      <section className="px-4 md:px-8 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
              7
            </div>
            <h2 className="text-2xl font-bold">Rhythm and Timing</h2>
          </div>
          <p className="text-muted-foreground mb-6">
            Theory isn&apos;t just about notes; it&apos;s about <TermDefinition term="Tempo" /> and time.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">7.1 Subdivisions</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-3">
                <div className="bg-muted p-2 rounded">
                  <p className="font-semibold">Quarter Notes</p>
                  <p className="font-mono">1, 2, 3, 4</p>
                </div>
                <div className="bg-muted p-2 rounded">
                  <p className="font-semibold">Eighth Notes</p>
                  <p className="font-mono">1 &amp; 2 &amp; 3 &amp; 4 &amp;</p>
                </div>
                <div className="bg-muted p-2 rounded">
                  <p className="font-semibold">Sixteenth Notes</p>
                  <p className="font-mono">1 e &amp; a, 2 e &amp; a, 3 e &amp; a, 4 e &amp; a</p>
                </div>
                <div className="mt-4 rounded-lg overflow-hidden border">
                  <Image
                    src="/images/into/7.1.png"
                    alt="Rhythm Subdivisions"
                    width={800}
                    height={450}
                    className="w-full h-auto"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">7.2 The &quot;Internal Clock&quot;</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>
                  An advanced beginner stops &quot;guessing&quot; when to <TermDefinition term="Strumming" /> and 
                  starts feeling the subdivision.
                </p>
                <p>
                  Always practice with a metronome set to a slow <TermDefinition term="Tempo" /> (60–80 BPM) 
                  to develop your &quot;pocket&quot;—the ability to play perfectly in time.
                </p>
                <div className="mt-4 rounded-lg overflow-hidden border">
                  <Image
                    src="/images/into/7.2.png"
                    alt="Internal Clock and Metronome Practice"
                    width={800}
                    height={450}
                    className="w-full h-auto"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Separator />

      {/* How to Use */}
      <section className="px-4 md:px-8 py-12 bg-muted/30">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold mb-6">How to Use This Guide</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">1</span>
                  Don&apos;t rush
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Pick one module per week. Master it before moving on.
                </p>
              </CardContent>
            </Card>
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">2</span>
                  Visualize
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  When playing a chord, ask: &quot;Where is the root note? Is this Major or Minor 3rd?&quot;
                </p>
              </CardContent>
            </Card>
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">3</span>
                  Apply
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  If you learn a new scale, find a backing track and improvise for 10 minutes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Interactive Tools */}
      <section className="px-4 md:px-8 py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-8">Put Theory into Practice</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {tools.map((tool) => (
              <Link key={tool.href} href={tool.href}>
                <Card className="h-full border shadow-sm hover:shadow-md transition-all cursor-pointer group hover:-translate-y-1">
                  <CardHeader className="pb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${tool.color} group-hover:scale-110 transition-transform`}>
                      <tool.icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base">{tool.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{tool.description}</p>
                    <div className="flex items-center text-sm text-primary font-medium">
                      Explore
                      <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 md:px-8 py-16 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">Ready to unlock the fretboard?</h2>
          <p className="text-muted-foreground mb-6">
            Start exploring interactive chord diagrams, build progressions, and visualize 
            the entire fretboard with our tools.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/chords-nav">
              <Button size="lg">
                <Music className="mr-2 h-5 w-5" />
                Explore Chords
              </Button>
            </Link>
            <Link href="/terms">
              <Button variant="outline" size="lg">
                <BookOpen className="mr-2 h-5 w-5" />
                Browse All Terms
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
