import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Liste ({taches, filter, darkMode, tasks, setTasks}) {
    

    const tachesfiltrees = tasks.filter(tache => {
        if (filter == "done") {
            return tache.statut == true;
        }
        if (filter == "undone") {
            return tache.statut == false;
        }
        return true;
    })

    const HandleDelete = (e, id) => {
        e.preventDefault();
        setTasks((tasks) => tasks.filter(t => (t.id != id))) 
        router.delete(`/destroy/${id}`)
    }

    useEffect(()=> {
        setTasks(taches)
    },[taches])

    const HandleCheck = ( tache) => {
        // e.preventDefault();
        setTasks((task) => (tasks.map(t => t.id == tache.id ? {...t, statut: !t.statut} : t)))
        router.put(`/update/${tache.id}`, 
            { statut: tache.statut ? 0 : 1 }, 
            { preserveState: true }
        );
    };

    return (
        <>
            {tachesfiltrees.length == 0 ? (
                <div className={`flex  ${darkMode ? "bg-gray-700" : "bg-white" } rounded-lg shadow px-3 py-1 justify-between gap-2 items-center`}>
                    Aucune tâche pour le moment...
                </div>
            )
            :
            tachesfiltrees.map(tache => (
                <div key={tache?.id} className={`flex  ${darkMode ? tache.statut == true ? "bg-gray-800 border border-gray-600" : "bg-gray-700" : tache.statut == true ? "bg-gray-300 border border-gray-400" : "bg-white" } rounded-lg shadow px-3 py-1 justify-between gap-2 items-center`}>
                    <input onChange={() => HandleCheck(tache)} type="checkbox" name="statut" id={`tache_${tache.id}`} checked={tache.statut} />
                    <label htmlFor={`tache_${tache.id}`} className={`grow ${tache.statut ? "line-through" : ""} cursor-pointer`}>{tache.nom}</label>
                    <form action="" onSubmit={(e) => HandleDelete(e, tache.id)}>
                        <button className={`${darkMode ? "bg-red-700 hover:bg-red-900" : "bg-red-500 hover:bg-red-700"} lg:flex hidden  px-3 py-1 rounded-lg  text-white cursor-pointer`} type="submit">Delete</button>
                        <button className={`${darkMode ? "bg-red-700 hover:bg-red-900" : "bg-red-500 hover:bg-red-700"} lg:hidden px-3 py-1 rounded-lg  text-white cursor-pointer`} type="submit"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                          <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>
                        </button>
                    </form>
                </div>
            ))}
        </>
    )
}