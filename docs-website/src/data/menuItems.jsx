import { FiBook, FiPackage } from 'react-icons/fi';

const docFiles = import.meta.glob('/docs/**/*.mdx');

const iconMap = {
  installation: <FiPackage />,
};

const menuMap = {};

Object.keys(docFiles).forEach((filePath) => {
  const parts = filePath.replace('/docs/', '').replace('.mdx', '').split('/');

  if (parts.length < 2) return;

  const category = parts[0];
  const fileName = parts[1];

  if (!fileName) return;

  if (!menuMap[category]) {
    menuMap[category] = {
      title: category.replace('-', ' '),
      items: [],
    };
  }

  menuMap[category].items.push({
    name: fileName === 'index' ? 'หน้าแรก' : fileName.replace('-', ' '),
    path: `/docs/${category}/${fileName}`,
    icon: iconMap[fileName] || <FiBook />,
    description: `อ่านเอกสารเกี่ยวกับ ${fileName}`,
  });
});

export const menuItems = Object.values(menuMap);