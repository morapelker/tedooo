export function alterObject(obj, key, value) {
    const newObj = Object.assign({}, obj);
    newObj[key] = value;
    return newObj;
}

export function alterArray(arr, key, value) {
    const o = arr;
    o[key] = value;
    return o;
}

export function cloneObjectOrUndefined(obj) {
    if (obj)
        return Object.assign({}, obj);
    return undefined;
}

export function cloneArrayOrUndefined(arr) {
    if (arr)
        return Object.assign([], arr);
    return undefined;
}

export function deepCloneObject(obj) {
    if (!obj)
        return undefined;
    return JSON.parse(JSON.stringify(obj));
}

export const capitalize = text => {
    if (!text)
        return undefined;
    const c = text.split(' ');
    let s = '';
    c.forEach(d => s += cap(d) + ' ');
    return s.trim();
};

const cap = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
};

export function loadImage(url) {
    const r = (img, resolve) => () => {
        img.removeEventListener('load', r);
        img.removeEventListener('error', r);
        resolve()
    };

    return new Promise((resolve, reject) => {
        const img = new Image();
        img.addEventListener('load', r(img, resolve));
        img.addEventListener('error', r(img, reject));
        img.src = url;
    });
}