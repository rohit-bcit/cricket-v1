import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const TableOfContent = ({ content }) => {
  const [toc, setToc] = useState([]);
  const [isOpen, setIsOpen] = useState(true);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headers = doc.querySelectorAll('h2');
    const tocItems = Array.from(headers).map((header, index) => {
      const id = header.id || header.textContent.replace(/\s+/g, '-').toLowerCase() + `-${index}`;
      if (!header.id) header.id = id;
      return { id, text: header.textContent };
    });
    setToc(tocItems);
  }, [content]);

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="blog-content text-sm text-[#292929]">
      <div id="toc-placeholder" />
      {toc.length > 0 && (
        <div className={`bg-[#f9f9f9] border border-[#aaa] p-3 rounded-[4px] transition-all duration-500 ${isOpen ? 'w-full' : 'w-fit'}`}>
          <div className={`flex items-center ${isOpen ? 'justify-between gap-2' : 'gap-4'}`}>
            <p className="text-[18.8px] font-semibold mb-3 text-[#292929]">Table of Contents</p>
            <span onClick={toggle} className="flex items-center justify-center gap-[1px] w-[35px] h-[30px] border-[#444] border rounded-md cursor-pointer">
              <svg style={{ fill: '#999', color: '#999' }} xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                <path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path>
              </svg>
            </span>
          </div>
          {isOpen && (
            <ol className="toc-list">
              {toc.map((item) => (
                <li key={item.id} className="toc-headings text-[13.2px] font-medium list-decimal text-[#444444] ml-4">
                  <a href={`#${item.id}`} onClick={(e) => { e.preventDefault(); handleScrollTo(item.id); }}>
                    {item.text}
                  </a>
                </li>
              ))}
            </ol>
          )}
        </div>
      )}
    </div>
  );
};

TableOfContent.propTypes = {
  content: PropTypes.string.isRequired,
};

export default TableOfContent;
