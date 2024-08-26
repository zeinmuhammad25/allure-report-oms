export default class Promises {
    public static empty = () => new Promise<void>(resolve => resolve());

    public static just<T>(obj: T): Promise<T> {
        return new Promise<T>(resolve => resolve(obj));
    }
}