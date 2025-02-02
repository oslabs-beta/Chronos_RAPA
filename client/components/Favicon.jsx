import favicon from "../assets/favicon.ico";
import React, { useEffect } from 'react';  

const Favicon = ({ href }) => {  
    useEffect(() => {  
        const link = document.createElement('link');  
        link.rel = 'icon';  
        link.type = 'image/x-icon';  
        link.href = favicon;  

        document.head.appendChild(link);  

        // Cleanup function to remove the link if necessary  
        return () => {  
            document.head.removeChild(link);  
        };  
    }, [href]);  

    return null; // This component doesn't render anything  
};  

export default Favicon;