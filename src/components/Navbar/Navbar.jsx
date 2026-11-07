import './Navbar.css'
import {useState} from 'react'
const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    return ( 
        <>
          <nav>
            <div className={`nav-left ${menuOpen ? 'active' : ''} `}>
              <a href="#">Home</a>
              <a href="#">Features</a>
              <a href="#">Menu</a>
            </div>

            <div className="name-logo">
               Chatabs
            </div>
           
           <div className={`nav-right ${menuOpen ? 'active' : ''}`}>
             <a href="#">Our Story</a>
             <a href="#">About us</a>
             <a href="#">Contact us</a>
           </div>

           <button className="menu-toggle" oncCick={() => setMenuOpen(!menuOpen)}>☰</button>
         </nav>
         </>
     );
}
 
export default Navbar;