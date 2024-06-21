import { useEffect, useState } from "react";
import DisciplineButtons from "./DisciplineButtons";
import DisciplineHeader from "./DisciplineHeader"
import ResultHeaders from "./ResultHeaders";
import ResultLine from "./ResultLine";

interface IDisciplineProps {
    discipline: IDiscipline;
    onConfirm: (result: IResult[]) => void;
    onDelete: (id: number) => void;
    onEditResult: (editedResult: string, id:number) => void;
}

function Discipline({discipline, onConfirm, onDelete, onEditResult} : IDisciplineProps) {
    const [sortedResults, setSortedResults] = useState<IResult[]>(discipline.results);
    const [sortCriteria, setSortCriteria] = useState<string>("result");
    const [sortOrder, setSortOrder] = useState<string>("asc");

    useEffect(() => {
        if (!discipline || !discipline.results) return;

        const sorted = [...discipline.results].sort((a, b) => {
            if (sortCriteria === "result" && sortOrder === "asc") {
                return parseInt(a.result) - parseInt(b.result);
            } else if (sortCriteria === "result" && sortOrder === "desc") {
                return parseInt(b.result) - parseInt(a.result);
            } else if (sortCriteria === "birthdate" && sortOrder === "asc") {
                if (a.athleteBirthdate && b.athleteBirthdate) {
                    return new Date(a.athleteBirthdate).getTime() - new Date(b.athleteBirthdate).getTime();
                }
                return 0;
            } else if (sortCriteria === "birthdate" && sortOrder === "desc") {
                if (a.athleteBirthdate && b.athleteBirthdate) {
                    return new Date(b.athleteBirthdate).getTime() - new Date(a.athleteBirthdate).getTime();
                }
                return 0;
            } else if (sortCriteria === "gender" && sortOrder === "asc") {
                if (a.athleteGender && b.athleteGender) {
                    return a.athleteGender.localeCompare(b.athleteGender);
                }
            } else if (sortCriteria === "gender" && sortOrder === "desc") {
                if (a.athleteGender && b.athleteGender) {
                    return b.athleteGender.localeCompare(a.athleteGender);
                }
            }
            return 0; 
        });

        setSortedResults(sorted);
    }, [sortCriteria, discipline?.results, sortOrder]);

    return (
        <>
            <DisciplineHeader discipline={discipline} onConfirm={onConfirm} />
            {sortedResults.length > 0 && <ResultHeaders discipline={discipline} setSortCriteria={setSortCriteria} setSortOrder={setSortOrder} />}
            {sortedResults.map((result, index) => {
                return (
                    <div key={index} className="flex flex-row">
                        <div 
                            className="flex flex-col m-2.5 bg-white border border-zinc-400 w-4/6 rounded-lg p-2.5"
                        >
                            <ResultLine result={result} />
                        </div>
                        <DisciplineButtons onDelete={onDelete} onEditResult={onEditResult} result={result} />
                    </div>
                )
            })}
        </>
    )
}

export default Discipline;