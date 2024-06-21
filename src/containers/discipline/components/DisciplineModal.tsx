import { useState } from "react";
import { Modal } from "../../../components/Modal";
import EResultType from "../../../enums/enum";




interface ICreateModalProps {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onCreate: (name: string, resultType: EResultType) => void;
}

function CreateModal({setIsOpen, onCreate}: ICreateModalProps) {
    const [name, setName] = useState("");
    const [resultType, setResultType] = useState<EResultType>(EResultType.TIME);

    return (
        <Modal>
            <form className="flex flex-col"
                onSubmit={(e) => {
                    e.preventDefault();
                    onCreate(name, resultType);
                    setIsOpen(false);
                }}
            >
                <h1 className="text-2xl font-bold m-2.5">Opret disciplin</h1>
                <label className="m-2.5">Navn</label>
                <input type="text" className="m-2.5 border" 
                    required
                    onChange={(e) => setName(e.target.value)}
                />
                <label className="m-2.5">Resultat type</label>
                <select className="m-2.5 border"
                    required
                    onChange={(e) => setResultType(e.target.value as EResultType)}
                >
                    <option value="TIME">Tid</option>
                    <option value="DISTANCE">Afstand</option>
                    <option value="POINTS">Point</option>
                </select>
                <div className="flex justify-center">
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
              
            </form>
        </Modal>
    )

}

export default CreateModal;