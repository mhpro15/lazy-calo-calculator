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
      <p> Made with the idea I came up while on treadmill by{" "}
        <a
          href="https://manhung.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-600 dark:text-zinc-300 hover:underline"
        >
          me
        </a>
        .</p> 
        <p>Have an idea? Want to improve? Feel free to <a href="mailto:nmhp1903@gmail.com" className="text-zinc-600 dark:text-zinc-300 hover:underline">reach out!</a></p>
      </footer>
    </div>
  );
}
