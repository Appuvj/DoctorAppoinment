import React from 'react';
import { Navigate } from 'react-router-dom';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render shows the fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Log the error or report it to an error logging service
        console.error("Error occurred:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Redirect to an error page or any other fallback action
            return <Navigate to="/error-page" />;
        }

        return this.props.children; 
    }
}

export default ErrorBoundary;
