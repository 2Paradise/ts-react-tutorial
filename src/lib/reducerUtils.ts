export type AsyncState<T, E = any> = {
    loading: boolean;
    data: T | null;
    error: E | null;
}

export const asyncState = {
    initial: <T, E>(initialData?: T) : AsyncState<T, E> => ({
        loading: false,
        data: initialData || null,
        error: null
    }),
    load: <T, E>(data?: T | null): AsyncState<T, E> => ({
        loading: true,
        data: data || null,
        error: null
    }),
    success: <T, E>(data: T): AsyncState<T, E> => ({
        loading: false,
        data: data,
        error: null
    }),
    error: <T, E>(error: E): AsyncState<T, E> => ({
        error,
        loading: false,
        data: null
    })
}