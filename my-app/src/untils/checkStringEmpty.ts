export const checkStringEmpty = (input: string) => {
    const inputParser = JSON.stringify(input);
    const result = inputParser.replace(/\s+/g, "");

    return result
}