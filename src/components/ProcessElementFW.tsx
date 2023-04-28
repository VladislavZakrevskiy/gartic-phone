//@ts-nocheck
import React from 'react'
import { IElement } from '../modes/Mode'
import Photo from './Photo'
import Sentences from './Sentences'

interface Props {element: IElement}

const ProcessElementFW = ({element}: Props) => {
  if(element) {
    return (
      <>
      {
          element?.element === 'Photo' ?
          <Photo id={element.id} round={element.round} username={element.username}/> :
          <Sentences id={element!.id} round={element!.round} usernames={[element!.username]}/> 
      }
      </>
    )
  }
  return null
}

export default ProcessElementFW