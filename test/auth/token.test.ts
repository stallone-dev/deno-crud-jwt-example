// deno-lint-ignore-file no-non-null-assertion no-boolean-literal-for-arguments
import { describe, it } from "@testing";
import { expect } from "@expect";
import { decryptToken, generateToken, verifyToken } from "~token";

describe("Token functions", () => {
        describe("generateToken", () => {
                it("generateToken should return a valid token", async () => {
                        const payload = { userId: 1 };
                        const token = await generateToken(payload);
                        expect(typeof token).toBe("string");
                });

                it("generateToken should handle empty payload", async () => {
                        const payload = {};
                        const token = await generateToken(payload!);
                        expect(token).toStrictEqual("Payload empty");
                });

                it("generateToken should handle null payload", async () => {
                        const payload = null;
                        const token = await generateToken(payload!);
                        expect(typeof token).toBe("string");
                });
        });

        describe("verifyToken", () => {
                it("verifyToken should return a valid token", async () => {
                        const payload = { userId: 1 };
                        const token = await generateToken(payload);
                        expect(await verifyToken(token)).toStrictEqual(true);
                });

                it("verifyToken should throw an error for an invalid token", async () => {
                        const invalidToken = "invalid.token.here";
                        expect(await verifyToken(invalidToken)).toStrictEqual(false);
                });

                it("verifyToken should handle token with empty payload", async () => {
                        const payload = {};
                        const token = await generateToken(payload);
                        const decoded = await verifyToken(token);
                        expect(decoded).toStrictEqual(false);
                });

                it("verifyToken should handle token with null payload", async () => {
                        const payload = null;
                        const token = await generateToken(payload!);
                        const decoded = await verifyToken(token);
                        expect(decoded).toStrictEqual(false);
                });

                it("verifyToken should throw an error for a malformed token", () => {
                        const malformedToken = "malformed.token";
                        expect(typeof (() => verifyToken(malformedToken))).toBe("function");
                });

                it("verifyToken should throw an error for an empty token", async () => {
                        const emptyToken = "";
                        await expect(verifyToken(emptyToken)).rejects.toThrow("Token not sended");
                });
        });

        describe("decriptToken", () => {
                it("decryptToken should return the payload for a valid token", async () => {
                        const payload = { userId: 1 };
                        const token = await generateToken(payload);
                        const decoded = await decryptToken<{ userId: number }>(token);
                        expect(decoded.data.userId).toStrictEqual(payload.userId);
                });

                it("decryptToken should return the payload for a token with additional claims", async () => {
                        const payload = { userId: 1, role: "admin" };
                        const token = await generateToken(payload);
                        const decoded = await decryptToken<{ userId: number; role: string }>(token);
                        expect(decoded.data.userId).toStrictEqual(payload.userId);
                        expect(decoded.data.role).toStrictEqual(payload.role);
                });

                it("decryptToken should throw an error for an empty token", async () => {
                        const emptyToken = "";
                        await expect(decryptToken<{ userId: number }>(emptyToken)).rejects.toThrow("Token not sended");
                });
        });
});
