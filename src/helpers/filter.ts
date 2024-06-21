import { calculateAge } from "./calcAge";


interface IFilterAthletesProps{
    athletes: IAthlete[];
    filters: IFilter;
}

const filterAthletes = ({ athletes, filters }: IFilterAthletesProps) => {
    const filtered = athletes.filter(athlete => {
        let matches = true;

        if (filters.discipline && athlete.disciplines) {
            matches = matches && athlete.disciplines.includes(filters.discipline);
        }

        if (filters.ageGroup && athlete.birthdate) {
            const age = calculateAge(athlete.birthdate);
            if (filters.ageGroup === "9") {
                matches = matches && age >= 6 && age <= 9;
            } else if (filters.ageGroup === "13") {
                matches = matches && age >= 10 && age <= 13;
            } else if (filters.ageGroup === "22") {
                matches = matches && age >= 14 && age <= 22;
            } else if (filters.ageGroup === "40") {
                matches = matches && age >= 23 && age <= 40;
            } else if (filters.ageGroup === "41") {
                matches = matches && age >= 41;
            }
        }

        if (filters.gender && athlete.gender) {
            if (filters.gender === "mand") {
                matches = matches && athlete.gender === "Mand";
            } else if (filters.gender === "kvinde") {
                matches = matches && athlete.gender === "Kvinde";
            } else if (filters.gender === "andet") {
                matches = matches && athlete.gender !== "Mand" && athlete.gender !== "Kvinde";
            }
        }

        return matches;
    });

    return filtered;
};

export { filterAthletes };