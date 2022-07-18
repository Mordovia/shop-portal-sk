import React, { useEffect, useState } from "react";
import ProductCard from "./productCard";
import Category from "./category";
import CheckBoxField from "./checkBoxField";
import RangeInput from "./rangeInput";
import SortComponent from "./sortComponent";

const MONEY = "<?php echo json_encode({{Auth::user()->summ_k}}); ?>";

const categories = [
	{ id: 1, name: "Сертификаты" },
	{ id: 2, name: "Брендированные товары" },
	{ id: 3, name: "Мелочи для работы" },
	{ id: 4, name: "Благотворительность" },
	{ id: 5, name: "Вкусняшки" },
	{ id: 6, name: "Развлечения" },
	{ id: 7, name: "Бесценное" },
];

function getCategory(product) {
	const category = categories.find((cat) => cat.id === product.otvet * 1);
	return category;
}

function App() {
	const [originData, setOriginData] = useState([]); //все товары
	const [data, setData] = useState([]);
	const [category, setCategory] = useState({});
	const [allowedProducts, setAllowedProducts] = useState(0);
	const [rangeValue, setRangeValue] = useState(0);
	const [maxPrice, setMaxPrice] = useState(1000);
	const [sortBy, setSortBy] = useState({ num: "true", value: "pisatel", direction: "up" });

	useEffect(() => {
		async function getData() {
			try {
				// const response = await fetch("https://my.carolinaspb.ru/api/json/shop");
				const response = await fetch("http://localhost:3002/shop");
				const { data } = await response.json();
				setOriginData(data);
				setData(data);
			} catch (error) {
				console.log(error);
				return null;
			}
		}
		getData();
	}, []);

	useEffect(() => {
		if (data.length) {
			const maxPrice = getMaxPrice(data);
			setMaxPrice(maxPrice);
		}
	}, [data]);

	function getMaxPrice(data) {
		return data.reduce((curr, acc) => (curr.pisatel * 1 > acc.pisatel * 1 ? curr : acc)).pisatel * 1;
	}

	const handleCategoryClick = ({ target }) => {
		const category = categories.find((cat) => cat.name === target.innerText);
		setCategory(category);
	};

	const handleChange = (target) => {
		setAllowedProducts(target.value);
	};

	function getAllowedProducts(data) {
		return data.filter((el) => el.pisatel * 1 <= MONEY);
	}

	function getCategoryFilter(data, category) {
		return data.filter((el) => getCategory(el).name === category?.name);
	}

	const handleRangeChange = ({ target }) => {
		setRangeValue(target.value);
	};

	function getRangeFilter(val) {
		return originData.filter((el) => el.pisatel * 1 >= (val * maxPrice) / 10);
	}

	const handleSortClick = ({ target }) => {
		const num = target.getAttribute("num");
		const value = target.getAttribute("value");
		if (sortBy.value) {
			if (sortBy.value === value) {
				setSortBy((prevState) => ({ ...prevState, direction: prevState.direction === "up" ? "down" : "up" }));
			} else setSortBy({ num, value, direction: "up" });
		} else setSortBy({ num, value, direction: "up" });
	};

	function getSorted(data, sortBy) {
		const { num, value, direction } = sortBy;
		if (direction === "up") {
			return data.sort((a, b) => {
				return (num === "true" ? a[value] * 1 : a[value]) > (num === "true" ? b[value] * 1 : b[value]) ? 1 : -1;
			});
		} else if (direction === "down") {
			return data.sort((a, b) => {
				return (num === "true" ? a[value] * 1 : a[value]) < (num === "true" ? b[value] * 1 : b[value]) ? 1 : -1;
			});
		}
	}

	function filterData() {
		if (rangeValue) {
			const data = getRangeFilter(rangeValue);
			if (allowedProducts) {
				const filtredData = getAllowedProducts(data);
				if (filtredData.length) {
					if (category.id) {
						const oneMorTimeFiltredData = getCategoryFilter(filtredData, category);
						if (oneMorTimeFiltredData.length) {
							setData(oneMorTimeFiltredData);
						} else {
							setData(getCategoryFilter(data, category));
						}
					} else {
						setData(filtredData);
					}
				}
			} else {
				if (category.id) {
					const filtredData = getCategoryFilter(data, category);
					if (filtredData.length) {
						setData(filtredData);
					} else {
						setData(getCategoryFilter(originData, category));
					}
				} else setData(data);
			}
		} else {
			if (allowedProducts) {
				const filtredData = getAllowedProducts(data);
				if (filtredData.length) {
					if (category.id) {
						const oneMorTimeFiltredData = getCategoryFilter(filtredData, category);
						if (oneMorTimeFiltredData.length) {
							setData(oneMorTimeFiltredData);
						} else {
							setData(getCategoryFilter(getAllowedProducts(originData), category));
						}
					} else {
						setData(filtredData);
					}
				}
			} else {
				if (category.id) {
					const filtredData = getCategoryFilter(originData, category);
					if (filtredData.length) {
						setData(filtredData);
					} else {
						setData(getCategoryFilter(originData, category));
					}
				} else setData(data);
			}
		}
	}

	useEffect(() => filterData(), [rangeValue, allowedProducts, category]);

	return (
		<div className="App">
			<div className="container">
				<div className="row flex-column-reverse flex-lg-row">
					<div className="col-lg-3">
						<div className="siderbar-section">
							<div className="sidebar-single-widget">
								<h6 className="sidebar-title">Категории</h6>

								<div className="sidebar-content">
									<div className="recent-post">
										<ul>
											{categories.map((cat) => (
												<Category data={cat} key={cat.id} onClick={handleCategoryClick} />
											))}
										</ul>
										<CheckBoxField name={"allowed"} value={allowedProducts} onChange={handleChange} children={"Доступные мне"} />
										<RangeInput name={"Цена"} min={data.length ? (rangeValue * maxPrice) / 10 : 0} max={data.length ? maxPrice : 1000} value={rangeValue} onChange={handleRangeChange} />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-9">
						<div>
							Сортировка: <SortComponent name={"Цена"} onClick={handleSortClick} value={"pisatel"} num={true} active={sortBy.value === "pisatel"} direction={sortBy.direction ? sortBy.direction : "up"} /> <SortComponent name={"Наименование"} onClick={handleSortClick} value={"name"} num={false} active={sortBy.value === "name"} direction={sortBy.direction ? sortBy.direction : "up"} />
						</div>
						<div className="blog-grid-wrapper">
							<div className="row">{data.length ? getSorted(data, sortBy).map((product) => <ProductCard data={product} key={product.id} onCategoryClick={handleCategoryClick} category={getCategory(product)} />) : ""}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
