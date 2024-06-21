import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { Modal } from "../../../components/Modal";


interface ICreateModalProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    onConfirm: (name:string, birthdate:Date, gender:string, club:string, disciplines:string[]) => void;
    disciplines: IDiscipline[];
}

function CreateModal({ setIsOpen, onConfirm, disciplines }: ICreateModalProps) {
    const [name, setName] = useState("");
    const [birthdate, setBirthdate] = useState<Date>();
    const [gender, setGender] = useState("");
    const [club, setClub] = useState("");
    const [disciplinesSelected, setDisciplines] = useState<string[]>([]);

    return (
        <Modal>
            <form onSubmit={(e) => {
                e.preventDefault();
                if(birthdate) {
                    console.log(disciplinesSelected);
                    onConfirm(name, birthdate, gender, club, disciplinesSelected);
                    setIsOpen((prev) => !prev);
                }
                
            }}>
                <div className="text-center">
                    <h2 className="text-2xl font-bold">Opdatér Deltager</h2>
                    <div className="mt-4">
                        <label htmlFor="name" className="block mb-2">
                            Navn:
                        </label>
                        <input
                            type="text"
                            id="name"
                            required
                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                            value={name}
                            onChange={(e) => {
                                e.preventDefault();
                                setName(e.target.value);
                            }}
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="birthdate" className="block mb-2">
                            Fødselsdagsdato:
                        </label>
                        <input
                            type="date"
                            id="birthdate"
                            required
                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                            value={birthdate ? birthdate.toISOString().split('T')[0] : ""}
                            onChange={(e) => {
                                e.preventDefault();
                                setBirthdate(new Date(e.target.value));
                            }}
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="gender" className="block mb-2">
                            Køn:
                        </label>
                        <input
                            type="text"
                            id="gender"
                            required
                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                            value={gender}
                            onChange={(e) => {
                                e.preventDefault();
                                setGender(e.target.value);
                            }}
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="club" className="block mb-2">
                            Klub:
                        </label>
                        <input
                            type="text"
                            id="club"
                            required
                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                            value={club}
                            onChange={(e) => {
                                e.preventDefault();
                                setClub(e.target.value);
                            }}
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="disciplines" className="block mb-2">
                            Disciplin:
                        </label>
                        <select
                            id="disciplines"
                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                            multiple
                            onChange={(e) => {
                                e.preventDefault();
                                setDisciplines(Array.from(e.target.selectedOptions, option => option.value));
                            }}
                        >
                            {disciplines.map((discipline, index) => (
                                <option key={index} value={discipline.name}>{discipline.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mt-4">
                        <button
                            type="button"
                            id="cancel"
                            onClick={() => {
                                setIsOpen((prev) => !prev);
                            }}
                            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            id="save"
                            className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-md"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </Modal>
    )

}

interface IEditModalProps {
    athlete: IAthlete;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    onConfirm: (id:number, name:string, birthdate:Date, gender:string, club:string, disciplines:string[]) => void;
    disciplines: IDiscipline[];
}

function EditModal({ athlete, setIsOpen, onConfirm, disciplines }: IEditModalProps) {
    const [name, setName] = useState(athlete.name);
    const [birthdate, setBirthdate] = useState(athlete.birthdate);
    const [gender, setGender] = useState(athlete.gender);
    const [club, setClub] = useState(athlete.club);
    const [disciplinesSelected, setDisciplines] = useState(athlete.disciplines);

    return (
        <Modal>
            <form onSubmit={(e) => {
                e.preventDefault();
                onConfirm(athlete.id, name, birthdate, gender, club, disciplinesSelected);
                setIsOpen(false);
            }}>
                <div className="text-center">
                    <h2 className="text-2xl font-bold">Opdatér Deltager</h2>
                    <div className="mt-4">
                        <label htmlFor="name" className="block mb-2">
                            Navn:
                        </label>
                        <input
                            type="text"
                            id="name"
                            required
                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                            value={name}
                            onChange={(e) => {
                                e.preventDefault();
                                setName(e.target.value);
                            }}
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="birthdate" className="block mb-2">
                            Fødselsdagsdato:
                        </label>
                        <input
                            type="date"
                            id="birthdate"
                            required
                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                            value={birthdate}
                            onChange={(e) => {
                                e.preventDefault();
                                setBirthdate(e.target.value);
                            }}
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="gender" className="block mb-2">
                            Køn:
                        </label>
                        <input
                            type="text"
                            id="gender"
                            required
                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                            value={gender}
                            onChange={(e) => {
                                e.preventDefault();
                                setGender(e.target.value);
                            }}
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="club" className="block mb-2">
                            Klub:
                        </label>
                        <input
                            type="text"
                            id="club"
                            required
                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                            value={club}
                            onChange={(e) => {
                                e.preventDefault();
                                setClub(e.target.value);
                            }}
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="disciplines" className="block mb-2">
                            Disciplin:
                        </label>
                        <select
                            id="disciplines"
                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                            multiple
                            onChange={(e) => {
                                e.preventDefault();
                                setDisciplines(Array.from(e.target.selectedOptions, option => option.value));
                            }}
                        >
                            {disciplines.map((discipline, index) => (
                                <option selected={athlete.disciplines.includes(discipline.name)} key={index} value={discipline.name}>{discipline.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mt-4">
                        <button
                            type="button"
                            id="cancel"
                            onClick={() => {
                                setIsOpen((prev) => !prev);
                            }}
                            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                        >
                            Annullér
                        </button>
                        <button
                            type="submit"
                            id="save"
                            className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-md"
                        >
                            Gem
                        </button>
                    </div>
                </div>
            </form>
        </Modal>
    )
}

export { CreateModal, EditModal };