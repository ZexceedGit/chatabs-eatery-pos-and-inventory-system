
import './Navbar.css'
import { useState } from 'react'

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => setMenuOpen(false);

    return (
        <nav>
            <div className={`nav-left ${menuOpen ? 'active' : ''}`}>
                <a href="#" onClick={closeMenu}>Home</a>
                <a href="#" onClick={closeMenu}>Features</a>
                <a href="#" onClick={closeMenu}>Menu</a>
            </div>

            <div className="name-logo">
                Chatabs
            </div>

            <div className={`nav-right ${menuOpen ? 'active' : ''}`}>
                <a href="#" onClick={closeMenu}>Our Story</a>
                <a href="#" onClick={closeMenu}>About us</a>
                <a href="#" onClick={closeMenu}>Contact</a>
            </div>

            <button
                className="menu-toggle"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={menuOpen}
            >
                {menuOpen ? '✕' : '☰'}
            </button>
        </nav>
    );
}

export default Navbar;
