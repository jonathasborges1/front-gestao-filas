import {
  isOldPlate,
  isMercosulPlate,
  detectPlateKind,
  formatPlate,
} from "./plate";

describe("plate utils (sem conversão)", () => {
  it("valida BR antigo", () => {
    expect(isOldPlate("ABC-1234")).toBe(true);
    expect(isOldPlate("ABC1234")).toBe(true);
    expect(detectPlateKind("ABC-1234")).toBe("old");
    expect(formatPlate("abc1234")).toBe("ABC-1234");
  });

  it("valida Mercosul", () => {
    expect(isMercosulPlate("ABC1C34")).toBe(true);
    expect(isMercosulPlate(" abc1c34 ")).toBe(true);
    expect(detectPlateKind("ABC1C34")).toBe("mercosul");
    expect(formatPlate("abc1c34")).toBe("ABC 1C34");
  });

  it("inválidas", () => {
    expect(detectPlateKind("AB-123")).toBe("invalid");
    expect(formatPlate("1234ABC")).toBe("— — — —");
  });
});
