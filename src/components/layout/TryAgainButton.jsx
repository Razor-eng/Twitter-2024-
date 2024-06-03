import { useCallback } from "react";

const TryAgainButton = () => {
    const onClick = useCallback(() => {
        window.location.reload();
    }, []);

    return (
        <div onClick={onClick}>
            <div className="mt-2 py-2 rounded-full hover:bg-opacity-90 cursor-pointer transition">
                <p className="text-sm text-center font-semibold text-gray-500 dark:text-gray-300 transition hover:text-gray-800 dark:hover:text-gray-400">
                    Try Again
                </p>
            </div>
        </div>
    )
}

export default TryAgainButton