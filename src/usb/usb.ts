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

// Device specific configuration
const CONFIGURATION = 1;
const INTERFACE = 0;
const ENDPOINT = 2;

export const connectToDevice = async (device: USBDevice) => {
    await device.open();
    await device.selectConfiguration(CONFIGURATION);
    await device.claimInterface(INTERFACE);
}

export const sendText = async (device: USBDevice, text: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text + '\n\n\n\n\n');
    const result = await device.transferOut(ENDPOINT, data);
}

export const textToEscPos = (text: string, lines = 1) => {
    const charCodes = text.split('').map(char => char.charCodeAt(0));
    return [0x01B, 0x64, lines, ...charCodes];
}
