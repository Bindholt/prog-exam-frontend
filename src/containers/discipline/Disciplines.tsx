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
            <div className="flex flex-row">
                <div className="flex flex-col w-full">
                    {disciplines.map((discipline, index) => {
                        return (
                            <div key={index} className="flex flex-col border border-zinc-400 rounded-md bg-zinc-100 mt-5 w-7/12">
                                <Discipline discipline={discipline} onConfirm={onConfirm} onDelete={onDelete} onEditResult={onEditResult} />
                            </div>
                        )
                    })}
                </div>
                {/* <div className="flex">
                    <button className="bg-zinc-300 border-zinc-500 border cursor-pointer text-gray-600 h-14 px-4 my-2.5 rounded-md hover:bg-zinc-50 "> Tilføj disciplin </button>
                </div> */}
            </div>
            
            
        </PageLayout>
        
    );
}

export default Disciplines;