// src/Favicon.jsx  
import React, { useEffect } from 'react';  

const Favicon = ({ href }) => {  
    useEffect(() => {  
        const link = document.createElement('link');  
        link.rel = 'icon';  
        link.type = 'image/png';  
        link.href = '../assets/favicon.ico';  

        document.head.appendChild(link);  

        // Cleanup function to remove the link if necessary  
        return () => {  
            document.head.removeChild(link);  
        };  
    }, [href]);  

    return null; // This component doesn't render anything  
};  

export default Favicon;