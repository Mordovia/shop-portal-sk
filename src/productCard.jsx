import React from "react";

const ProductCard = ({ data, category }) => {
	const { autor, body, cat, created_at, file, id, name, otdana, otvet, pisatel, podzakaz, text, updated_at } = data;
	// console.log(category);
	return (
		<>
			<div className="col-md-6 col-12">
				<div className="blog-feed-single">
					<a href="/shop/10" className="blog-feed-img-link">
						<img src={`https://my.carolinaspb.ru/storage/app/uploads_Shop/${id}/${file}`} alt="" className="blog-feed-img" />
					</a>
					<div className="blog-feed-content">
						<div className="blog-feed-post-meta">
							<span>Стоимость: {pisatel}</span>
							<br />
							<span>
								{"Категория: "}
								<a href="/shop/cat/2/">{category?.name}</a>{" "}
							</span>
							<br />
						</div>
						<h5 className="blog-feed-link">
							<a href="/shop/10">{name}</a>
						</h5>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductCard;
