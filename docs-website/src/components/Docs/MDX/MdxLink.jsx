import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { FiExternalLink } from 'react-icons/fi';

const MdxLink = ({ children, href, ...props }) => {
    const navigate = useNavigate();
    const isExternal = href?.startsWith('http');

    if (typeof children === 'string' && children.trim() === 'ทดสอบเล่นโค้ด เพื่อดูการแก้ใข') {
        return (
            <button
                onClick={() => {
                    if (href) {
                        isExternal ? window.open(href, '_blank') : navigate(href);
                    }
                }}
                className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all'
            >
                {children}
            </button>
        );
    }

    return isExternal ? (
        <a
        href={href}
        target='_blank'
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 group"
        {...props}
        >
            {children}
            <FiExternalLink className='inline-block w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform' />
        </a>
    ) : (
        <span
        onClick={() => navigate(href)}
        className='cursor-pointer text-blue-600 dark:text-blue-400 hover:underline'
        >
            {children}
        </span>
    );
};

MdxLink.propTypes = {
    children: PropTypes.node.isRequired,
    href: PropTypes.string,
};

export default MdxLink;