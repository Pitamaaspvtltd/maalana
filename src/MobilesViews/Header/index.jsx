import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, AccountCircle, Menu as MenuIcon } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, IconButton, Menu, MenuItem, Button } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';

import './Header.scss';
// import Logo from '../../assets/logo/logo-1.png';
import { navLinks } from '../../constants/helper.js';

import { useAuth } from '../../context/AuthContext';

const Header = () => {
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width: 899px)');
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const { isUserAuthenticated, userId, cartItemCount, logout } = useAuth();

    const handleLinkClick = (link) => {
        setActiveLink(link);
        if (isMobile) {
            setDrawerOpen(false);
        }
        navigate(link)
    };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        handleMenuClose();
        if (isMobile) {
            setDrawerOpen(false);
        }
        navigate('/login');
    };

    return (
        <header className="header">
            <div className="logo">
                <img src={'https://res.cloudinary.com/dtivafy25/image/upload/v1725260985/logo-1_rqojr8.png'} alt="MAAlana" />
            </div>
            {isMobile && (
                <Stack spacing={4} direction="row" alignItems="center">
                    {isUserAuthenticated ? <Badge badgeContent={cartItemCount} color="secondary">
                        <Link className="iconButton" to="/cart">
                            <ShoppingCart sx={{ color: '#000 !important' }} />
                        </Link>
                    </Badge>
                        : <Link className="iconButton">
                            <ShoppingCart sx={{ color: '#000 !important' }} />
                        </Link>

                    }
                    <IconButton onClick={() => setDrawerOpen(true)}>
                        <MenuIcon className="menu-icon" />
                    </IconButton>
                </Stack>
            )}
            <nav className="nav">
                <ul>
                    {navLinks.map((link) => (
                        <li key={link.id}>
                            <Link
                                to={link.link}
                                className={link.link === activeLink ? 'active' : 'active'}
                                onClick={() => handleLinkClick(link.link)}
                            >
                                {link.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            {!isMobile && (
                <div className="icons">
                    <Stack spacing={4} direction="row">
                        {isUserAuthenticated ? (
                            <>
                                <Badge badgeContent={cartItemCount} color="secondary" sx={{ marginTop: '10px !important' }}>
                                    <Link to="/cart" className="iconButton">
                                        <ShoppingCart />
                                    </Link>
                                </Badge>
                                <IconButton onClick={handleMenuClick} className="iconButton">
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                >
                                    <MenuItem component={Link} to={`/profile/${userId}`} onClick={handleMenuClose}>
                                        Profile
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>
                                        <LogoutIcon />
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <>
                                <Link to="/cart" className="iconButton" style={{ marginTop: '10px' }}>
                                    <ShoppingCart />
                                </Link>
                                <Button variant="contained"
                                    sx={{
                                        backgroundColor: '#B9D514',
                                        borderRadius: '10px',
                                        textTransform: 'capitalize',
                                        color: '#000',
                                        transition: 'all 0.3s ease',
                                        fontFamily: '"MADE-Tommy-Soft-Light-PERSONAL-USE", sans-serif !important',
                                        '&:hover': {
                                            backgroundColor: '#B9D514',
                                            color: '#000',
                                        },
                                        '&:active': {
                                            backgroundColor: '#9cbf12',
                                            color: '#000',
                                        },
                                    }}
                                    onClick={() => navigate('/login')}>
                                    Login
                                </Button>
                            </>
                        )}

                    </Stack>
                </div>
            )}
            {isMobile && (
                <>
                    <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                        <div className="drawer">
                            <List>
                                {navLinks.map((link) => (
                                    <ListItem
                                        key={link.id}
                                        button
                                        component={Link}
                                        to={link.link}
                                        selected={link.link === activeLink}
                                        onClick={() => handleLinkClick(link.link)}
                                    >
                                        <ListItemText primary={link.title} />
                                    </ListItem>
                                ))}
                                {
                                    isUserAuthenticated ?
                                        <>
                                            <ListItem button component={Link} to={`/profile/${userId}`}>
                                                <ListItemIcon>
                                                    <AccountCircle />
                                                </ListItemIcon>
                                            </ListItem>
                                            <ListItem button onClick={handleLogout}>
                                                <ListItemIcon>
                                                    <LogoutIcon />
                                                </ListItemIcon>
                                            </ListItem>
                                        </>
                                        :
                                        <ListItem button component={Link} to="/login" onClick={() => setDrawerOpen(false)}>
                                            <ListItemText primary="Login" />
                                        </ListItem>
                                }
                            </List>
                        </div>
                    </Drawer>
                </>
            )}
        </header>
    );
};

export default Header;
