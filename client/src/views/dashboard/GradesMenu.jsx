function GradesMenu({ loggedUser }) {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center ">
            <div className="w-2/3 h-3/5 bg-slate-50 p-6 rounded-md">
                <div>
                    <h1><span className=" border-b text-4xl font-semibold"><span className=" text-violet-500"> {loggedUser.name} {loggedUser.surname}</span>'s grades:</span></h1>
                </div>
                <div className="flex flex-col justify-center items-center w-full h-full">
                    To be fetched...
                </div>
            </div>
        </div>
    );
}

export default GradesMenu;