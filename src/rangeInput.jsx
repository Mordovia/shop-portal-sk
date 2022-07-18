const RangeInput = ({ name, min, max, value, onChange }) => {
	return (
		<form>
			<div className="form-group mr-4" style={{ width: "70%" }}>
				<label htmlFor="formControlRange ">{name}</label>
				<input type="range" className="form-control-range" id="priceRange" min="0" max="10" value={value} onChange={onChange} />
				<div className="d-flex justify-content-between" style={{ lineHeight: 0 }}>
					<span>{min}</span>
					<span>{max}</span>
				</div>
			</div>
		</form>
	);
};

export default RangeInput;
