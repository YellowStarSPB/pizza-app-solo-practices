import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { SearchContext } from '../App';

import SkeletonPizza from '../components/PizzaBlock/SkeletonPizza';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination/Pagination';


function Home() {
    const { searchValue } = React.useContext(SearchContext);
    const dispatch = useDispatch();
    const { categoryId, sortPosition, sortType, currentPage } = useSelector((state) => state.filters);

    const [pizzas, setPizzas] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);


    React.useEffect(() => {
        setIsLoading(true);
        const sortCategory = categoryId ? `category=${categoryId}` : '';
        const sortTypes = sortType.sortProp;
        const order = sortPosition === false ? 'desc' : 'asc';
        const search = searchValue ? `&search=${searchValue}` : '';

        axios
            .get(
                `https://646f3fb909ff19b12086db85.mockapi.io/pizzas?page=${currentPage}&limit=4&${sortCategory}${search}&sortBy=${sortTypes}&order=${order}`,
            )
            .then(({ data }) => {
                setPizzas(data);
                setIsLoading(false);
            });
        window.scrollTo(0, 0);
    }, [categoryId, sortType, sortPosition, searchValue, currentPage]);

    

    return (
        <div className="container">
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(4)].map((_, index) => <SkeletonPizza key={index} />)
                    : pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
            </div>
            <Pagination />
        </div>
    );
}

export default Home;
