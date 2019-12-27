export function replace(text: string, lowercase: boolean = false): string {
    let result: string = text.replace(/ /g, "-");

    if (lowercase) {
        result = result.toLowerCase();
    }
    return result
}

export function stripHtml(text: string): string {
    return text.replace(/<[^>]*>?/gm, '');
}

export function slugify(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    let from = [
        'а', 'б', 'в', 'г', 'д', 'е', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф',
        'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ь', 'ю', 'я'];
    let to = [
        'a', 'b', 'v', 'g', 'd', 'e', 'zh', 'z', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'f',
        'h', 'c', 'ch', 'sh', 'sht', 'y', '', 'iu', 'ia'];
    for (let key in from) {
        str = str.replace(new RegExp(from[key], 'g'), to[key])
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return str;
}
