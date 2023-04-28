//@ts-nocheck
import React from 'react'
import { IUploadProps } from '../models/queryInterfaces'
import { useUploadQuery } from '../store/API/getAPI'
import { FormText, Image, Spinner } from 'react-bootstrap'

const Photo = ({id, round, username, className}: IUploadProps) => {
    const {data, isLoading, isError} = useUploadQuery({id, round, username})

    if(isLoading) {
        return <Spinner animation="border"/>
    }

    if(isError) {
        return <FormText>{`Sorry, error. Our fail:(`}</FormText>
    }

    return (
        <Image src={data} rounded className={className}/>
    )
}

export default Photo