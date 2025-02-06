import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router';
import { menuItems } from '../../data/menuItems';
import PropTypes from 'prop-types';

const ModalSearch = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    const handleSearch = useCallback((searchQuery) => {
        if (!searchQuery.trim()) {
            setResults([]);
            return;
        }

        const searchResults = [];
        menuItems.forEach(section => {
            section.items.forEach(item => {
                if (
                    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.description.toLowerCase().includes(searchQuery.toLowerCase())
                ) {
                    searchResults.push(item);
                }
            });
        });
        setResults(searchResults);
    }, []);

    const handleSelect = (path) => {
        navigate(path);
        onClose();
        setQuery('');
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                onClose();
            }
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    useEffect(() => {
        handleSearch(query);
    }, [query, handleSearch]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ type: 'spring', bounce: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        <div className="w-full max-w-xl relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
                            {/* Search Input */}
                            <div className="relative">
                                <FiSearch className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="ค้นหาเอกสาร..."
                                    className="w-full pl-12 pr-4 py-4 bg-transparent text-gray-900 dark:text-white border-b border-gray-200/50 dark:border-gray-700/50 focus:outline-none"
                                    autoFocus
                                />
                            </div>

                            {/* ผลลัพธ์ */}
                            <div className="max-h-[60vh] overflow-y-auto p-2">
                                {results.length > 0 ? (
                                    <div className="space-y-1">
                                        {results.map((result) => (
                                            <motion.button
                                                key={result.path}
                                                onClick={() => handleSelect(result.path)}
                                                className="w-full p-3 flex items-center justify-between rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700/50 text-left group"
                                                whileHover={{ x: 4 }}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="text-gray-400">{result.icon}</span>
                                                    <div>
                                                        <h4 className="font-medium text-gray-900 dark:text-white">
                                                            {result.name}
                                                        </h4>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                                            {result.description}
                                                        </p>
                                                    </div>
                                                </div>
                                                <FiArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                            </motion.button>
                                        ))}
                                    </div>
                                ) : query ? (
                                    <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                                        ไม่พบผลลัพธ์สำหรับ &quot;{query}&quot;
                                    </div>
                                ) : null}
                            </div>

                            {/* Keyboard shortcuts */}
                            <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                <div className="flex items-center gap-2">
                                    <kbd className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-700">↑↓</kbd>
                                    <span>เลือก</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <kbd className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-700">esc</kbd>
                                    <span>ปิด</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

ModalSearch.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default ModalSearch;
