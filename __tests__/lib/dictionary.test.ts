import { dictionary } from "@/lib/dictionary";
import { useTranslations } from "@/hooks/useTranslations";

describe("Dictionary", () => {
  it("should have lotes section", () => {
    expect(dictionary.lotes).toBeDefined();
  });

  it("should include all required lotes translations", () => {
    const lotes = dictionary.lotes;
    expect(lotes.title).toBeDefined();
    expect(lotes.add).toBeDefined();
    expect(lotes.addDesc).toBeDefined();
    expect(lotes.edit).toBeDefined();
    expect(lotes.name).toBeDefined();
    expect(lotes.purpose).toBeDefined();
    expect(lotes.cria).toBeDefined();
    expect(lotes.recria).toBeDefined();
    expect(lotes.engorda).toBeDefined();
    expect(lotes.leite).toBeDefined();
  });
});

describe("useTranslations hook", () => {
  it("should return the dictionary", () => {
    const translations = useTranslations();
    expect(translations).toEqual(dictionary);
  });

  it("should provide lotes section", () => {
    const { lotes } = useTranslations();
    expect(lotes).toBeDefined();
    expect(lotes).toEqual(dictionary.lotes);
  });
});
