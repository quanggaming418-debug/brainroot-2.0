import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { getPagesRestorePath } from './utils/restorePagesLocation';
import './styles.css';

const restored = getPagesRestorePath(new URL(window.location.href), import.meta.env.BASE_URL);
if (restored) window.history.replaceState(window.history.state, '', restored);

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Missing #root element');
createRoot(rootElement).render(<StrictMode><App /></StrictMode>);
