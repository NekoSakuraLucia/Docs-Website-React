import { BrowserRouter, Routes, Route } from 'react-router';
import NextTopLoader from 'nextjs-toploader';
import Layout from './components/Layout';
import DocsPage from './pages/DocsPage';
import HomePage from './pages/HomePage';
import { NotificationProvider } from './contexts/NotificationContext';

function App() {
  return (
    <NotificationProvider>
      <BrowserRouter>
        <NextTopLoader showSpinner={false} color='#a855f7' />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="docs" element={<DocsPage />}>
              <Route path=":slug" element={<DocsPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </NotificationProvider>
  );
}

export default App;
