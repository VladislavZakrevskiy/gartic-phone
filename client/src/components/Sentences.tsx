import React, { useEffect, useState } from 'react'
import { useGetSentencesQuery } from '../store/API/getAPI'
import { useAppSelector } from '../store/hooks'
import { FormText, Spinner } from 'react-bootstrap'

interface ISentencesProps {
    round: number
    usernames: string[]
    id: string
}

const Sentences = ({round, usernames, id}:ISentencesProps) => {
    const {data, isError, isLoading, isSuccess} = useGetSentencesQuery({id, round})
    const [texts, setTexts] = useState<string[]>([])

    useEffect(() => {
        if(isSuccess) {
            let array: string[] = []
            console.log(data)
            for (let i = 0; i < usernames.length; i++) {
                for (let j = 0; j < data.length; j++) {
                    if(data[j].username === usernames[i]) {
                        array.push(data[j].sentence)
                    }
                }
            }
            setTexts(array)
        }
    }, [isSuccess])



    if(isLoading) {
        return <Spinner animation="border"/>
    }

    if(isError) {
        return <FormText>{`Sorry, error. Our fail:(`}</FormText>
    }

    return (
        <div>
            {
                texts.map(text => <FormText>{text} {'\n'}</FormText>)
            }
        </div>
    )
}

export default Sentences