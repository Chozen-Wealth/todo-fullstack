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
            <div className="absolute top-5 right-5">
                <button onClick={()=> setDarkMode(!darkMode)} className={`${darkMode ? "bg-gray-700 text-white hover:bg-gray-600": "bg-white hover:bg-gray-100"} cursor-pointer shadow rounded-lg px-3 py-1`}>{darkMode ? "LightMode" : "DarkMode"}</button>
            </div>
            <div className={`${darkMode ? "bg-gray-700 text-white": "bg-white"} p-5 flex flex-col items-cente lg:w-1/2 w-11/12 rounded-lg shadow-md`}>
                <h1 className="text-center text-2xl font-bold">Taches</h1>
                <div className="flex justify-between items-center">
                    <div className="gap-2 py-3 justify-center lg:flex hidden">
                        <button className={`px-3 py-1 ${darkMode ? "bg-gray-800 hover:bg-gray-900" : "bg-gray-300 hover:bg-gray-400"}  rounded-lg  cursor-pointer`} onClick={()=> setFilter("all")}>Tous</button>
                        <button className={`px-3 py-1 ${darkMode ? "bg-gray-800 hover:bg-gray-900" : "bg-gray-300 hover:bg-gray-400"}  rounded-lg  cursor-pointer`} onClick={()=> setFilter("done")}>Terminés</button>
                        <button className={`px-3 py-1 ${darkMode ? "bg-gray-800 hover:bg-gray-900" : "bg-gray-300 hover:bg-gray-400"}  rounded-lg  cursor-pointer`} onClick={()=> setFilter("undone")}>Non terminés</button>
                    </div>
                    <div className="flex gap-2 py-3 justify-center lg:hidden">
                        <button className={`px-3 py-1 ${darkMode ? "bg-gray-800 hover:bg-gray-900" : "bg-gray-300 hover:bg-gray-400"}  rounded-lg  cursor-pointer`} onClick={()=> setFilter("all")}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fillRule="evenodd" d="M3 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 5.25Zm0 4.5A.75.75 0 0 1 3.75 9h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
</svg>
</button>
                        <button className={`px-3 py-1 ${darkMode ? "bg-gray-800 hover:bg-gray-900" : "bg-gray-300 hover:bg-gray-400"}  rounded-lg  cursor-pointer`} onClick={()=> setFilter("done")}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
</svg>
</button>
                        <button className={`px-3 py-1 ${darkMode ? "bg-gray-800 hover:bg-gray-900" : "bg-gray-300 hover:bg-gray-400"}  rounded-lg  cursor-pointer`} onClick={()=> setFilter("undone")}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
</svg>
</button>
                    </div>
                    <div>
                        <button onClick={(e) => HandleDeleteAll(e)} className={`px-3 py-1 ${darkMode ? "bg-red-700 hover:bg-red-900" : "hover:bg-red-700 bg-red-500 text-white"} flex gap-1 lg:hidden rounded-lg  cursor-pointer`}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <button onClick={(e) => HandleDeleteAll(e)} className={`px-3 py-1 ${darkMode ? "bg-red-700 hover:bg-red-900" : "hover:bg-red-700 bg-red-500 text-white"} lg:block hidden rounded-lg  cursor-pointer`}>Supprimer toutes les taches terminés</button>
                    </div>
                </div>
                <div className={` ${darkMode ? "bg-gray-800":"bg-gray-200"} max-h-60 min-h-60 overflow-auto p-2 flex flex-col gap-2 rounded-lg`}>
                    { tachesfiltrees.map(tache => (
                        <div key={tache.id} className={`flex  ${darkMode ? tache.statut == true ? "bg-gray-800 border border-gray-600" : "bg-gray-700" : tache.statut == true ? "bg-gray-300 border border-gray-400" : "bg-white" } rounded-lg shadow px-3 py-1 justify-between gap-2 items-center`}>
                            <input onChange={(e) => HandleCheck(e, tache)} type="checkbox" name="statut" id={`tache_${tache.id}`} checked={tache.statut} />
                            <label for={`tache_${tache.id}`} className={`grow ${tache.statut ? "line-through" : ""} cursor-pointer`}>{tache.nom}</label>
                            <form action="" onSubmit={(e) => HandleDelete(e, tache.id)}>
                                <button className={`${darkMode ? "bg-red-700 hover:bg-red-900" : "bg-red-500 hover:bg-red-700"} lg:flex hidden  px-3 py-1 rounded-lg  text-white cursor-pointer`} type="submit">Delete</button>
                                <button className={`${darkMode ? "bg-red-700 hover:bg-red-900" : "bg-red-500 hover:bg-red-700"} lg:hidden px-3 py-1 rounded-lg  text-white cursor-pointer`} type="submit"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
</svg>
</button>
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