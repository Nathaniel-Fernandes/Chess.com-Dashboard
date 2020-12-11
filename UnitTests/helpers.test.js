const { CreateURL } = require('../src/BusinessLogic/helpers')

// CreateURL Tests
test("Replaces {} with replacement", () => {
    expect(CreateURL("https://www.chessintellect.com/cprox/?chesscom={}","https://chess.com/123")
        .toBe("https://www.chessintellect.com/cprox/?chesscom=https://chess.com/123"))
})
