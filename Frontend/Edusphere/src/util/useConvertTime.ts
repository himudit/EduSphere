const useConvertTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = (seconds % 60).toFixed(2); // Keeping decimal precision

    return `${hours}h ${minutes}m ${secs}s`;
};

export default useConvertTime;
