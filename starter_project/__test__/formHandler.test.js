/**
 * @jest-environment jsdom
 */

const { handleSubmit } = require("../src/client/js/formHandler");
const { validateUrl } = require("../src/client/js/urlValidator");
const fetch = require("node-fetch");

jest.mock("../src/client/js/urlValidator");

global.fetch = fetch; // Mock fetch globally

describe("Testing the handleSubmit functionality", () => {
    beforeEach(() => {
        document.body.innerHTML = '<input id="urlInput" value="http://example.com"/><div id="results"></div>';
        window.alert = jest.fn(); // Mock alert method
    });

    test("Testing the handleSubmit() function is defined", () => {
        expect(handleSubmit).toBeDefined();
    });

    test("handleSubmit prevents default event behavior", () => {
        const mockEvent = { preventDefault: jest.fn() };
        handleSubmit(mockEvent);
        expect(mockEvent.preventDefault).toHaveBeenCalled();
    });

    test("handleSubmit calls validateUrl with the correct input", () => {
        validateUrl.mockReturnValue(true);
        const mockEvent = { preventDefault: jest.fn() };
        handleSubmit(mockEvent);
        expect(validateUrl).toHaveBeenCalledWith("http://example.com");
    });

    // Additional tests for further logic...
});
