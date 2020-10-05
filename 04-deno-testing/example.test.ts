import { assertEquals, assertNotEquals } from 'https://deno.land/std/testing/asserts.ts';

Deno.test('short example', () => {
    assertEquals('deno', 'deno')
    assertNotEquals({
        runtime: 'deno'
    }, {
        runtime: 'node'
    })
})

Deno.test({
    name: "long example",
    ignore: Deno.build.os === 'windows',
    fn(): void {
        assertEquals('node', 'node')
    },
});

Deno.test({
    name: "ops leak",
    sanitizeOps: false,
    fn(): void {
        setTimeout(() => console.log, 1000);
    },
});

Deno.test({
    name: "resource leak",
    sanitizeResources: false,
    async fn(): Promise<void> {
        await Deno.open('./03-deno-modules/example-export.ts')
    },
});