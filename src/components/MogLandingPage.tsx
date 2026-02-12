'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import heroImage from '@/src/images/hero.svg';
import modelEntrepreneur from '@/src/images/model-entrepreneur.svg';
import modelStudent from '@/src/images/model-student.svg';
import modelMentor from '@/src/images/model-mentor.svg';
import missionIndonesia from '@/src/images/mission-indonesia.svg';
import missionVietnam from '@/src/images/mission-vietnam.svg';
import missionIndia from '@/src/images/mission-india.svg';
import evidenceBg from '@/src/images/evidence-bg.svg';
import mogLogo from '@/src/logo/mog-logo.svg';
import very50Logo from '@/src/logo/very50-logo.svg';

const fadeIn = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
};

const onboardingPatterns = [
  { id: 'all', label: '学年全体', desc: '修学旅行や学年行事として全員導入。探究を学校文化として定着。' },
  { id: 'course', label: 'コース利用', desc: '探究コース・選択授業として導入。難度の高いPBLを中核に配置。' },
  { id: 'optional', label: '任意研修', desc: '公募型で意欲ある生徒が参加。進路実現に直結する越境体験を実装。' }
] as const;

const missionData = [
  {
    country: 'インドネシア',
    flag: '🇮🇩',
    entrepreneur: '海洋プラスチック再資源化スタートアップ',
    mission: '漁村の回収導線を再設計し、3ヶ月で回収率20%向上の施策を提案。',
    image: missionIndonesia
  },
  {
    country: 'ベトナム',
    flag: '🇻🇳',
    entrepreneur: 'ローカルカカオの高付加価値化企業',
    mission: '訪日観光客向けの新商品検証を実施し、販売導線の仮説検証を回す。',
    image: missionVietnam
  },
  {
    country: 'インド',
    flag: '🇮🇳',
    entrepreneur: '女性就労支援を行う縫製ソーシャルビジネス',
    mission: '現場ヒアリングをもとに、採用広報プロトタイプを1週間で立案。',
    image: missionIndia
  }
];

const voices = {
  student: '「将来は海外で働くなんて現実味がなかった。でも現地起業家との対話で、進路が“自分ごと”になった。」',
  teacher: '「安全管理と学習成果の両立が明確。探究の評価観点まで一気通貫で設計できる点が大きいです。」',
  parent: '「帰国後の発表を見て、子どもの視座が一段上がったと実感。学校としての説明責任も十分でした。」'
} as const;

const faqs = [
  {
    q: '英語力が高くない生徒でも参加できますか？',
    a: 'はい。大学生メンターが伴走し、現地での対話準備・振り返りを丁寧に支援する設計です。'
  },
  {
    q: '学校としての安全管理体制はどうなっていますか？',
    a: '危機管理フロー、現地提携先の事前審査、引率者向けマニュアルを一式提供します。'
  },
  {
    q: '総合型選抜への接続は可能ですか？',
    a: '課題設定・仮説検証・成果発表までの記録をポートフォリオ化し、出願書類に接続できます。'
  }
];

export default function MogLandingPage() {
  const [pattern, setPattern] = useState<(typeof onboardingPatterns)[number]['id']>('all');
  const [mission, setMission] = useState(missionData[0]);
  const [voiceTab, setVoiceTab] = useState<keyof typeof voices>('student');
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const activePattern = useMemo(
    () => onboardingPatterns.find((item) => item.id === pattern) ?? onboardingPatterns[0],
    [pattern]
  );

  return (
    <main className="bg-white text-navy">
      <header className="fixed left-0 top-0 z-40 w-full bg-navy/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Image src={mogLogo} alt="MoG ロゴ" className="h-9 w-auto" priority />
          <a href="#cta" className="rounded-full bg-orange px-4 py-2 font-sans font-bold text-white">
            資料請求
          </a>
        </div>
      </header>

      <section className="relative min-h-screen overflow-hidden pt-24">
        <div className="absolute inset-0 -z-10">
          <video autoPlay muted loop playsInline className="h-full w-full object-cover opacity-35" poster={heroImage.src}>
            <source src="/src/video/mog-hero-loop.mp4" type="video/mp4" />
          </video>
          <Image src={heroImage} alt="アジア現地で議論する高校生チーム" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/60 to-navy/80" />
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.8 }}
          className="mx-auto grid max-w-6xl gap-8 px-4 py-20 md:grid-cols-12"
        >
          <div className="md:col-span-8">
            <p className="mb-4 inline-block rounded-full border border-orange/50 px-4 py-1 font-sans text-sm text-white">
              海外PBLプログラム / 教員向け
            </p>
            <h1 className="font-sans text-4xl font-black leading-tight text-white md:text-6xl">
              高校生のときに出会っていたら、
              <br />
              人生が変わるような体験を
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/90">
              観光では終わらない。リアルな社会課題に挑む越境学習で、生徒の視座と行動を変える。
            </p>
          </div>
        </motion.div>
      </section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-6xl px-4 py-20"
      >
        <h2 className="font-sans text-3xl font-extrabold">3者モデル・インタラクティブ図解</h2>
        <p className="mt-3 max-w-3xl">起業家 × 高校生 × 大学生メンターが重なり、中央の高校生チームを成長へ導きます。</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            { title: '現地起業家', text: '現実の経営課題を提示', image: modelEntrepreneur },
            { title: '高校生チーム', text: '課題解決の中心', image: modelStudent },
            { title: '大学生メンター', text: '伴走と内省支援', image: modelMentor }
          ].map((item, i) => (
            <motion.article
              key={item.title}
              whileHover={{ y: -8, rotate: i % 2 === 0 ? -1 : 1 }}
              className="broken-card rounded-2xl border border-navy/10 bg-white p-4 shadow-card"
            >
              <Image src={item.image} alt={item.title} className="h-44 w-full rounded-xl object-cover" />
              <h3 className="mt-4 font-sans text-xl font-bold">{item.title}</h3>
              <p className="mt-2">{item.text}</p>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeIn}
        transition={{ duration: 0.8 }}
        className="bg-navy px-4 py-20 text-white"
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="font-sans text-3xl font-extrabold">導入パターン・タブ</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {onboardingPatterns.map((item) => (
              <button
                key={item.id}
                onClick={() => setPattern(item.id)}
                className={`rounded-xl border px-4 py-4 text-left font-sans transition ${
                  pattern === item.id ? 'border-orange bg-orange text-white' : 'border-white/30 bg-white/10'
                }`}
              >
                <span className="text-lg font-bold">{item.label}</span>
              </button>
            ))}
          </div>
          <div className="mt-6 rounded-2xl bg-white/10 p-6">
            <p className="font-serif text-lg">{activePattern.desc}</p>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-6xl px-4 py-20"
      >
        <h2 className="font-sans text-3xl font-extrabold">ミッションカード</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {missionData.map((item) => (
            <button
              key={item.country}
              onClick={() => setMission(item)}
              className="rounded-2xl border border-navy/10 bg-white p-3 text-left shadow-card transition hover:-translate-y-1"
            >
              <Image src={item.image} alt={`${item.country}のプロジェクト`} className="h-40 w-full rounded-xl object-cover" />
              <p className="mt-3 font-sans text-lg font-bold">
                {item.flag} {item.country}
              </p>
            </button>
          ))}
        </div>
        <article className="chaos-offset mt-8 rounded-2xl border-l-8 border-orange bg-[#fff8f5] p-6">
          <h3 className="font-sans text-2xl font-bold">{mission.entrepreneur}</h3>
          <p className="mt-3 text-lg">ミッション: {mission.mission}</p>
        </article>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden bg-navy px-4 py-20 text-white"
      >
        <Image src={evidenceBg} alt="実績背景" fill className="object-cover opacity-20" />
        <div className="relative mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          <div>
            <p className="font-sans text-sm uppercase tracking-[0.2em]">Evidence</p>
            <p className="font-sans text-6xl font-black text-orange md:text-8xl">93%</p>
            <p className="text-lg">総合型選抜活用率</p>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/10 p-6">
            <div className="mb-4 flex gap-2">
              {(['student', 'teacher', 'parent'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setVoiceTab(tab)}
                  className={`rounded-full px-3 py-1 font-sans text-sm ${
                    voiceTab === tab ? 'bg-orange text-white' : 'bg-white/20'
                  }`}
                >
                  {tab === 'student' ? '生徒' : tab === 'teacher' ? '先生' : '保護者'}
                </button>
              ))}
            </div>
            <p>{voices[voiceTab]}</p>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-4xl px-4 py-20"
      >
        <h2 className="font-sans text-3xl font-extrabold">よくある質問</h2>
        <div className="mt-8 space-y-3">
          {faqs.map((item, index) => (
            <article key={item.q} className="rounded-xl border border-navy/10 p-4">
              <button
                className="flex w-full items-center justify-between gap-4 text-left font-sans font-bold"
                onClick={() => setFaqOpen((prev) => (prev === index ? null : index))}
              >
                {item.q}
                <span>{faqOpen === index ? '−' : '+'}</span>
              </button>
              {faqOpen === index && <p className="mt-3">{item.a}</p>}
            </article>
          ))}
        </div>
      </motion.section>

      <footer className="bg-navy px-4 py-14 text-white">
        <div className="mx-auto max-w-6xl space-y-4">
          <p className="font-sans text-lg font-bold">運営団体</p>
          <Image src={very50Logo} alt="very50 ロゴ" className="h-10 w-auto" />
          <p className="text-sm text-white/80">© very50 2026. All rights reserved.</p>
        </div>
      </footer>

      <div className="fixed bottom-0 left-0 z-50 w-full bg-white p-3 shadow-[0_-6px_24px_rgba(0,0,0,0.12)] md:hidden" id="cta">
        <button className="w-full rounded-full bg-orange py-3 font-sans text-lg font-bold text-white">資料請求（無料）</button>
      </div>
    </main>
  );
}
