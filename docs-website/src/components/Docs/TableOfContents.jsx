import { useEffect, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

const TableOfContents = () => {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const getHeadings = useCallback(() => {
    const article = document.querySelector('article');
    if (!article) return [];

    return Array.from(article.querySelectorAll('h1, h2, h3'))
      .filter(element => element.textContent.trim() !== '')
      .map(element => {
        if (!element.id) {
          element.id = `heading-${Math.random().toString(36).slice(2)}`;
        }

        return {
          id: element.id,
          text: element.textContent,
          level: Number(element.tagName.substring(1))
        };
      });
  }, []);

  useEffect(() => {
    const updateHeadings = () => setHeadings(getHeadings());
    updateHeadings();

    const observer = new MutationObserver(updateHeadings);
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setActiveId(entry.target.id);
          }
        });
      },
      { 
        rootMargin: '-15% 0% -45% 0%',
        threshold: 0.5 
      }
    );

    document.querySelectorAll('h1, h2, h3').forEach(elem => 
      intersectionObserver.observe(elem)
    );

    return () => {
      observer.disconnect();
      intersectionObserver.disconnect();
    };
  }, [getHeadings]);

  const variants = useMemo(() => ({
    container: {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: { staggerChildren: 0.05 }
      }
    },
    item: {
      hidden: { opacity: 0, x: -10 },
      show: { opacity: 1, x: 0 }
    }
  }), []);

  const handleScrollToHeading = useCallback((e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (!element) return;

    const offset = 100;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }, []);

  // ไม่แสดงอะไรถ้าไม่มีหัวข้อ
  if (headings.length === 0) return null;

  return (
    <motion.nav
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="hidden xl:block w-full"
    >
      {/* Progress bar */}
      <motion.div 
        style={{ scaleX }}
        className="fixed top-16 right-0 left-0 h-[2px] bg-blue-500 origin-left z-50"
      />

      <div className="space-y-2 p-4 rounded-xl backdrop-blur-md bg-white/50 dark:bg-gray-900/50 border border-gray-200/50 dark:border-gray-700/50">
        <motion.h4
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm font-semibold text-gray-900 dark:text-white mb-4"
        >
          สารบัญ
        </motion.h4>

        <motion.div
          variants={variants.container}
          initial="hidden"
          animate="show"
          className="space-y-1"
        >
          <AnimatePresence mode="wait">
            {headings.map(heading => (
              <motion.div
                key={heading.id}
                variants={variants.item}
                layout
              >
                <motion.a
                  href={`#${heading.id}`}
                  onClick={(e) => handleScrollToHeading(e, heading.id)}
                  className={`
                    relative block text-sm transition-all duration-200
                    ${heading.level === 1 ? 'pl-2' : heading.level === 2 ? 'pl-4' : 'pl-6'}
                    ${activeId === heading.id 
                      ? 'text-blue-600 dark:text-blue-400 font-medium' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                    }
                  `}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {heading.text}
                  {activeId === heading.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-0 w-[2px] h-full bg-blue-500 rounded-full"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.a>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default TableOfContents;
