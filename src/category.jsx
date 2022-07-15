const Category = ({ data, onClick }) => {
	return (
		<li className="recent-post-list">
			<div className="post-content">
				<span style={{ cursor: "pointer" }} className=" post-link" onClick={onClick}>
					{data.name}
				</span>
			</div>
		</li>
	);
};

export default Category;
