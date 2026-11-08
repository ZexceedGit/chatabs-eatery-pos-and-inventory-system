import Features from '../components/Features/Features';
import Menu from '../components/Menu/Menu';
import Specialty from '../components/Specialty/Specialty';
import Gallery from '../components/Gallery/Gallery';
import Story from '../components/Story/Story';
import Articles from '../components/Articles/Articles';
import Reviews from '../components/Reviews/Reviews';
import Location from '../components/Location/Location';
import Footer from '../components/Footer/Footer';
const Hero = () => {
    return ( 
        <>
         <div className="container">
             <Features/>
             <Menu/>
             <Specialty/>
             <Gallery/>
             <Story />
             <Articles/>
             <Reviews/>
             <Location />
         </div>
            <Footer />
        </>
     );
}
 
export default Hero;