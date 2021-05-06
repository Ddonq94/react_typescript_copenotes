
interface Props {
    text: number,
    name: string,
    boo: boolean,
    stu?: Sub
    fn?: ()=> string
}

interface Sub{
    sname: string,
    maidenName: string
}

const Textfield: React.FC<Props> = (props) =>{
//React.FC is just a type that comes with react, typescript requires typing and React.FC meand functional component type
    return (
        <div>
            {props.name}
        </div>
    )
}

export default Textfield