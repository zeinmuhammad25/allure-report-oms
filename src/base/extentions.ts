export {};

// Declare the Extension Method
function capitalize(this: string): string {
    return this.split("")
        .map((char) => char.toUpperCase())
        .join("");
}

// Declare the Extension
declare global {
    interface String {
        capitalize(): string;
    }
}

// Implement the Extension
String.prototype.capitalize = capitalize;