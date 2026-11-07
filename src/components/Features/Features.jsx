import './Features.css'
const Features = () => {
    return ( 
        <>
         <div className="features">
            <div className="header">
                <h1>Why Choose <span class="ignited1">Chatabs?</span></h1>
                <p>Chatabs Eatery is a local business in Malinta Los Banos, serving students and the community since the 2000s.</p>
            </div>

            <div className="features-grid">
                <div className="features-card">
                    <div className="card-link">
                        <i>&rarr;</i>
                    </div>
                    <div className="card-content">
                        <h2>Friendly Ambiance</h2>
                        <p>A warm welcoming space to enjoy good food and share moments together.</p>
                    </div>
                </div>

                   <div className="features-card">
                    <div className="card-link">
                        <i>&rarr;</i>
                    </div>
                    <div className="card-content">
                        <h2>Perfect place for celebrations</h2>
                        <p>A cozy place to gather, celebrate, and make lasting memories over good food.</p>
                    </div>
                </div>

                   <div className="features-card">
                    <div className="card-link">
                        <i>&rarr;</i>
                    </div>
                    <div className="card-content">
                        <h2>Food Ingredients Overload</h2>
                        <p>Loaded with fresh ingredients, generous poritions, and bold Filipino flavors in every satisfying bite.</p>
                    </div>
                </div>

            </div>
         </div>
        </>
     );
}
 
export default Features;