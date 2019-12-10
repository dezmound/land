declare module 'ejs' {
    export function __express(path: string, options: object, callback: (e: any, rendered: string) => void): void
}
