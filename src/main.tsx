import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PromotionsProvider } from './contexts/PromotionsContext'

createRoot(document.getElementById('root')!).render(
  <PromotionsProvider>
    <App />
  </PromotionsProvider>
)
