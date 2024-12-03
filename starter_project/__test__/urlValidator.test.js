import { validateUrl } from '../src/client/js/urlValidator';

describe('Testing the validateUrl functionality', () => {
    test('validateUrl correctly identifies invalid URLs', () => {
        const invalidUrls = [
            'plainaddress',
            'http://',
            'www.example',
            'https//:example.com',
            'ftp://example.com', // FTP, non-HTTP
            'http://example.com with space', // spaces in URL
            'https://example..com' // double dots
        ];
        invalidUrls.forEach(url => {
            expect(validateUrl(url)).toBe(false);
        });
    });
});
