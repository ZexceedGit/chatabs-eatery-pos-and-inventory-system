import Features from '../components/Features/Features'
import Menu from '../components/Menu/Menu'
import Specialty from '../components/Specialty/Specialty';
import Gallery from '../components/Gallery/Gallery';
const Hero = () => {
    return ( 
        <>
         <div className="container-hero">
             <Features/>
             <Menu/>
             <Specialty/>
             <Gallery/>
         </div>
        </>
     );
}
 
export default Hero;