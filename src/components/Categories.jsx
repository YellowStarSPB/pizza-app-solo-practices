import React from 'react';

function Categories({ catrgoryId, onChangeCategory }) {
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

    return (
        <div className="categories">
            <ul>
                {categories.map((item, index) => (
                    <li
                        key={index}
                        onClick={() => onChangeCategory(index)}
                        className={catrgoryId === index ? 'active' : ''}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Categories;
