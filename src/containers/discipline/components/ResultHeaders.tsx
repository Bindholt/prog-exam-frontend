import { translateResultHeader } from "../../../helpers/translateResultType";

interface IResultHeadersProps {
    discipline: IDiscipline;
    setSortCriteria: React.Dispatch<React.SetStateAction<string>>;
    setSortOrder: React.Dispatch<React.SetStateAction<string>>;
}

function ResultHeaders({discipline, setSortCriteria, setSortOrder}: IResultHeadersProps) {
    return(
        <>
            <div className="flex flex-row font-bold m-5 w-4/6">
                <div className="w-1/6">Navn</div>
                <div className="w-1/6">Klub</div>
                <div className="w-1/6">Dato</div>
                <div className="w-1/6 cursor-pointer" onClick={() => {
                    setSortCriteria("gender");
                    setSortOrder(prev => prev === "asc" ? "desc" : "asc");
                }}>Køn</div>
                <div className="w-1/6 cursor-pointer" onClick={() => {
                    setSortCriteria("birthdate");
                    setSortOrder(prev => prev === "asc" ? "desc" : "asc");
                }}>Alder</div>
                <div className="w-1/6 cursor-pointer" onClick={() => {
                    setSortCriteria("result");
                    setSortOrder(prev => prev === "asc" ? "desc" : "asc");
                }}>{translateResultHeader(discipline.resultType)}</div>
            </div>
        </>
        
    )
}

export default ResultHeaders;