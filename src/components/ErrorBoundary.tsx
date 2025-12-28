import React from "react";

type Props = {
  children: React.ReactNode;
};

type State = {
  error: Error | null;
};

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Keep a console breadcrumb for debugging
    console.error("App render error:", error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
          <div className="w-full max-w-2xl rounded-xl border border-border bg-card p-6 shadow-lg">
            <h1 className="text-xl font-display font-semibold">Something went wrong</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              The app hit a runtime error while rendering.
            </p>
            <pre className="mt-4 max-h-72 overflow-auto rounded-lg bg-muted p-4 text-xs text-foreground">
              {this.state.error.message}
            </pre>
            <div className="mt-4 flex gap-3">
              <button
                type="button"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
                onClick={() => window.location.reload()}
              >
                Reload
              </button>
              <button
                type="button"
                className="inline-flex h-10 items-center justify-center rounded-md border border-border bg-background px-4 text-sm"
                onClick={() => this.setState({ error: null })}
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
