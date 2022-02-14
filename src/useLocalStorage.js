import { useCallback, useState } from "react";

/**
 * @template T
 * @param {string} key
 * @param {T|(() => T)} defaultValue
 * @returns {[T, (newValue: T|((oldState: T) => T)) => void]}
 */
export function useLocalStorage (key, defaultValue) {
    const [ savedState, setSavedState ] = useState(() => {
        const savedValue = localStorage.getItem(key);

        if (savedValue === null) {
            if (defaultValue instanceof Function) return defaultValue();
            return defaultValue;
        }

        try {
            return JSON.parse(savedValue);
        } catch (e) {
            if (defaultValue instanceof Function) return defaultValue();
            return defaultValue;
        }
    });

    const saveValue = useCallback(newValue => {
        setSavedState(oldState => {
            if (newValue instanceof Function) {
                newValue = newValue(oldState);
            }

            localStorage.setItem(key, JSON.stringify(newValue));

            return newValue;
        });
    }, [setSavedState, key]);

    return [ savedState, saveValue ];
}