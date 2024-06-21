import { useEffect, useState } from "react";
import DataService from "../utils/DataService";
import { toast } from "react-hot-toast";

function useDisciplines() {
    const [disciplines, setDisciplines] = useState<IDiscipline[]>([]);
    const [results, setResults] = useState<IResult[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const disciplineDataService = new DataService<IDiscipline>("/disciplines");
    const resultDataService = new DataService<IResult>("/results");

    useEffect(() => {
        const fetchDisciplines = async () => {
            try {
                const disciplines = await disciplineDataService.getAll();
                setDisciplines(disciplines);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    toast.error("Failed to fetch disciplines" + error.message);
                }
            }
        }

        fetchDisciplines().then(() => setLoading(false));
    }, [results]);

    const createDiscipline = async (discipline: Partial<IDiscipline>) => {
        try {
            const newDiscipline = await disciplineDataService.create(discipline);
            setDisciplines([...disciplines, newDiscipline]);
            toast.success("Disciplin oprettet");
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error("Failed to create discipline" + error.message);
            }
        }
    }

    const deleteDiscipline = async (id: number) => {
        try {
            await disciplineDataService.delete(id);
            setDisciplines(disciplines.filter(discipline => discipline.id !== id));
            toast.success("Disciplin slettet");
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error("Failed to delete discipline" + error.message);
            }
        }
    }

    const createResult = async (result: Partial<IResult>) => {
        try {
            const newResult = await resultDataService.create(result);
            setResults([...results, newResult]);
            toast.success("Resultat oprettet");
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error("Failed to create result" + error.message);
            }
        }
    }

    const patchResult = async (result: Partial<IResult>, id: number) => {
        try {
            const updatedResult = await resultDataService.patch(result, id);
            setResults(results.map(result => result.id === id ? updatedResult : result));
            toast.success("Resultat opdateret");
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error("Failed to update result" + error.message);
            }
        }
    }

    const deleteResult = async (id: number) => {
        try {
            await resultDataService.delete(id);
            setResults(results.filter(result => result.id !== id));
            toast.success("Resultat slettet");
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error("Failed to delete athlete" + error.message);
            }
        }
    }

    return { disciplines, loading, createResult, patchResult, deleteResult, createDiscipline, deleteDiscipline };

}

export default useDisciplines;