
interface IAthleteHeadersProps {
    setSortCriteria: React.Dispatch<React.SetStateAction<string>>;
    setSortOrder: React.Dispatch<React.SetStateAction<string>>;
}

function AthleteHeaders({setSortCriteria, setSortOrder}: IAthleteHeadersProps) {
    return(
        <div className="flex flex-row font-bold p-2.5 m-2.5">
            <div className="w-1/6">Navn</div>
            <div className="w-1/6 cursor-pointer" onClick={() => {
                    setSortCriteria("birthdate");
                    setSortOrder(prev => prev === "asc" ? "desc" : "asc");
                }}>Alder</div>
            <div className="w-1/6 cursor-pointer" onClick={() => {
                    setSortCriteria("gender");
                    setSortOrder(prev => prev === "asc" ? "desc" : "asc");
                }}>Køn</div>
            <div className="w-1/6 cursor-pointer" onClick={() => {
                    setSortCriteria("club");
                    setSortOrder(prev => prev === "asc" ? "desc" : "asc");
                }}>Klub</div>
        </div>
    )
}

export default AthleteHeaders;