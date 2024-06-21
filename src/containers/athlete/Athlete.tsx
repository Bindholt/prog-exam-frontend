import { useEffect, useState } from "react";
import PageLayout from "../../components/PageLayout"
import SearchBar from "./components/SearchBar";
import useAthletes from "../../hooks/useAthletes"
import AthleteResult from "./components/AthleteResult";
import AthleteCreateButton from "./components/AthleteCreateButton";
import useDisciplines from "../../hooks/useDisciplines";
import AthleteFilter from "./components/AthleteFilter";
import { calculateAge } from "../../helpers/calcAge";

function Athlete() {
    const {athletes, fetchAthletesByName, createAthlete, patchAthlete, deleteAthlete} = useAthletes();
    const {disciplines} = useDisciplines();
    const [searchAthletes, setSearchAthlete] = useState<string>("");
    const [modifiedAthleteList, setModifiedAthleteList] = useState<IAthlete[] | null>(null);
    const [sortCriteria, setSortCriteria] = useState<string>("default");
    const [sortOrder, setSortOrder] = useState<string>("asc");
    const [filters, setFilters] = useState<IFilter>({});

    useEffect(() => {
        if (!athletes) return;
        const filtered = athletes.filter(athlete => {
            if (filters.discipline && athlete.disciplines) {
                return athlete.disciplines.includes(filters.discipline);
            }
            if (filters.ageGroup && athlete.birthdate) {
                const age = calculateAge(athlete.birthdate);
                if (filters.ageGroup === "9") {
                    return age >= 6 && age <= 9;
                } else if (filters.ageGroup === "13") {
                    return age >= 10 && age <= 13;
                } else if (filters.ageGroup === "22") {
                    return age >= 14 && age <= 22;
                } else if (filters.ageGroup === "40") {
                    return age >= 23 && age <= 40;
                } else if (filters.ageGroup === "41") {
                    return age >= 41;
                }
            }
            if(filters.gender && athlete.gender) {
                if(filters.gender === "mand") {
                    return athlete.gender === "Mand";
                } else if (filters.gender === "kvinde") {
                    return athlete.gender === "Kvinde";
                } else if (filters.gender === "andet") {
                    return athlete.gender !== "Mand" && athlete.gender !== "Kvinde";
                }
            }
            return true;
        });

        setModifiedAthleteList(filtered);
    }, [filters, athletes]);

    useEffect(() => {
        if (!athletes) return;

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

        setModifiedAthleteList(sorted);
    }, [sortCriteria, sortOrder]);

    useEffect(() => {
        async function fetchData() {
            if (searchAthletes.length > 0) {
                const result = await fetchAthletesByName(searchAthletes);
                if(typeof result !== "undefined") {
                    setModifiedAthleteList(result);
                }
            } else {
                setModifiedAthleteList(null);
            }
        }
        fetchData();
    }, [searchAthletes] );

    const onDelete = async (id: number) => {
        await deleteAthlete(id);
        setModifiedAthleteList(prev => prev?.filter(athlete => athlete.id !== id) ?? null);
    };

    const onEditAthlete = async (id:number, name: string, birthdate: Date, gender:string, club:string, disciplines:string[]) => {
        const athleteToUpdate: Partial<IAthlete> = {
            name,
            birthdate,
            gender,
            club,
            disciplines
        }
        await patchAthlete(athleteToUpdate, id);
        if(modifiedAthleteList){
            setModifiedAthleteList(prev => prev?.map(athlete => athlete.id === id ? {...athlete, ...athleteToUpdate} : athlete) ?? null);
        } else {
            setModifiedAthleteList(athletes.map(athlete => athlete.id === id ? {...athlete, ...athleteToUpdate} : athlete));
        }
    }

    const onCreateAthlete = async (name: string, birthdate: Date, gender: string, club: string, disciplines:string[]) => {
        const newAthlete: Partial<IAthlete> = {
            name,
            birthdate,
            gender,
            club,
            disciplines
        }
        await createAthlete(newAthlete);
    }

    return (
        <PageLayout>
            <div className="flex">
                <div className="flex flex-col w-7/12">
                    <SearchBar setSearchAthlete={setSearchAthlete} />
                    <div className="flex-row ml-5">
                        {modifiedAthleteList ? (
                            <AthleteResult athletes={modifiedAthleteList} onDelete={onDelete} onEditAthlete={onEditAthlete} disciplines={disciplines} setSortCriteria={setSortCriteria} setSortOrder={setSortOrder} />
                        ) : (
                            <AthleteResult athletes={athletes} onDelete={onDelete} onEditAthlete={onEditAthlete} disciplines={disciplines} setSortCriteria={setSortCriteria} setSortOrder={setSortOrder} />
                        )}
                    </div>
                </div>
                <div className="flex flex-col w-2/12 m-5 ml-52 ">
                    <AthleteCreateButton onCreateAthlete={onCreateAthlete} disciplines={disciplines} />
                    <AthleteFilter setFilters={setFilters} disciplines={disciplines} />
                </div>
            </div>
        </PageLayout>
    )
}

export default Athlete