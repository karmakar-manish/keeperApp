function InputBox(props){
    return <div>
        <div className="text-left text-sm font-medium py-2">{props.label}</div>
        <div>
            <input placeholder={props.placeholder} onChange={props.onChange}
             className="w-full px-2 py-1 border border-gray-300 rounded-sm"/>
        </div>
    </div>
}

export default InputBox