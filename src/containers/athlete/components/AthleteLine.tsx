import { calculateAge } from "../../../helpers/calcAge";

interface AthleteLineProps {
    athleteLine: { [key: string]: number | string };
}

function AthleteLine( {athleteLine} : AthleteLineProps) {
    const lineTitle = Object.keys(athleteLine)[0];
    const lineValue = Object.values(athleteLine)[0];

    return (
        <>
            {lineTitle !== "results" && lineTitle !== "disciplines" && lineTitle !== "id" ? (
                lineTitle === "birthdate" ? (
                    <div className="w-full">{calculateAge(new Date(lineValue))}</div>
                ) : <div className="w-full">{lineValue}</div>
            ) : null}
        </>
    );
}

export default AthleteLine;
