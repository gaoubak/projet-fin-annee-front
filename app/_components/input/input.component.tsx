'use client';
import Badge from '@components/badge/badge.component';
import React, { useState, useRef } from 'react';
import { HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2';
import './input.styles.scss';
import { HiSearch, HiUpload } from 'react-icons/hi';
export default function Input(props: {
  type?:
    | 'text'
    | 'password'
    | 'tel'
    | 'search'
    | 'email'
    | 'number'
    | 'file'
    | 'select';
  name?: string;
  label?: string;
  options?: string[];
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
	const [showPassword, setShowPassword] = useState(false);

	const handleTogglePassword = () => {
		setShowPassword(!showPassword);
	};

	const fileInput = useRef<HTMLInputElement>(null);

	const renderInputField = () => {
		const { type, name, placeholder } = props;

		switch (type) {
		case 'password':
			return (
				<div className="input">
					<input
						className="input_field"
						type={showPassword ? 'text' : 'password'}
						name={name || ''}
						placeholder={placeholder || ''}
						onChange={props.onChange}
					/>
					<button
						className="toggle_password_button"
						onClick={handleTogglePassword}
					>
						{showPassword ? (
							<Badge icon={<HiOutlineEyeSlash />} type="transparent" />
						) : (
							<Badge icon={<HiOutlineEye />} type="transparent" />
						)}
					</button>
				</div>
			);

		case 'select':
			return (
				<div className="input">
					<select className="select_dropdown">
						{props.options?.map((option, index) => (
							<option
								className="select_dropdown_item"
								key={index}
								value={option}
							>
								{option}
							</option>
						))}
					</select>
				</div>
			);

		case 'tel':
			return (
				<div className="tel_input">
					<select className="tel_dropdown">
						<option className="tel_dropdown_item" value="+33">
                +33
						</option>
						<option className="tel_dropdown_item" value="+44">
                +44
						</option>
						{/* Add more options as needed */}
					</select>
					<input
						className="input_field"
						type="tel"
						name={name || ''}
						placeholder={placeholder || ''}
						onChange={props.onChange}
					/>
				</div>
			);

		case 'search':
			return (
				<div className="input">
					<input
						className="input_field"
						type="search"
						name={name || ''}
						placeholder={placeholder || ''}
						onChange={props.onChange}
					/>
					<button className="search_button">
						<Badge icon={<HiSearch />} type="transparent" />
					</button>
				</div>
			);

		case 'file':
			return (
				<div className="file_pic_input">
					<input
						className="input_field"
						type="file"
						accept="image/*"
						name={name || ''}
						placeholder={placeholder || ''}
						onChange={props.onChange}
						ref={fileInput}
					/>
					<Badge
						icon={<HiUpload />}
						type="transparent"
						onClicked={() => fileInput.current?.click()}
					/>
				</div>
			);

		case 'email':
		case 'text':
		default:
			return (
				<input
					className="input_field"
					type={type || 'text'}
					name={name || ''}
					placeholder={placeholder || ''}
					onChange={props.onChange}
				/>
			);
		}
	};

	return (
		<div className="input">
			<label htmlFor={props.name || ''} className="input_label">
				{props.label}
			</label>
			{renderInputField()}
		</div>
	);
}
