import { FiBook, FiPackage, FiCode } from 'react-icons/fi';

export const menuItems = [
  {
    title: 'เริ่มต้นใช้งาน',
    items: [
      { 
        name: 'แนะนำ', 
        path: '/docs', 
        icon: <FiBook />, 
        description: 'เริ่มต้นใช้งานเอกสาร' 
      },
      { 
        name: 'การติดตั้ง', 
        path: '/docs/installation', 
        icon: <FiPackage />, 
        description: 'วิธีการติดตั้งและตั้งค่า' 
      },
      { 
        name: 'การใช้งานพื้นฐาน', 
        path: '/docs/basic-usage', 
        icon: <FiCode />, 
        description: 'เรียนรู้การใช้งานพื้นฐาน' 
      },
    ]
  }
];
