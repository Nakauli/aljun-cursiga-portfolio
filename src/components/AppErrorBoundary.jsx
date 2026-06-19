import { Component } from "react";
import { RefreshCw } from "lucide-react";

export default class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    if (import.meta.env.DEV) {
      console.error("Portfolio render error", error, errorInfo);
    }
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main className="grid min-h-screen place-items-center bg-slate-50 px-4 text-slate-950 dark:bg-[#06131f] dark:text-white">
        <section className="w-full max-w-xl border-y border-slate-200 py-12 text-center dark:border-white/10">
          <p className="font-display text-sm font-bold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
            Portfolio recovery
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold">This page needs a quick refresh</h1>
          <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
            An unexpected display error occurred. No form data was sent. Reload the page to restore the portfolio.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="btn-primary mt-7"
          >
            <RefreshCw size={18} aria-hidden="true" />
            Reload portfolio
          </button>
        </section>
      </main>
    );
  }
}
