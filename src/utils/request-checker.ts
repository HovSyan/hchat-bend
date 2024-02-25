export class RequestChecker {
    isObject(x: any): x is object {
        return !!x && typeof x === 'object';
    }

    hasNumberProperty(x: object, prop: string) {
        return prop in x && !Number.isNaN(+x[prop as keyof typeof x])
    }
}