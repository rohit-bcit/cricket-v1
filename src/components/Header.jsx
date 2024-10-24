import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/header-img/cricket-logo.svg';
import menu from '../assets/img/header-img/cricket-menu.svg';
import profile from '../assets/img/header-img/cricket-profile.png';
import search from '../assets/img/header-img/cricket-search.svg';
import search2 from '../assets/img/header-img/cricket-search-2.svg';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const menuRef = useRef(null);
    const searchRef = useRef(null);

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
        if (isSearchOpen) setIsSearchOpen(false);
    };

    const toggleSearch = () => {
        setIsSearchOpen(prev => !prev);
        if (isMenuOpen) setIsMenuOpen(false);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsMenuOpen(false);
        }
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setIsSearchOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='flex items-center justify-between bg-[#0D8888] py-7 px-4'>
            <div className='flex items-center gap-5'>
                <div className='w-8' onClick={toggleMenu}>
                    <img className='w-full' src={menu} alt="Menu" />
                </div>
                <Link to="/" className='w-11'>
                    <img className='w-full' src={logo} alt="Logo" />
                </Link>
            </div>
            <div className='flex items-center gap-5 relative'>
                {!isSearchOpen ? (
                    <div className='search w-8' onClick={toggleSearch}>
                        <img className='w-full' src={search} alt="Search" />
                    </div>
                ) : (
                    <div ref={searchRef} className='absolute top-16 right-10 z-10 bg-gray-200 rounded-full'>
                        <div className='relative flex items-center py-1 px-4  pr-8 border rounded-full '>
                            <input
                                type="text"
                                placeholder="Search..."
                                className='bg-transparent py-0 outline-none border-none text-[#9ca3af] pl-3'
                            />
                            <img
                                className='search-2 w-8 pr-1'
                                src={search2}
                                alt="Search Icon"
                            />
                        </div>
                    </div>
                )}
                <div className='w-8'>
                    <img className='w-full' src={profile} alt="Profile" />
                </div>
            </div>

            {isMenuOpen && (
                <div ref={menuRef} className='absolute top-20 left-0 right-0 bg-white p-4 rounded-md z-10'>
                    <ul className='flex flex-col gap-2'>
                        {["Schedule", "Live Score", "Teams", "Series", 'History'].map(item => (
                            <li key={item} className='border-b py-3'>
                                <Link to={`/${item.toLowerCase().replace(' ', '-')}`}>{item}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Header;
