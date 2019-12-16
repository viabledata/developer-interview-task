import SecureLS from 'secure-ls';

const secureLocalStorage = new SecureLS(
    {
        encodingType: 'aes',
        encryptionSecret: process.env.WWW_STORAGE_KEY,
        isCompression: true,
    },
);

export const clearAllExceptShift = () => {
    const allKeys = secureLocalStorage.getAllKeys();
    const filtered = _.filter(allKeys, (key) => key !== 'shift');
    filtered.forEach(key => {
        secureLocalStorage.remove(key);
    });
};

export default secureLocalStorage;
