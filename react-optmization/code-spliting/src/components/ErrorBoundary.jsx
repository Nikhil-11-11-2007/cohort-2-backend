import React, { Component } from "react";
import FallbackUi from "./FallbackUi";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
            error: null,
        };
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error,
        };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error:", error);
        console.error("Error Info:", errorInfo);
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <FallbackUi handleReload={this.handleReload} state={this.state} error={this.error} />
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;