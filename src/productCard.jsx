import React from "react";

const ProductCard = ({ data, category, onCategoryClick }) => {
	const { autor, body, cat, created_at, file, id, name, otdana, otvet, pisatel, podzakaz, text, updated_at } = data;
	// console.log(category);
	return (
		<>
			<div className="col-md-6 col-12">
				<div className="blog-feed-single">
					<a href={`/shop/${id}`} className="blog-feed-img-link">
						<img src={`/storage/app/uploads_Shop/${id}/${file}`} alt="" className="blog-feed-img" />
					</a>
					<div className="blog-feed-content">
						<div className="blog-feed-post-meta">
							<span>Стоимость: {pisatel}</span>
							<br />
							<span>
								{"Категория: "}
								<span type="button" onClick={onCategoryClick}>
									{category?.name}
								</span>
							</span>
							<br />
						</div>
						<h5 className="blog-feed-link">
							<a href={`/shop/${id}`}>{name}</a>
						</h5>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductCard;
