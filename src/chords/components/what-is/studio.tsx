export default function StudioContent() {
  return (
    <>
      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">What is Chord Studio?</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Chord Studio is an interactive environment for exploring guitar chords through
          multiple visual representations. It combines traditional 2D chord diagrams with
          an immersive 3D fretboard view, giving you a complete picture of how a chord is
          constructed and where it sits on the guitar neck.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">2D Chord Diagram</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            The classic chord diagram shows a top-down view of the fretboard with dots
            indicating finger placement. It is the standard notation used in sheet music,
            tabs, and chord books.
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Vertical lines represent the six strings</li>
            <li>Horizontal lines represent the metal frets</li>
            <li>Numbers inside dots tell you which finger to use</li>
            <li>Open strings are marked with an &quot;O&quot;</li>
            <li>Muted strings are marked with an &quot;X&quot;</li>
          </ul>
        </div>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">3D Fretboard View</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            The 3D fretboard gives you a perspective view of the guitar neck, making it
            easier to visualize the physical spacing between notes and understand how
            chord shapes stretch across the strings.
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>See the actual depth and width of the fretboard</li>
            <li>Understand string spacing and finger stretches</li>
            <li>Visualize barre chords as physical bars across the neck</li>
            <li>Rotate the view to see the chord from different angles</li>
          </ul>
        </div>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Audio Playback</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            Hearing a chord is just as important as seeing it. The Studio includes audio
            playback so you can verify that you are fingering the chord correctly and
            train your ear to recognize different chord qualities.
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Play the full chord to hear the complete sound</li>
            <li>Strum mode simulates realistic guitar strumming</li>
            <li>Arpeggio mode plays each note individually</li>
            <li>Use playback to check your tuning and intonation</li>
          </ul>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">How to Use the Studio</h3>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          <li>Select a root key and chord type from the controls</li>
          <li>Switch between 2D diagram and 3D fretboard views</li>
          <li>Click the play button to hear the chord</li>
          <li>Toggle left-handed mode if you play left-handed</li>
          <li>Experiment with different voicings and inversions</li>
        </ul>
      </section>
    </>
  );
}
