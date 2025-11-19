import { HiHome, HiShoppingCart, HiTruck, HiCash, HiBriefcase, 
         HiFilm, HiHeart, HiAcademicCap, HiCreditCard } from 'react-icons/hi';

export default function CategoryIcon({ icon, color, size = 24 }) {
    const iconMap = {
        home: HiHome,
        shopping: HiShoppingCart,
        car: HiTruck,
        money: HiCash,
        briefcase: HiBriefcase,
        entertainment: HiFilm,
        health: HiHeart,
        education: HiAcademicCap,
        card: HiCreditCard,
    };

    const IconComponent = iconMap[icon] || HiCash;

    return (
        <div 
            className="rounded-full p-2 flex items-center justify-center"
            style={{ backgroundColor: color }}
        >
            <IconComponent size={size} className="text-white" />
        </div>
    );
}