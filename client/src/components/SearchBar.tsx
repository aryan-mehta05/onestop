import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { RxCross2 } from "react-icons/rx";

const SearchBar = () => {
  const [searchText, setSearchText] = useState<string>("");

  const [filterButtons, setFilterButtons] = useState([
    {
      id: 1,
      text: "Places",
      selected: false,  
    }, {
      id: 2,
      text: "Creators",
      selected: false,
    }, {
      id: 3,
      text: "Festivals",
      selected: false,
    }
  ]);
  
  return (
    <div className="flex items-center border border-gray-200 rounded-xl shadow-md px-8 py-4 space-x-4 mx-12">
      {/* Search Icon */}
      <FaSearch className="text-gray-700 w-5 h-5" />

      {/* Input Field */}
      <input
        type="text"
        placeholder="Search for exotic destinations, famous creators, and more..."
        className="flex-1 focus:outline-none text-gray-700 text-xl font-playfair italic focus:not-italic"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      {/* Buttons */}
      <div className="flex space-x-2">
        {filterButtons.map((option) => (
          <button
            key={option.id}
            className={`rounded-full flex items-center justify-between border border-os-blue px-4 py-1 ${option.selected ? 'bg-os-blue text-white' : 'bg-white text-os-blue'}`}
            onClick={() => {
              setFilterButtons(filterButtons.map((btn) =>
                btn.id === option.id? {...btn, selected:!btn.selected } : btn
              ));
            }}
          >
            <p className={`${option.selected ? 'mr-2' : ''}`}>{option.text}</p>
            {option.selected && (
              <RxCross2 className='hover:text-gray-700 rounded-full text-white hover:bg-white' />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
