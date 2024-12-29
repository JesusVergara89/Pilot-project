import { Timestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'

const CreatePreInform = () => {
    const [cleanForm, setCleanForm] = useState(false)
    const [progress, setProgress] = useState(0);
    const [formData, setFormData] = useState({
        comments: '',
        createdAt: Timestamp.now().toDate(),
        data_loader: '',
        description: '',
        element_name: '',
        image: '',
        location: '',
    });

    useEffect(() => {
        console.log('form cleaned')
    }, [cleanForm])

    
  return (
    <div>CreatePreInform</div>
  )
}

export default CreatePreInform