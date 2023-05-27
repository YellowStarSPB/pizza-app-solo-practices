import React from 'react';


import { SearchContext } from '../App';
import SkeletonPizza from '../components/PizzaBlock/SkeletonPizza';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination/Pagination';

function Home() {
    const { searchValue } = React.useContext(SearchContext);

    const [pizzas, setPizzas] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [catrgoryId, setCategoryId] = React.useState(0);
    const [sortPosition, setSortPosition] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState(1);

    const [sortType, setSortType] = React.useState({
        name: 'популярности',
        sortProp: 'rating',
    });

    React.useEffect(() => {
        setIsLoading(true);
        const sortCategory = catrgoryId ? `category=${catrgoryId}` : '';
        const sortTypes = sortType.sortProp;
        const order = sortPosition === false ? 'desc' : 'asc';
        const search = searchValue ? `&search=${searchValue}` : '';
        fetch(
            `https://646f3fb909ff19b12086db85.mockapi.io/pizzas?page=${currentPage}&limit=4&${sortCategory}${search}&sortBy=${sortTypes}&order=${order}`,
        )
            .then((res) => res.json())
            .then((json) => {
                setPizzas(json);
                setIsLoading(false);
            });
        window.scrollTo(0, 0);
    }, [catrgoryId, sortType, sortPosition, searchValue, currentPage]);

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    catrgoryId={catrgoryId}
                    onChangeCategory={(index) => setCategoryId(index)}
                />
                <Sort
                    sortType={sortType}
                    onChangeSortType={(obj) => setSortType((prev) => (prev = obj))}
                    sortPosition={sortPosition}
                    onChangeSortPosition={(value) => setSortPosition(value)}
                />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(4)].map((_, index) => <SkeletonPizza key={index} />)
                    : pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
            </div>
            <Pagination onChangePage={(number) => setCurrentPage(number)} />
        </div>
    );
}

export default Home;
