import './POSBar.css';
import Logo from '../../assets/images/logo.png';

import { ShoppingCart,Table2, ChefHat, History, CircleHelp} from 'lucide-react';

const POSBar = () => {
    const navigation = [
        { name: 'Orders', icon: ShoppingCart },
        { name: 'Tables', icon: Table2 },
        { name: 'Kitchen', icon: ChefHat },
        { name: 'History', icon: History },
        { name: 'Help', icon: CircleHelp }
    ];

    return (
        <aside className="pos-bar">
            <div className="pos-bar-logo">
                <img src={Logo} alt="Chatabs" />
            </div>

            <nav className="pos-bar-nav">
                {navigation.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <a
                            href="#"
                            className={`pos-bar-link ${index === 0 ? 'active' : ''}`}
                            key={item.name}
                        >
                            <Icon className="pos-bar-icon" strokeWidth={2} />

                            <span className="pos-bar-label">
                                {item.name}
                            </span>
                        </a>
                    );
                })}
            </nav>
        </aside>
    );
};

export default POSBar;