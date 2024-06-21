import { MdOutlineCancel } from "react-icons/md";
import { lengthPartsToCentimeters, timePartsToHundredths } from "../../../helpers/calcResults";
import { useEffect, useState } from "react";

interface DisciplineAddLineProps {
    athleteId: number;
    discipline: IDiscipline;
    setSelectedAthletes: React.Dispatch<React.SetStateAction<number[]>>;
    setNewResults: React.Dispatch<React.SetStateAction<IResult[]>>;
}

function DisciplineAddLine({ athleteId, discipline, setSelectedAthletes, setNewResults }: DisciplineAddLineProps) {   
    const [hours, setHours] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);
    const [seconds, setSeconds] = useState<number>(0);
    const [hundredths, setHundredths] = useState<number>(0);
    const [meters, setMeters] = useState<number>(0);
    const [centimeters, setCentimeters] = useState<number>(0);
    const [points, setPoints] = useState<number>(0);
    const [date, setDate] = useState<Date>(new Date());
    const [result, setResult] = useState<IResult>();

    useEffect(() => {
        let resultValue;
        if (discipline.resultType === "TIME") {
            resultValue = timePartsToHundredths(hours, minutes, seconds, hundredths);
        } else if(discipline.resultType === "DISTANCE") {
            resultValue = lengthPartsToCentimeters(meters, centimeters);
        } else {
            resultValue = points;
        }
        const athleteName = discipline.athletes.find((athlete) => athlete.id === athleteId)?.name;
        
        if(athleteName) {
            setResult({
                id:0,
                athleteId: athleteId,
                athleteName: athleteName,
                disciplineName: discipline.name,
                date: date,
                result: resultValue.toString()
            });
        }
    }, [hours, minutes, seconds, hundredths, meters, centimeters, date, points])

    useEffect(() => {
        if (result) {
            setNewResults((prevResults) => {
                const newResults = [...prevResults];
                
                const index = newResults.findIndex(
                    (res) => res.athleteId === result.athleteId && res.disciplineName === result.disciplineName
                );
    
                if (index === -1) {
                    newResults.push(result);
                } else {
                    newResults[index] = result;
                }
    
                return newResults;
            });
        }
    }, [result]);

    return (
        <>
            <div className="flex space-x-20 items-center">
                <div className="flex-1 text-center">
                    <div>{discipline.athletes.find((athlete) => athlete.id === athleteId)?.name}</div>
                </div>
                <input
                    type="date"
                    id="date"
                    className="flex-1 border border-gray-300 px-4 py-2 rounded-md"
                    onChange={(e) => {
                        e.preventDefault();
                        setDate(new Date(e.target.value))
                    }}
                />
                <div className="flex-1 flex space-x-2 justify-between">
                    {discipline.resultType === "TIME" && (
                        <>
                            <input
                                type="number"
                                id="hours"
                                className="border border-gray-300 px-4 py-2 rounded-md w-1/4"
                                placeholder="T"
                                value={hours}
                                min={0}
                                onChange={(e) => {
                                    e.preventDefault();
                                    const value = parseInt(e.target.value);
                                    if (value >= 0) {
                                        setHours(value);
                                    }
                                }}
                            />
                            <input
                                type="number"
                                id="minutes"
                                className="border border-gray-300 px-4 py-2 rounded-md w-1/4"
                                placeholder="M"
                                value={minutes}
                                min={0}
                                max={59}
                                onChange={(e) => {
                                    e.preventDefault();
                                    const value = parseInt(e.target.value);
                                    if (value >= 0 && value <= 59) {
                                        setMinutes(value);
                                    }
                                }}
                            />
                            <input
                                type="number"
                                id="seconds"
                                className="border border-gray-300 px-4 py-2 rounded-md w-1/4"
                                placeholder="S"
                                value={seconds}
                                min={0}
                                max={59}
                                onChange={(e) => {
                                    e.preventDefault();
                                    const value = parseInt(e.target.value);
                                    if (value >= 0 && value <= 59) {
                                        setSeconds(value);
                                    }
                                }}
                            />
                            <input
                                type="number"
                                id="hundredths"
                                className="border border-gray-300 px-4 py-2 rounded-md w-1/4"
                                placeholder="HS"
                                value={hundredths}
                                min={0}
                                max={99}
                                onChange={(e) => {
                                    e.preventDefault();
                                    const value = parseInt(e.target.value);
                                    if (value >= 0 && value <= 99) {
                                        setHundredths(value);
                                    }
                                }}
                            />
                        </>
                    )}
                    {discipline.resultType === "DISTANCE" && (
                        <>
                            <input
                                type="number"
                                id="meters"
                                className="border border-gray-300 px-4 py-2 rounded-md w-1/2"
                                placeholder="M"
                                value={meters}
                                min={0}
                                onChange={(e) => {
                                    e.preventDefault();
                                    const value = parseInt(e.target.value);
                                    if (value >= 0) {
                                        setMeters(value);
                                    }
                                }}
                            />
                            <input
                                type="number"
                                id="centimeters"
                                className="border border-gray-300 px-4 py-2 rounded-md w-1/2"
                                placeholder="CM"
                                value={centimeters}
                                min={0}
                                max={99}
                                onChange={(e) => {
                                    e.preventDefault();
                                    const value = parseInt(e.target.value);
                                    if (value >= 0 && value <= 99) {
                                        setCentimeters(value);
                                    }
                                }}
                            />
                        </>
                    )}
                    {discipline.resultType === "POINTS" && (
                        <input
                            type="number"
                            id="points"
                            className="border border-gray-300 px-4 py-2 rounded-md w-1/2"
                            placeholder="P"
                            value={points}
                            min={0}
                            onChange={(e) => {
                                e.preventDefault();
                                const value = parseInt(e.target.value);
                                if (value >= 0) {
                                    setPoints(value);
                                }
                            }}
                        />
                    )}
                </div>
                <div className="w-12">
                    <button
                        type="button"
                        className="bg-red-500 border-zinc-500 border cursor-pointer text-black text-center py-2 px-4 rounded-md hover:bg-zinc-50"
                        onClick={() => {
                            setSelectedAthletes((prevSelectedAthletes) => prevSelectedAthletes.filter((id) => id !== athleteId));
                            setNewResults((prevResults) => prevResults.filter((res) => res.id !== athleteId));
                        }}
                    >
                        <MdOutlineCancel />
                    </button>
                </div>
            </div>
        </>
    )
}

export default DisciplineAddLine;