import PageLayout from "../../components/PageLayout";
import useDisciplines from "../../hooks/useDisciplines";
import Discipline from "./components/Discipline";
import DisciplineCreateButton from "./components/DisciplineCreateButton";
import DisciplineDeleteButton from "./components/DisciplineDeleteButton";

function Disciplines() {
    const {disciplines, patchResult, deleteResult, createResult, createDiscipline, deleteDiscipline} = useDisciplines();
    
    const onDelete = async (id: number) => {
        await deleteResult(id);
    }

    const onDeleteDiscipline = async (id: number) => {
        await deleteDiscipline(id);
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
    async function onCreateDiscipline(name: string, resultType: string) {
        const discipline = { name, resultType }
        try {
            await createDiscipline(discipline);
        } catch (error) {
            console.error(`Error creating discipline: ${error}`);
        }
    }

    return (
        <PageLayout>
            <div className="flex flex-row">
                <div className="flex flex-col w-full">
                    {disciplines.map((discipline, index) => {
                        return (
                            <div key={index} className="flex">
                                <div className="flex flex-col border border-zinc-400 rounded-md bg-zinc-100 mt-5 w-7/12">
                                    <Discipline discipline={discipline} onConfirm={onConfirm} onDelete={onDelete} onEditResult={onEditResult} />
                                </div>
                                <div className="flex items-center justify-center">
                                    {discipline.results.length <= 0 && 
                                        <DisciplineDeleteButton onDeleteDiscipline={onDeleteDiscipline} disciplineId={discipline.id}/>
                                    }
                                </div>
                            </div>
                            
                        )
                    })}
                </div>
                <DisciplineCreateButton onCreate={onCreateDiscipline}/>
            </div>
            
            
        </PageLayout>
        
    );
}

export default Disciplines;