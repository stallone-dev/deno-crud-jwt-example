// Create by Stallone L. de Souza (@stallone-dev) - 2024 - License: CC0 1.0 Universal

import type { JWTPayload } from "@jwt";
import { type IconfigTokenGenerator, makeTokenGenerator } from "./tools/generate.jwt.ts";
import { type IconfigTokenDecryptor, makeTokenDecryptor } from "./tools/verify.jwt.ts";

export { decryptToken, generateToken, verifyToken };

// Secrets to configure token generation and secret
const SECRET = String(Deno.env.get("JWT_TOKEN_SECRET") ?? "SECRET_TEST_STRING");
const EXPIRATION_IN_MINUTES = Number(Deno.env.get("JWT_TOKEN_DURATION_MINUTES") ?? 60);

// JWT vars, based on JOSE https://github.com/panva/jose
const jwt_secret = new TextEncoder().encode(SECRET);
const jwt_audience_urn = "urn:jwt:audience";
const jwt_issuer_urn = "urn:system:token-issuer";
const jwt_alg = "HS256";

// JWT configs to encrypt payload based on SignJWT class https://github.com/panva/jose/blob/v5.9.6/docs/jwt/sign/classes/SignJWT.md
const config_generator: IconfigTokenGenerator = {
        alg: jwt_alg,
        audience: jwt_audience_urn,
        issuer: jwt_issuer_urn,
        secret: jwt_secret,
        expiration: String(EXPIRATION_IN_MINUTES) + " min",
};

// JWT configs to decrypt token
const config_verify: IconfigTokenDecryptor = {
        secret: jwt_secret,
        audience: jwt_audience_urn,
        issuer: jwt_issuer_urn,
};

/**
 * Function for generating a JWT token for simplify signing
 * @param payload Object containing the data to be encrypted
 * @returns token JWT
 * @see {@link https://github.com/panva/jose/blob/main/docs/jwt/sign/classes/SignJWT.md|JWT Sign} para mais detalhes
 */
const generateToken = async (payload: JWTPayload) => await makeTokenGenerator(config_generator)(payload);

/**
 * Function to verify if token is valid
 * @param JWT Server-generated JWT token
 * @returns {Boolean} Boolean status
 * @see {@link https://github.com/panva/jose/blob/main/docs/jwt/verify/functions/jwtVerify.md|JWT Verify} para mais detalhes
 */
const verifyToken = async (token: string) => await makeTokenDecryptor(config_verify)(token);

/**
 * Function to decrypt token content
 * @param JWT Server-generated JWT token
 * @returns Token original content
 * @see {@link https://github.com/panva/jose/blob/main/docs/jwt/verify/functions/jwtVerify.md|JWT Verify}
 */
const decryptToken = async <T>(token: string) => {
        const take_payload = true;
        return await makeTokenDecryptor<T>(config_verify, take_payload)(token);
};
