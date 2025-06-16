'use client';

export default function CountryFlag({ code }: { code: string }) {
  function getFlagEmoji(code: string) {
    return code
      .toUpperCase()
      .replace(/./g, char =>
        String.fromCodePoint(127397 + char.charCodeAt(0))
      );
  }

  return (
    <span className="text-2xl" title={code}>
      {getFlagEmoji(code)}
    </span>
  );
}
