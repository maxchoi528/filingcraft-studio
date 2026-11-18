/**
 * Global 8-language translator & accessible Listbox switcher across ALL pages
 * of filingcraft-studio.pages.dev (persists cleanly in localStorage across navigation).
 */
'use strict';

(function () {
  var OPTIONS = [
    { v: 'en', l: 'EN · English' },
    { v: 'zh_CN', l: '简中 · 简体中文' },
    { v: 'zh_TW', l: '繁中 · 繁體中文' },
    { v: 'ja', l: 'JA · 日本語' },
    { v: 'ko', l: 'KO · 한국어' },
    { v: 'de', l: 'DE · Deutsch' },
    { v: 'fr', l: 'FR · Français' },
    { v: 'es', l: 'ES · Español' }
  ];

  var DICT = {
    en: {
      navOverview: 'Overview',
      navExcel: 'XBRL to Excel',
      navRedline: '10-K Redline',
      navAltman: 'Altman Z & Beneish M',
      navBrief: 'Sample Brief',
      navPrivacy: 'Privacy',
      heroTitle: 'Official SEC EDGAR XBRL into Formula Excel (.xlsx) & 10-K Risk Redlines, Right in Your Browser.',
      heroLead: 'Stop fixing broken Yahoo Finance scrapes or manually reading 80-page 10-K risk disclosures. FilingCraft pulls structured US-GAAP facts straight from data.sec.gov, calculates Altman Z & Beneish M forensics, previews every Excel formula live on screen, and highlights every added, revised, and removed 10-K risk clause with zero backend servers.',
      ctaEdge: 'Get for Microsoft Edge & Chrome',
      ctaFirefox: 'Get for Firefox Add-ons',
      ctaBrief: 'Inspect Sample AAPL Research Brief',
      sandboxH2: 'Preview What FilingCraft Generates Before You Install',
      modeValues: 'Values',
      modeFormulas: 'Formulas (=fx)',
      priceLabel: 'Share Price ($)',
      capH2: 'Built for Analysts Who Demand Audit-Grade Accuracy',
      cap1T: 'Official XBRL Normalization',
      cap1B: 'Eliminates comparative frame duplicates inside 10-K filings by keeping the latest restated filing per fiscal end date and separating annual flows (>=300 days) from quarterly slices automatically.',
      cap2T: 'Live 4-Sheet Formula .xlsx',
      cap2B: 'Downloads standard OpenXML spreadsheets (1_Summary_Scores, 2_Income_Statement, 3_Balance_Sheet, 4_Cash_Flow) where changing Share Price B5 recalculates Market Cap, Altman X4, and FCF Yield automatically.',
      cap3T: '10-K Risk Factor Redline',
      cap3B: 'Skips deceptive Table of Contents anchors, compares prior vs. current Item 1A Risk Factors and Item 7 MD&A paragraphs with word-level LCS diffing, and filters disclosures by added, revised, removed, or keyword.',
      shotsH2: 'Actual Extension Screens (Archival Folio & Pro Night Desk)',
      pricingH2: 'Simple Pricing Without Per-Ticker Subscriptions',
      freeBadge: 'Free Plan · $0',
      freeTitle: 'Essential XBRL & Formula Preview',
      freeDesc: 'Unlimited US Ticker / CIK lookup directly from SEC EDGAR, 3-Year 3-Statement view, Altman Z & Beneish M forensics, full interactive formula preview grid, CSV sheet export, and top 3 Item 1A Redline clause shifts.',
      proBadge: 'Pro License · Up to 3 Devices',
      proTitle: 'Full 10-Year Workbook & Redline Suite',
      proDesc: 'Unlock 10-Year 4-Sheet live formula Excel (.xlsx) downloads, complete unclipped 10-K Risk & MD&A Redline comparisons, clean unwatermarked HTML/PDF Briefs, and the Obsidian Night Desk terminal.',
      btnLifetime: 'Lifetime ($29.90 One-Time)',
      btnMonthly: 'Monthly ($5.99/mo)',
      subExcelH1: 'Official SEC EDGAR XBRL to 4-Sheet Formula Excel (.xlsx), Zero Scraper Breakage.',
      subRedlineH1: "Spot Every Added, Revised, and Silently Deleted Clause Between Last Year's and This Year's 10-K.",
      subAltmanH1: 'Instant Altman Z-Score & Beneish M-Score Forensics From Audited SEC XBRL Tags.',
      privacyH1: 'Privacy Policy: FilingCraft Studio Pro'
    },
    zh_CN: {
      navOverview: '首页概览',
      navExcel: 'XBRL 转 Excel',
      navRedline: '10-K 风险红线',
      navAltman: 'Altman Z 与 M 指数',
      navBrief: '实景简报样例',
      navPrivacy: '隐私说明',
      heroTitle: '直连 SEC EDGAR 官方 XBRL 财报接口，一键生成活公式 Excel (.xlsx) 与 10-K 风险红线对比。',
      heroLead: '告别第三方爬虫错列与 Yahoo Finance 断连。FilingCraft 直接从 data.sec.gov 拉取标准 US-GAAP 数据，自动算出 Altman Z 与 Beneish M 排雷指数，在安装与导出前即可在线透视全部 Excel 跨表公式，并逐词高亮 10-K 风险增删条款——全流程浏览器本地完成，零后台服务器。',
      ctaEdge: '获取 Edge / Chrome 扩展',
      ctaFirefox: '获取 Firefox 扩展',
      ctaBrief: '查看苹果 AAPL 实景研报样例',
      sandboxH2: '安装前在线体验：看看你将导出什么样的活公式模型',
      modeValues: '计算结果值',
      modeFormulas: '透视公式 (=fx)',
      priceLabel: '假设股价 ($)',
      capH2: '专为对数据审计精度零容忍的研究员打造',
      cap1T: '官方 XBRL 财报去重清洗',
      cap1B: '自动剔除 10-K 附注里重复的往年比较期和不足 300 天的单季切片，按财报期末日期保留最新重述口径，并自动补全推导 Gross Profit 与自由现金流。',
      cap2T: '4 表跨表联动真公式 .xlsx',
      cap2B: '生成标准 OpenXML 工作簿（含 1_Summary_Scores 估值汇总与三大报表），在 Windows Excel、Mac 微软表格或苹果 Numbers 中改动 B5 股价均可实时重算全表。',
      cap3T: '10-K 风险披露红线对比',
      cap3B: '自动跳过财报目录页（TOC）锚点陷阱，对近两年 Item 1A Risk Factors 与 Item 7 MD&A 做词级 LCS 增改对比，支持新增/修改/删除及关键词实时筛选。',
      shotsH2: '真实扩展运行画面（Archival Folio 浅色与 Night Desk 黑金夜间版）',
      pricingH2: '清晰透明的一次性/低门槛定价，不按标的个数收费',
      freeBadge: '免费版 · $0',
      freeTitle: '核心 XBRL 查询与全量公式在线预览',
      freeDesc: '不限次查询任意美股代码 / CIK、查看近 3 年完整三表、Altman Z 与 Beneish M 量化排雷评分、全功能在线公式网格透视、单表 CSV 导出及前 3 条 10-K 风险红线对比。',
      proBadge: 'Pro 专业版 · 支持 3 台设备',
      proTitle: '10 年期完整三表公式 Excel 与全量风险红线',
      proDesc: '解锁近 10 年 4 表联动真公式 Excel (.xlsx) 导出、全部 Item 1A / MD&A 风险条款对比与关键词搜索、无水印 HTML/PDF 简报及 Night Desk 黑金夜间工作台。',
      btnLifetime: '终身买断 ($29.90 一次付费)',
      btnMonthly: '按月订阅 ($5.99/月)',
      subExcelH1: '官方 SEC EDGAR XBRL 一键编译为 4 表真公式 Excel (.xlsx)，彻底告别爬虫错行。',
      subRedlineH1: '一眼揪出管理层今年 10-K 风险因素里悄悄新增、篡改与删除的每一句话。',
      subAltmanH1: '基于官方审计 XBRL 科目秒算 Altman Z 破产指数与 Beneish 盈余操纵预警。',
      privacyH1: '隐私政策：FilingCraft Studio Pro'
    },
    zh_TW: {
      navOverview: '首頁概覽',
      navExcel: 'XBRL 轉 Excel',
      navRedline: '10-K 風險紅線',
      navAltman: 'Altman Z 與 M 指數',
      navBrief: '實景簡報範例',
      navPrivacy: '隱私權說明',
      heroTitle: '直連 SEC EDGAR 官方 XBRL 財報介面，一鍵產出含公式 Excel (.xlsx) 與 10-K 風險紅線對比。',
      heroLead: '告別爬蟲錯列與斷線。FilingCraft 直接從 data.sec.gov 擷取標準 US-GAAP 數據，計算 Altman Z 與 Beneish M 排雷指數，匯出前即可於線上透視跨表 Excel 公式，並逐詞比對 10-K 風險增刪條款，100% 瀏覽器本地完成。',
      ctaEdge: '取得 Edge / Chrome 擴充功能',
      ctaFirefox: '取得 Firefox 擴充套件',
      ctaBrief: '檢視蘋果 AAPL 實景研究簡報',
      sandboxH2: '安裝前線上體驗：預覽實際匯出的活公式工作簿',
      modeValues: '計算數值',
      modeFormulas: '透視公式 (=fx)',
      priceLabel: '假設股價 ($)',
      capH2: '為嚴謹機構研究打造的財務與法規分析架構',
      cap1T: '官方 XBRL 財報去重清洗',
      cap1B: '自動排除 10-K 重複比較期與單季切片，依期末日期保留最新重述版本，並精準推導毛利與自由現金流。',
      cap2T: '4 表跨表連動公式 .xlsx',
      cap2B: '產出標準 OpenXML 活頁簿，於 Windows Excel、Mac Excel 與 Apple Numbers 修改 B5 股價皆可即時重算全表。',
      cap3T: '10-K 風險因素紅線對比',
      cap3B: '自動略過目錄頁陷阱，針對 Item 1A 與 Item 7 進行詞級比對並支援新增/修訂/刪除與關鍵字即時篩選。',
      shotsH2: '擴充套件真實畫面（Archival Folio 與 Night Desk 夜間模式）',
      pricingH2: '清晰定價方案，不限查詢股票數量',
      freeBadge: '免費版 · $0',
      freeTitle: '核心 XBRL 查詢與線上公式透視',
      freeDesc: '無限次美股代碼 / CIK 查詢、近 3 年三表檢視、Altman Z 與 Beneish M 評分、線上公式格透視、CSV 匯出與前 3 條 10-K 紅線。',
      proBadge: 'Pro 專業版 · 最多 3 台裝置',
      proTitle: '10 年完整公式 Excel 與全量 10-K 紅線',
      proDesc: '解鎖 10 年期 4 表連動 Excel (.xlsx) 下載、完整 Item 1A / MD&A 風險比對、無浮水印 HTML/PDF 簡報及 Night Desk 夜間模式。',
      btnLifetime: '終身買斷 ($29.90 一次付清)',
      btnMonthly: '按月訂閱 ($5.99/月)',
      subExcelH1: '官方 SEC EDGAR XBRL 轉 4 表連動公式 Excel (.xlsx)，零爬蟲錯誤。',
      subRedlineH1: '精準標出今年與去年 10-K 之間新增、修訂及移除的每一項風險揭露。',
      subAltmanH1: '依據官方審計 XBRL 科目秒算 Altman Z 與 Beneish M 財務排雷指數。',
      privacyH1: '隱私權政策：FilingCraft Studio Pro'
    },
    ja: {
      navOverview: '概要',
      navExcel: 'XBRL から Excel',
      navRedline: '10-K リスク差分',
      navAltman: 'Altman Z & M',
      navBrief: 'サンプルレポート',
      navPrivacy: 'プライバシー',
      heroTitle: 'SEC EDGAR 公式 XBRL から数式入り Excel (.xlsx) と 10-K リスク差分をブラウザ内で直接生成。',
      heroLead: 'スクレイピング崩れとは無縁です。data.sec.gov から公式財務データを直接取得し、Altman Z・Beneish M を算出、出力前に Excel 数式を画面で事前プレビューし、10-K リスク要因の追加・改訂・削除を単語単位でハイライト表示します。',
      ctaEdge: 'Edge / Chrome 版を入手',
      ctaFirefox: 'Firefox アドオンを入手',
      ctaBrief: 'AAPL リサーチレポート例を見る',
      sandboxH2: 'インストール前にプレビュー：実際に出力される Excel 数式を体験',
      modeValues: '計算値',
      modeFormulas: '数式表示 (=fx)',
      priceLabel: '想定株価 ($)',
      capH2: '監査品質の精度を求めるアナリスト向け設計',
      cap1T: '公式 XBRL 正規化',
      cap1B: '10-K 内の過年度重複フレームや四半期数値を自動で除外し、決算期末日と最新修正報告で正確に揃えます。',
      cap2T: '4シート連動数式 .xlsx',
      cap2B: 'Windows Excel・Mac Excel・Apple Numbers 互換の OpenXML を生成。B5 の株価を変えるだけで全指標が再計算されます。',
      cap3T: '10-K リスク要因レッドライン',
      cap3B: '目次の誤抽出を回避し、前年度と当年度の Item 1A / MD&A を単語レベルの LCS 差分で比較します。',
      shotsH2: '実際の拡張機能画面（Archival Folio / Night Desk）',
      pricingH2: '銘柄数無制限の明快な料金プラン',
      freeBadge: '無料プラン · $0',
      freeTitle: '基本 XBRL 検索と数式プレビュー',
      freeDesc: '米国株ティッカー/CIK 無制限検索、直近3年分の財務3表、Altman Z / Beneish M 算出、数式グリッド表示、CSV 出力、主要3条項の 10-K 差分比較。',
      proBadge: 'Pro ライセンス · 最大3台',
      proTitle: '10年分 Excel モデリング & 全文リスク差分',
      proDesc: '10年分4シート数式 Excel (.xlsx) ダウンロード、Item 1A/MD&A 全条項差分、透かしなし HTML/PDF 出力、Night Desk ダークテーマを解放します。',
      btnLifetime: '買い切り ($29.90)',
      btnMonthly: '月額プラン ($5.99/月)',
      subExcelH1: 'SEC EDGAR 公式 XBRL を4シート数式付き Excel (.xlsx) に変換。',
      subRedlineH1: '前年と今年の 10-K リスク要因で追加・修正・削除された全ての文言を抽出。',
      subAltmanH1: '監査済み XBRL 数値から Altman Z スコアと Beneish M スコアを自動算出。',
      privacyH1: 'プライバシーポリシー：FilingCraft Studio Pro'
    },
    ko: {
      navOverview: '개요',
      navExcel: 'XBRL → Excel',
      navRedline: '10-K 리스크 비교',
      navAltman: 'Altman Z & M',
      navBrief: '샘플 브리프',
      navPrivacy: '개인정보처리방침',
      heroTitle: '공식 SEC EDGAR XBRL을 수식 포함 Excel(.xlsx)과 10-K 리스크 비교로 브라우저에서 즉시 생성하세요.',
      heroLead: '불안정한 웹 스크래핑 대신 data.sec.gov 공식 데이터를 직접 조회해 Altman Z·Beneish M 점수를 계산하고, 다운로드 전 Excel 셀 수식을 실시간 미리보기로 검증하며 10-K 리스크 변경 조항을 단어 단위로 비교합니다.',
      ctaEdge: 'Edge / Chrome 확장 설치',
      ctaFirefox: 'Firefox 부가기능 설치',
      ctaBrief: 'AAPL 샘플 리포트 미리보기',
      sandboxH2: '설치 전 미리보기: 생성되는 Excel 수식 직접 확인',
      modeValues: '계산 값',
      modeFormulas: '수식 보기 (=fx)',
      priceLabel: '가정 주가 ($)',
      capH2: '정확한 재무 감사를 위한 아키텍처',
      cap1T: '공식 XBRL 정규화',
      cap1B: '10-K 내 중복 비교 연도와 분기 수치를 자동 제거해 최신 정정 공시 기준으로 3대 재무제표를 정렬합니다.',
      cap2T: '4시트 수식 연동 .xlsx',
      cap2B: 'Windows Excel, Mac Excel 및 Apple Numbers에서 호환되는 표준 OpenXML 파일을 생성합니다.',
      cap3T: '10-K 리스크 레드라인 비교',
      cap3B: '목차 링크 함정을 건너뛰고 전년 대비 Item 1A 및 MD&A 문구 변경 사항을 단어 정밀도로 표시합니다.',
      shotsH2: '확장 프로그램 실제 화면 (Archival Folio & Night Desk)',
      pricingH2: '종목 수 제한 없는 투명한 요금제',
      freeBadge: '무료 플랜 · $0',
      freeTitle: '기본 XBRL 조회 및 수식 미리보기',
      freeDesc: '미국 티커/CIK 무제한 검색, 최근 3년 재무제표, Altman Z 및 Beneish M 분석, 수식 그리드 미리보기, CSV 내보내기, 상위 3개 10-K 리스크 비교.',
      proBadge: 'Pro 라이선스 · 최대 3대 기기',
      proTitle: '10년 전체 수식 Excel 및 전체 리스크 레드라인',
      proDesc: '10년 4시트 수식 Excel(.xlsx) 다운로드, 전체 Item 1A/MD&A 비교, 워터마크 없는 HTML/PDF 리포트 및 Night Desk 다크 테마를 제공합니다.',
      btnLifetime: '평생 라이선스 ($29.90)',
      btnMonthly: '월간 구독 ($5.99/월)',
      subExcelH1: '공식 SEC EDGAR XBRL을 4시트 연동 수식 Excel(.xlsx)로 변환하세요.',
      subRedlineH1: '전년과 올해 10-K 사이 추가·수정·삭제된 모든 리스크 조항을 즉시 확인하세요.',
      subAltmanH1: '감사된 SEC XBRL 항목 기반 Altman Z & Beneish M 포렌식 계산기.',
      privacyH1: '개인정보처리방침: FilingCraft Studio Pro'
    },
    de: {
      navOverview: 'Übersicht',
      navExcel: 'XBRL zu Excel',
      navRedline: '10-K Redline',
      navAltman: 'Altman Z & M',
      navBrief: 'Musterbericht',
      navPrivacy: 'Datenschutz',
      heroTitle: 'Offizielle SEC-EDGAR-XBRL-Bilanzen als Formel-Excel (.xlsx) & 10-K-Risiko-Redline direkt im Browser.',
      heroLead: 'Schluss mit defekten Finanz-Scrapern. FilingCraft bezieht US-GAAP-Daten direkt von data.sec.gov, berechnet Altman Z und Beneish M, zeigt jede Excel-Formel vor dem Download live an und markiert geänderte 10-K-Risikoklauseln ohne Server.',
      ctaEdge: 'Für Microsoft Edge & Chrome',
      ctaFirefox: 'Für Firefox Add-ons',
      ctaBrief: 'AAPL-Musterbericht ansehen',
      sandboxH2: 'Live-Vorschau vor der Installation: Was genau erzeugt wird',
      modeValues: 'Werte',
      modeFormulas: 'Formeln (=fx)',
      priceLabel: 'Kursannahme ($)',
      capH2: 'Für Analysten mit Anspruch auf Prüfungspräzision',
      cap1T: 'Offizielle XBRL-Bereinigung',
      cap1B: 'Entfernt automatisch doppelte Vorjahreswerte aus 10-K-Anhängen und trennt Jahreswerte von Quartalsdaten.',
      cap2T: '4-Blatt-Formel-Excel (.xlsx)',
      cap2B: 'Standardisiertes OpenXML (ECMA-376) ohne Makros für Windows Excel, macOS Excel und Apple Numbers.',
      cap3T: '10-K Risiko-Redline',
      cap3B: 'Überspringt Inhaltsverzeichnis-Fallen und vergleicht Item 1A & MD&A Absatz für Absatz mit Wort-Diff.',
      shotsH2: 'Erweiterungs-Ansichten (Archival Folio & Pro Night Desk)',
      pricingH2: 'Faire Preise ohne Ticker-Limit',
      freeBadge: 'Kostenlos · $0',
      freeTitle: 'Basis-XBRL & Formel-Vorschau',
      freeDesc: 'Unbegrenzte Ticker-/CIK-Suche, 3-Jahres-Bilanzansicht, Altman Z & Beneish M, volle Formel-Vorschau, CSV-Export und Top-3-Redline-Klauseln.',
      proBadge: 'Pro-Lizenz · Bis zu 3 Geräte',
      proTitle: '10-Jahres-Arbeitsmappen & Vollständiger Redline',
      proDesc: 'Schaltet 10-Jahres-Excel (.xlsx) Downloads, vollständige Item-1A-/MD&A-Vergleiche, Berichte ohne Wasserzeichen und das Night-Desk-Theme frei.',
      btnLifetime: 'Lifetime ($29.90 einmalig)',
      btnMonthly: 'Monatlich ($5.99/Mo)',
      subExcelH1: 'Offizielle SEC-EDGAR-XBRL-Daten in 4-Blatt-Formel-Excel (.xlsx) umwandeln.',
      subRedlineH1: 'Jede neue, geänderte und gestrichene Risikoklausel zwischen zwei 10-K-Berichten erkennen.',
      subAltmanH1: 'Altman Z-Score & Beneish M-Score direkt aus geprüften SEC-XBRL-Konten.',
      privacyH1: 'Datenschutzerklärung: FilingCraft Studio Pro'
    },
    fr: {
      navOverview: 'Accueil',
      navExcel: 'XBRL vers Excel',
      navRedline: 'Redline 10-K',
      navAltman: 'Altman Z & M',
      navBrief: 'Exemple de rapport',
      navPrivacy: 'Confidentialité',
      heroTitle: 'Données SEC EDGAR XBRL officielles en Excel à formules (.xlsx) & Redline 10-K dans votre navigateur.',
      heroLead: 'Fini les scrapers cassés. FilingCraft interroge data.sec.gov en direct, calcule Altman Z et Beneish M, prévisualise chaque formule Excel avant export et compare les risques Item 1A sans aucun serveur.',
      ctaEdge: 'Installer sur Edge & Chrome',
      ctaFirefox: 'Installer sur Firefox',
      ctaBrief: 'Voir le dossier exemple AAPL',
      sandboxH2: 'Aperçu interactif avant installation',
      modeValues: 'Valeurs',
      modeFormulas: 'Formules (=fx)',
      priceLabel: 'Cours ($)',
      capH2: 'Conçu pour la rigueur financière',
      cap1T: 'Normalisation XBRL officielle',
      cap1B: 'Élimine les doublons comparatifs et isole les exercices annuels complets pour les 3 états financiers.',
      cap2T: 'Excel 4 onglets à formules .xlsx',
      cap2B: 'Compatible Windows Excel, macOS Excel et Apple Numbers sans macros ni formules propriétaires.',
      cap3T: 'Redline des risques 10-K',
      cap3B: 'Ignore les sommaires trompeurs et compare mot à mot les sections Item 1A et MD&A.',
      shotsH2: 'Captures réelles (Archival Folio & Night Desk)',
      pricingH2: 'Tarification simple sans limite de tickers',
      freeBadge: 'Gratuit · 0 $',
      freeTitle: 'Recherche XBRL & Aperçu des formules',
      freeDesc: 'Recherche illimitée par ticker/CIK, 3 ans d’états financiers, Altman Z & Beneish M, grille de formules interactive, export CSV et 3 premières clauses Redline.',
      proBadge: 'Licence Pro · Jusqu’à 3 appareils',
      proTitle: 'Modèles Excel 10 ans & Redline complet',
      proDesc: 'Débloque les classeurs .xlsx sur 10 ans, l’intégralité du diff 10-K, les rapports HTML/PDF sans filigrane et le thème Night Desk.',
      btnLifetime: 'Licence à vie (29,90 $)',
      btnMonthly: 'Mensuel (5,99 $/mois)',
      subExcelH1: 'Convertissez SEC EDGAR XBRL en classeur Excel (.xlsx) à 4 onglets.',
      subRedlineH1: 'Repérez chaque ajout, révision ou suppression dans les risques 10-K.',
      subAltmanH1: 'Scores Altman Z et Beneish M calculés depuis les comptes XBRL audités.',
      privacyH1: 'Politique de confidentialité : FilingCraft Studio Pro'
    },
    es: {
      navOverview: 'Inicio',
      navExcel: 'XBRL a Excel',
      navRedline: 'Redline 10-K',
      navAltman: 'Altman Z y M',
      navBrief: 'Informe Ejemplo',
      navPrivacy: 'Privacidad',
      heroTitle: 'Datos SEC EDGAR XBRL oficiales en Excel con fórmulas (.xlsx) y Redline 10-K en tu navegador.',
      heroLead: 'Olvídate de scrapers rotos. FilingCraft consulta data.sec.gov directamente, calcula Altman Z y Beneish M, previsualiza cada fórmula Excel antes de descargar y compara riesgos del Item 1A sin servidores.',
      ctaEdge: 'Obtener para Edge y Chrome',
      ctaFirefox: 'Obtener para Firefox',
      ctaBrief: 'Ver dossier de ejemplo AAPL',
      sandboxH2: 'Previsualiza qué genera FilingCraft antes de instalar',
      modeValues: 'Valores',
      modeFormulas: 'Fórmulas (=fx)',
      priceLabel: 'Precio ($)',
      capH2: 'Diseñado para precisión de auditoría',
      cap1T: 'Normalización XBRL oficial',
      cap1B: 'Elimina duplicados comparativos en reportes 10-K y separa ejercicios anuales completos.',
      cap2T: 'Excel .xlsx de 4 hojas con fórmulas',
      cap2B: 'Compatible con Excel Windows/Mac y Apple Numbers sin macros; editar B5 recalcula todo el libro.',
      cap3T: 'Redline de Riesgos 10-K',
      cap3B: 'Omite índices falsos y compara palabra por palabra las secciones Item 1A y Item 7 MD&A.',
      shotsH2: 'Pantallas reales de la extensión (Archival Folio y Night Desk)',
      pricingH2: 'Precios claros sin límite de empresas',
      freeBadge: 'Plan Gratis · $0',
      freeTitle: 'Consulta XBRL y vista previa de fórmulas',
      freeDesc: 'Búsqueda ilimitada SEC, vista de 3 años, Altman Z y Beneish M, cuadrícula de fórmulas interactiva, exportación CSV y 3 primeras cláusulas Redline.',
      proBadge: 'Licencia Pro · Hasta 3 dispositivos',
      proTitle: 'Libros Excel 10 años y Redline completo',
      proDesc: 'Desbloquea libros .xlsx de 10 años, comparativa completa 10-K, informes HTML/PDF sin marca de agua y tema Night Desk.',
      btnLifetime: 'Vitalicia ($29.90 pago único)',
      btnMonthly: 'Mensual ($5.99/mes)',
      subExcelH1: 'Convierte SEC EDGAR XBRL en libros Excel (.xlsx) de 4 hojas con fórmulas.',
      subRedlineH1: 'Detecta cada cláusula añadida, revisada o eliminada entre dos informes 10-K.',
      subAltmanH1: 'Cálculo instantáneo de Altman Z-Score y Beneish M-Score desde XBRL oficial.',
      privacyH1: 'Política de Privacidad: FilingCraft Studio Pro'
    }
  };

  function normLang(raw) {
    var s = String(raw || '').trim().replace('-', '_');
    if (DICT[s]) return s;
    var low = s.toLowerCase();
    if (low.indexOf('zh_tw') !== -1 || low.indexOf('zh_hk') !== -1) return 'zh_TW';
    if (low.indexOf('zh') !== -1) return 'zh_CN';
    var base = low.split('_')[0];
    if (DICT[base]) return base;
    return 'en';
  }

  function getSavedLang() {
    try {
      var params = new URLSearchParams(window.location.search);
      var q = params.get('lang');
      if (q) return normLang(q);
      var stored = localStorage.getItem('filingcraft_site_lang');
      if (stored) return normLang(stored);
    } catch (e) {}
    return document.documentElement.lang === 'de' ? 'de' : normLang(navigator.language || 'en');
  }

  function applyLang(lang) {
    var code = normLang(lang);
    try { localStorage.setItem('filingcraft_site_lang', code); } catch (e) {}
    document.documentElement.lang = code.replace('_', '-');
    var table = DICT[code] || DICT.en;
    var nodes = document.querySelectorAll('[data-site-i18n]');
    for (var i = 0; i < nodes.length; i++) {
      var k = nodes[i].getAttribute('data-site-i18n');
      if (table[k] || DICT.en[k]) nodes[i].textContent = table[k] || DICT.en[k];
    }
    var valSpan = document.querySelector('#fc-site-lang .site-lb-val');
    var match = OPTIONS.find(function (o) { return o.v === code; });
    if (valSpan && match) valSpan.textContent = match.l;
    document.querySelectorAll('#fc-site-lang .site-lb-opt').forEach(function (opt) {
      var isSel = opt.getAttribute('data-lang') === code;
      opt.classList.toggle('is-sel', isSel);
      opt.setAttribute('aria-selected', isSel ? 'true' : 'false');
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var slot = document.getElementById('fc-site-lang');
    if (!slot) return;
    var active = getSavedLang();

    slot.className = 'site-lb';
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'site-lb-btn';
    btn.setAttribute('aria-haspopup', 'listbox');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Switch Site Language');
    var val = document.createElement('span');
    val.className = 'site-lb-val';
    var caret = document.createElement('span');
    caret.textContent = '▾';
    btn.appendChild(val);
    btn.appendChild(caret);

    var menu = document.createElement('ul');
    menu.className = 'site-lb-menu';
    menu.setAttribute('role', 'listbox');
    menu.hidden = true;

    OPTIONS.forEach(function (opt) {
      var li = document.createElement('li');
      li.className = 'site-lb-opt';
      li.setAttribute('role', 'option');
      li.setAttribute('data-lang', opt.v);
      li.tabIndex = 0;
      li.textContent = opt.l;
      li.addEventListener('click', function () {
        applyLang(opt.v);
        menu.hidden = true;
        btn.setAttribute('aria-expanded', 'false');
      });
      li.addEventListener('keydown', function (ev) {
        if (ev.key === 'Enter' || ev.key === ' ') {
          ev.preventDefault();
          li.click();
        } else if (ev.key === 'Escape') {
          menu.hidden = true;
          btn.setAttribute('aria-expanded', 'false');
          btn.focus();
        }
      });
      menu.appendChild(li);
    });

    btn.addEventListener('click', function (ev) {
      ev.stopPropagation();
      menu.hidden = !menu.hidden;
      btn.setAttribute('aria-expanded', menu.hidden ? 'false' : 'true');
    });
    document.addEventListener('click', function (ev) {
      if (!slot.contains(ev.target)) {
        menu.hidden = true;
        btn.setAttribute('aria-expanded', 'false');
      }
    });

    slot.appendChild(btn);
    slot.appendChild(menu);
    applyLang(active);
  });
})();
