import React, { useEffect, useState } from "react";
import data from "./data.json";
import ProductCard from "./productCard";
import Category from "./category";
import CheckBoxField from "./checkBoxField";
import RangeInput from "./rangeInput";

const MONEY = 100;

function getData() {
	// const data = await fetch("https://my.carolinaspb.ru/api/json/shop");

	// console.log(data);
	return data;
}

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
	// console.log(category);
	return category;
}

function App() {
	const [data, setData] = useState([]);
	const [allowedProducts, setAllowedProducts] = useState(0);

	useEffect(() => {
		const { data } = getData();
		setData(data);
	}, []);
	// const { data } = getData();

	const handleCategoryClick = ({ target }) => {
		// console.log(target.innerText);
		const { data } = getData();
		const filtredData = data.filter((el) => getCategory(el).name === target.innerText);
		// console.log(filtredData);
		setData(filtredData);
	};

	const handleChange = (target) => {
		setAllowedProducts(target.value);
	};

	useEffect(() => {
		const { data } = getData();
		if (allowedProducts) {
			const filtredData = data.filter((el) => el.pisatel * 1 <= MONEY);
			setData(filtredData);
		} else setData(data);
	}, [allowedProducts]);

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
										<RangeInput />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-9">
						<div className="blog-grid-wrapper">
							<div className="row">
								{data.map((product) => (
									<ProductCard data={product} key={product.id} category={getCategory(product)} />
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
