import editScheme from "./validations";

describe("Product Edit Form Validation", () => {
  it("should require all fields", async () => {
    await expect(editScheme.validate({ title: "", description: "", price: "", photos: [] })).rejects.toThrow();
  });

  it("should require title at least 3 characters", async () => {
    await expect(editScheme.validate({ title: "ab", description: "valid desc", price: 10, photos: ["http://img.com/1.jpg"] })).rejects.toThrow();
  });

  it("should require description at least 5 characters", async () => {
    await expect(editScheme.validate({ title: "Valid", description: "1234", price: 10, photos: ["http://img.com/1.jpg"] })).rejects.toThrow();
  });

  it("should require price to be a positive number", async () => {
    await expect(editScheme.validate({ title: "Valid", description: "Valid desc", price: -1, photos: ["http://img.com/1.jpg"] })).rejects.toThrow();
    await expect(editScheme.validate({ title: "Valid", description: "Valid desc", price: "abc", photos: ["http://img.com/1.jpg"] })).rejects.toThrow();
  });

  it("should require at least one valid photo url", async () => {
    await expect(editScheme.validate({ title: "Valid", description: "Valid desc", price: 10, photos: [] })).rejects.toThrow();
    await expect(editScheme.validate({ title: "Valid", description: "Valid desc", price: 10, photos: ["not-a-url"] })).rejects.toThrow();
  });

  it("should pass with valid data", async () => {
    await expect(editScheme.validate({ title: "Valid", description: "Valid desc", price: 10, photos: ["http://img.com/1.jpg"] })).resolves.toBeTruthy();
  });
});
