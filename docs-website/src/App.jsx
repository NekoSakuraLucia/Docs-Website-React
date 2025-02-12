import { BrowserRouter, Routes, Route } from 'react-router';
import NextTopLoader from 'nextjs-toploader';
import Layout from './components/Layout';
import DocsPage from './pages/DocsPage';
import HomePage from './pages/HomePage';
import { NotificationProvider } from './contexts/NotificationProvider';
import { ThemeProvider } from './contexts/Theme/ThemeProvider';
import CodeEditor from './pages/CodeEdit/CodeEditor';

function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <BrowserRouter>
          <NextTopLoader showSpinner={false} color='#a855f7' />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="docs" element={<DocsPage />}>
                <Route path=":category/:slug" element={<DocsPage />} />
              </Route>
              <Route path='edit/:slug' element={<CodeEditor />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
