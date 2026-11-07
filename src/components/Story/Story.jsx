import './Story.css'
const Story = () => {
    return ( 
        <>
        <div className="story">
            <div className="story-header">
                <h2>About us <br/>Our family <br/> Eatery.</h2>
                <div className="story-headtext">
                    <div class="head-title">
                       <h1>Our <span className="ignited2">Story</span></h1>
                       <button className="full">View Full Story</button>
                    </div>
                    <p>Chatabs began in 2020 with a simple dream: to build a better future forour family. Starting with itik as our main dish, we worked in the motorcycle industryand saved little by little until we could build our own small eatery. With the support of his wife, that dream slowly became a reality.</p>
                    <p>Over the years, we continued to improve our recipes, sauces, and flavors, turning Chatabs into the eatery it is today. Every family member has a role, working together to prepare, serve, and grow the business. What started as a small dream became a family journey built onhard work, love, and togetherness.</p>
                </div>
            </div>

            <div className="story-grid">
                <div class="story-card"></div>
                <div class="story-card"></div>
                <div class="story-card">
                    <h3>What started as a small dream became a family journey built on hard work, love, and good food.</h3>
                </div>
            </div>
        </div>
        </>
     );
}
 
export default Story;