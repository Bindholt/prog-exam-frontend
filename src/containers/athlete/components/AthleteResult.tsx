import AthleteButtons from "./AthleteButtons";
import AthleteHeaders from "./AthleteHeaders";
import AthleteLine from "./AthleteLine";

interface IAthleteResultProps {
    athletes: IAthlete[];
    onDelete: (id: number) => void;
    onEditAthlete: (id:number, name: string, birthdate:Date, gender:string, club:string, disciplines:string[]) => void;
    disciplines: IDiscipline[];
    setSortCriteria: React.Dispatch<React.SetStateAction<string>>;
    setSortOrder: React.Dispatch<React.SetStateAction<string>>;
}

function AthleteResult({ athletes, onDelete, onEditAthlete, disciplines, setSortCriteria, setSortOrder }: IAthleteResultProps) {
    return (
        <div 
            className="flex flex-col border border-zinc-400 rounded-md bg-zinc-100 mt-5"
        >
                <AthleteHeaders setSortCriteria={setSortCriteria} setSortOrder={setSortOrder} />
            {
                athletes.map((athletes, index) => {
                    return (
                        <div key={index} className="flex flex-row m-2.5 w-full">
                            <div className="flex flex-col m-2.5 w-4/6 bg-white border border-zinc-400 rounded-lg p-2.5">
                                <div className="flex">
                                    {Object.entries(athletes).map(([key, value]) => (
                                        <AthleteLine
                                            key={key}
                                            athleteLine={{ [key]: value }}
                                        />
                                    ))}
                                </div>
                            </div>
                            <AthleteButtons athlete={athletes} onDelete={onDelete} onEditAthlete={onEditAthlete} disciplines={disciplines} />
                        </div>
                    )
                })}
        </div>
    )
}

export default AthleteResult;