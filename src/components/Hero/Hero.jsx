import './Hero.css'
import HeroImage1 from '../../assets/images/Hero1.png'
const Hero = () => {
    return ( 
        <>
          <div className="hero">
             <span>Good food, familiar flavors, and prices made for everyday cravings.</span>
             <h1>A Little <span className="ignited1">Taste</span> of Home,<br/> From Our Filipino Family to <span class="ignited2">Yours.</span></h1>
             <div className="hero-image">
                <img src={HeroImage1}/>
             </div>
          </div>
        </>
     );
}
 
export default Hero;