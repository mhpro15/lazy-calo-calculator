import LazyCaloCalculator from "./components/LazyCaloCalculator";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f0f0f0] dark:bg-zinc-950 flex flex-col items-center justify-center p-4 font-mono">
      <div className="mb-8 text-center">
        <div className="inline-block bg-black text-white px-4 py-1 text-sm font-bold uppercase tracking-widest mb-4">
          Beta Version 0.0.1 (Probably wrong)
        </div>
      </div>

      <LazyCaloCalculator />

      <footer className="mt-12 text-zinc-400 text-sm font-bold uppercase tracking-tighter">
        Made with 🍕 and zero physical activity
      </footer>
    </div>
  );
}
