// This file is used to set up Jest
import "@testing-library/jest-dom";

// Mock global objects needed for Next.js APIs
global.Request = class {} as any;

// Add a dummy test to avoid "Your test suite must contain at least one test"
describe("Jest setup", () => {
  it("has setup testing environment", () => {
    expect(true).toBe(true);
  });
});
