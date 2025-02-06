import CodeBlock from '../Home/CodeBlock';
import { FiCheck, FiSquare, FiExternalLink } from 'react-icons/fi';

/** @type {import('mdx/types.js').MDXComponents} */
const mdxComponents = {
  CodeBlock,
  
  // จัดการกับ code blocks ที่ใช้ ```
  pre: props => {
    const codeEl = props.children;
    // ตรวจสอบว่าเป็น code block หรือไม่
    if (codeEl?.props?.mdxType === 'code') {
      const { children: code, className } = codeEl.props;
      // ดึง language จาก className
      const language = className?.split('-')[1] || 'text';
      return <CodeBlock code={code} language={language} />;
    }
    return <pre {...props}>{props.children}</pre>;
  },
  
  code: ({ children, className, ...props }) => {
    if (className) {
      const language = className?.split('-')[1] || 'text';
      return <CodeBlock code={children} language={language} />;
    }
    return (
      <code 
        className="px-1.5 py-0.5 text-sm font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded"
        {...props}
      >
        {children}
      </code>
    );
  },

  a: ({ children, href, ...props }) => (
    <a
      href={href}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 group"
      {...props}
    >
      {children}
      {href?.startsWith('http') && (
        <FiExternalLink className="inline-block w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      )}
    </a>
  ),

  li: ({ children, className, ...props }) => {
    // ตรวจสอบว่าเป็น task list item หรือไม่
    if (className?.includes('task-list-item')) {
      const isChecked = className.includes('checked');
      return (
        <li className="flex items-start gap-2 my-1" {...props}>
          <span className="mt-1 text-blue-500 dark:text-blue-400">
            {isChecked ? <FiCheck size={16} /> : <FiSquare size={16} />}
          </span>
          <span>{children}</span>
        </li>
      );
    }

    return (
      <li className="my-1 ml-4 list-disc marker:text-blue-500 dark:marker:text-blue-400" {...props}>
        {children}
      </li>
    );
  },

  ul: ({ children, ...props }) => (
    <ul className="my-6 space-y-1" {...props}>
      {children}
    </ul>
  ),

  ol: ({ children, ...props }) => (
    <ol className="my-6 ml-4 space-y-1 list-decimal marker:text-blue-500 dark:marker:text-blue-400" {...props}>
      {children}
    </ol>
  ),

  h1: ({ children, ...props }) => (
    <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white scroll-m-20" {...props}>
      {children}
    </h1>
  ),

  h2: ({ children, ...props }) => (
    <h2 className="text-3xl font-bold mt-12 mb-4 text-gray-800 dark:text-gray-100" {...props}>
      {children}
    </h2>
  ),
  
  p: ({ children, ...props }) => (
    <p className="text-lg leading-7 mb-4 text-gray-700 dark:text-gray-300" {...props}>
      {children}
    </p>
  ),

  strong: ({ children, ...props }) => (
    <strong 
      className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent" 
      {...props}
    >
      {children}
    </strong>
  ),

  hr: () => (
    <div className="my-8">
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
    </div>
  )
};

export default mdxComponents;
