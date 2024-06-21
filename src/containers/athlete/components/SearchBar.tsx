import { Dispatch, FormEvent, SetStateAction, useState } from "react";

interface SearchBarProps {
    setSearchAthlete: Dispatch<SetStateAction<string>>;
}

function SearchBar({ setSearchAthlete }: SearchBarProps) {
    const [search, setSearch] = useState("");

    function handleSearch(event: FormEvent) {
        event.preventDefault(); 
        if (search.length > 0) {
            setSearchAthlete(search);
        } else {
            setSearchAthlete("");
        }
    }

    return (
        <form onSubmit={handleSearch} className="flex flex-col border border-zinc-400 rounded-md min-w-96 bg-zinc-100 ml-5 mt-5">
            <div className="flex justify-between">
                <input type="text" id="name" placeholder="Navn" onChange={(e) => { setSearch(e.target.value) }} className="bg-white border border-zinc-400 rounded-lg w-3/5 p-2.5 m-2.5" />
                <button type="submit" className="bg-zinc-300 border-zinc-500 border cursor-pointer text-gray-600 py-2 px-4 my-2.5 mr-6 rounded-md hover:bg-zinc-50 "> Søg </button>
            </div>
            <div className="flex">
                <div className="flex-col w-3/12 ml-10">
                    
                </div>
            </div>
        </form>
    );
}

export default SearchBar;