import React from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { SearchContext } from '../App';

import SkeletonPizza from '../components/PizzaBlock/SkeletonPizza';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import Pagination from '../components/Pagination/Pagination';
import { setFilters } from '../redux/slices/filterSlice';

function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //Стейт queryString
    const isSearch = React.useRef(false);
    //Стейт первого рендера
    const isMounted = React.useRef(false);

    const { categoryId, sortPosition, sortType, currentPage } = useSelector(
        (state) => state.filters,
    );

    const { searchValue } = React.useContext(SearchContext);
    const [pizzas, setPizzas] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    //Функция запроса пиц с бэка
    const fetchPizzas = () => {
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
    };

    //Если уже был первый рендер, проверь нужно ли вшивать параменты в queryString
    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProp: sortType.sortProp,
                categoryId,
                currentPage,
                sortPosition: sortPosition === false ? 'desc' : 'asc',
            });

            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [categoryId, sortType, sortPosition, currentPage]);

    //Если был первый рендер, то проверяем URL параметры и сохраняем в REDUX
    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            const sortType = sortList.find((obj) => obj.sortProp === params.sortProp);

            dispatch(
                setFilters({
                    ...params,
                    sortType,
                    sortPosition: params.sortPosition === 'desc' ? false : true,
                }),
            );
            isSearch.current = true;
        }
    }, []);
    
    //Если был первый рендер, запрашиваем пиццы 
    React.useEffect(() => {
        window.scrollTo(0, 0);
        if (!isSearch.current) {
            fetchPizzas();
        }
        isSearch.current = false;
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
