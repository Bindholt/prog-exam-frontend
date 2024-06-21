import { useState } from "react";
import { ConfirmModal } from "../../../components/Modal";
import { EditModal } from "../../athlete/components/AthleteModal";
import { MdOutlineCancel } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";


interface IAthleteButtonsProps {
    athlete: IAthlete;
    onDelete: (id: number) => void;
    onEditAthlete: (id:number, name: string, birthdate:Date, gender:string, club:string, disciplines:string[]) => void;
    disciplines: IDiscipline[];
}

function AthleteButtons({athlete, onDelete, onEditAthlete, disciplines} : IAthleteButtonsProps) {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);


    return (
        <>
            {showEditModal && <EditModal athlete={athlete} setIsOpen={setShowEditModal} onConfirm={onEditAthlete} disciplines={disciplines} />}
            {showDeleteModal && <ConfirmModal setIsOpen={setShowDeleteModal} onConfirm={() => {
                            onDelete(athlete.id);
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

export default AthleteButtons;