import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '../ui/Button';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/dashboard';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6 text-white">
          <div className="max-w-md w-full p-8 rounded-3xl bg-neutral-950 border border-rose-500/40 text-center flex flex-col items-center gap-4 shadow-2xl shadow-rose-950/40">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <h2 className="text-xl font-black text-white font-heading">
              Sesi Tampilan Sedang Dimuat Ulang
            </h2>

            <p className="text-xs text-neutral-400 leading-relaxed">
              Terjadi penyesuaian cache pada data kampanye. Klik tombol di bawah untuk menyegarkan tampilan dashboard secara aman.
            </p>

            <div className="flex items-center gap-3 mt-2 w-full">
              <Button
                variant="outline"
                size="md"
                isFullWidth
                leftIcon={<Home className="w-4 h-4" />}
                onClick={this.handleGoHome}
              >
                Dashboard
              </Button>
              <Button
                variant="primary"
                size="md"
                isFullWidth
                leftIcon={<RefreshCw className="w-4 h-4" />}
                onClick={this.handleReload}
              >
                Muat Ulang
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
