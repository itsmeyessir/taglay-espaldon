import React from "react";
import Button from "./ui/Button";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-red-50 text-red-900">
          <h1 className="text-3xl font-bold mb-4">Something went wrong.</h1>
          <p className="mb-4 text-red-700">
            {this.state.error && this.state.error.toString()}
          </p>
          <pre className="bg-white/50 p-4 rounded-lg text-sm font-mono overflow-auto max-w-2xl w-full mb-6 border border-red-200">
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </pre>
          <Button onClick={() => window.location.reload()}>Reload Page</Button>
          <Button variant="secondary" className="mt-2" onClick={() => window.history.back()}>Go Back</Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
