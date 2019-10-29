import localStore from './cookies';
import { Base64 } from 'js-base64';
import { LocalStorekey } from './localStoreKeyConfig.js';

export function GetCookies() {
    try {
        let str = localStore.get(LocalStorekey);
        return str?Base64.decode(str):null;
    } catch (e) {
        console.log(e)
        return null;
    }

}

export function SetCookies(token) {
    try {
        return localStore.set(LocalStorekey, Base64.encode(token))
    } catch (e) {
        console.log(e)
        return null;
    }
}

export function DelCookies() {
    return localStore.remove(LocalStorekey)
}


