import React, { useState } from 'react';
import { UserCredentials } from '../../models/user';
import Institution from '../../models/institution';

interface Props {
    index: number;
    userCredentials: UserCredentials;
    instutionId: string;
    view: boolean;
    handleUpdateInstution: (select: number | undefined) => void;
}

function UpdateInstitutionComponent(props: Props) {

    const submitHandler = () => alert('Form is develop')

    const inputHandler = () => {}

    return null;
}

export default UpdateInstitutionComponent;