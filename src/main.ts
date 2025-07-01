  test("should return URL with contextId", () => {
    const config = structuredClone(configDefault);
    const result = getEsignUrl([], { contextId: "1234" }, config as IConfiguration);
    expect(result).toBe("https://example.com/?contexteId=1234");
  });

