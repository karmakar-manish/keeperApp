function NavButton(props){
    return <div className="flex flex-col justify-center m-2">
        <button className="text-white text-md cursor-pointer font-medium  bg-gray-800 hover:bg-gray-900  gap-2 w-fit h-9 rounded-md p-2" onClick={props.onClick}>
            <div className="flex justify-center flex-col">{props.label}</div>
        </button>
    </div>
}

export default NavButton