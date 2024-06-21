import { useState } from "react";
import { CreateModal } from "./DisciplineModal";

interface IDisciplineHeaderProps {
    discipline: IDiscipline;
    onConfirm: (result: IResult[]) => void;

}

function DisciplineHeader({ discipline, onConfirm }: IDisciplineHeaderProps) {
    const [showCreateModal, setShowCreateModal] = useState(false);

    return (
        <>
            {showCreateModal && <CreateModal setIsOpen={setShowCreateModal} onConfirm={onConfirm} discipline={discipline} />}
            <div className="flex flex-row">
                <div className="font-bold text-3xl ml-5 mt-5">
                    {discipline.name}
                </div>
                <div className="flex justify-end flex-grow">
                    <button className="bg-zinc-300 border-zinc-500 border cursor-pointer text-gray-600 py-2 px-4 my-2.5 mr-6 rounded-md h-14 hover:bg-zinc-50"
                        onClick={() => setShowCreateModal(true)}
                    >
                        Opret Resultater
                    </button>
                </div>
            </div>
        </>
        
    )
}

export default DisciplineHeader;