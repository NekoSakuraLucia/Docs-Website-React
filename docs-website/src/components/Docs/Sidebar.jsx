import { NavLink } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiSearch } from 'react-icons/fi';
import { useState } from 'react';
import ModalSearch from './ModalSearch';
import { menuItems } from '../../data/menuItems';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // กรองรายการเมนูตาม search query
  const filteredMenuItems = menuItems.map(section => ({
    ...section,
    items: section.items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.items.length > 0);

  return (
    <>
      {/* ตัวค้นหา Modal */}
      <ModalSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* ปรับขนาดและตำแหน่งปุ่มเมนู */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed lg:hidden top-3 left-3 z-50 p-2 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 shadow-lg shadow-black/5"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          rotate: isOpen ? 180 : 0,
          backgroundColor: isOpen ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255, 255, 255, 0.8)'
        }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </motion.div>
      </motion.button>

      {/* Sidebar สำหรับหน้าจอ Desktop */}
      <div className="hidden lg:block w-[280px] h-[calc(100vh-4rem)] overflow-y-auto fixed top-16 left-0 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-r border-gray-200/50 dark:border-gray-700/50 p-4">
        {/* ตัวค้นหาบน Desktop */}
        <div className="relative mb-6">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="ค้นหาเอกสาร... (⌘ + K)"
            readOnly
            onClick={() => setIsSearchOpen(true)}
            className="w-full text-black dark:text-white pl-10 pr-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/70 transition-colors"
          />
        </div>

        <div className="space-y-8">
          {filteredMenuItems.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item, itemIdx) => (
                  <NavLink
                    key={itemIdx}
                    to={item.path}
                    end
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) => `
                    flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-all duration-200 
                    ${isActive || location.pathname === item.path || (location.pathname === '/docs' && item.path === '/docs/CSS/index')
                        ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50'}
                  `}
                  >
                    <span className="w-5 h-5">{item.icon}</span>
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ปรับแต่ง Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="lg:hidden fixed inset-0 bg-gray-900/20 dark:bg-gray-900/40 backdrop-blur-sm z-30"
            />

            {/* เมนูมือถือ */}
            <motion.div
              initial={{ x: -280, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -280, opacity: 0 }}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              className="lg:hidden fixed top-16 left-0 w-[260px] h-[calc(100vh-4rem)] overflow-y-auto z-40 backdrop-blur-md bg-white/95 dark:bg-gray-900/95 border-r border-gray-200/50 dark:border-gray-700/50 shadow-xl"
            >
              {/* ส่วนหัวของเมนูมือถือ */}
              <div className="sticky top-0 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md p-4 border-b border-gray-200/50 dark:border-gray-700/50">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="ค้นหาเอกสาร..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-1.5 text-sm bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-black dark:text-white"
                  />
                </div>
              </div>

              {/* เนื้อหาเมนู */}
              <div className="p-3 space-y-6">
                {filteredMenuItems.map((section, idx) => (
                  <div key={idx} className="space-y-2">
                    <h3 className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider px-2">
                      {section.title}
                    </h3>
                    <div className="space-y-0.5">
                      {section.items.map((item, itemIdx) => (
                        <NavLink
                          key={itemIdx}
                          to={item.path}
                          end
                          onClick={() => setIsOpen(false)}
                          className={({ isActive }) => `
                            flex items-center gap-2 px-2 py-1.5 text-sm rounded-lg transition-all duration-200
                            ${isActive
                              ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium'
                              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
                            }
                          `}
                        >
                          <span className="w-4 h-4">{item.icon}</span>
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;