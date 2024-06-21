import { centimetersToLengthParts, hundredthsToTimeParts, padZero } from "../../../helpers/calcResults";
import { calculateAge } from "../../../helpers/calcAge";

interface IResultLineProps {
    result: IResult;
}

function ResultLine({result}: IResultLineProps) {
    let timeParts;
    if(result.resultType === "TIME") {
        timeParts = hundredthsToTimeParts(parseInt(result.result));
    }
    let distanceParts;
    if(result.resultType === "DISTANCE") {
        distanceParts = centimetersToLengthParts(parseInt(result.result));
    }


    return (
        <>
            <div className="flex flex-row">
                <div className="w-1/6">{result.athleteName}</div>
                <div className="w-1/6">{result.athleteClub}</div>
                <div className="w-1/6">{result.date.toString()}</div>
                <div className="w-1/6">{result.athleteGender}</div>
                <div className="w-1/6">{calculateAge((result.athleteBirthdate) ? result.athleteBirthdate : new Date())}</div>
                {result.resultType === "TIME" && timeParts &&
                    <div className="w-1/6">{`${timeParts.hours}:${padZero(timeParts.minutes)}:${padZero(timeParts.seconds)}:${timeParts.hundredths}`}</div>
                }
                {result.resultType === "DISTANCE" && distanceParts && 
                    <div className="w-1/6">{`${distanceParts.meters}m  ${distanceParts.centimeters}cm`}</div>
                }
                {result.resultType === "POINTS" && 
                    <div className="w-1/6">{result.result}</div>
                }
                
                
            </div>
        </>
    )
}

export default ResultLine;