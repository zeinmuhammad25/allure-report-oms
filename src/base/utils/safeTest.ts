import {test as base} from "@playwright/test";

// safeTest FUNCTION sebagai pembungkus ketika satu test gagal mana test lain tetap lanjut (tidak stop)

export const safeTest = (
    title: string,
    optionsOrFn: any, // berupa object konfigurasi test atau langsung fungsi test
    maybeFn?: (args: any, testInfo?: any) => Promise<void> //Fungsi test utama (jika pakai options)
) => {
    const hasOptions = typeof optionsOrFn === "object" && typeof maybeFn === "function";
    const fn = hasOptions ? maybeFn : optionsOrFn;
    const options = hasOptions ? optionsOrFn : {};
    base(title, options, async (args, testInfo) => {
        try {
            await fn(args, testInfo);
        } catch (err) {
            console.error(`[${testInfo.title}] Failed to run and errors found:\n`, err);

            const stackLine = err?.stack?.split("\n").find((line: string) =>
                line.includes(process.cwd()) && line.match(/\.(spec|test)\.ts/)
            );

            console.error(`Name File : "${testInfo.file}"`);
            console.error(`Error Line: "${stackLine?.trim() ?? "Unknown Line"}"`);
            console.error(`Case Status:"${testInfo.status}"`);
        }
    });
};

// `safeTest` sebagai global function dan bisa di pake langsung di file spec

(globalThis as any).safeTest = safeTest;


//agat tidak error ketika function di pakai secara global
declare global {
    var safeTest: (
        title: string,
        optionsOrFn: any,
        maybeFn?: (args: any, testInfo?: any) => Promise<void>
    ) => void;
}

export {};