import React, { useState, ChangeEvent, useCallback, useEffect } from 'react';
import Index from "../present_component/Index";


//redux
import { useDispatch, useSelector } from 'react-redux';
import { registerSignUp, collectionRead } from "../../../modules/register";

import swal from 'sweetalert';

export default function Poll({ modeColor }: any) {


    return (
        <Index modeColor={modeColor} />
    )
}