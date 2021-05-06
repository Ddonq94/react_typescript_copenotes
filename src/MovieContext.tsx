import React, {useState, createContext} from 'react'


interface Props{

}


export const MovieContext = createContext({})


export const MovieProvider: React.FC<Props> = (props) => {

    const [movies, setMovies] = useState([
        {
            name:"mov1",
            price:10,
            id:1
        }
    ])
    return (
        <MovieContext.Provider value={[movies,setMovies]}>
            {props.children}
        </MovieContext.Provider>
    )


}

