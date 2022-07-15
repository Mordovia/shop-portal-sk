import React from "react";

const CheckBoxField = ({ name, value, onChange, children }) => {
	const handleChange = () => {
		onChange({ name: name, value: !value });
	};

	return (
		<div className="form-check my-4">
			<input className="form-check-input mt-0" type="checkbox" value="" id={name} onChange={handleChange} checked={value} />
			<label className="form-check-label " htmlFor={name}>
				{children}
			</label>
		</div>
	);
};

export default CheckBoxField;
