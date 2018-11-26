export const requestDevice = async (serialNumber?: string): Promise<USBDevice | undefined> => {
    try {
        return await window.navigator.usb.requestDevice({
            filters: serialNumber
                ? [{ serialNumber }]
                : []
        })
    } catch (e) {
        if (e.message !== 'No device selected.') throw e;
    }
}


export const textToEscPos = (text: string, lines = 1) => {
    const charCodes = text.split('').map(char => char.charCodeAt(0));
    return [0x01B, 0x64, lines, ...charCodes];
}

const buffer = textToEscPos('Hello, Louise!')

export { };
