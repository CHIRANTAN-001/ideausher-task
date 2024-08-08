import { useEffect, useState } from "react"

const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, useDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            useDebouncedValue(value)
        }, delay)

        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])
    
    return debouncedValue
}

export default useDebounce;