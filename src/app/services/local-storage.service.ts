export class LocalStorageService {

    static save(key: string, obj: any) {
        window.localStorage.setItem(key, JSON.stringify(obj));
    }

    static get(key: string): any {
        return JSON.parse(window.localStorage.getItem(key));
    }

    static remove(key :string){
        window.localStorage.removeItem(key);
    }
}