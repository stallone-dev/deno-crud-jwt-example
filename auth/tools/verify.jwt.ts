// Create by Stallone L. de Souza (@stallone-dev) - 2024 - License: CC0 1.0 Universal

import { jwtVerify } from "@jwt";

export { type IconfigTokenDecryptor, makeTokenDecryptor };

type DecriptResult<T> = T extends object ? { data: T } : boolean;

interface IconfigTokenDecryptor {
        secret: Uint8Array;
        issuer: string;
        audience: string;
}

/**
 * Closure for JWT Token Verifier Configuration
 * @returns Function
 */
function makeTokenDecryptor<T>(
        { secret, issuer, audience }: IconfigTokenDecryptor,
        takePayload = false,
): (JWT: string) => Promise<DecriptResult<T>> {
        /**
         * Function to verify if token is valid OR extract payload original data
         * @param JWT Server-generated JWT token
         * @returns Boolean status | JWTPayload
         */
        const verify = async (JWT: string): Promise<DecriptResult<T>> => {
                if (!JWT) throw new Error("Token not sended");
                try {
                        const { payload } = await jwtVerify<T>(JWT, secret, {
                                issuer: issuer,
                                audience: audience,
                        });

                        if (takePayload) return payload as DecriptResult<T>;
                        return true as DecriptResult<T>;
                } catch {
                        return false as DecriptResult<T>;
                }
        };

        return verify;
}
