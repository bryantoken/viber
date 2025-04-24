import { AuthProvider } from '../contexts/AuthContext';
import { PlaylistProvider } from '../contexts/PlaylistContext';
import '../app/globals.css';

export default function AppWrapper({ Component, pageProps }) {
  return (
    <AuthProvider>
      <PlaylistProvider>
        <Component {...pageProps} />
      </PlaylistProvider>
    </AuthProvider>
  );
}
