import React from 'react';

/**
 * BaoliGuard Root Application Component.
 *
 * Phase 0 Scaffold:
 * Provides the base shell and confirms architecture readiness.
 * Feature development will be led by Anika Jain in Phase 1.
 */
export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🏛️</span>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">BaoliGuard</h1>
              <p className="text-xs text-amber-400 font-mono">
                Jal-Dharohar Digital Intelligence &amp; Conservation Platform
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center rounded-full bg-emerald-950 px-2.5 py-0.5 text-xs font-medium text-emerald-400 border border-emerald-800">
              Phase 0: Scaffold Initialized
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 flex flex-col items-center justify-center text-center">
        <div className="max-w-2xl bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold text-slate-100 mb-3">
            Jal-Dharohar Conservation Engineering
          </h2>
          <p className="text-sm text-slate-400 mb-6 leading-relaxed">
            AI-assisted digital engineering, IKS material compatibility, and conservation
            planning for traditional Indian water infrastructure (Baolis, Kunds, Vavs, and Bawaris).
          </p>

          <div className="grid grid-cols-4 gap-2 text-xs font-mono mb-6">
            <div className="bg-slate-800/80 p-3 rounded border border-slate-700/50">
              <div className="text-amber-400 font-bold mb-1">SEE</div>
              <div className="text-slate-400">Computer Vision</div>
            </div>
            <div className="bg-slate-800/80 p-3 rounded border border-slate-700/50">
              <div className="text-amber-400 font-bold mb-1">UNDERSTAND</div>
              <div className="text-slate-400">IKS &amp; Materials</div>
            </div>
            <div className="bg-slate-800/80 p-3 rounded border border-slate-700/50">
              <div className="text-amber-400 font-bold mb-1">ASSESS</div>
              <div className="text-slate-400">Engineering Rules</div>
            </div>
            <div className="bg-slate-800/80 p-3 rounded border border-slate-700/50">
              <div className="text-amber-400 font-bold mb-1">REVIVE</div>
              <div className="text-slate-400">Restoration Engine</div>
            </div>
          </div>

          <div className="text-xs text-slate-500 border-t border-slate-800 pt-4">
            Repository bootstrap complete. Ready for Phase 1 feature implementation.
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
        BaoliGuard — Phase 0 Bootstrap | Prototype Decision Support System
      </footer>
    </div>
  );
};

export default App;
