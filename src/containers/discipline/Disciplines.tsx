import PageLayout from "../../components/PageLayout";
import useDisciplines from "../../hooks/useDisciplines";
import Discipline from "./components/Discipline";

function Disciplines() {
    const {disciplines, patchResult, deleteResult, createResult} = useDisciplines();
    
    const onDelete = async (id: number) => {
        await deleteResult(id);
    }

    const onEditResult = async (editedResult: string, id:number) => {
        const result = { result: editedResult }
        await patchResult(result, id);
    }

    const onConfirm = async (newResults: IResult[]) => {
        for (const result of newResults) {
            try {
                await createResult(result);
            } catch (error) {
                console.error(`Error creating result: ${error}`);
            }
        }
    }

    return (
        <PageLayout>
        {disciplines.map((discipline, index) => {
            return (
                <div key={index} className="flex flex-col border border-zinc-400 rounded-md bg-zinc-100 mt-5 w-7/12">
                    <Discipline discipline={discipline} onConfirm={onConfirm} onDelete={onDelete} onEditResult={onEditResult} />
                </div>
            )
        })}
        </PageLayout>
        
    );
}

export default Disciplines;