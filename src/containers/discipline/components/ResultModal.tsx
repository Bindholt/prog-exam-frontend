import { useEffect, useState } from "react";
import { Modal, ModalFullWidth } from "../../../components/Modal";
import { translateResultHeader } from "../../../helpers/translateResultType";
import { centimetersToLengthParts, hundredthsToTimeParts, lengthPartsToCentimeters, timePartsToHundredths } from "../../../helpers/calcResults";
import DisciplineAddLine from "./DisciplineAddLine";

interface IEditModalProps {
    setIsOpen: (isOpen: boolean) => void;
    onConfirm: (result: string, id:number) => void;
    result: IResult;
}

function EditModal({setIsOpen, onConfirm, result}: IEditModalProps) {
    let timeParts;
    if(result.resultType === "TIME") {
        timeParts = hundredthsToTimeParts(parseInt(result.result));
    }
    const [hours, setHours] = useState((timeParts ? timeParts.hours : 0));
    const [minutes, setMinutes] = useState((timeParts ? timeParts.minutes : 0));
    const [seconds, setSeconds] = useState((timeParts ? timeParts.seconds : 0));
    const [hundredths, setHundredths] = useState((timeParts ? timeParts.hundredths : 0));

    let distanceParts;
    if(result.resultType === "DISTANCE") {
        distanceParts = centimetersToLengthParts(parseInt(result.result));
    }
    const [meters, setMeters] = useState((distanceParts ? distanceParts.meters : 0));
    const [centimeters, setCentimeters] = useState((distanceParts ? distanceParts.centimeters : 0));

    const [updatedResult, setUpdatedResult] = useState(result.result);

    useEffect(() => {
        if(result.resultType === "TIME") {
            setUpdatedResult(timePartsToHundredths(hours, minutes, seconds, hundredths).toString());
        }
    }, [hours,minutes,seconds,hundredths]);

    useEffect(() => {
        if(result.resultType === "DISTANCE") {
            setUpdatedResult(lengthPartsToCentimeters(meters, centimeters).toString());
        }
    }, [meters,centimeters]);

    return (
        <Modal>
            <form onSubmit={(e) => {
                e.preventDefault();
                onConfirm(updatedResult, result.id);
                setIsOpen(false);
            }}>
                <div className="text-center">
                    <h2 className="text-2xl font-bold">Opdatér Resultat</h2>
                    <div className="mt-4">
                        <label htmlFor="name" className="block mb-2">
                            {translateResultHeader((result.resultType) ? result.resultType : "POINTS" )}:
                        </label>
                        {result.resultType === "TIME" && 
                        <>
                            <label htmlFor="hours" className="block mb-2">Timer:</label>
                            <input
                                type="number"
                                id="hours"
                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
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
                            <label htmlFor="minutes" className="block mb-2">Minutter:</label>
                            <input
                                type="number"
                                id="minutes"
                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
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
                            <label htmlFor="seconds" className="block mb-2">Sekunder:</label>
                            <input
                                type="number"
                                id="seconds"
                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
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
                            <label htmlFor="hundredths" className="block mb-2">Hundrededele:</label>
                            <input
                                type="number"
                                id="hundredths"
                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
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
                        }
                        {result.resultType === "DISTANCE" &&
                            <>
                                <label htmlFor="meters" className="block mb-2">Meter:</label>
                                <input
                                    type="number"
                                    id="meters"
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
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
                                <label htmlFor="centimeters" className="block mb-2">Centimeter:</label>
                                <input
                                    type="number"
                                    id="centimeters"
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
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
                        }
                        {result.resultType === "POINTS" &&
                            <input
                                type="number"
                                id="points"
                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                value={result.result}
                                min={0}
                                onChange={(e) => {
                                    e.preventDefault();
                                    const value = parseInt(e.target.value);
                                    if (value >= 0) {
                                        setUpdatedResult(value.toString());
                                    }
                                }}
                            />
                        }
                    </div>
                    <div className="mt-4">
                        <button
                            type="button"
                            id="cancel"
                            onClick={() => {
                                setIsOpen(false);
                            }}
                            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                        >
                            Annullér
                        </button>
                        <button
                            type="submit"
                            id="save"
                            className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-md"
                        >
                            Opdatér
                        </button>
                    </div>
                </div>
            </form>
        </Modal>
    )
}

interface ICreateModalProps {
    setIsOpen: (isOpen: boolean) => void;
    onConfirm: (result: IResult[]) => void;
    discipline: IDiscipline;
}

function CreateModal({setIsOpen, onConfirm, discipline}: ICreateModalProps) {
    const [selectedAthletes, setSelectedAthletes] = useState<number[]>([]);
    const [newResults, setNewResults] = useState<IResult[]>([]);

    const handleSubmit = () => {
        onConfirm(newResults);
        setIsOpen(false);
    }
    return (
        <ModalFullWidth>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}>
                <div className="text-center">
                    <div className="text-4xl font-bold">{discipline.name}</div>
                    <div className="mt-4">
                        <select
                            id="athletes"
                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                            value={""}
                            onChange={(e) => {
                                e.preventDefault();
                                
                                setSelectedAthletes((prevSelectedAthletes) => {
                                    const athleteId = parseInt(e.target.value);
                                    if (prevSelectedAthletes.includes(athleteId)) {
                                        return prevSelectedAthletes;
                                    } else {
                                        return [...prevSelectedAthletes, athleteId];
                                    }
                                });
                            }}
                        >
                            <option value="">Tilføj Deltagere</option>
                            {discipline.athletes.map((athlete) => (
                                <option key={athlete.id} value={athlete.id}>{athlete.name}</option>
                            ))}
                        </select>
                                {selectedAthletes.length > 0 && (
                                    <div className="flex flex-col space-y-4 mt-5">
                                        <div className="flex space-x-4 font-bold">
                                            <div className="flex-1 text-center">Navn</div>
                                            <div className="flex-1 text-center">Dato</div>
                                            <div className="flex-1 text-center">{translateResultHeader(discipline.resultType)}</div>
                                            <div className="w-12"></div>
                                        </div>
                                        {selectedAthletes.map((athleteId, index) => (
                                            <DisciplineAddLine key={index} athleteId={athleteId} discipline={discipline} setSelectedAthletes={setSelectedAthletes} setNewResults={setNewResults} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        
                            <div className="mt-5">
                                <button
                                    type="button"
                                    id="cancel"
                                    onClick={() => {
                                        setIsOpen(false);
                                    }}
                                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                                >
                                    Annullér
                                </button>
                                <button
                                    type="submit"
                                    id="save"
                                    className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-md"
                                >
                                    Gem
                                </button>
                            </div>
                        </div>
                    </form>
        </ModalFullWidth>
    )
                        
}

export { CreateModal, EditModal}