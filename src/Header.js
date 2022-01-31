import React, { useEffect, useState } from 'react'
import './Header.css'
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Switch from '@material-ui/core/Switch';

function Header() {
    const [{ basket, user }, dispatch] = useStateValue();
    const handleAuthentication = () => {
        if (user) {
            auth.signOut();
        }
    }

    // theme
    const [theme, setTheme] = useState('light__theme');
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        document.documentElement.className = theme;
    }, [theme]);

    const themeToggler = () => {
        if (theme === 'light__theme') {
            setTheme('dark__theme');
            setChecked(true)
        } else {
            setTheme('light__theme');
            setChecked(false)
        }
    }

    return (
        <div className='header'>
            <Link to='/'>
                <img
                    className='header__logo'
                    src='http://pngimg.com/uploads/amazon/amazon_PNG11.png'
                    alt=""
                />
            </Link>

            <div className='header__search'>
                <input className='header__searchInput' type='text' />
                <SearchIcon className='header__searchIcon' />
            </div>

            <div className='header__nav'>
                <Link to={!user && '/login'}>
                    <div onClick={handleAuthentication} className='header__option'>
                        <span className='header__optionLineOne'>Hello {!user ? 'Guest' : user.email}</span>
                        <span className='header__optionLineTwo'>{user ? 'Sign Out' : 'Sign In'}</span>
                    </div>
                </Link>

                {/* theme */}
                <div className="theme">
                    <div className="light__dark--theme">
                        <div className="left__content">
                            <Brightness4Icon className='bright__icon' />
                        </div>
                        <div className="right__content">
                            <Switch
                                value=""
                                checked={checked}
                                inputProps={{ 'aria-label': '' }}
                                size="medium"
                                onClick={themeToggler}

                            />
                        </div>
                    </div>
                </div>

                {/* <div className='header__option'>
                    <span className='header__optionLineOne'>Returns</span>
                    <span className='header__optionLineTwo'>& Orders</span>
                </div>

                <div className='header__option'>
                    <span className='header__optionLineOne'>Your</span>
                    <span className='header__optionLineTwo'>Prime</span>
                </div> */}

                <Link to='/checkout'>
                    <div className='header__optionBasket'>
                        <ShoppingBasketIcon />
                        <span className='header__optionLineTwo header__basketCount'>{basket?.length}</span>
                    </div>
                </Link>

            </div>
        </div>
    )
}

export default Header
