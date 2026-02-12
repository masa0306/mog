import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MoG 海外PBLプログラム | 教員向けLP',
  description:
    '高校生の挑戦と成長を実現する海外PBLプログラムMoG。学校導入・選択導入・任意参加に対応し、安心の運営体制で探究学習を支援します。',
  openGraph: {
    title: 'MoG 海外PBLプログラム | 教員向けLP',
    description:
      '起業家×高校生×大学生メンターの三者モデルで、実社会課題に挑む海外PBLプログラム。',
    type: 'website'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
