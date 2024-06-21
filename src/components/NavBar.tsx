import {Link} from "react-router-dom";
import {ReactNode, useState} from "react";

function NavButton({to, children, onClick, selected}: {
    to: string,
    children: ReactNode,
    onClick?: () => void,
    selected?: boolean
}) {
    return (
        <Link to={to} onClick={onClick}>
            <button
                className={
                    selected
                        ? "text-gray-light font-semibold bg-gray p-4 w-56 cursor-default"
                        : "text-gray font-semibold bg-gray-light p-4 w-56 hover:bg-gray-medium transition-colors"
                }
            >
                {children}
            </button>
        </Link>
    );
}

function NavBar() {
    const [selected, setSelected] = useState<string>(window.location.pathname);

    return (
        <nav className="bg-gray w-full pl-32 pr-10 flex gap-2 items-center">
            <NavButton
                to={"/athlete"}
                onClick={() => setSelected("/athlete")}
                selected={selected === "/athlete"}
            >
                Deltagere
            </NavButton>
            <NavButton
                to={"/discipline"}
                onClick={() => setSelected("/discipline")}
                selected={selected === "/discipline"}
            >
                Resultater
            </NavButton>
        </nav>
    );
}

export default NavBar;
