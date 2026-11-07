import './Specialty.css'
import specialty1 from '../../assets/images/Specialty1.png'
const Specialty = () => {
    return ( 
        <>
          <div className="specialty">
             <div className="specialty-header">
                <h1>What We're Known For</h1>
                <p>Signature dishes for every taste - from classic filipino food recipes to bold original ilocano dishes.</p>
             </div>

             <div className="specialty-grid">
                  <div className="dish-info">
                    <h2>FRESH EGG</h2>
                    <p>A perfectly cooked fresh egg ties it all together, adding extraordinary richness and flavor.</p>
                  </div>

                   <div className="dish-info">
                    <h2>PREMIUM PORK</h2>
                    <p>Tender, flavourful pork, cooked, prepared, chopped and grilled to perfection.</p>
                  </div>

                  <div className="big-image">
                    <h1>SILOG</h1>
                    <div class="image-container">
                        <img src={specialty1}></img>
                    </div>
                  </div>

                   <div className="dish-info">
                    <h2>CRISPY & JUICY</h2>
                    <p>The perfect balance of crisp edges and tender bites in every spoonful..</p>
                  </div>

                   <div className="dish-info">
                    <h2>STEAMED RICE</h2>
                    <p>Fluffy, high quality hot ricethat complements the bold flavors of sisig..</p>
                  </div>
             </div>
          </div>
        </>
     );
}
 
export default Specialty;