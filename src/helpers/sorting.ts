interface sortResultsProps {
    discipline: IDiscipline;
    sortCriteria: string;
    sortOrder: string;
}

const sortResults = ({discipline, sortCriteria, sortOrder}: sortResultsProps) => {
    const sorted = [...discipline.results].sort((a, b) => {
        if (sortCriteria === "result" && sortOrder === "asc") {
            return parseInt(a.result) - parseInt(b.result);
        } else if (sortCriteria === "result" && sortOrder === "desc") {
            return parseInt(b.result) - parseInt(a.result);
        } else if (sortCriteria === "birthdate" && sortOrder === "asc") {
            if (a.athleteBirthdate && b.athleteBirthdate) {
                return new Date(a.athleteBirthdate).getTime() - new Date(b.athleteBirthdate).getTime();
            }
            return 0;
        } else if (sortCriteria === "birthdate" && sortOrder === "desc") {
            if (a.athleteBirthdate && b.athleteBirthdate) {
                return new Date(b.athleteBirthdate).getTime() - new Date(a.athleteBirthdate).getTime();
            }
            return 0;
        } else if (sortCriteria === "gender" && sortOrder === "asc") {
            if (a.athleteGender && b.athleteGender) {
                return a.athleteGender.localeCompare(b.athleteGender);
            }
        } else if (sortCriteria === "gender" && sortOrder === "desc") {
            if (a.athleteGender && b.athleteGender) {
                return b.athleteGender.localeCompare(a.athleteGender);
            }
        }
        return 0; 
    });
    return sorted;
}

interface sortAthletesProps {
    athletes: IAthlete[];
    sortCriteria: string;
    sortOrder: string;
}

const sortAthletes = ({athletes, sortCriteria, sortOrder}: sortAthletesProps) => {
    const sorted = [...athletes].sort((a, b) => {
        if (sortCriteria === "birthdate" && sortOrder === "asc") {
            return new Date(a.birthdate).getTime() - new Date(b.birthdate).getTime();
        } else if (sortCriteria === "birthdate" && sortOrder === "desc") {
            return new Date(b.birthdate).getTime() - new Date(a.birthdate).getTime();
        } else if (sortCriteria === "gender" && sortOrder === "asc") {
            return a.gender.localeCompare(b.gender);
        } else if (sortCriteria === "gender" && sortOrder === "desc") {
            return b.gender.localeCompare(a.gender);
        } else if (sortCriteria === "club" && sortOrder === "asc") {
            return a.club.localeCompare(b.club);
        } else if (sortCriteria === "club" && sortOrder === "desc") {
            return b.club.localeCompare(a.club);
        }
        return 0; 
    });
    return sorted;
}

export {sortResults, sortAthletes};