import Link from "next/link";
import { Music, Grid3x3, GitBranch, Layers } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const features = [
  {
    title: "Chord Explorer",
    description: "Browse chords by key and suffix with interactive diagrams",
    href: "/chords-nav",
    icon: Music,
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    title: "Progression Builder",
    description: "Build progressions with Roman numerals, secondary dominants, and borrowed chords",
    href: "/progressions",
    icon: GitBranch,
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    title: "Fretboard Explorer",
    description: "Visualize all chord positions across the fretboard with voice leading",
    href: "/fretboard",
    icon: Layers,
    color: "bg-green-500/10 text-green-600",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 p-4 md:p-8">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Hero */}
        <div className="text-center space-y-4 py-12">
          <h1 className="text-4xl font-bold tracking-tight">
            Chord Viewer
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A comprehensive tool for exploring guitar chords, building progressions,
            and understanding fretboard harmony
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature) => (
            <Link key={feature.href} href={feature.href}>
              <Card className="h-full border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${feature.color} group-hover:scale-110 transition-transform`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="w-full">
                    Explore →
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Progression Engine</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• Roman numeral mapping (I–IV–V)</p>
              <p>• Major & minor harmony systems</p>
              <p>• Secondary dominants</p>
              <p>• Borrowed chords & modal interchange</p>
              <p>• Auto chord suggestion based on key</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Fretboard Transformer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• Visual model of 6×24 fretboard</p>
              <p>• All chord voicings per position</p>
              <p>• Voice leading optimization</p>
              <p>• Position-based filtering</p>
              <p>• Smooth transition paths</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

