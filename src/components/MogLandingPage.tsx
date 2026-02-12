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

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

const sectionTransition = { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const };

const tabs = [
  {
    id: 'all',
    title: '学年全体',
    subtitle: '修学旅行/全員導入',
    description:
      '学年行事に組み込むことで、探究を「一部の生徒」ではなく学校文化として定着。事前学習から帰国後発表まで評価設計を統一できます。',
    caseStudy: '導入例：7コース型修学旅行の最上位探究コースとして採択。'
  },
  {
    id: 'course',
    title: 'コース利用',
    subtitle: '探究コース/選択導入',
    description:
      '総合・探究コースの核として導入。難度の高い仮説検証ループを通して、知識活用力と進路解像度を同時に伸ばします。',
    caseStudy: '導入例：高2探究選択科目で年間カリキュラムに接続。'
  },
  {
    id: 'optional',
    title: '任意研修',
    subtitle: '公募型導入',
    description:
      '意欲ある生徒が自ら手を挙げる形式。リーダー層育成と学校ブランド形成の両立に有効で、校内へ波及効果を生みます。',
    caseStudy: '導入例：夏季公募プログラムとして全国合同で実施。'
  }
] as const;

const triangleModel = [
  {
    title: '現地起業家',
    role: 'リアル課題の提供者',
    detail: '現地社会に根ざした課題を提示。正解のない問いに向き合う原体験をつくる。',
    image: modelEntrepreneur,
    className: 'md:-translate-x-3 md:rotate-[-2deg]'
  },
  {
    title: '高校生チーム',
    role: '探究の主役',
    detail: 'ヒアリングと仮説検証を繰り返し、成果物を提案。自分の将来像と社会課題が接続される。',
    image: modelStudent,
    className: 'md:-translate-y-6 md:z-10'
  },
  {
    title: '大学生メンター',
    role: '伴走レイヤー',
    detail: '問い直し、振り返り、チーム運営を支援。挑戦を安心に変える“学習の足場”を提供。',
    image: modelMentor,
    className: 'md:translate-x-3 md:rotate-[2deg]'
  }
] as const;

const missions = [
  {
    country: 'インドネシア',
    flag: '🇮🇩',
    entrepreneur: '海洋プラスチック再資源化スタートアップ',
    mission:
      '港湾回収導線の再設計案を作成。現地ヒアリングを通じて、3ヶ月で回収率20%改善の実行プランを提示。',
    image: missionIndonesia,
    x: 'left-[14%]',
    y: 'top-[36%]'
  },
  {
    country: 'ベトナム',
    flag: '🇻🇳',
    entrepreneur: 'ローカルカカオ高付加価値化企業',
    mission: '訪日観光客向けの新商品検証を設計し、販売導線の仮説検証を現地で実施。',
    image: missionVietnam,
    x: 'left-[44%]',
    y: 'top-[18%]'
  },
  {
    country: 'インド',
    flag: '🇮🇳',
    entrepreneur: '女性就労支援の縫製ソーシャルビジネス',
    mission: '採用広報プロトタイプを1週間で立案。現場観察と定性調査から訴求軸を再定義。',
    image: missionIndia,
    x: 'left-[68%]',
    y: 'top-[42%]'
  }
] as const;

const voices = {
  student: '「正解を探す勉強から、“問いを立てる学び”に変わった。帰国後の志望理由書が自分の言葉で書けました。」',
  teacher: '「安全管理と学習成果が両立している点が導入の決め手。事前事後の評価設計まで一気通貫で整理できます。」',
  parent: '「旅行ではなく成長機会だと納得できました。帰国後の発表で、子どもの視座の変化をはっきり感じました。」'
} as const;

const faqItems = [
  {
    q: '英語力に不安がある生徒でも参加できますか？',
    a: '可能です。大学生メンターが通訳・問いの整理・振り返りを段階的にサポートし、言語力よりも探究姿勢を育てます。'
  },
  {
    q: '学校としての危機管理体制はどこまで整っていますか？',
    a: '危機管理マニュアル、緊急連絡フロー、現地連携先の審査、引率者研修まで提供し、学校側の説明責任に対応します。'
  },
  {
    q: '総合型選抜・推薦入試への接続は可能ですか？',
    a: '活動ログ、課題設定、検証プロセス、成果発表をポートフォリオ化し、志望理由書や面接回答へ接続できるよう支援します。'
  },
  {
    q: '導入までのリードタイムはどれくらいですか？',
    a: '標準で3〜4ヶ月です。学校要件に応じて、学年導入・選択導入・公募導入の3パターンで実施計画を設計します。'
  }
];

const processSteps = [
  '事前探究（課題理解）',
  '現地ヒアリング（一次情報収集）',
  '仮説立案（チーム設計）',
  '検証・修正（ループ）',
  '最終提案（発表）',
  '帰国後実装（学校内展開）'
];

export default function MogLandingPage() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]['id']>('all');
  const [activeMission, setActiveMission] = useState(missions[0]);
  const [activeVoice, setActiveVoice] = useState<keyof typeof voices>('student');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const selectedTab = useMemo(() => tabs.find((tab) => tab.id === activeTab) ?? tabs[0], [activeTab]);

  return (
    <main className="bg-white text-navy">
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-navy/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Image src={mogLogo} alt="MoG ロゴ" className="h-9 w-auto" priority />
          <nav aria-label="主要導線" className="hidden items-center gap-5 md:flex">
            <a href="#model" className="text-sm text-white/85 hover:text-white">3者モデル</a>
            <a href="#patterns" className="text-sm text-white/85 hover:text-white">導入形態</a>
            <a href="#faq" className="text-sm text-white/85 hover:text-white">FAQ</a>
          </nav>
          <a href="#cta" className="rounded-full bg-orange px-4 py-2 font-sans text-sm font-bold text-white">資料請求</a>
        </div>
      </header>

      <section className="relative min-h-screen overflow-hidden pt-24">
        <div className="absolute inset-0 -z-10">
          <video autoPlay muted loop playsInline className="h-full w-full object-cover opacity-30" poster={heroImage.src}>
            <source src="/src/video/mog-hero-loop.mp4" type="video/mp4" />
          </video>
          <Image src={heroImage} alt="海外の現場で議論する高校生の様子" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/55 via-navy/60 to-navy/85" />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={reveal}
          transition={sectionTransition}
          className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-12 md:items-end"
        >
          <div className="md:col-span-8">
            <p className="mb-4 inline-flex items-center rounded-full border border-orange/50 bg-white/10 px-4 py-1 font-sans text-xs tracking-wider text-white">
              教員向け / 海外PBLプログラム
            </p>
            <h1 className="font-sans text-4xl font-black leading-tight text-white md:text-6xl">
              高校生のときに出会っていたら、
              <br className="hidden md:block" />
              人生が変わるような体験を
            </h1>
            <p className="mt-6 max-w-2xl text-base text-white/90 md:text-lg">
              ただのスタディツアーではなく、現地起業家のリアル課題に挑む越境PBL。
              生徒の進路・探究・入試を一本につなぐ、学校導入前提の学習設計です。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#cta" className="rounded-full bg-orange px-6 py-3 font-sans font-bold text-white">資料請求（無料）</a>
              <a href="#patterns" className="rounded-full border border-white/40 px-6 py-3 font-sans font-bold text-white">導入形態を見る</a>
            </div>
          </div>

          <aside className="rounded-2xl border border-white/25 bg-white/10 p-5 md:col-span-4">
            <h2 className="font-sans text-lg font-bold text-white">ページ構成（提案）</h2>
            <ol className="mt-3 space-y-2 text-sm text-white/90">
              <li>1. Hero（価値訴求+CTA）</li>
              <li>2. 3者モデル図解（ホバー連動）</li>
              <li>3. 導入パターンタブ（3導入形態）</li>
              <li>4. ミッションカード（国別UI）</li>
              <li>5. 実績エビデンス（数値+声）</li>
              <li>6. FAQ（疑問解消）</li>
            </ol>
          </aside>
        </motion.div>
      </section>

      <motion.section
        id="model"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={reveal}
        transition={sectionTransition}
        className="mx-auto max-w-6xl px-4 py-20"
      >
        <h2 className="font-sans text-3xl font-extrabold">3者モデル・インタラクティブ図解</h2>
        <p className="mt-3 max-w-3xl text-navy/80">
          高校生を中心に、現地起業家と大学生メンターが連動。ホバーで各役割の価値が浮かび上がります。
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3 md:items-end">
          {triangleModel.map((member, index) => (
            <motion.article
              key={member.title}
              whileHover={{ y: -8, rotate: index === 1 ? 0 : index === 0 ? -1.4 : 1.4 }}
              className={`rounded-2xl border border-navy/10 bg-white p-4 shadow-card transition ${member.className}`}
            >
              <Image src={member.image} alt={member.title} className="h-44 w-full rounded-xl object-cover" />
              <p className="mt-4 font-sans text-xs tracking-[0.12em] text-orange">{member.role}</p>
              <h3 className="mt-1 font-sans text-xl font-bold">{member.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy/85">{member.detail}</p>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="patterns"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        variants={reveal}
        transition={sectionTransition}
        className="bg-navy px-4 py-20 text-white"
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="font-sans text-3xl font-extrabold">導入パターン・タブ</h2>
          <p className="mt-2 text-white/75">学校の関与度に応じて、導入モデルを選択できます。</p>
          <div className="mt-7 grid gap-3 md:grid-cols-3" role="tablist" aria-label="導入パターン">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-2xl border p-4 text-left transition ${
                  activeTab === tab.id ? 'border-orange bg-orange text-white' : 'border-white/30 bg-white/5 hover:bg-white/10'
                }`}
              >
                <p className="font-sans text-lg font-bold">{tab.title}</p>
                <p className="mt-1 text-xs opacity-85">{tab.subtitle}</p>
              </button>
            ))}
          </div>

          <article id={`panel-${selectedTab.id}`} role="tabpanel" className="mt-6 rounded-2xl bg-white/10 p-6">
            <p className="text-base leading-relaxed">{selectedTab.description}</p>
            <p className="mt-4 border-l-4 border-orange pl-3 font-sans text-sm font-semibold text-orange">{selectedTab.caseStudy}</p>
          </article>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={reveal}
        transition={sectionTransition}
        className="mx-auto max-w-6xl px-4 py-20"
      >
        <h2 className="font-sans text-3xl font-extrabold">プロセス設計（余白のあるフローチャート）</h2>
        <p className="mt-3 max-w-3xl text-navy/80">直線ではなく、仮説検証のループを前提にした設計で「白紙のスケジュール」を学習価値へ転換します。</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, i) => (
            <div key={step} className={`rounded-xl border border-navy/15 bg-white p-4 shadow-sm ${i % 2 === 0 ? 'md:rotate-[-1.2deg]' : 'md:rotate-[1.2deg]'}`}>
              <p className="font-sans text-xs tracking-[0.14em] text-orange">STEP {String(i + 1).padStart(2, '0')}</p>
              <p className="mt-1 font-sans text-lg font-bold">{step}</p>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={reveal}
        transition={sectionTransition}
        className="bg-[#f6f7f8] px-4 py-20"
      >
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 className="font-sans text-3xl font-extrabold">ミッションカード</h2>
            <p className="mt-3 text-navy/80">国ごとの起業家ミッションを選択すると、プロジェクトの実像が表示されます。</p>
            <div className="mt-6 grid gap-3">
              {missions.map((mission) => (
                <button
                  key={mission.country}
                  onClick={() => setActiveMission(mission)}
                  className={`rounded-xl border p-3 text-left transition ${
                    activeMission.country === mission.country
                      ? 'border-orange bg-white shadow-card'
                      : 'border-navy/15 bg-white hover:border-orange/60'
                  }`}
                >
                  <p className="font-sans font-bold">{mission.flag} {mission.country}</p>
                  <p className="mt-1 text-sm text-navy/75">{mission.entrepreneur}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="relative rounded-2xl border border-navy/10 bg-white p-4 shadow-card md:col-span-7">
            <div className="relative h-52 rounded-xl bg-navy/90 p-4 text-white md:h-64">
              <p className="font-sans text-sm tracking-[0.16em] text-orange">WORLD MISSIONS</p>
              <p className="mt-2 max-w-xs text-sm text-white/80">地図上の拠点をクリックし、地域課題への挑戦テーマを確認できます。</p>
              {missions.map((pin) => (
                <button
                  key={pin.country + 'pin'}
                  aria-label={`${pin.country}の拠点`}
                  onClick={() => setActiveMission(pin)}
                  className={`absolute h-4 w-4 rounded-full border-2 border-white ${pin.x} ${pin.y} ${
                    activeMission.country === pin.country ? 'bg-orange scale-125' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Image src={activeMission.image} alt={`${activeMission.country}の現場イメージ`} className="h-40 w-full rounded-xl object-cover" />
              <div className="rounded-xl bg-[#fff7f4] p-4">
                <p className="font-sans text-sm font-bold text-orange">{activeMission.flag} {activeMission.country}</p>
                <h3 className="mt-2 font-sans text-lg font-bold">{activeMission.entrepreneur}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/90">ミッション：{activeMission.mission}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={reveal}
        transition={sectionTransition}
        className="relative overflow-hidden bg-navy px-4 py-20 text-white"
      >
        <Image src={evidenceBg} alt="実績エリア背景" fill className="object-cover opacity-15" />
        <div className="relative mx-auto grid max-w-6xl gap-6 md:grid-cols-2 md:items-stretch">
          <article className="rounded-2xl border border-white/25 bg-white/10 p-6">
            <p className="font-sans text-xs tracking-[0.2em] text-white/70">EVIDENCE</p>
            <p className="mt-3 font-sans text-7xl font-black leading-none text-orange md:text-8xl">93%</p>
            <p className="mt-2 text-lg">総合型選抜活用率</p>
            <p className="mt-4 text-sm text-white/75">入試・進路文脈で語れる「証拠データ」を明確化し、校内外の合意形成を後押しします。</p>
          </article>

          <article className="rounded-2xl border border-white/25 bg-white/10 p-6">
            <div className="mb-4 flex flex-wrap gap-2" role="tablist" aria-label="参加者の声">
              {(['student', 'teacher', 'parent'] as const).map((key) => (
                <button
                  key={key}
                  role="tab"
                  aria-selected={activeVoice === key}
                  onClick={() => setActiveVoice(key)}
                  className={`rounded-full px-3 py-1 text-sm font-semibold ${
                    activeVoice === key ? 'bg-orange text-white' : 'bg-white/20 text-white/90'
                  }`}
                >
                  {key === 'student' ? '生徒' : key === 'teacher' ? '先生' : '保護者'}
                </button>
              ))}
            </div>
            <p className="text-base leading-relaxed">{voices[activeVoice]}</p>
          </article>
        </div>
      </motion.section>

      <motion.section
        id="faq"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={reveal}
        transition={sectionTransition}
        className="mx-auto max-w-4xl px-4 py-20"
      >
        <h2 className="font-sans text-3xl font-extrabold">よくある質問</h2>
        <div className="mt-8 space-y-3">
          {faqItems.map((item, index) => (
            <article key={item.q} className="rounded-xl border border-navy/15 bg-white p-4">
              <button
                onClick={() => setOpenFaq((prev) => (prev === index ? null : index))}
                aria-expanded={openFaq === index}
                className="flex w-full items-start justify-between gap-4 text-left"
              >
                <span className="font-sans text-base font-bold">{item.q}</span>
                <span className="mt-0.5 font-sans text-xl text-orange">{openFaq === index ? '−' : '+'}</span>
              </button>
              {openFaq === index && <p className="mt-3 text-sm leading-relaxed text-navy/85">{item.a}</p>}
            </article>
          ))}
        </div>
      </motion.section>

      <footer className="bg-navy px-4 py-14 pb-28 text-white md:pb-14">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          <div>
            <p className="font-sans text-lg font-bold">運営団体</p>
            <Image src={very50Logo} alt="very50 ロゴ" className="mt-3 h-10 w-auto" />
          </div>
          <div>
            <p className="font-sans text-lg font-bold">お問い合わせ</p>
            <p className="mt-2 text-sm text-white/80">導入形態の相談・説明会のご案内は資料請求からご連絡ください。</p>
          </div>
          <div>
            <p className="font-sans text-lg font-bold">主催</p>
            <p className="mt-2 text-sm text-white/80">主催団体 very50 / MoG Program</p>
            <p className="mt-3 text-xs text-white/60">© very50 2026. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <div id="cta" className="fixed bottom-0 left-0 z-50 w-full border-t border-navy/10 bg-white p-3 shadow-[0_-8px_26px_rgba(0,0,0,0.12)] md:hidden">
        <button className="w-full rounded-full bg-orange py-3 font-sans text-base font-bold text-white">資料請求（無料）</button>
      </div>
    </main>
  );
}
