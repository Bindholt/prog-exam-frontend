import { useState } from "react";
import CreateModal from "./DisciplineModal";

function DisciplineCreateButton({onCreate}: {onCreate: (name: string, resultType: string) => void}){
    const [showCreateModal, setShowCreateModal] = useState(false);

    return (
        <>
            {showCreateModal && <CreateModal setIsOpen={setShowCreateModal} onCreate={onCreate} />}
            <div className="flex">
                <button 
                    className="bg-zinc-300 border-zinc-500 border cursor-pointer text-gray-600 h-14 px-4 my-2.5 rounded-md hover:bg-zinc-50 "
                    onClick={() => {
                        setShowCreateModal(true)
                    }}
                    > Tilføj disciplin </button>
            </div>  
        </>
    );
}

export default DisciplineCreateButton;