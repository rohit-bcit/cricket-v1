import React, { useEffect, useState } from 'react';
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
    const [searchQuery, setSearchQuery] = useState(''); // Manage search query state
    const dispatch = useDispatch();
    const navigate = useNavigate(); // To handle navigation

    const { searchResults, loading, error } = useSelector((state) => state.posts);

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
        if (isSearchOpen) setIsSearchOpen(false);
    };

    const handleClickOutside = (event) => {
        if (!event.target.closest('.search-container') && isSearchOpen) {
            setIsSearchOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSearchOpen]);

    // Handle search input change
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query.length > 2) {
            dispatch(searchPosts(query)); // Dispatch searchPosts action when query length is greater than 2
        }
    };

    // Handle Enter key to redirect to the search results page
    const handleSearchSubmit = (e) => {
        if (e.key === 'Enter' && searchQuery.length > 2) {
            navigate(`/search?query=${searchQuery}`); // Redirect to the search results page with the query
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
            <div className='flex items-center gap-5 relative'>
                <div className={`border border-white flex items-center py-2 w-fit px-2 justify-center search-container ${isSearchOpen ? 'rounded-md' : 'rounded-full'}`}>
                    <input
                        type="text"
                        placeholder="Search..."
                        className={`bg-transparent py-0 outline-none border-none text-white transition-all duration-300 ease-in-out text-sm ${isSearchOpen ? 'w-full min-w-[100px]' : 'w-0'} overflow-hidden`}
                        onFocus={() => setIsSearchOpen(true)}
                        onChange={handleSearchChange}
                        value={searchQuery}
                        onKeyDown={handleSearchSubmit}
                    />
                    <span onClick={() => setIsSearchOpen(true)}>
                        <CiSearch size={20} className='text-white' />
                    </span>
                </div>
                <div className='w-8'>
                    <img className='w-full' src={profile} alt="Profile" />
                </div>
            </div>
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
