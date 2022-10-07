export function isNotNullOrUndefinedUtil<T>(element: T): element is NonNullable<T> {
    return element !== null && element !== undefined;
}
