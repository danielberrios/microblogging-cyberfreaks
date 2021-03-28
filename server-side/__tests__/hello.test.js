function hello(world) {
    return (world)
}

test('hello function should return Hello World', () => {
    expect(hello("Hello World")).toBe("Hello World")
})

test('hello function should not return Hello World', () => {
    expect(hello("Bye World")).not.toBe("Hello World")
})