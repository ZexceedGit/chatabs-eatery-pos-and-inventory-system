import './Menu.css'
const Menu = () => {
    return ( 
        <>
           <div className="explore">
              <div className='explore-header'>
                 <div>
                    <h1>Explore our <span class="ignited2">Menu</span></h1>
                    <p>Signature dishes for every taste - from classic filipino food recipes to bold original ilocano dishes.</p>
                 </div>
                 <button>View Full Menu</button>
              </div>

              <div className="explore-grid">
                 <div class="explore-card">
                    <h2>Soy Garlic Chicken</h2>
                 </div>
                   <div class="explore-card">
                    <h2>Special Ilocano Silog</h2>
                 </div>
                   <div class="explore-card">
                    <h2>Cheesy Fries</h2>
                 </div>
                   <div class="explore-card">
                    <h2>Bagnet Silog</h2>
                 </div>
              </div>
           </div>
        </>
     );
}
 
export default Menu;