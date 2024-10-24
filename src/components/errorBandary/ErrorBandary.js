import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

class ErrorBandary extends Component {

    state = {
        error: false
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo)
        this.setState({error: true})
    }

    // static getDerivedStateFromError(error) {
    //     return {error: true};
    // }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>;
        }

        return this.props.children;
    }
}

export default ErrorBandary;