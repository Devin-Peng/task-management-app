'use client';

import { Provider } from "@/components/ui/provider";
import { useState, useEffect } from 'react';

// Hydration fails on first render
// See: https://stackoverflow.com/questions/79116172/hydration-failed-problem-with-nextjs-v15-and-chakraui-when-using-components
const ChakraProvider = ({ children }: { children: React.ReactNode }) => {
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true)
    }, [])

    if (!hydrated) {
        return null
    } 

    return <Provider enableSystem={false}>{children}</Provider>;
}

export default ChakraProvider;
