import {TestInfo} from "@playwright/test";

// safeTest FUNCTION sebagai pembungkus ketika satu test gagal mana test lain tetap lanjut (tidak stop)
export async function safeTest(
    fn: (args: Record<string, any>, testInfo?: TestInfo) => Promise<void>,
    args: Record<string, any>,
    testInfo?: TestInfo
) {
    try {
        await fn(args, testInfo);
    } catch (err: any) {
        console.error(`[${testInfo?.title}] Failed:\n`, err);
        const stackLine = err?.stack?.split("\n").find((line: string) =>
            line.includes(process.cwd()) && line.match(/\.(spec|test)\.ts/)
        );
        console.error(`File      : "${testInfo?.file}"`);
        console.error(`Error Line: "${stackLine?.trim() ?? "Unknown Line"}"`);
        console.error(`Status    : "${testInfo?.status}"`);
    }
}

export {};