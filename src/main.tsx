
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Enable smooth scrolling and animations
document.documentElement.classList.add('scroll-smooth');

// Prevent FOUC (Flash of unstyled content)
document.documentElement.classList.add('js-focus-visible');

createRoot(document.getElementById("root")!).render(<App />);
