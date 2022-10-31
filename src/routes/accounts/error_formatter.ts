export function format_error(error: object): string {
    let result = '';
    for (const key of Object.keys(error)) {
        if (key in ['username', 'email']) {
            // @ts-ignore
            result += `${key}: ${error[key]}`;
        } else {
            // @ts-ignore
            result += error[key];
        }
        result += '<br>';
    }
    return result;
}