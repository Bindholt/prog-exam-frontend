import { useState } from "react";
import { ConfirmModal } from "../../../components/Modal";
import { EditModal } from "./DisciplineModal";
import { MdOutlineCancel } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";


interface IAthleteButtonsProps {
    onDelete: (id: number) => void;
    onEditResult: (editedResult: string, id:number) => void;
    result: IResult;
}

function DisciplineButtons({onDelete, onEditResult, result} : IAthleteButtonsProps) {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);


    return (
        <>
            {showEditModal && <EditModal setIsOpen={setShowEditModal} result={result} onConfirm={onEditResult} />}
            {showDeleteModal && <ConfirmModal setIsOpen={setShowDeleteModal} onConfirm={() => {
                            onDelete(result.id);
                            setShowDeleteModal(false);
                        }} />}
            <div className="flex pl-5 items-end">
                <button
                    className='bg-red-500 border-zinc-500 border cursor-pointer text-black text-center py-2 px-4 my-6 ml-6 mr-5 rounded-md hover:bg-zinc-50'
                    onClick={() => setShowDeleteModal(true)}><MdOutlineCancel/></button>
                <button
                    className='bg-zinc-300 border-zinc-500 border cursor-pointer text-black text-center py-2 px-4 my-6 rounded-md hover:bg-zinc-50'
                    onClick={() => setShowEditModal(true)}><FaRegEdit/></button>
            </div>
        </>
    );
}

export default DisciplineButtons;