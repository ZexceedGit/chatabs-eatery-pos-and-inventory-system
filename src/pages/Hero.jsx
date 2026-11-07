import Features from '../components/Features/Features'
import Menu from '../components/Menu/Menu'
import Specialty from '../components/Specialty/Specialty';
const Hero = () => {
    return ( 
        <>
         <div className="container-hero">
             <Features/>
             <Menu/>
             <Specialty/>
         </div>
        </>
     );
}
 
export default Hero;