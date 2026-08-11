import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "세일즈콜 코칭 대시보드",
  description: "SCORE-7 프레임워크 · 일 단위 강점/약점 추이",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
