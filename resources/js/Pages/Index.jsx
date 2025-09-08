import { router, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Home ({taches}) {

    const {data, setData, post, delete: destroy, put, reset, errors} = useForm({
        nom: "",
        statut: false,
    })

    const [filter, setFilter] = useState("all")

    const HandleSubmit = (e) => {
        e.preventDefault();
        post("/store", {
            onSuccess: () => reset("nom")
        });
    }

    const HandleCheck = (e, id) => {
        setData("statut", e.target.checked)
        e.preventDefault();
        put(`update/${id}`, {statut : e.target.checked}, {preserveState: true});
    }

    const HandleDelete = (e, id) => {
        e.preventDefault();
        destroy(`destroy/${id}`)
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
        <section className="flex justify-center h-screen items-center bg-gray-500">
            <div className="bg-gray-400 p-5 flex flex-col items-cente w-1/2 rounded-lg shadow-lg">
                <h1>Taches</h1>
                <div>
                    <button onClick={()=> setFilter("all")}>All</button>
                    <button onClick={()=> setFilter("done")}>Done</button>
                    <button onClick={()=> setFilter("undone")}>Undone</button>
                </div>
                <div className="bg-gray-500 max-h-60 min-h-60 overflow-auto p-2 flex flex-col gap-2">
                    { tachesfiltrees.map(tache => (
                        <div key={tache.id} className="flex bg-gray-400 px-3 py-1 justify-between gap-2 items-center">
                            <input onChange={(e) => HandleCheck(e, tache.id)} type="checkbox" name="statut" id="" checked={tache.statut} />
                            <p className="grow">{tache.nom}</p>
                            <form action="" onSubmit={(e) => HandleDelete(e, tache.id)}>
                                <button className="bg-red-500 px-3 py-1 rounded-lg" type="submit">Delete</button>
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