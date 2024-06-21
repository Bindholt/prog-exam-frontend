import { useEffect, useState } from "react";
import DataService from "../utils/DataService";
import { toast } from "react-hot-toast";

function useAthletes() {
    const [athletes, setAthletes] = useState<IAthlete[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const  dataService = new DataService<IAthlete>("/athletes");

    useEffect(() => {
        const fetchAthletes = async () => {
            try {
                const athletes = await dataService.getAll();
                setAthletes(athletes);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    toast.error("Failed to fetch athletes" + error.message);
                }
            }
        }

        fetchAthletes().then(() => setLoading(false));
    }, []);

    const fetchAthlete = async (id: number) => {
        try {
            return await dataService.get(id);
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error("Failed to fetch athlete" + error.message);
            }
        }
    }

    const fetchAthletesByName = async (name: string) => {
        try {
            return await dataService.getByName(name);
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error("Failed to fetch athlete" + error.message);
            }
        }
    }

    const createAthlete = async (athlete: Partial<IAthlete>) => {
        try {
            const newAthlete = await dataService.create(athlete);
            setAthletes([...athletes, newAthlete]);
            toast.success("Deltager oprettet");
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error("Failed to create athlete" + error.message);
            }
        }
    }

    const patchAthlete = async (athlete: Partial<IAthlete>, id: number) => {
        try {
            await dataService.patch(athlete, id);
            toast.success("Deltager opdateret");
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error("Failed to update athlete" + error.message);
            }
        }
    }

    const deleteAthlete = async (id: number) => {
        try {
            await dataService.delete(id);
            setAthletes(athletes.filter(athlete => athlete.id !== id));
            toast.success("Deltager slettet");
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error("Failed to delete athlete" + error.message);
            }
        }
    }


    return { athletes, loading, fetchAthlete, fetchAthletesByName, createAthlete, patchAthlete, deleteAthlete };

}

export default useAthletes;