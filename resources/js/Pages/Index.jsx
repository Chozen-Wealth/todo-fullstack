import { router, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Home ({taches}) {

    const {data, setData, post, delete: destroy, reset, errors} = useForm({nom: "",})

    const [filter, setFilter] = useState("all")

    const HandleSubmit = (e) => {
        e.preventDefault();
        post("/store", {
            onSuccess: () => reset("nom")
        });
    }

    const HandleCheck = (e, tache) => {
        e.preventDefault();

        router.put(`/update/${tache.id}`, 
            { statut: tache.statut ? 0 : 1 }, 
            { preserveState: true }
        );
    };

    const HandleDelete = (e, id) => {
        e.preventDefault();
        destroy(`/destroy/${id}`)
    }

    const HandleDeleteAll = (e) => {
        e.preventDefault();
        router.delete(`/destroy/all`)
    }

    const tachesfiltrees = taches.filter(tache => {
        if (filter == "done") {
            return tache.statut == true;
        }
        if (filter == "undone") {
            return tache.statut == false;
        }
        return true;
    })

    return(
        <section className="flex justify-center h-screen items-center bg-gray-100">
            <div className="bg-white p-5 flex flex-col items-cente w-1/2 rounded-lg shadow-md">
                <h1 className="text-center text-2xl font-bold">Taches</h1>
                <div className="flex justify-between items-center">
                    <div className="flex gap-2 p-3 justify-center">
                    <button className="px-3 py-1 bg-gray-300 rounded-lg hover:bg-gray-500 cursor-pointer" onClick={()=> setFilter("all")}>Tous</button>
                    <button className="px-3 py-1 bg-gray-300 rounded-lg hover:bg-gray-500 cursor-pointer" onClick={()=> setFilter("done")}>Terminés</button>
                    <button className="px-3 py-1 bg-gray-300 rounded-lg hover:bg-gray-500 cursor-pointer" onClick={()=> setFilter("undone")}>Non terminés</button>
                    </div>
                    <div>
                        <button onClick={(e) => HandleDeleteAll(e)} className="px-3 py-1 bg-red-300 rounded-lg hover:bg-red-500 cursor-pointer">Supprimer toutes les taches terminés</button>
                    </div>
                </div>
                <div className="bg-gray-200 max-h-60 min-h-60 overflow-auto p-2 flex flex-col gap-2 rounded-lg">
                    { tachesfiltrees.map(tache => (
                        <div key={tache.id} className={`flex  ${tache.statut == true ? "bg-gray-300 border border-gray-400" : "bg-white"} rounded-lg shadow px-3 py-1 justify-between gap-2 items-center`}>
                            <input onChange={(e) => HandleCheck(e, tache)} type="checkbox" name="statut" id="" checked={tache.statut} />
                            <p className={`grow ${tache.statut ? "line-through" : ""}`}>{tache.nom}</p>
                            <form action="" onSubmit={(e) => HandleDelete(e, tache.id)}>
                                <button className="bg-red-500 px-3 py-1 rounded-lg hover:bg-red-700 text-white cursor-pointer" type="submit">Delete</button>
                            </form>
                        </div>
                    ))}
                </div>
                <form onSubmit={(e) => HandleSubmit(e)} className="flex mt-2">
                    <input value={data.nom} onChange={(e) => setData("nom", e.target.value)} placeholder="Ajouter une tâche" className="ps-2 border bg-white grow" type="text" name="nom" />
                    <button className="bg-gray-700 hover:bg-gray-900 px-3 cursor-pointer py-1 text-white" type="submit">Ajouter</button>
                </form>
            </div>
        </section>
    )
}