import { useEffect, useState } from "react";
import DisciplineButtons from "./DisciplineButtons";
import DisciplineHeader from "./DisciplineHeader"
import ResultHeaders from "./ResultHeaders";
import ResultLine from "./ResultLine";
import { sortResults } from "../../../helpers/sorting";

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
    const [showResultList, setShowResultList] = useState<boolean>(false);

    useEffect(() => {
        if (!discipline || !discipline.results) return;
        const sorted = sortResults({discipline, sortCriteria, sortOrder});
        setSortedResults(sorted);
    }, [sortCriteria, discipline?.results, sortOrder]);

    return (
        <>
            <DisciplineHeader discipline={discipline} onConfirm={onConfirm} setShowResultList={setShowResultList} showResultList={showResultList} />
            {showResultList && (
                <>
                    {sortedResults.length > 0 && <ResultHeaders discipline={discipline} setSortCriteria={setSortCriteria} setSortOrder={setSortOrder}/>}
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
            )}
            
        </>
    )
}

export default Discipline;