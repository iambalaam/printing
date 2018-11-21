export const requestDevice = async (serialNumber?: string) => {
    return await (window.navigator as any).usb.requestDevice({
        filters: serialNumber
            ? [{ serialNumber }]
            : []
    })
}


export const textToEscPos = (text: string, lines = 1) => {
    const charCodes = text.split('').map(char => char.charCodeAt(0));
    return [0x01B, 0x64, lines, ...charCodes];
}

const buffer = textToEscPos('Hello, Louise!')

export { };
