import './Gallery.css'
const Gallery = () => {
    return ( 
    <>
       <div className="gallery">
          <div className="gallery-header">
            <h1>From our <span className="ignited1">Kitchen</span></h1>
            <p>Freshly prepared with care, our dishes bring together comforting flavors, generous portions, and the homemade touch that makes every meal at Chatabs worth coming back for.</p>
          </div>

          <div className="gallery-grid">
             <div className="gallery-card">
                 <div class="gallery-text">
                    <h2>Captured: June 12, 2026</h2>
                    <p>By: Juan Dela Cruz</p>
                 </div>
             </div>

             <div className="gallery-card">
             </div>

             <div className="gallery-card">
             </div>

             <div className="gallery-card">
             </div>

             <div className="gallery-card">
                     <h3>+36</h3>
             </div>

          </div>
       </div>
    </>
     );
}
 
export default Gallery;