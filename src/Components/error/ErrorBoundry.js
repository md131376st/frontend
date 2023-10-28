import ErrorPage from "./ErrorPage";
import { ErrorBoundary } from "react-error-boundary";

export default function ReactErrorBoundary(props) {
    return (
        <ErrorBoundary
            FallbackComponent={ErrorPage}
            onError={(error, errorInfo) => {
                // log the error
                console.log("Error caught!");
                console.error(error);
                console.error(errorInfo);

                // record the error in an APM tool...
            }}
        >
            {props.children}
        </ErrorBoundary>
    );
}