import hmacSHA256 from 'crypto-js/hmac-sha256';

export function getSignature(data, secret) {
    return hmacSHA256(data, secret);
}
