import './Articles.css'
const Articles = () => {
    return ( 
        <>
          <div className="articles">
               <div className='articles-header'>
                 <div>
                    <h1>Have you <span className="ignited2">Heard?</span></h1>
                    <p>Stay updated with the latest buzz, fresh stories, and exciting discoveries. Something new to hear about!</p>
                 </div>
                 <button>View All Article</button>
              </div>

              <div className="articles-grid">
                 <div className="article-card">
                    <h2>The Latest Bite</h2>
                    <p>A warm, welcoming space to enjoy good food and share moments together.</p>
                 </div>

                   <div className="article-card">
                    <h2>Fresh From  Kitchen</h2>
                    <p>Fresh ingredients, delicious creations, made with love.</p>
                 </div>

                   <div className="article-card">
                    <h2>More Than a Meal</h2>
                    <p>Good food, great company, and lasting memories.</p>
                 </div>
              </div>
          </div>
        </>
     );
}
 
export default Articles

