import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const RouteGard = ({ children }) => {
    const [show, setShow] = useState(false);

    if (show) {
        return children
    } else {
        return <Navigate to={`/home`} />
    }
}

export default RouteGard;
