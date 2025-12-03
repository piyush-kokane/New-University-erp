import { useRef, useState, useEffect, type FormEvent } from 'react';
import { useNavigate  } from 'react-router-dom';

import './styles/Searchbar.css';



/* ===================== PROPS ===================== */
interface SearchbarProps {
	focus?: (fn: () => void) => void;
	onBlurEmpty?: () => void;
	forceTheme?: 'light' | 'dark';
}



/* ===================== MAIN FUNCTION ===================== */
export default function Searchbar({ focus, onBlurEmpty, forceTheme }: SearchbarProps) {
	const navigate = useNavigate();
	const [searchValue, setSearchValue] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);

	
	/* ___ Handle Search ___ */
	const handleSearch = (e: FormEvent) => {
		e.preventDefault(); // prevent page refresh

		if (searchValue.trim() !== '') {
			navigate('/' + searchValue.trim());
		}
	};

	
	/* ___ Clear Search Value ___ */
	const clearSearch = () => {
		setSearchValue('');
		inputRef.current?.focus();
	};	


	/* ___ Notify Parent On Input Blur ___ */
	const handleBlur = () => {
		if (searchValue.trim() === '') {
			onBlurEmpty?.();
		}
	};


	/* ___ Give Parent Access to Focus + Blur ___ */
	useEffect(() => {
		focus?.(() => inputRef.current?.focus());
		inputRef.current?.blur();
	}, []);


	/* ====== UI ====== */
	return (
		<form className={`searchbar ${forceTheme ? forceTheme : ''}`} onSubmit={handleSearch}>
			<input
				ref={inputRef}
				type="text"
				placeholder="Search..."
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
				onBlur={handleBlur}
			/>

			{searchValue 
				? <span className="material-icons icon clear-btn" onClick={clearSearch}>close</span> // if searchValue = true then show clear button
				: <span className="material-icons icon">search</span> // else show search icon
			}
		</form>
	);
}
