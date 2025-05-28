import validations from "./validations";

describe("Signin Form Validation", () => {
  it("should require email and password", async () => {
    await expect(validations.validate({ email: "", password: "", passwordConfirm: "" })).rejects.toThrow();
  });

  it("should require valid email format", async () => {
    await expect(validations.validate({ email: "invalid", password: "12345", passwordConfirm: "12345" })).rejects.toThrow(/Email không hợp lệ/);
  });

  it("should require password at least 5 characters", async () => {
    await expect(validations.validate({ email: "test@mail.com", password: "123", passwordConfirm: "123" })).rejects.toThrow();
  });

  it("should require passwordConfirm to match password", async () => {
    await expect(validations.validate({ email: "test@mail.com", password: "12345", passwordConfirm: "54321" })).rejects.toThrow(/không khớp/);
  });

  it("should pass with valid data", async () => {
    await expect(validations.validate({ email: "test@mail.com", password: "12345", passwordConfirm: "12345" })).resolves.toBeTruthy();
  });
});
