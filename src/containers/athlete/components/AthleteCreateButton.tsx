import { useState } from "react";
import { CreateModal } from "./AthleteModal";

interface IAthleteCreateButtonProps {
    onCreateAthlete: (name: string, birthdate: Date, gender: string, club: string, disciplines: string[]) => void;
    disciplines: IDiscipline[];
}

function AthleteCreateButton({onCreateAthlete, disciplines}: IAthleteCreateButtonProps){
    const [showCreateModal, setShowCreateModal] = useState(false);

    return(
        <>
            {showCreateModal && <CreateModal setIsOpen={setShowCreateModal} onConfirm={onCreateAthlete} disciplines={disciplines} />}
            <button
                className="bg-zinc-300 border-zinc-500 border cursor-pointer text-gray-600 py-2 px-4 my-2.5 mr-6 rounded-md h-14 w-96 hover:bg-zinc-50"
                onClick={() => setShowCreateModal(true)}
            >
                Opret ny Deltager
            </button>
        </>
    )
}

export default AthleteCreateButton;