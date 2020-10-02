const word = Deno.args[0]
console.log(word)

setTimeout(() => {
    console.table(Deno.metrics())
}, 1000);