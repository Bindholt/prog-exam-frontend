
interface AthleteFilterProps {
    setFilters: React.Dispatch<React.SetStateAction<IFilter>>;
    disciplines: IDiscipline[];
}

function AthleteFilter( {setFilters, disciplines}: AthleteFilterProps) {


    return (
        <div className="flex flex-col w-96">
            <div className="m-2.5 font-bold text-2xl">
                Filtre
            </div>
            <div className="border">
                <label className="m-2.5">Discipliner</label>
                <select
                    className="m-2.5 border"
                    onChange={(e) => setFilters(prev => ({...prev, discipline: e.target.value}))}
                >
                    <option value="">Alle</option>
                    {disciplines.map(discipline => (
                        <option key={discipline.id} value={discipline.name}>{discipline.name}</option>
                    ))}
                </select>
            </div>
            <div className="border">
                <label className="m-2.5">Aldersgruppe</label>
                <select
                    className="m-2.5 border"
                    onChange={(e) => setFilters(prev => ({...prev, ageGroup: e.target.value}))}
                >
                    <option value="">All</option>
                    <option value="9">6-9</option>
                    <option value="13">10-13</option>
                    <option value="22">14-22</option>
                    <option value="40">23-40</option>
                    <option value="41">41+</option>
                </select>
            </div>
            <div className="border">
                <label className="m-2.5">Køn</label>
                <select
                    className="m-2.5 border"
                    onChange={(e) => setFilters(prev => ({...prev, gender: e.target.value}))}
                >
                    <option value="">All</option>
                    <option value="mand">Mand</option>
                    <option value="kvinde">Kvinde</option>
                    <option value="andet">Andet</option>
                </select>

            </div>
        </div>
    )

}

export default AthleteFilter;