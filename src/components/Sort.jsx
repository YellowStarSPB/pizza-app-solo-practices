import React from 'react';
import arrowSort from '../assets/img/arrow-sort.png';
function Sort({ sortType, onChangeSortType, sortPosition, onChangeSortPosition }) {
    const [showPopup, setShowPopup] = React.useState(false);

    const list = [
        { name: 'популярности', sortProp: 'rating' },
        { name: 'цене', sortProp: 'price' },
        { name: 'алфавиту', sortProp: 'title' },
    ];

    const onSelectVariant = (obj) => {
        onChangeSortType(obj);
        setShowPopup((prev) => !prev);
    };

    return (
        <div className="sort">
            <div className="sort__label">
                <div>
                    <svg
                        className={showPopup ? 'show' : ''}
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                            fill="#2C2C2C"
                        />
                    </svg>
                    <b>Сортировка по:</b>
                </div>
                <span onClick={() => setShowPopup((prev) => !prev)}>{sortType.name}</span>
            </div>
            {showPopup && (
                <div className="sort__popup">
                    <ul>
                        {list.map((obj, index) => (
                            <li
                                key={index}
                                onClick={() => onSelectVariant(obj)}
                                className={sortType.name === obj.name ? 'active' : ''}
                            >
                                {obj.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <button onClick={() => onChangeSortPosition(!sortPosition)}>
                {sortPosition === false ? (
                    <img
                        src={arrowSort}
                        style={{ transform: 'rotate(180deg)' }}
                        alt="arrow"
                    />
                ) : (
                    <img src={arrowSort} alt="arrow" />
                )}
            </button>
        </div>
    );
}

export default Sort;
