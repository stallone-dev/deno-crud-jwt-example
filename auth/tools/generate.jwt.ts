// Create by Stallone L. de Souza (@stallone-dev) - 2024 - License: CC0 1.0 Universal

import { type JWTPayload, SignJWT } from "@jwt";

export { type IconfigTokenGenerator, makeTokenGenerator };

interface IconfigTokenGenerator {
        alg: string;
        expiration: string;
        secret: Uint8Array;
        issuer: string;
        audience: string;
}

/**
 * Closure for JWT token generator configuration
 * @returns Token generator function configured
 */
function makeTokenGenerator(
        { alg, expiration, secret, issuer, audience }: IconfigTokenGenerator,
): (payload: JWTPayload) => Promise<string> {
        /**
         * Function for generating a JWT token for simplify signing
         * @param payload Object containing the data to be encrypted
         * @returns token JWT
         */
        const generator = async (payload: JWTPayload): Promise<string> => {
                if (!payload) return "Payload not sended";
                if (Object.keys(payload).length === 0) return "Payload empty";
                return await new SignJWT({ data: payload })
                        .setProtectedHeader({ alg })
                        .setIssuedAt()
                        .setIssuer(issuer)
                        .setAudience(audience)
                        .setExpirationTime(expiration)
                        .sign(secret);
        };

        return generator;
}
