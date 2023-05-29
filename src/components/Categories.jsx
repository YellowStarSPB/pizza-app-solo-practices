import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

function Categories() {
    const dispatch = useDispatch();
    const { categoryId } = useSelector((state) => state.filters);

    return (
        <div className="categories">
            <ul>
                {categories.map((item, index) => (
                    <li
                        key={index}
                        onClick={() => dispatch(setCategoryId(index))}
                        className={categoryId === index ? 'active' : ''}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Categories;
