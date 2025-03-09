import { Link } from 'react-router';
import { FiBook, FiMenu, FiMoon, FiSun } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useTheme } from '../../contexts/Theme/useTheme';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { darkMode, toggleTheme } = useTheme();

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="fixed top-0 z-50 w-full backdrop-blur-md bg-white/70 dark:bg-gray-900/80 border-b border-gray-200/80 dark:border-gray-700/80"
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* โลโก้พร้อมภาพ hover แอนิเมชั่น */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link
                            to="/"
                            className="flex items-center space-x-3 text-lg font-semibold"
                        >
                            <motion.span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                                Docs Web
                            </motion.span>
                        </Link>
                    </motion.div>

                    {/* เมนูเดสก์ท็อป */}
                    <div className="hidden md:flex items-center space-x-6">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                to="/docs"
                                className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                                <FiBook />
                                <span>อ่านเอกสาร</span>
                            </Link>
                        </motion.div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                            <motion.div
                                initial={{ rotate: 0 }}
                                animate={{ rotate: darkMode ? 360 : 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                {darkMode ? (
                                    <FiSun className="w-5 h-5" />
                                ) : (
                                    <FiMoon className="w-5 h-5" />
                                )}
                            </motion.div>
                        </motion.button>
                    </div>

                    {/* ส่วนมือถือเมนู Button */}
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                    >
                        <FiMenu className="w-5 h-5" />
                    </motion.button>
                </div>

                {/* เมนูมือถือพร้อมแอนิเมชั่น */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden overflow-hidden border-t border-gray-200 dark:border-gray-700"
                        >
                            <motion.div
                                className="flex flex-col space-y-4 py-4"
                                variants={{
                                    open: {
                                        transition: { staggerChildren: 0.1 },
                                    },
                                    closed: {
                                        transition: {
                                            staggerChildren: 0.05,
                                            staggerDirection: -1,
                                        },
                                    },
                                }}
                                initial="closed"
                                animate="open"
                                exit="closed"
                            >
                                <motion.div
                                    variants={{
                                        open: { x: 0, opacity: 1 },
                                        closed: { x: 20, opacity: 0 },
                                    }}
                                >
                                    <Link
                                        to="/docs"
                                        className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                                    >
                                        <FiBook />
                                        <span>อ่านเอกสาร</span>
                                    </Link>
                                </motion.div>

                                <motion.div
                                    variants={{
                                        open: { x: 0, opacity: 1 },
                                        closed: { x: 20, opacity: 0 },
                                    }}
                                >
                                    <button
                                        onClick={toggleTheme}
                                        className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                                    >
                                        {darkMode ? (
                                            <FiSun className="w-5 h-5" />
                                        ) : (
                                            <FiMoon className="w-5 h-5" />
                                        )}
                                        <span>
                                            {darkMode
                                                ? 'Light Mode'
                                                : 'Dark Mode'}
                                        </span>
                                    </button>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};

export default Navbar;
