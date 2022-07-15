const RangeInput = () => {
	return (
		<form>
			<div className="form-group mr-4">
				<label htmlFor="formControlRange ">Цена</label>
				<input type="range" className="form-control-range" id="priceRange" min="1" max="100" onChange={({ target }) => console.log(target)} />
				<div className="d-flex justify-content-between" style={{ lineHeight: 0 }}>
					<span>0</span>
					<span>100</span>
				</div>
			</div>
		</form>
	);
};

export default RangeInput;
