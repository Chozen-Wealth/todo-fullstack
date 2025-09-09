import { router, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Home ({taches}) {

    const {data, setData, post, delete: destroy, reset, errors} = useForm({nom: "",})

    const [filter, setFilter] = useState("all")
    const [darkMode, setDarkMode] = useState(false)

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
        <section className={`flex justify-center h-screen items-center ${darkMode ? "bg-gray-800": "bg-gray-100"} `}>
            <div className="absolute top-10 right-10">
                <button onClick={()=> setDarkMode(!darkMode)} className={`${darkMode ? "bg-gray-700 text-white hover:bg-gray-600": "bg-white hover:bg-gray-100"} cursor-pointer shadow rounded-lg px-3 py-1`}>{darkMode ? "LightMode" : "DarkMode"}</button>
            </div>
            <div className={`${darkMode ? "bg-gray-700 text-white": "bg-white"} p-5 flex flex-col items-cente w-1/2 rounded-lg shadow-md`}>
                <h1 className="text-center text-2xl font-bold">Taches</h1>
                <div className="flex justify-between items-center">
                    <div className="flex gap-2 p-3 justify-center">
                    <button className={`px-3 py-1 ${darkMode ? "bg-gray-800 hover:bg-gray-900" : "bg-gray-300 hover:bg-gray-400"}  rounded-lg  cursor-pointer`} onClick={()=> setFilter("all")}>Tous</button>
                    <button className={`px-3 py-1 ${darkMode ? "bg-gray-800 hover:bg-gray-900" : "bg-gray-300 hover:bg-gray-400"}  rounded-lg  cursor-pointer`} onClick={()=> setFilter("done")}>Terminés</button>
                    <button className={`px-3 py-1 ${darkMode ? "bg-gray-800 hover:bg-gray-900" : "bg-gray-300 hover:bg-gray-400"}  rounded-lg  cursor-pointer`} onClick={()=> setFilter("undone")}>Non terminés</button>
                    </div>
                    <div>
                        <button onClick={(e) => HandleDeleteAll(e)} className={`px-3 py-1 ${darkMode ? "bg-red-700 hover:bg-red-900" : "hover:bg-red-700 bg-red-500 text-white"}  rounded-lg  cursor-pointer`}>Supprimer toutes les taches terminés</button>
                    </div>
                </div>
                <div className={` ${darkMode ? "bg-gray-800":"bg-gray-200"} max-h-60 min-h-60 overflow-auto p-2 flex flex-col gap-2 rounded-lg`}>
                    { tachesfiltrees.map(tache => (
                        <div key={tache.id} className={`flex  ${darkMode ? tache.statut == true ? "bg-gray-800 border border-gray-600" : "bg-gray-700" : tache.statut == true ? "bg-gray-300 border border-gray-400" : "bg-white" } rounded-lg shadow px-3 py-1 justify-between gap-2 items-center`}>
                            <input onChange={(e) => HandleCheck(e, tache)} type="checkbox" name="statut" id={`tache_${tache.id}`} checked={tache.statut} />
                            <label for={`tache_${tache.id}`} className={`grow ${tache.statut ? "line-through" : ""} cursor-pointer`}>{tache.nom}</label>
                            <form action="" onSubmit={(e) => HandleDelete(e, tache.id)}>
                                <button className={`${darkMode ? "bg-red-700 hover:bg-red-900" : "bg-red-500 hover:bg-red-700"}  px-3 py-1 rounded-lg  text-white cursor-pointer`} type="submit">Delete</button>
                            </form>
                        </div>
                    ))}
                </div>
                <form onSubmit={(e) => HandleSubmit(e)} className="flex mt-2">
                    <input value={data.nom} onChange={(e) => setData("nom", e.target.value)} placeholder="Ajouter une tâche" className={`ps-2 ${darkMode ? "bg-gray-600" : "bg-gray-200"} rounded-s-lg grow`} type="text" name="nom" />
                    <button className={`${darkMode ? "bg-gray-800 hover:bg-gray-900" : "bg-gray-700 hover:bg-gray-900"} rounded-e-lg px-3 cursor-pointer py-1 text-white`} type="submit">Ajouter</button>
                </form>
            </div>
        </section>
    )
}