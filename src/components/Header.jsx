import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/img/header-img/cricketscore-logo.png';
import menu from '../assets/img/header-img/cricket-menu.svg';
import { RxCrossCircled } from "react-icons/rx";
import profile from '../assets/img/header-img/cricket-profile.png';
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { searchPosts } from '../redux/features/postSlice'; 

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState(''); // Added state for debounced query
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const { searchResults, loading, error } = useSelector((state) => state.posts);

    // Toggle menu visibility
    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
        if (isSearchOpen) setIsSearchOpen(false);  // Close search input when menu is toggled
    };

    // Handle outside click to close search bar
    const handleClickOutside = useCallback((e) => {
        if (!e.target.closest('.search-container') && isSearchOpen) {
            setIsSearchOpen(false);
        }
    }, [isSearchOpen]);

    useEffect(() => {
        if (isSearchOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        // Clean up the event listener
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isSearchOpen, handleClickOutside]);

    // Handle search input change and debounce it
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Debounced search query effect
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 500); // Delay to debounce

        return () => clearTimeout(timeoutId); // Cleanup timeout on each render
    }, [searchQuery]);

    // Dispatch the search action only if the debounced query length > 2
    useEffect(() => {
        if (debouncedQuery.length > 2) {
            dispatch(searchPosts(debouncedQuery)); // Dispatch the search action
            navigate(`/search?query=${debouncedQuery}`); // Redirect to the search results page
        }
    }, [debouncedQuery, dispatch, navigate]);

    // Handle search submit (either by Enter key or by clicking the search icon)
    const handleSearchSubmit = () => {
        if (searchQuery.length > 2) {
            dispatch(searchPosts(searchQuery)); // Dispatch the search action
            navigate(`/search?query=${searchQuery}`); // Redirect to the search results page with the query
            setSearchQuery(''); // Clear the search query after submission
        }
    };

    // Handle search icon click
    const handleSearchIconClick = () => {
        if (isSearchOpen) {
            // If search bar is open, trigger the search functionality
            handleSearchSubmit();
        } else {
            // If search bar is closed, toggle search input visibility
            setIsSearchOpen(true);
        }
    };

    return (
        <div className='flex items-center justify-between bg-[#0D8888] py-7 px-4'>
            <div className='flex items-center gap-5'>
                <div className='w-8' onClick={toggleMenu}>
                    {!isMenuOpen ? <img className='w-full' src={menu} alt="Menu" /> : <RxCrossCircled size={32} color="white" />}
                </div>
                <Link to="/" className='w-11'>
                    <img className='w-full' src={logo} alt="Logo" />
                </Link>
            </div>

            {/* Search Input */}
            <div className='flex items-center gap-5 relative'>
                <div className={`border border-white flex items-center py-2 w-fit px-2 justify-center search-container ${isSearchOpen ? 'rounded-md' : 'rounded-full'}`}>
                    <input
                        type="text"
                        placeholder="Search..."
                        className={`bg-transparent py-0 outline-none border-none text-white transition-all duration-300 ease-in-out text-sm ${isSearchOpen ? 'w-full min-w-[100px]' : 'w-0'} overflow-hidden`}
                        onChange={handleSearchChange}
                        value={searchQuery}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleSearchSubmit(); }}
                    />
                    <span onClick={handleSearchIconClick}>
                        <CiSearch size={20} className='text-white' />
                    </span>
                </div>
                <div className='w-8'>
                    <img className='w-full' src={profile} alt="Profile" />
                </div>
            </div>

            {/* Menu Dropdown */}
            {isMenuOpen && (
                <div className='absolute top-20 left-0 right-0 bg-white p-4 rounded-md z-10'>
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
