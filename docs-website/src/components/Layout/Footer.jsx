import { FiHeart, FiExternalLink } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router';
import '../../styles/glowing-corner.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const handleMouseMove = (e, buttonElement) => {
        if (!buttonElement) return;
        const rect = buttonElement.getBoundingClientRect();
        const lightElement = buttonElement.querySelector('.light-effect');
        if (lightElement) {
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            lightElement.style.left = `${x}px`;
            lightElement.style.top = `${y}px`;
        }
    };

    return (
        <footer className="relative mt-auto overflow-hidden">
            {/* Gradient Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -left-20 -bottom-20 w-[400px] h-[400px] bg-blue-500/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -right-20 -top-20 w-[400px] h-[400px] bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
            </div>

            <div className="relative backdrop-blur-xl bg-white/40 dark:bg-gray-900/40">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    {/* เนื้อหาหลัก */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        {/* ส่วนหัวแบรนด์ */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-center md:text-left"
                        >
                            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-2">
                                Docs Web
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 max-w-md">
                                เว็บไซต์ Docs Web
                                เอกสารที่อยากจะแนะนำให้กับคุณเลย!!!!
                            </p>
                        </motion.div>

                        <div className="flex flex-wrap justify-center gap-3">
                            {['GitHub', 'Discord', 'Twitter'].map((item, i) => (
                                <motion.a
                                    key={i}
                                    href="#"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`px-6 py-2 rounded-full border border-gray-200/50 dark:border-gray-800/50 
                  hover:border-blue-500/50 dark:hover:border-blue-500/50 
                  hover:bg-blue-500/5 dark:hover:bg-blue-500/5
                  text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400
                  transition-all duration-300 flex items-center gap-2 backdrop-blur-sm glowing-corner-button`}
                                    onMouseMove={(e) =>
                                        handleMouseMove(e, e.currentTarget)
                                    }
                                >
                                    <div className="light-effect" />
                                    {item}
                                    <FiExternalLink className="w-4 h-4" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* แถบด้านล่าง */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mt-8 pt-6 border-t border-gray-200/50 dark:border-gray-800/50 text-center"
                    >
                        <p className="text-gray-600 dark:text-gray-400">
                            © {currentYear} Your Docs. สร้างโดย{' '}
                            <FiHeart className="inline-block text-red-500 hover:scale-125 transition-transform" />
                            <NavLink
                                to="https://github.com/NekoSakuraLucia"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                {' '}
                                NekoSakuraLucia
                            </NavLink>
                        </p>
                    </motion.div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
