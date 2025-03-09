import { useParams } from 'react-router';
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Docs/Sidebar';
import { motion } from 'framer-motion';
import mdxComponents from '../components/Docs/MDXComponents';
import TableOfContents from '../components/Docs/TableOfContents';

const mdxFiles = import.meta.glob('../../docs/**/*.mdx');

function DocsPage() {
    const { category, slug } = useParams();
    const [MDXComponent, setMDXComponent] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        const loadMDX = async () => {
            try {
                const resolvedCategory = category || 'CSS';
                const resolvedSlug = slug || 'index';
                const filePath = `../../docs/${resolvedCategory}/${resolvedSlug}.mdx`;

                if (mdxFiles[filePath]) {
                    const module = await mdxFiles[filePath]();
                    setMDXComponent(() => module.default);
                    setError(false);
                } else {
                    throw new Error(`MDX file not found: ${filePath}`);
                }
            } catch (err) {
                console.error('Failed to load MDX:', err);
                setError(true);
            }
        };

        loadMDX();
    }, [category, slug]);

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
            <div className="flex relative">
                <Sidebar />

                {/* ปรับ main content ให้มี max-width และ padding ที่เหมาะสม */}
                <main className="flex-1 w-full">
                    <div className="mx-auto px-4 lg:px-8 py-8 lg:pl-[280px] xl:pr-[240px]">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="max-w-4xl mx-auto"
                        >
                            <div className="backdrop-blur-sm bg-white/40 dark:bg-gray-900/40 p-6 lg:p-8 rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl">
                                <article className="prose prose-lg dark:prose-invert prose-img:rounded-xl prose-headings:scroll-mt-20 max-w-none">
                                    <React.Suspense
                                        fallback={
                                            <div className="animate-pulse space-y-4">
                                                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                                            </div>
                                        }
                                    >
                                        {MDXComponent && (
                                            <MDXComponent
                                                components={mdxComponents}
                                            />
                                        )}
                                    </React.Suspense>
                                </article>
                            </div>
                        </motion.div>
                    </div>
                </main>

                {/* ปรับตำแหน่ง TableOfContents */}
                <div className="hidden xl:block w-[240px]">
                    <div className="fixed top-[4.5rem] right-4 w-[240px]">
                        <TableOfContents />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DocsPage;
