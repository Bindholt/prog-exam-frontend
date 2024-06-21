import useDisciplines from "../../../hooks/useDisciplines";

interface AthleteFilterProps {
    setFilters: React.Dispatch<React.SetStateAction<IFilter>>;
    disciplines: IDiscipline[];
}

function AthleteFilter( {setFilters, disciplines}: AthleteFilterProps) {


    return (
        <div className="flex flex-col">
            <div className="m-2.5 font-bold text-2xl">
                Filters
            </div>
            <div className="border">
                <label className="m-2.5">Disciplines</label>
                <select
                    className="m-2.5 border"
                    onChange={(e) => setFilters(prev => ({...prev, disciplines: e.target.value}))}
                >
                    <option value="">All</option>
                    {disciplines.map(discipline => (
                        <option key={discipline.id} value={discipline.name}>{discipline.name}</option>
                    ))}
                </select>
            </div>
            <div className="border">
                <label className="m-2.5"></label>
            </div>
        </div>
    )

}

export default AthleteFilter;