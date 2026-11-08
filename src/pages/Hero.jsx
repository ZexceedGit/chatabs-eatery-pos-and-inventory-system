import Features from '../components/Features/Features'
import Menu from '../components/Menu/Menu'
import Specialty from '../components/Specialty/Specialty';
import Gallery from '../components/Gallery/Gallery';
import Story from '../components/Story/Story';
import Articles from '../components/Articles/Articles';
import Reviews from '../components/Reviews/Reviews'
const Hero = () => {
    return ( 
        <>
         <div className="container-hero">
             <Features/>
             <Menu/>
             <Specialty/>
             <Gallery/>
             <Story />
             <Articles/>
             <Reviews/>
         </div>
        </>
     );
}
 
export default Hero;