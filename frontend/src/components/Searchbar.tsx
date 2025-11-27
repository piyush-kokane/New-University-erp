import { useNavigate  } from 'react-router-dom';
import { useRef, useState, useEffect, type FormEvent } from 'react';
import './styles/Searchbar.css';


/* ===== Interface ===== */
interface SearchbarProps {
	onReady?: (fn: () => void) => void;
  onBlurEmpty?: () => void;
}


/* ===== Main Function ===== */
export default function Searchbar({ onReady, onBlurEmpty }: SearchbarProps) {
	const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState('');

	
	/* === Helper Functions === */
	// Handle Search
  const handleSearch = (e: FormEvent) => {
		e.preventDefault(); // Prevent page refresh

		if (searchValue.trim() !== '') {
			navigate('/' + searchValue.trim());
		}
  };
	
	// clear search value
  const clearSearch = () => {
    setSearchValue('');
    inputRef.current?.focus();
  };	

	// notify parent on input blur
	const handleBlur = () => {
    if (searchValue.trim() === '') {
      onBlurEmpty?.();
    }
  };

  // Give parent access to focus()
  useEffect(() => {
    onReady?.(() => inputRef.current?.focus());
  }, []);


	/* === UI === */
	return (
		<form className="searchbar" onSubmit={handleSearch}>
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
