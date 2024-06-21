import { useState } from "react";
import { ConfirmModal } from "../../../components/Modal";

interface IDisciplineDeleteButtonProps {
    onDeleteDiscipline: (id: number) => void;
    disciplineId: number;
}

function DisciplineDeleteButton({onDeleteDiscipline, disciplineId}: IDisciplineDeleteButtonProps) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    return (
        <>
        {showDeleteModal && <ConfirmModal setIsOpen={setShowDeleteModal} onConfirm={() => {
            onDeleteDiscipline(disciplineId);
            setShowDeleteModal(false);
        }}/>}
        <button className=" bg-red-500 border-zinc-500 border cursor-pointer h-10 text-black px-2.5 my-2.5 ml-6 rounded-md hover:bg-zinc-50"
            onClick={() => setShowDeleteModal(true)}
        >
            Slet disciplin
        </button>
        </>
        
    );
}

export default DisciplineDeleteButton;