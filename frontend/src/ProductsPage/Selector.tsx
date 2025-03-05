import { useState } from "react";

interface SelectorProps {
    onSelectCategory: (category: string) => void;
}

const Selector: React.FC<SelectorProps> = ({onSelectCategory})=> {
    const categories = ['Todo', 'Remeras', 'Pantalones', 'Musculosas', 'Buzos'];
    const [selected, setSelected] = useState('Todo');

    const handleSelect = (category: string)=> {
        onSelectCategory(category);
        setSelected(category);
    }

    return (
        <div className='bg-black  p-4 md:gap-3 flex justify-center'>
            {categories.map((category)=> (
                <button
                    key={category}
                    value={category}
                    className={`${selected===category ? 'text-indigo-700' : 'text-white'} p-2 font-light cursor-pointer hover:text-indigo-500 transition-all duration-300`}
                    onClick={()=> handleSelect(category)}
                >
                    {category}
                </button>
            ))}            
        </div>
    )
}

export default Selector