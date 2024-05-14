export default function Error ({title, msg}){
    console.log(msg)
    return(<div className="error">
        <h2>{title}</h2>
        <p>{msg.message}</p>
    </div>)
}