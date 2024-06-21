interface IAthlete{
    id: number;
    name: string;
    birthdate: birthdate;
    gender: string;
    club: string;
    results: IResult[];
    disciplines: string[];
}

interface ISimpleAthlete{
    id: number;
    name: string;
    gender: string;
    birthdate: Date;
}

interface IPartialAthlete{
    name?: string;
    age?: number
    gender?: string;
    club?: string;
}

interface IDiscipline{
    id: number;
    name: string;
    resultType: string;
    athletes: ISimpleAthlete[];
    results: IResult[];
}

interface IResult{
    id: number;
    athleteName?: string;
    athleteClub?: string;
    athleteId: number;
    athleteGender?: string;
    athleteBirthdate?: Date;
    disciplineName: string;
    date: Date;
    resultType?: string;
    result: string;
}


//filter type

interface IFilter{
    club?: string;
    gender?: string;
    ageGroup?: string;
    discipline?: string;
}