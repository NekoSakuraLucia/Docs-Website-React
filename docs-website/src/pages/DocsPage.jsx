import { useParams, useNavigate } from 'react-router';
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Docs/Sidebar';
import { motion } from 'framer-motion';
import mdxComponents from '../components/Docs/MDXComponents';

function DocsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [MDXComponent, setMDXComponent] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadMDX = async () => {
      try {
        const module = await import(`../../docs/${slug || 'index'}.mdx`);
        setMDXComponent(() => module.default);
        setError(false);
      } catch (err) {
        console.error('Failed to load MDX:', err);
        setError(true);
        navigate('/docs');
      }
    };

    loadMDX();
  }, [slug, navigate]);

  if (error) {
    return <div>404 - ไม่พบหน้าที่คุณต้องการ</div>;
  }

  return (
    <div className="relative min-h-screen">
      {/* พื้นหลังด้วย gradient และ blur effect */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 -z-10">
        <div className="absolute inset-0 bg-white/30 dark:bg-black/30 backdrop-blur-[100px]" />
      </div>

      {/* ส่วนแสดงเนื้อหา */}
      <div className="flex">
        <Sidebar />
        <motion.main 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:pl-[280px] p-4 lg:p-8"
        >
          <div className="max-w-3xl mx-auto">
            <div className="backdrop-blur-sm bg-white/40 dark:bg-gray-900/40 p-8 rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl">
              <article className="prose prose-lg dark:prose-invert max-w-none">
                <React.Suspense fallback={
                  <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                  </div>
                }>
                  {MDXComponent && <MDXComponent components={mdxComponents} />}
                </React.Suspense>
              </article>
            </div>
          </div>
        </motion.main>
      </div>
    </div>
  );
}

export default DocsPage;
