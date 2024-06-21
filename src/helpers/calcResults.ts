interface TimeParts {
    hours: number;
    minutes: number;
    seconds: number;
    hundredths: number;
}

function padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
}

function hundredthsToTimeParts(hundredths: number): TimeParts {
    const hours = Math.floor(hundredths / 360000);
    hundredths %= 360000;

    const minutes = Math.floor(hundredths / 6000);
    hundredths %= 6000;

    const seconds = Math.floor(hundredths / 100);
    hundredths %= 100;

    return {
        hours,
        minutes,
        seconds,
        hundredths,
    };
}

function timePartsToHundredths(hours: number, minutes: number, seconds: number, hundredths: number): number {
    return (hours * 360000) + (minutes * 6000) + (seconds * 100) + hundredths;
}

interface LengthParts {
    meters: number;
    centimeters: number;
}

function centimetersToLengthParts(centimeters: number): LengthParts {
    const meters = Math.floor(centimeters / 100);
    centimeters %= 100;

    return {
        meters,
        centimeters,
    };
}

function lengthPartsToCentimeters(meters: number, centimeters: number): number {
    return (meters * 100) + centimeters;
}

export { hundredthsToTimeParts, timePartsToHundredths, centimetersToLengthParts, lengthPartsToCentimeters, padZero};