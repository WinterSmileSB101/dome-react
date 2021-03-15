import JSEncrypt from 'jsencrypt';

// eslint-disable-next-line no-shadow
export enum RSASize {
    B512 = '512',
    B1024 = '1024',
    B2048 = '2048',
    B4096 = '4096',
}

export class RSAEncrypt {
    private encrypt: JSEncrypt;

    constructor(rsaSize?: RSASize) {
        this.encrypt = new JSEncrypt({ default_key_size: rsaSize ?? RSASize.B1024 });
    }

    public generateKey(): { privateKey: string; publicKey: string } {
        this.encrypt.getKey();

        return {
            privateKey: this.encrypt.getPrivateKey(),
            publicKey: this.encrypt.getPublicKey(),
        };
    }

    public encryptData(data: string): string | false {
        return this.encrypt.encrypt(data);
    }

    public decryptData(data: string): string | false {
        return this.encrypt.decrypt(data);
    }
}
