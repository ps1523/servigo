import { useState, useEffect, useRef, useCallback } from "react";
import AdminDashboard from "./AdminPanel";

// ─── THEME DEFINITIONS ────────────────────────────────────────────────────────
export const THEMES = {
  dark: {
    font: "'Clash Display', 'Cabinet Grotesk', system-ui, sans-serif",
    body: "'Satoshi', 'DM Sans', system-ui, sans-serif",
    bg: "#05050a",
    surface: "#0e0e18",
    card: "#141420",
    cardHover: "#1a1a2e",
    border: "rgba(255,255,255,0.07)",
    borderHover: "rgba(255,255,255,0.16)",
    accent: "#ff6b35",
    accentGlow: "rgba(255,107,53,0.25)",
    accentDim: "rgba(255,107,53,0.12)",
    text: "#f4f4f8",
    muted: "#6b6b88",
    success: "#22d37a",
    danger: "#ff4757",
    info: "#4a9eff",
    warn: "#ffb347",
  },
  light: {
    font: "'Clash Display', 'Cabinet Grotesk', system-ui, sans-serif",
    body: "'Satoshi', 'DM Sans', system-ui, sans-serif",
    bg: "#f8f9fa",
    surface: "#ffffff",
    card: "#f1f3f5",
    cardHover: "#e9ecef",
    border: "rgba(0,0,0,0.08)",
    borderHover: "rgba(0,0,0,0.16)",
    accent: "#ff6b35",
    accentGlow: "rgba(255,107,53,0.15)",
    accentDim: "rgba(255,107,53,0.08)",
    text: "#1a1a2e",
    muted: "#868e96",
    success: "#22d37a",
    danger: "#ff4757",
    info: "#4a9eff",
    warn: "#ffb347",
  }
};

// Default G for backwards compatibility (dark theme)
const G = THEMES.dark;

// Function to get theme colors
export const getTheme = (themeName = "dark") => THEMES[themeName] || THEMES.dark;

// ─── LANGUAGE TRANSLATIONS ───────────────────────────────────────────────────
export const LANGUAGES = {
  en: {
    name: "English",
    bookService: "Book a Service",
    myBookings: "My Bookings",
    profile: "Profile",
    selectService: "Select Service",
    yourName: "Your Name",
    mobileNumber: "Mobile Number",
    fullAddress: "Full Address",
    preferredDateTime: "Preferred Date & Time",
    describeProblem: "Describe Your Problem",
    confirmBooking: "Confirm Booking",
    myProfile: "My Profile",
    email: "Email",
    mobile: "Mobile",
    totalBookings: "Total Bookings",
    completed: "Completed",
    joinedSince: "Member since",
    noBookings: "No bookings yet",
    bookingConfirmed: "Booking confirmed!",
    fillAllFields: "Fill all required fields",
    talkToSomeone: "Talk to Someone",
    pricing: "Pricing",
    estimatedPrice: "Estimated base price",
    selectTimeSlot: "Select Time Slot",
    selectDays: "Select Number of Days",
    selectState: "Select State",
    selectCity: "Select City",
    duration: "Duration",
    services: "Services",
    home: "Home",
    logout: "Logout",
    login: "Login",
    signUp: "Sign Up Free",
    welcome: "Welcome",
    admin: "ADMIN",
    newUser: "New User?",
    password: "Password",
    firstName: "First Name",
    lastName: "Last Name",
    createAccount: "Create Account",
    alreadyHave: "Already have an account?",
    dashboard: "Dashboard",
    myServices: "My Services",
    history: "History",
    trustedPlatform: "Trusted Labour & Home Service Platform",
    bookSkilled: "Book Skilled Professionals At Your Doorstep",
    verified: "verified",
    professionals: "professionals",
    underTwoMin: "Book in under 2 minutes",
    withinTwentyFour: "service within 24 hours",
    noHidden: "No hidden charges",
    realReviews: "Real reviews from verified",
    whyUs: "Why ServiGo?",
    startingPrice: "Starting ₹",
    bookNow: "Book Now",
    selectLanguage: "Select Language",
    revenue: "Revenue",
    topServices: "Top Services",
    customerSatisfaction: "Satisfaction",
    avgRating: "Avg Rating",
    averageValue: "Average Value",
    cancelled: "Cancelled",
    pending: "Pending",
    confirmed: "Confirmed",
    done: "Done",
  },
  hi: {
    name: "हिन्दी",
    bookService: "सेवा बुक करें",
    myBookings: "मेरी बुकिंग",
    profile: "प्रोफाइल",
    selectService: "सेवा चुनें",
    yourName: "आपका नाम",
    mobileNumber: "मोबाइल नंबर",
    fullAddress: "पूरा पता",
    preferredDateTime: "पसंदीदा तारीख और समय",
    describeProblem: "समस्या का विवरण दें",
    confirmBooking: "बुकिंग की पुष्टि करें",
    myProfile: "मेरी प्रोफाइल",
    email: "ईमेल",
    mobile: "मोबाइल",
    totalBookings: "कुल बुकिंग",
    completed: "पूर्ण",
    joinedSince: "सदस्य बने",
    noBookings: "अभी कोई बुकिंग नहीं",
    bookingConfirmed: "बुकिंग की पुष्टि हुई!",
    fillAllFields: "सभी आवश्यक क्षेत्र भरें",
    talkToSomeone: "किसी से बात करें",
    pricing: "कीमत",
    estimatedPrice: "अनुमानित आधार मूल्य",
    selectTimeSlot: "समय स्लॉट चुनें",
    selectDays: "दिनों की संख्या चुनें",
    selectState: "राज्य चुनें",
    selectCity: "शहर चुनें",
    duration: "अवधि",
    services: "सेवाएं",
    home: "होम",
    logout: "लॉगआउट",
    login: "लॉगिन",
    signUp: "मुफ्त में साइन अप करें",
    welcome: "स्वागत है",
    admin: "व्यवस्थापक",
    newUser: "नया उपयोगकर्ता?",
    password: "पासवर्ड",
    firstName: "पहला नाम",
    lastName: "अंतिम नाम",
    createAccount: "खाता बनाएं",
    alreadyHave: "पहले से खाता है?",
    dashboard: "डैशबोर्ड",
    myServices: "मेरी सेवाएं",
    history: "इतिहास",
    selectLanguage: "भाषा चुनें",
    revenue: "राजस्व",
    topServices: "शीर्ष सेवाएं",
    customerSatisfaction: "संतुष्टि",
    avgRating: "औसत रेटिंग",
    averageValue: "औसत मूल्य",
    cancelled: "रद्द",
    pending: "लंबित",
    confirmed: "पुष्ट",
    done: "पूर्ण",
  },
  es: {
    name: "Español",
    bookService: "Reservar un servicio",
    myBookings: "Mis reservas",
    profile: "Perfil",
    selectService: "Seleccionar servicio",
    yourName: "Tu nombre",
    mobileNumber: "Número de móvil",
    fullAddress: "Dirección completa",
    preferredDateTime: "Fecha y hora preferidas",
    describeProblem: "Describe tu problema",
    confirmBooking: "Confirmar reserva",
    myProfile: "Mi perfil",
    email: "Correo electrónico",
    mobile: "Móvil",
    totalBookings: "Reservas totales",
    completed: "Completado",
    joinedSince: "Miembro desde",
    noBookings: "Sin reservas aún",
    bookingConfirmed: "¡Reserva confirmada!",
    fillAllFields: "Rellena todos los campos",
    talkToSomeone: "Habla con alguien",
    pricing: "Precios",
    estimatedPrice: "Precio base estimado",
    selectTimeSlot: "Seleccionar intervalo de tiempo",
    selectDays: "Seleccionar número de días",
    selectState: "Seleccionar estado",
    selectCity: "Seleccionar ciudad",
    duration: "Duración",
    services: "Servicios",
    home: "Inicio",
    logout: "Cerrar sesión",
    login: "Iniciar sesión",
    signUp: "Registrarse gratis",
    welcome: "Bienvenido",
    admin: "ADMIN",
    newUser: "¿Nuevo usuario?",
    password: "Contraseña",
    firstName: "Nombre",
    lastName: "Apellido",
    createAccount: "Crear cuenta",
    alreadyHave: "¿Ya tienes cuenta?",
    dashboard: "Panel de control",
    myServices: "Mis servicios",
    history: "Historial",
    selectLanguage: "Seleccionar idioma",
    revenue: "Ingresos",
    topServices: "Servicios principales",
    customerSatisfaction: "Satisfacción",
    avgRating: "Calificación promedio",
    averageValue: "Valor promedio",
    cancelled: "Cancelado",
    pending: "Pendiente",
    confirmed: "Confirmado",
    done: "Hecho",
  },
  fr: {
    name: "Français",
    bookService: "Réserver un service",
    myBookings: "Mes réservations",
    profile: "Profil",
    selectService: "Sélectionner un service",
    yourName: "Votre nom",
    mobileNumber: "Numéro mobile",
    fullAddress: "Adresse complète",
    preferredDateTime: "Date et heure préférées",
    describeProblem: "Décrivez votre problème",
    confirmBooking: "Confirmer la réservation",
    myProfile: "Mon profil",
    email: "E-mail",
    mobile: "Mobile",
    totalBookings: "Réservations totales",
    completed: "Completed",
    joinedSince: "Membre depuis",
    noBookings: "Pas encore de réservations",
    bookingConfirmed: "Réservation confirmée!",
    fillAllFields: "Remplissez tous les champs",
    talkToSomeone: "Parler à quelqu'un",
    pricing: "Prix",
    estimatedPrice: "Prix de base estimé",
    selectTimeSlot: "Sélectionner une plage horaire",
    selectDays: "Sélectionner le nombre de jours",
    duration: "Durée",
    services: "Services",
    home: "Accueil",
    logout: "Se déconnecter",
    login: "Connexion",
    signUp: "S'inscrire gratuitement",
    welcome: "Bienvenue",
    admin: "ADMIN",
    newUser: "Nouvel utilisateur?",
    password: "Mot de passe",
    firstName: "Prénom",
    lastName: "Nom",
    createAccount: "Créer un compte",
    alreadyHave: "Vous avez déjà un compte?",
    dashboard: "Tableau de bord",
    myServices: "Mes services",
    history: "Historique",
    selectLanguage: "Sélectionner la langue",
    revenue: "Revenu",
    topServices: "Services principaux",
    customerSatisfaction: "Satisfaction",
    avgRating: "Note moyenne",
    averageValue: "Valeur moyenne",
    cancelled: "Annulé",
    pending: "En attente",
    confirmed: "Confirmé",
    done: "Terminé",
  },
  de: {
    name: "Deutsch",
    bookService: "Einen Service buchen",
    myBookings: "Meine Buchungen",
    profile: "Profil",
    selectService: "Service wählen",
    yourName: "Ihr Name",
    mobileNumber: "Handynummer",
    fullAddress: "Vollständige Adresse",
    preferredDateTime: "Bevorzugtes Datum und Zeit",
    describeProblem: "Beschreiben Sie Ihr Problem",
    confirmBooking: "Buchung bestätigen",
    myProfile: "Mein Profil",
    email: "E-Mail",
    mobile: "Mobil",
    totalBookings: "Gesamtbuchungen",
    completed: "Abgeschlossen",
    joinedSince: "Mitglied seit",
    noBookings: "Noch keine Buchungen",
    bookingConfirmed: "Buchung bestätigt!",
    fillAllFields: "Füllen Sie alle Felder aus",
    talkToSomeone: "Mit jemandem sprechen",
    pricing: "Preisgestaltung",
    estimatedPrice: "Geschätzter Grundpreis",
    selectTimeSlot: "Zeitfenster wählen",
    selectDays: "Anzahl der Tage wählen",
    duration: "Dauer",
    services: "Dienstleistungen",
    home: "Startseite",
    logout: "Abmelden",
    login: "Anmelden",
    signUp: "Kostenlos anmelden",
    welcome: "Willkommen",
    admin: "ADMIN",
    newUser: "Neuer Benutzer?",
    password: "Passwort",
    firstName: "Vorname",
    lastName: "Nachname",
    createAccount: "Konto erstellen",
    alreadyHave: "Haben Sie bereits ein Konto?",
    dashboard: "Dashboard",
    myServices: "Meine Dienste",
    history: "Verlauf",
    selectLanguage: "Sprache wählen",
    revenue: "Umsatz",
    topServices: "Top-Services",
    customerSatisfaction: "Zufriedenheit",
    avgRating: "Durchschnittliche Bewertung",
    averageValue: "Durchschnittswert",
    cancelled: "Storniert",
    pending: "Ausstehend",
    confirmed: "Bestätigt",
    done: "Erledigt",
  },
  pt: {
    name: "Português",
    bookService: "Reservar um serviço",
    myBookings: "Minhas reservas",
    profile: "Perfil",
    selectService: "Selecionar serviço",
    yourName: "Seu nome",
    mobileNumber: "Número de celular",
    fullAddress: "Endereço completo",
    preferredDateTime: "Data e hora preferidas",
    describeProblem: "Descreva seu problema",
    confirmBooking: "Confirmar reserva",
    myProfile: "Meu perfil",
    email: "Email",
    mobile: "Celular",
    totalBookings: "Total de reservas",
    completed: "Concluído",
    joinedSince: "Membro desde",
    noBookings: "Nenhuma reserva ainda",
    bookingConfirmed: "Reserva confirmada!",
    fillAllFields: "Preencha todos os campos",
    talkToSomeone: "Falar com alguém",
    pricing: "Preços",
    estimatedPrice: "Preço base estimado",
    selectTimeSlot: "Selecionar intervalo de tempo",
    selectDays: "Selecionar número de dias",
    duration: "Duração",
    services: "Serviços",
    home: "Início",
    logout: "Sair",
    login: "Entrar",
    signUp: "Inscrever-se gratuitamente",
    welcome: "Bem-vindo",
    admin: "ADMIN",
    newUser: "Novo usuário?",
    password: "Senha",
    firstName: "Primeiro nome",
    lastName: "Sobrenome",
    createAccount: "Criar conta",
    alreadyHave: "Já tem uma conta?",
    dashboard: "Painel",
    myServices: "Meus serviços",
    history: "Histórico",
    selectLanguage: "Selecionar idioma",
    revenue: "Receita",
    topServices: "Principais serviços",
    customerSatisfaction: "Satisfação",
    avgRating: "Classificação média",
    averageValue: "Valor médio",
    cancelled: "Cancelado",
    pending: "Pendente",
    confirmed: "Confirmado",
    done: "Concluído",
  },
  bn: {
    name: "বাংলা",
    bookService: "সেবা বুক করুন",
    myBookings: "আমার বুকিং",
    profile: "প্রোফাইল",
    selectService: "সেবা নির্বাচন করুন",
    yourName: "আপনার নাম",
    mobileNumber: "মোবাইল নম্বর",
    fullAddress: "সম্পূর্ণ ঠিকানা",
    preferredDateTime: "পছন্দের তারিখ এবং সময়",
    describeProblem: "আপনার সমস্যা বর্ণনা করুন",
    confirmBooking: "বুকিং নিশ্চিত করুন",
    myProfile: "আমার প্রোফাইল",
    email: "ইমেল",
    mobile: "মোবাইল",
    totalBookings: "মোট বুকিং",
    completed: "সম্পূর্ণ",
    joinedSince: "থেকে সদস্য",
    noBookings: "এখনও কোন বুকিং নেই",
    bookingConfirmed: "বুকিং নিশ্চিত!",
    fillAllFields: "সমস্ত ক্ষেত্র পূরণ করুন",
    talkToSomeone: "কাউকে কথা বলুন",
    pricing: "মূল্য নির্ধারণ",
    estimatedPrice: "অনুমানিত মূল্য",
    selectTimeSlot: "সময় স্লট নির্বাচন করুন",
    selectDays: "দিনের সংখ্যা নির্বাচন করুন",
    duration: "সময়কাল",
    services: "সেবা",
    home: "বাড়ি",
    logout: "লগআউট",
    login: "লগইন",
    signUp: "বিনামূল্যে সাইন আপ করুন",
    welcome: "স্বাগতম",
    admin: "প্রশাসক",
    newUser: "নতুন ব্যবহারকারী?",
    password: "পাসওয়ার্ড",
    firstName: "প্রথম নাম",
    lastName: "শেষ নাম",
    createAccount: "অ্যাকাউন্ট তৈরি করুন",
    alreadyHave: "ইতিমধ্যে অ্যাকাউন্ট আছে?",
    dashboard: "ড্যাশবোর্ড",
    myServices: "আমার সেবা",
    history: "ইতিহাস",
    selectLanguage: "ভাষা নির্বাচন করুন",
    revenue: "রাজস্ব",
    topServices: "শীর্ষ সেবা",
    customerSatisfaction: "সন্তুষ্টি",
    avgRating: "গড় রেটিং",
    averageValue: "গড় মূল্য",
    cancelled: "বাতিল",
    pending: "মুলতুবি",
    confirmed: "নিশ্চিত",
    done: "সম্পন্ন",
  },
  ja: {
    name: "日本語",
    bookService: "サービスを予約",
    myBookings: "私の予約",
    profile: "プロフィール",
    selectService: "サービスを選択",
    yourName: "あなたの名前",
    mobileNumber: "携帯電話番号",
    fullAddress: "住所",
    preferredDateTime: "希望の日時",
    describeProblem: "問題を説明してください",
    confirmBooking: "予約を確認",
    myProfile: "マイプロフィール",
    email: "メール",
    mobile: "携帯",
    totalBookings: "予約総数",
    completed: "完了",
    joinedSince: "参加以来",
    noBookings: "まだ予約がありません",
    bookingConfirmed: "予約が確認されました!",
    fillAllFields: "すべてのフィールドに入力してください",
    talkToSomeone: "誰かと話す",
    pricing: "料金",
    estimatedPrice: "推定基本価格",
    selectTimeSlot: "時間帯を選択",
    selectDays: "日数を選択",
    duration: "期間",
    services: "サービス",
    home: "ホーム",
    logout: "ログアウト",
    login: "ログイン",
    signUp: "無料でサインアップ",
    welcome: "ようこそ",
    admin: "管理者",
    newUser: "新規ユーザー?",
    password: "パスワード",
    firstName: "名",
    lastName: "姓",
    createAccount: "アカウントを作成",
    alreadyHave: "既にアカウントをお持ちですか?",
    dashboard: "ダッシュボード",
    myServices: "マイサービス",
    history: "履歴",
    selectLanguage: "言語を選択",
    revenue: "収益",
    topServices: "トップサービス",
    customerSatisfaction: "満足度",
    avgRating: "平均評価",
    averageValue: "平均値",
    cancelled: "キャンセル",
    pending: "保留中",
    confirmed: "確認済み",
    done: "完了",
  },
  ta: {
    name: "தமிழ்",
    bookService: "சேவை முன்பதிவு செய்யவும்",
    myBookings: "என் முன்பதிவுகள்",
    profile: "சுயவிவரம்",
    selectService: "சேவை தேர்ந்தெடுக்கவும்",
    yourName: "உங்கள் பெயர்",
    mobileNumber: "மொபைல் எண்",
    fullAddress: "முழு முகவரி",
    preferredDateTime: "விரும்பிய தேதி மற்றும் நேரம்",
    describeProblem: "உங்கள் சிக்கலை விவரிக்கவும்",
    confirmBooking: "முன்பதிவு உறுதிப்படுத்தவும்",
    myProfile: "என் சுயவிவரம்",
    email: "மின்னஞ்சல்",
    mobile: "மொபைல்",
    totalBookings: "மொத்த முன்பதிவுகள்",
    completed: "முடிந்தது",
    joinedSince: "முதல் உறுப்பினர்",
    noBookings: "இன்னும் முன்பதிவுகள் இல்லை",
    bookingConfirmed: "முன்பதிவு உறுதிப்பட்டது!",
    fillAllFields: "அனைத்து தேவையான புலங்களை நிரப்பவும்",
    talkToSomeone: "யாருடன் பேசுங்கள்",
    pricing: "விலை நির்ধारணை",
    estimatedPrice: "மதிப்பிடப்பட்ட அடிப்படை விலை",
    selectTimeSlot: "நேர அட்டவணையைத் தேர்ந்தெடுக்கவும்",
    selectDays: "நாட்களின் எண்ணிக்கையைத் தேர்ந்தெடுக்கவும்",
    duration: "கால அவधि",
    services: "சேவைகள்",
    home: "வீடு",
    logout: "வெளியேறு",
    login: "உள்நுழைக",
    signUp: "இலவசம் பதிவு செய்யவும்",
    welcome: "வரவேற்கிறோம்",
    admin: "நிர்வாகி",
    newUser: "புதிய பயனர்?",
    password: "கடவுச்சொல்",
    firstName: "முதல் பெயர்",
    lastName: "கடைசி பெயர்",
    createAccount: "கணக்கு உருவாக்கவும்",
    alreadyHave: "ஏற்கனவே கணக்கு உள்ளதா?",
    dashboard: "டேஷ்போர்டு",
    myServices: "என் சேவைகள்",
    history: "வரலாறு",
    selectLanguage: "மொழியைத் தேர்ந்தெடுக்கவும்",
    revenue: "வருவாய்",
    topServices: "சிறந்த சேவைகள்",
    customerSatisfaction: "திருப்தி",
    avgRating: "சராசரி மதிப்பீடு",
    averageValue: "சராசரி மதிப்பு",
    cancelled: "ரத்து செய்யப்பட்டது",
    pending: "நிலுவையில் உள்ளது",
    confirmed: "உறுதிப்படுத்தப்பட்டது",
    done: "முடிந்தது",
  },
  mr: {
    name: "मराठी",
    bookService: "सेवा बुक करा",
    myBookings: "माझी बुकिंग",
    profile: "प्रोफाइल",
    selectService: "सेवा निवडा",
    yourName: "तुमचे नाव",
    mobileNumber: "मोबाइल नंबर",
    fullAddress: "पूर्ण पत्ता",
    preferredDateTime: "पसंदीचा तारीख आणि वेळ",
    describeProblem: "तुमची समस्या वर्णन करा",
    confirmBooking: "बुकिंग कन्फर्म करा",
    myProfile: "माझी प्रोफाइल",
    email: "ईमेल",
    mobile: "मोबाइल",
    totalBookings: "एकूण बुकिंग",
    completed: "पूर्ण",
    joinedSince: "सदस्य असल्याने",
    noBookings: "अद्याप कोणतीही बुकिंग नाही",
    bookingConfirmed: "बुकिंग कन्फर्म झाली!",
    fillAllFields: "सर्व आवश्यक फील्ड भरा",
    talkToSomeone: "कोणाशिच बोला",
    pricing: "किंमत",
    estimatedPrice: "अनुमानित मूल्य",
    selectTimeSlot: "वेळ स्लॉट निवडा",
    selectDays: "दिनांची संख्या निवडा",
    duration: "कालावधी",
    services: "सेवा",
    home: "होम",
    logout: "लॉगआउट",
    login: "लॉगिन",
    signUp: "विनामूल्य साइन अप करा",
    welcome: "स्वागत आहे",
    admin: "प्रशासक",
    newUser: "नवीन वापरकर्ता?",
    password: "पासवर्ड",
    firstName: "नाव",
    lastName: "आडनाव",
    createAccount: "खाते तयार करा",
    alreadyHave: "आधीच खाते आहे?",
    dashboard: "डॅशबोर्ड",
    myServices: "माझ्या सेवा",
    history: "इतिहास",
    selectLanguage: "भाषा निवडा",
    revenue: "कमाई",
    topServices: "शीर्ष सेवा",
    customerSatisfaction: "समाधान",
    avgRating: "सरासरी रेटिंग",
    averageValue: "सरासरी मूल्य",
    cancelled: "रद्द केले",
    pending: "प्रलंबित",
    confirmed: "पुष्टी केली",
    done: "पूर्ण",
  },
  te: {
    name: "తెలుగు",
    bookService: "సేవ బుక్ చేయండి",
    myBookings: "నా బుకింగ్‌లు",
    profile: "ప్రొఫైల్",
    selectService: "సేవను ఎంచుకోండి",
    yourName: "మీ పేరు",
    mobileNumber: "మొబైల్ నంబర్",
    fullAddress: "పూర్తి చిరునామా",
    preferredDateTime: "ఇష్ట తేదీ మరియు సమయం",
    describeProblem: "మీ సమస్యను వివరించండి",
    confirmBooking: "బుకింగ్ నిర్ధారించండి",
    myProfile: "నా ప్రొఫైల్",
    email: "ఇమెయిల్",
    mobile: "మొబైల్",
    totalBookings: "మొత్తం బుకింగ్‌లు",
    completed: "పూర్తి",
    joinedSince: "నుండి సభ్యుడు",
    noBookings: "ఇంకా బుకింగ్‌లు లేవు",
    bookingConfirmed: "బుకింగ్ నిర్ధారించబడింది!",
    fillAllFields: "అన్ని అవసరమైన ఫీల్డ్‌లను పూరించండి",
    talkToSomeone: "ఎవరితో మాట్లాడండి",
    pricing: "ధర",
    estimatedPrice: "అంచనా ధర",
    selectTimeSlot: "సమయ స్లాట్ ఎంచుకోండి",
    selectDays: "రోజుల సంఖ్యను ఎంచుకోండి",
    duration: "కాలం",
    services: "సేవలు",
    home: "హోమ్",
    logout: "లాగ్‌అవుట్",
    login: "లాగిన్",
    signUp: "ఉచితంగా సైన్ అప్ చేయండి",
    welcome: "స్వాగతం",
    admin: "నిర్వాహకుడు",
    newUser: "కొత్త వినియోగదారు?",
    password: "పాస్‌వర్డ్",
    firstName: "మొదటి పేరు",
    lastName: "ఆఖరి పేరు",
    createAccount: "ఖాతా సృష్టించండి",
    alreadyHave: "ఇప్పటికే ఖాతా ఉందా?",
    dashboard: "డ్యాష్‌బోర్డ్",
    myServices: "నా సేవలు",
    history: "చరిత్ర",
    selectLanguage: "భాషను ఎంచుకోండి",
    revenue: "రాబడి",
    topServices: "ఉన్నత సేవలు",
    customerSatisfaction: "సంతృప్తి",
    avgRating: "సరాసరి రేటింగ్",
    averageValue: "సరాసరి విలువ",
    cancelled: "రద్దు చేయబడింది",
    pending: "పెండింగ్",
    confirmed: "నిర్ధారించబడింది",
    done: "పూర్తి",
  },
  ml: {
    name: "മലയാളം",
    bookService: "സേവനം ബുക്ക് ചെയ്യുക",
    myBookings: "എന്റെ ബുക്കിംഗുകൾ",
    profile: "പ്രൊഫൈൽ",
    selectService: "സേവനം തിരഞ്ഞെടുക്കുക",
    yourName: "നിങ്ങളുടെ പേര്",
    mobileNumber: "മൊബൈൽ നമ്പർ",
    fullAddress: "പൂർണ്ണ വിലാസം",
    preferredDateTime: "ആഗ്രഹിച്ച തീയതിയും സമയവും",
    describeProblem: "നിങ്ങളുടെ പ്രശ്നം വിവരിക്കുക",
    confirmBooking: "ബുക്കിംഗ് സ്ഥിരീകരിക്കുക",
    myProfile: "എന്റെ പ്രൊഫൈൽ",
    email: "ഇമെയിൽ",
    mobile: "മൊബൈൽ",
    totalBookings: "ആകെ ബുക്കിംഗുകൾ",
    completed: "പൂർത്തിയായി",
    joinedSince: "മുതൽ അംഗം",
    noBookings: "ഇതുവരെ ബുക്കിംഗുകൾ ഇല്ല",
    bookingConfirmed: "ബുക്കിംഗ് സ്ഥിരീകരിച്ചു!",
    fillAllFields: "എല്ലാ ആവശ്യമായ ഫീൽഡ് പൂരിപ്പിക്കുക",
    talkToSomeone: "ആരുമായി സംസാരിക്കുക",
    pricing: "വിലനിരൂപണം",
    estimatedPrice: "കണക്കാക്കിയ വില",
    selectTimeSlot: "സമയ സ്ലോട്ട് തിരഞ്ഞെടുക്കുക",
    selectDays: "ദിവസങ്ങളുടെ എണ്ണം തിരഞ്ഞെടുക്കുക",
    duration: "കാലാവധി",
    services: "സേവനങ്ങൾ",
    home: "ഹോം",
    logout: "ലോഗ് ഔട്ട് ചെയ്യുക",
    login: "ലോഗിൻ",
    signUp: "സ്വതന്ത്രമായി സൈൻ അപ്പ് ചെയ്യുക",
    welcome: "സ്വാഗതം",
    admin: "മന്ത്രി",
    newUser: "പുതിയ ഉപയോഗകർത്താവ്?",
    password: "പാസ്‌വേഡ്",
    firstName: "ആദ്യ നാം",
    lastName: "അവസാനം നാം",
    createAccount: "അക്കൗണ്ട് സൃഷ്ടിക്കുക",
    alreadyHave: "നിങ്ങൾക്കെ ഒരു അക്കൗണ്ട് ഉണ്ടോ?",
    dashboard: "ഡാഷ്‌ബോർഡ്",
    myServices: "എന്റെ സേവനങ്ങൾ",
    history: "ചരിത്രം",
    selectLanguage: "ഭാഷ തിരഞ്ഞെടുക്കുക",
    revenue: "വരുമാനം",
    topServices: "മികച്ച സേവനങ്ങൾ",
    customerSatisfaction: "സന്തുഷ്ടി",
    avgRating: "ശരാശരി റേറ്റിംഗ്",
    averageValue: "ശരാശരി മൂല്യം",
    cancelled: "റദ്ദ് ചെയ്തു",
    pending: "നിലപാട്",
    confirmed: "സ്ഥിരീകരിച്ചു",
    done: "പൂര്ത്തിയായി",
  },
  ar: {
    name: "العربية",
    bookService: "احجز خدمة",
    myBookings: "حجوزاتي",
    profile: "ملف تعريفي",
    selectService: "اختر الخدمة",
    yourName: "اسمك",
    mobileNumber: "رقم الهاتف المحمول",
    fullAddress: "العنوان الكامل",
    preferredDateTime: "التاريخ والوقت المفضل",
    describeProblem: "صف مشكلتك",
    confirmBooking: "تأكيد الحجز",
    myProfile: "ملفي الشخصي",
    email: "بريد إلكتروني",
    mobile: "الهاتف المحمول",
    totalBookings: "إجمالي الحجوزات",
    completed: "مكتمل",
    joinedSince: "عضو منذ",
    noBookings: "لا توجد حجوزات حتى الآن",
    bookingConfirmed: "تم تأكيد الحجز!",
    fillAllFields: "ملء جميع الحقول المطلوبة",
    talkToSomeone: "تحدث إلى شخص ما",
    pricing: "التسعير",
    estimatedPrice: "السعر المقدر",
    selectTimeSlot: "اختر فترة زمنية",
    selectDays: "اختر عدد الأيام",
    duration: "المدة",
    services: "الخدمات",
    home: "الصفحة الرئيسية",
    logout: "تسجيل الخروج",
    login: "تسجيل الدخول",
    signUp: "اشترك مجاناً",
    welcome: "أهلا وسهلا",
    admin: "المشرف",
    newUser: "مستخدم جديد؟",
    password: "كلمة المرور",
    firstName: "الاسم الأول",
    lastName: "الكنية",
    createAccount: "إنشاء حساب",
    alreadyHave: "هل لديك حساب بالفعل؟",
    dashboard: "لوحة التحكم",
    myServices: "خدماتي",
    history: "السجل",
    selectLanguage: "اختر اللغة",
    revenue: "الإيرادات",
    topServices: "أفضل الخدمات",
    customerSatisfaction: "الرضا",
    avgRating: "متوسط التصنيف",
    averageValue: "القيمة المتوسطة",
    cancelled: "ملغاة",
    pending: "قيد الانتظار",
    confirmed: "تم التأكيد",
    done: "تم",
  },
  zh: {
    name: "中文",
    bookService: "预订服务",
    myBookings: "我的预订",
    profile: "个人资料",
    selectService: "选择服务",
    yourName: "您的名字",
    mobileNumber: "手机号码",
    fullAddress: "完整地址",
    preferredDateTime: "首选日期和时间",
    describeProblem: "描述你的问题",
    confirmBooking: "确认预订",
    myProfile: "我的个人资料",
    email: "电子邮件",
    mobile: "手机",
    totalBookings: "总预订",
    completed: "已完成",
    joinedSince: "加入于",
    noBookings: "还没有预订",
    bookingConfirmed: "预订已确认!",
    fillAllFields: "填写所有必填字段",
    talkToSomeone: "与某人交谈",
    pricing: "定价",
    estimatedPrice: "估计价格",
    selectTimeSlot: "选择时间段",
    selectDays: "选择天数",
    duration: "持续时间",
    services: "服务",
    home: "首页",
    logout: "登出",
    login: "登录",
    signUp: "免费注册",
    welcome: "欢迎",
    admin: "管理员",
    newUser: "新用户?",
    password: "密码",
    firstName: "名字",
    lastName: "姓氏",
    createAccount: "创建账户",
    alreadyHave: "已经有账户？",
    dashboard: "仪表板",
    myServices: "我的服务",
    history: "历史",
    selectLanguage: "选择语言",
    revenue: "收入",
    topServices: "顶级服务",
    customerSatisfaction: "满意度",
    avgRating: "平均评分",
    averageValue: "平均值",
    cancelled: "已取消",
    pending: "待定",
    confirmed: "已确认",
    done: "完成",
  },
};

// ─── STATE & CITY MAPPING ─────────────────────────────────────────────────────
const STATE_CITIES = {
  "Andhra Pradesh": ["Hyderabad", "Vijayawada", "Visakhapatnam", "Tirupati"],
  "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat"],
  "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Nagaon"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"],
  "Chhattisgarh": ["Raipur", "Bilaspur", "Durg", "Rajnandgaon"],
  "Goa": ["Panaji", "Margao", "Vasco", "Pernem"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar"],
  "Haryana": ["Faridabad", "Gurgaon", "Hisar", "Rohtak", "Karnal"],
  "Himachal Pradesh": ["Shimla", "Solan", "Kangra", "Mandi"],
  "Jharkhand": ["Ranchi", "Dhanbad", "Jamshedpur", "Giridih"],
  "Karnataka": ["Bengaluru", "Mysore", "Mangalore", "Hubli", "Belgaum"],
  "Kerala": ["Kochi", "Thiruvananthapuram", "Kozhikode", "Kannur"],
  "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Gwalior"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
  "Manipur": ["Imphal", "Bishnupur"],
  "Meghalaya": ["Shillong", "Tura"],
  "Mizoram": ["Aizawl", "Lunglei"],
  "Nagaland": ["Kohima", "Dimapur"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Raurkela", "Sambalpur"],
  "Punjab": ["Chandigarh", "Amritsar", "Ludhiana", "Jalandhar"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Ajmer", "Kota"],
  "Sikkim": ["Gangtok", "Pelling"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad"],
  "Tripura": ["Agartala", "Udaipur"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Meerut", "Agra", "Noida"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Rishikesh", "Nainital"],
  "West Bengal": ["Kolkata", "Darjeeling", "Siliguri", "Asansol"],
};

// ─── INITIAL DATA ─────────────────────────────────────────────────────────────
const ADMIN_CREDS = { email: "admin@servigo.in", password: "admin@123" };

const INITIAL_SERVICES = [
  { id: "s1", name: "Electrician", icon: "⚡", desc: "Wiring, fan & switch repair", base: 299, color: "#ffb347" },
  { id: "s2", name: "Plumber", icon: "🔧", desc: "Pipe, tap & drainage fix", base: 249, color: "#4a9eff" },
  { id: "s3", name: "Carpenter", icon: "🪚", desc: "Furniture & wood work", base: 349, color: "#a78bfa" },
  { id: "s4", name: "Painter", icon: "🎨", desc: "Wall & surface painting", base: 499, color: "#22d37a" },
  { id: "s5", name: "Cleaner", icon: "🧹", desc: "Deep home cleaning", base: 399, color: "#38bdf8" },
  { id: "s6", name: "AC Technician", icon: "❄️", desc: "AC install & repair", base: 599, color: "#60a5fa" },
  { id: "s7", name: "CCTV Installer", icon: "📷", desc: "Security camera setup", base: 799, color: "#fb7185" },
  { id: "s8", name: "Pest Control", icon: "🪲", desc: "Termite & pest removal", base: 449, color: "#34d399" },
  { id: "s9", name: "Appliance Repair", icon: "🔌", desc: "Washing machine, fridge etc.", base: 499, color: "#f472b6" },
  { id: "s10", name: "Gardener", icon: "🌱", desc: "Garden maintenance", base: 299, color: "#86efac" },
  { id: "s11", name: "Locksmith", icon: "🔐", desc: "Lock & key services", base: 399, color: "#fbbf24" },
  { id: "s12", name: "Plumbing Maintenance", icon: "🛠️", desc: "Regular maintenance", base: 199, color: "#818cf8" },
  { id: "s13", name: "Home Shifting", icon: "📦", desc: "Moving & packing services", base: 2499, color: "#f87171" },
  { id: "s14", name: "Laundry Services", icon: "👕", desc: "Dry cleaning & laundry", base: 149, color: "#06b6d4" },
  { id: "s15", name: "Massage Therapy", icon: "💆", desc: "Professional massage", base: 599, color: "#ec4899" },
];

const INITIAL_USERS = [
  { id: "u1", fname: "Demo", lname: "User", email: "user@demo.com", mobile: "9876543210", password: "demo123", joined: "Apr 8, 2026", address: "123 Main St", city: "Mumbai", state: "Maharashtra", pincode: "400001" },
];

const INITIAL_BOOKINGS = [
  { id: "B10001", userId: "u1", name: "Demo User", mobile: "9876543210", address: "12, MG Road, Andheri, Mumbai 400053", service: "Electrician", serviceIcon: "⚡", serviceColor: "#ffb347", datetime: "2026-04-12T10:00", days: 1, timeSlot: "10:00-12:00", desc: "Fan not working, need wiring inspection in bedroom.", status: "Pending", createdAt: "Apr 8, 2026", amount: 299 },
  { id: "B10002", userId: "u1", name: "Demo User", mobile: "9876543210", address: "12, MG Road, Andheri, Mumbai 400053", service: "Plumber", serviceIcon: "🔧", serviceColor: "#4a9eff", datetime: "2026-04-15T14:00", days: 1, timeSlot: "14:00-16:00", desc: "Kitchen tap leaking, needs replacement.", status: "Confirmed", createdAt: "Apr 8, 2026", amount: 249 },
];

// ─── CSS INJECTION ────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
*{margin:0;padding:0;box-sizing:border-box;}
body{background:#05050a;color:#f4f4f8;font-family:'Satoshi', 'DM Sans', system-ui, sans-serif;-webkit-font-smoothing:antialiased;}
input,select,textarea,button{font-family:'Satoshi', 'DM Sans', system-ui, sans-serif;}
::-webkit-scrollbar{width:4px;height:4px;}
::-webkit-scrollbar-track{background:transparent;}
::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:4px;}
@keyframes fadeUp{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
@keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
@keyframes pulse{0%,100%{opacity:1;}50%{opacity:.5;}}
@keyframes spin{from{transform:rotate(0deg);}to{transform:rotate(360deg);};}
@keyframes shimmer{0%{background-position:-200px 0;}100%{background-position:200px 0;}}
@keyframes toastIn{from{transform:translateY(20px) scale(.95);opacity:0;}to{transform:translateY(0) scale(1);opacity:1;}}
.animate-fadeup{animation:fadeUp .5s ease both;}
.animate-fadein{animation:fadeIn .3s ease both;}
.page-wrap{animation:fadeIn .3s ease;}
/* RESPONSIVE DESIGN */
@media (max-width: 1024px) {
  nav { padding: 0 24px !important; }
  main { padding: 20px !important; }
  .service-grid { padding: 40px 20px !important; }
}
@media (max-width: 768px) {
  body { font-size: 14px; }
  nav { height: 56px !important; padding: 0 16px !important; }
  nav > div:first-child { font-size: 18px !important; }
  main { padding: 16px !important; }
  .service-grid { padding: 30px 16px !important; }
  .sidebar { width: 100% !important; max-width: none !important; border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.07) !important; padding: 12px 8px !important; display: flex; gap: 8px; overflow-x: auto; }
  .main-content { width: 100% !important; }
  .dashboard { display: block !important; }
  button { padding: 10px 14px !important; font-size: 12px !important; }
  input, select, textarea { padding: 10px 12px !important; font-size: 13px !important; }
  .nav-button { padding: 6px 12px !important; font-size: 12px !important; }
}
@media (max-width: 480px) {
  nav { padding: 0 12px !important; }
  nav > div:first-child { font-size: 16px !important; }
  main { padding: 12px !important; }
  .service-grid { padding: 20px 12px !important; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)) !important; }
  .hero h1 { font-size: 28px !important; line-height: 1.2 !important; }
  .hero p { font-size: 14px !important; }
  button { width: 100% !important; padding: 12px !important; font-size: 13px !important; }
  .input-grid { grid-template-columns: 1fr !important; }
  .dashboard-grid { grid-template-columns: 1fr !important; }
  .stats-container { gap: 12px !important; }
}
`;

// ─── TIME SLOTS ───────────────────────────────────────────────────────────────
const TIME_SLOTS = [
  "08:00-10:00", "10:00-12:00", "12:00-14:00", "14:00-16:00", "16:00-18:00", "18:00-20:00", "20:00-22:00"
];

// ─── UTILS ────────────────────────────────────────────────────────────────────
const fmtDT = (dt) => { try { return new Date(dt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }); } catch { return dt; } };
const uid = () => "B" + String(Date.now()).slice(-5);
const storeGet = (k, def) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : def; } catch { return def; } };
const storeSave = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

// ─── STYLE HELPERS ────────────────────────────────────────────────────────────
const s = {
  btn: (variant = "primary", size = "md", theme = "dark") => {
    const themeColors = getTheme(theme);
    return {
      display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
      padding: size === "sm" ? "7px 16px" : size === "lg" ? "14px 36px" : "10px 22px",
      borderRadius: 10, border: "none", cursor: "pointer", fontWeight: 600,
      fontSize: size === "sm" ? 13 : size === "lg" ? 16 : 14,
      transition: "all .2s", whiteSpace: "nowrap",
      ...(variant === "primary" ? { background: themeColors.accent, color: "#fff" } :
        variant === "ghost" ? { background: "transparent", border: `1.5px solid ${themeColors.border}`, color: themeColors.muted } :
        variant === "danger" ? { background: "rgba(255,71,87,0.15)", color: themeColors.danger, border: `1px solid rgba(255,71,87,0.3)` } :
        variant === "success" ? { background: "rgba(34,211,122,0.12)", color: themeColors.success, border: `1px solid rgba(34,211,122,0.25)` } :
        variant === "info" ? { background: "rgba(74,158,255,0.12)", color: themeColors.info, border: `1px solid rgba(74,158,255,0.25)` } :
        { background: themeColors.card, color: themeColors.text, border: `1px solid ${themeColors.border}` }),
    };
  },
  input: (focused = false, theme = "dark") => {
    const themeColors = getTheme(theme);
    return {
      width: "100%", background: focused ? themeColors.cardHover : themeColors.surface,
      border: `1.5px solid ${focused ? themeColors.accent : themeColors.border}`,
      borderRadius: 10, padding: "12px 15px", color: themeColors.text, fontSize: 14,
      outline: "none", transition: "all .2s",
      boxShadow: focused ? `0 0 0 3px ${themeColors.accentDim}` : "none",
    };
  },
  card: (hover = false) => ({
    background: hover ? G.cardHover : G.card, border: `1.5px solid ${hover ? G.borderHover : G.border}`,
    borderRadius: 16, transition: "all .25s",
  }),
  badge: (status) => {
    const map = { Pending: ["#ff6b35", "rgba(255,107,53,0.12)"], Confirmed: ["#4a9eff", "rgba(74,158,255,0.12)"], Done: ["#22d37a", "rgba(34,211,122,0.12)"], Cancelled: ["#ff4757", "rgba(255,71,87,0.12)"] };
    const [c, bg] = map[status] || ["#6b6b88", "rgba(255,255,255,0.06)"];
    return { display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700, color: c, background: bg };
  },
};

// ─── TOAST ────────────────────────────────────────────────────────────────────
let _setToast = null;
const toast = (msg, type = "success") => _setToast?.({ msg, type, id: Date.now() });

function Toast() {
  const [t, setT] = useState(null);
  _setToast = setT;
  useEffect(() => { if (t) { const id = setTimeout(() => setT(null), 3200); return () => clearTimeout(id); } }, [t]);
  if (!t) return null;
  const colors = { success: G.success, error: G.danger, info: G.info };
  return (
    <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 9999, animation: "toastIn .35s ease", display: "flex", alignItems: "center", gap: 12, background: G.card, border: `1.5px solid ${colors[t.type] || G.success}33`, borderRadius: 14, padding: "14px 20px", boxShadow: "0 8px 40px rgba(0,0,0,0.5)", maxWidth: 340 }}>
      <span style={{ fontSize: 18 }}>{t.type === "success" ? "✓" : t.type === "error" ? "✕" : "ℹ"}</span>
      <span style={{ fontSize: 14, fontWeight: 500, color: G.text }}>{t.msg}</span>
    </div>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav({ page, user, onNav, onLogout, lang, setLang, theme, setTheme }) {
  const t = LANGUAGES[lang];
  const [langOpen, setLangOpen] = useState(false);
  const themeColors = getTheme(theme);

  return (
    <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px", height: 70, background: theme === "dark" ? "rgba(5,5,10,0.95)" : "rgba(255,255,255,0.95)", backdropFilter: "blur(20px)", borderBottom: `2px solid ${themeColors.border}`, position: "sticky", top: 0, zIndex: 100, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
      {/* Logo */}
      <div 
        style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: 12,
          cursor: "pointer",
          transition: "all .3s ease"
        }}
        onClick={() => onNav("home")}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
      >
        <div style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: `linear-gradient(135deg, ${themeColors.accent} 0%, #ff8c42 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
          fontWeight: 900,
          color: "#fff",
          boxShadow: `0 4px 16px ${themeColors.accentGlow}`
        }}>
          🔧
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <div style={{ fontFamily: themeColors.font, fontSize: 20, fontWeight: 900, letterSpacing: -0.5, background: `linear-gradient(135deg, ${themeColors.accent} 0%, #ff8c42 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            ServiGo
          </div>
          <div style={{ fontSize: 9, color: themeColors.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>Services</div>
        </div>
        {user?.isAdmin && <span style={{ marginLeft: 8, fontSize: 10, background: themeColors.accent, color: "#fff", padding: "3px 10px", borderRadius: 6, fontFamily: themeColors.body, letterSpacing: .5, fontWeight: 700 }}>{t.admin}</span>}
      </div>

      {/* Right side menu */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {/* Theme Toggle */}
        <button 
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          style={{
            background: themeColors.accentDim,
            border: `1px solid ${themeColors.accent}`,
            color: themeColors.accent,
            borderRadius: 8,
            padding: "8px 16px",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            transition: "all .3s ease",
            display: "flex",
            alignItems: "center",
            gap: 8
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = themeColors.accent;
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = themeColors.accentDim;
            e.currentTarget.style.color = themeColors.accent;
          }}
        >
          {theme === "dark" ? "🌙 Day" : "☀️ Night"}
        </button>

        {/* Language Selector */}
        <div style={{ position: "relative" }}>
          <button style={{ ...s.btn("ghost", "sm"), color: themeColors.text, fontSize: 12, fontWeight: 600 }} onClick={() => setLangOpen(!langOpen)}>
            🌐 {t.name.split(" ")[0]}
          </button>
          {langOpen && (
            <div style={{ position: "absolute", top: 45, right: 0, background: themeColors.card, border: `1px solid ${themeColors.border}`, borderRadius: 12, minWidth: 120, zIndex: 1000, overflow: "hidden", boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }}>
              {Object.entries(LANGUAGES).map(([code, lang]) => (
                <div key={code} onClick={() => { setLang(code); setLangOpen(false); }} style={{ padding: "12px 16px", cursor: "pointer", fontSize: 13, color: lang === t ? themeColors.accent : themeColors.muted, background: lang === t ? themeColors.accentDim : "transparent", transition: "all .2s", borderBottom: code !== Object.keys(LANGUAGES).pop() ? `1px solid ${themeColors.border}` : "none", fontWeight: 600 }}>
                  {lang.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {!user && <>
          <button className="nav-button" style={{...s.btn("ghost", "sm"), color: themeColors.text}} onClick={() => onNav("login")}>{t.login}</button>
          <button className="nav-button" style={{ ...s.btn("primary", "sm"), boxShadow: `0 4px 20px ${themeColors.accentGlow}`, fontWeight: 700 }} onClick={() => onNav("register")}>{t.signUp} →</button>
        </>}
        {user && !user.isAdmin && <>
          <span style={{ fontSize: 12, color: themeColors.muted, fontWeight: 600, padding: "0 12px", borderLeft: `1px solid ${themeColors.border}`, borderRight: `1px solid ${themeColors.border}` }}>👤 {user.fname}</span>
          <button style={{...s.btn("ghost", "sm"), fontWeight: 700, color: themeColors.text}} onClick={onLogout}>{t.logout}</button>
        </>}
        {user?.isAdmin && <button style={{...s.btn("ghost", "sm"), fontWeight: 700, color: themeColors.accent}} onClick={onLogout}>{t.logout}</button>}
      </div>
    </nav>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ services, onNav, lang, theme }) {
  const t = LANGUAGES[lang];
  const [hovered, setHovered] = useState(null);
  const themeColors = getTheme(theme);

  const features = [
    { icon: "⚡", title: "Instant Booking", desc: "Book trusted professionals in seconds" },
    { icon: "🏪", title: "Local Support", desc: "Support verified local service providers" },
    { icon: "🚀", title: "Fast Service", desc: "Professional help within 24 hours" },
  ];

  return (
    <div style={{ background: themeColors.bg, minHeight: "100vh", color: themeColors.text }}>
      {/* ══════ HERO SECTION ══════ */}
      <div style={{ 
        position: "relative", 
        overflow: "hidden", 
        padding: "120px 40px 100px",
        textAlign: "center",
        background: `linear-gradient(135deg, ${themeColors.bg} 0%, ${themeColors.surface}20 100%)`
      }} className="hero">
        {/* Decorative elements */}
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${themeColors.accentGlow} 0%, transparent 70%)`, pointerEvents: "none", opacity: 0.6 }} />
        
        {/* Logo Icon */}
        <div style={{
          width: 100,
          height: 100,
          borderRadius: 20,
          background: `linear-gradient(135deg, ${themeColors.accent} 0%, #ff8c42 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 60,
          margin: "0 auto 40px",
          boxShadow: `0 20px 60px ${themeColors.accentGlow}`,
          animation: "fadeUp .5s ease"
        }}>
          🔧
        </div>

        {/* Main Heading */}
        <h1 style={{
          fontFamily: themeColors.font,
          fontSize: "clamp(2.4rem, 8vw, 4.5rem)",
          fontWeight: 900,
          lineHeight: 1.1,
          letterSpacing: -2,
          marginBottom: 16,
          color: themeColors.text,
          animation: "fadeUp .5s .1s ease both"
        }}>
          SERVIGO
        </h1>

        {/* Tagline */}
        <p style={{
          fontFamily: themeColors.body,
          fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
          fontWeight: 600,
          color: themeColors.muted,
          marginBottom: 16,
          animation: "fadeUp .5s .2s ease both"
        }}>
          Your Ultimate Service Marketplace
        </p>

        {/* Subtitle */}
        <p style={{
          fontSize: 16,
          color: themeColors.muted,
          maxWidth: 500,
          margin: "0 auto 60px",
          lineHeight: 1.6,
          animation: "fadeUp .5s .3s ease both"
        }}>
          Shop Smart. Find Trusted Professionals. Support Local Services.
        </p>

        {/* CTA Buttons */}
        <div style={{
          display: "flex",
          gap: 20,
          justifyContent: "center",
          flexWrap: "wrap",
          animation: "fadeUp .5s .4s ease both",
          marginBottom: 80
        }}>
          <button 
            onClick={() => onNav("login")}
            style={{
              ...s.btn("primary", "lg"),
              padding: "18px 48px",
              fontSize: 16,
              fontWeight: 800,
              borderRadius: 12,
              boxShadow: `0 12px 40px ${themeColors.accentGlow}`,
              transition: "all .3s ease",
              textTransform: "uppercase",
              letterSpacing: 1,
              display: "flex",
              alignItems: "center",
              gap: 12,
              cursor: "pointer"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = `0 16px 50px ${themeColors.accentGlow}`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = `0 12px 40px ${themeColors.accentGlow}`;
            }}
          >
            ⚡ START BOOKING
          </button>

          <button 
            onClick={() => onNav("register")}
            style={{
              padding: "18px 48px",
              fontSize: 16,
              fontWeight: 800,
              borderRadius: 12,
              border: `2px solid ${themeColors.accent}`,
              background: "transparent",
              color: themeColors.accent,
              transition: "all .3s ease",
              textTransform: "uppercase",
              letterSpacing: 1,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 12
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = `${themeColors.accent}10`;
              e.currentTarget.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            👤 CREATE ACCOUNT
          </button>
        </div>

        {/* Quick Stats */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: 32,
          maxWidth: 600,
          margin: "0 auto",
          animation: "fadeUp .5s .5s ease both"
        }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: themeColors.font, fontSize: 32, fontWeight: 900, color: themeColors.accent }}>50K+</div>
            <div style={{ fontSize: 12, color: themeColors.muted, marginTop: 8, textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 700 }}>Happy Customers</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: themeColors.font, fontSize: 32, fontWeight: 900, color: themeColors.accent }}>10K+</div>
            <div style={{ fontSize: 12, color: themeColors.muted, marginTop: 8, textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 700 }}>Professionals</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: themeColors.font, fontSize: 32, fontWeight: 900, color: themeColors.accent }}>4.9★</div>
            <div style={{ fontSize: 12, color: themeColors.muted, marginTop: 8, textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 700 }}>Top Rated</div>
          </div>
        </div>
      </div>

      {/* ══════ WHY CHOOSE SERVIGO ══════ */}
      <div style={{
        padding: "100px 40px",
        maxWidth: 1200,
        margin: "0 auto"
      }}>
        <h2 style={{
          fontFamily: themeColors.font,
          fontSize: "clamp(2rem, 5vw, 3.2rem)",
          fontWeight: 900,
          textAlign: "center",
          marginBottom: 60,
          letterSpacing: -1,
          color: themeColors.text
        }}>
          Why Choose SERVIGO?
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 24
        }}>
          {features.map((feature, i) => (
            <div 
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                padding: 32,
                border: `2px solid ${hovered === i ? G.accent : G.border}`,
                borderRadius: 16,
                background: hovered === i ? `${G.accent}08` : "transparent",
                transition: "all .3s ease",
                cursor: "pointer",
                transform: hovered === i ? "translateY(-8px)" : "translateY(0)",
                animation: `fadeUp .5s ${i * 0.1}s ease both`
              }}
            >
              <div style={{
                fontSize: 50,
                marginBottom: 20,
                display: "inline-block"
              }}>
                {feature.icon}
              </div>
              <h3 style={{
                fontFamily: themeColors.font,
                fontSize: 20,
                fontWeight: 800,
                marginBottom: 12,
                color: hovered === i ? themeColors.accent : themeColors.text
              }}>
                {feature.title}
              </h3>
              <p style={{
                fontSize: 15,
                color: themeColors.muted,
                lineHeight: 1.6
              }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ══════ SERVICES GRID ══════ */}
      <div style={{
        padding: "80px 40px",
        background:themeColors.bg,
        backgroundImage: `linear-gradient(180deg, transparent 0%, ${themeColors.surface}30 100%)`,
        maxWidth: 1200,
        margin: "0 auto"
      }} className="service-grid">
        <h2 style={{
          fontFamily: themeColors.font,
          fontSize: "clamp(2rem, 5vw, 3.2rem)",
          fontWeight: 900,
          textAlign: "center",
          marginBottom: 16,
          letterSpacing: -1,
          color: themeColors.text
        }}>
          Our Services
        </h2>
        <p style={{
          color: themeColors.muted,
          fontSize: 16,
          textAlign: "center",
          marginBottom: 60,
          maxWidth: 500,
          margin: "0 auto 60px"
        }}>
          Choose from {services.length} professional services available in your area
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: 14
        }}>
          {services.map((svc, i) => (
            <div
              key={svc.id}
              onMouseEnter={() => setHovered(svc.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onNav("register")}
              style={{
                padding: 24,
                border: `2px solid ${hovered === svc.id ? svc.color : themeColors.border}`,
                borderRadius: 14,
                background: hovered === svc.id ? `${svc.color}12` : themeColors.card,
                cursor: "pointer",
                transition: "all .3s ease",
                transform: hovered === svc.id ? "translateY(-6px) scale(1.02)" : "translateY(0)",
                animation: `fadeUp .5s ${i * 0.05}s ease both`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center"
              }}
            >
              <div style={{
                fontSize: 42,
                marginBottom: 12,
                display: "inline-block"
              }}>
                {svc.icon}
              </div>
              <h3 style={{
                fontFamily: themeColors.font,
                fontSize: 15,
                fontWeight: 800,
                marginBottom: 8,
                color: hovered === svc.id ? svc.color : themeColors.text
              }}>
                {svc.name}
              </h3>
              <p style={{
                fontSize: 12,
                color: G.muted,
                marginBottom: 14,
                lineHeight: 1.4
              }}>
                {svc.desc}
              </p>
              <div style={{
                fontSize: 14,
                fontWeight: 800,
                color: svc.color,
                marginTop: "auto"
              }}>
                ₹{svc.base}+
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════ FOOTER ══════ */}
      <footer style={{
        padding: "40px",
        borderTop: `2px solid ${G.border}`,
        textAlign: "center",
        color: G.muted,
        fontSize: 13
      }}>
        <div style={{ marginBottom: 16 }}>
          <span style={{ fontFamily: G.font, fontSize: 18, fontWeight: 900 }}>
            <span style={{ color: G.accent }}>SERVI</span><span style={{ color: G.text }}>GO</span>
          </span>
        </div>
        <div>© 2026 ServiGo. Your Ultimate Service Marketplace. All rights reserved.</div>
      </footer>
    </div>
  );
}

// ─── FORM INPUT ───────────────────────────────────────────────────────────────
function Input({ label, type = "text", value, onChange, placeholder, rows, options, required, lang, theme = "dark" }) {
  const [focused, setFocused] = useState(false);
  const themeColors = getTheme(theme);
  const el = options ? (
    <select value={value} onChange={e => onChange(e.target.value)} style={{ ...s.input(focused, theme), appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='${encodeURIComponent(themeColors.muted)}'%3E%3Cpath d='M0 0l6 8 6-8z'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center" }} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}>
      {options.map(o => <option key={o.value} value={o.value} style={{ background: themeColors.surface }}>{o.label}</option>)}
    </select>
  ) : rows ? (
    <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows} style={{ ...s.input(focused, theme), resize: "vertical" }} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
  ) : (
    <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={s.input(focused, theme)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
  );
  return (
    <div style={{ marginBottom: 18 }}>
      {label && <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: themeColors.muted, marginBottom: 7, textTransform: "uppercase", letterSpacing: .5 }}>{label}{required && <span style={{ color: themeColors.accent }}> *</span>}</label>}
      {el}
    </div>
  );
}

// ─── AUTH PAGES ───────────────────────────────────────────────────────────────
function LoginPage({ users, onLogin, onNav, lang, theme }) {
  const t = LANGUAGES[lang];
  const themeColors = getTheme(theme);
  const [tab, setTab] = useState("user");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !pass) return toast(t.fillAllFields, "error");
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    if (tab === "admin") {
      if (email === ADMIN_CREDS.email && pass === ADMIN_CREDS.password) {
        toast(t.welcome + " " + t.admin); onLogin({ isAdmin: true });
      } else { toast("Invalid admin credentials", "error"); }
    } else {
      const u = users.find(u => u.email === email && u.password === pass);
      if (u) { toast(t.welcome + ", " + u.fname); onLogin(u); }
      else toast("Invalid email or password", "error");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "calc(100vh - 64px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: themeColors.bg, backgroundImage: `radial-gradient(ellipse 60% 40% at 50% 0%, ${themeColors.accentGlow} 0%, transparent 60%)` }}>
      <div style={{ background: themeColors.card, border: `1px solid ${themeColors.border}`, padding: "44px 40px", width: "100%", maxWidth: 440, borderRadius: 16, boxShadow: "0 20px 80px rgba(0,0,0,0.1)", animation: "fadeUp .4s ease" }}>
        <h2 style={{ fontFamily: themeColors.font, fontSize: 28, fontWeight: 800, letterSpacing: -1, marginBottom: 4, color: themeColors.text }}>{t.welcome}</h2>
        <p style={{ color: themeColors.muted, fontSize: 14, marginBottom: 28 }}>Login to manage your bookings</p>
        {/* Tab */}
        <div style={{ display: "flex", background: themeColors.surface, borderRadius: 10, padding: 4, gap: 4, marginBottom: 26 }}>
          {["user", "admin"].map(tb => (
            <button key={tb} onClick={() => setTab(tb)} style={{ flex: 1, padding: "9px", borderRadius: 7, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 13, fontFamily: themeColors.body, transition: "all .2s", background: tab === tb ? themeColors.accent : "transparent", color: tab === tb ? "#fff" : themeColors.muted, boxShadow: tab === tb ? `0 2px 12px ${themeColors.accentGlow}` : "none" }}>{tb.charAt(0).toUpperCase() + tb.slice(1)}</button>
          ))}
        </div>
        <Input label={t.email} type="email" value={email} onChange={setEmail} placeholder="you@example.com" required theme={theme} />
        <Input label={t.password} type="password" value={pass} onChange={setPass} placeholder="••••••••" required theme={theme} />
        <button onClick={handleLogin} disabled={loading} style={{ background: themeColors.accent, color: "#fff", border: "none", borderRadius: 10, padding: "14px", fontSize: 15, fontWeight: 700, cursor: "pointer", width: "100%", boxShadow: `0 4px 20px ${themeColors.accentGlow}`, opacity: loading ? .7 : 1 }}>
          {loading ? "Logging in..." : t.login + " →"}
        </button>
        <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: themeColors.muted }}>{t.newUser} <span style={{ color: themeColors.accent, cursor: "pointer", fontWeight: 600 }} onClick={() => onNav("register")}>{t.signUp}</span></p>
        <p style={{ textAlign: "center", marginTop: 10, fontSize: 12, color: themeColors.muted }}>Demo: user@demo.com / demo123</p>
      </div>
    </div>
  );
}

function RegisterPage({ onRegister, onNav, lang, theme }) {
  const t = LANGUAGES[lang];
  const themeColors = getTheme(theme);
  const [f, setF] = useState({ fname: "", lname: "", email: "", mobile: "", password: "", address: "", city: "", state: "", pincode: "" });
  const [loading, setLoading] = useState(false);
  const set = k => v => setF(p => ({ ...p, [k]: v }));
  const states = Object.keys(STATE_CITIES);
  const cities = f.state ? STATE_CITIES[f.state] : [];

  const handle = async () => {
    if (!f.fname || !f.lname || !f.email || !f.mobile || !f.password || !f.address || !f.state || !f.city) return toast(t.fillAllFields, "error");
    if (f.password.length < 6) return toast("Password must be 6+ characters", "error");
    if (!/^\d{10}$/.test(f.mobile)) return toast("Enter valid 10-digit mobile", "error");
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    onRegister({ ...f, id: "u" + Date.now(), joined: new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }) });
    setLoading(false);
  };

  const handleStateChange = (selectedState) => {
    setF(p => ({ ...p, state: selectedState, city: "" }));
  };

  return (
    <div style={{ minHeight: "calc(100vh - 64px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: themeColors.bg, backgroundImage: `radial-gradient(ellipse 60% 40% at 50% 0%, ${themeColors.accentGlow} 0%, transparent 60%)` }}>
      <div style={{ background: themeColors.card, border: `1px solid ${themeColors.border}`, padding: "44px 40px", width: "100%", maxWidth: 500, borderRadius: 16, boxShadow: "0 20px 80px rgba(0,0,0,0.1)", animation: "fadeUp .4s ease" }}>
        <h2 style={{ fontFamily: themeColors.font, fontSize: 28, fontWeight: 800, letterSpacing: -1, marginBottom: 4, color: themeColors.text }}>{t.createAccount}</h2>
        <p style={{ color: themeColors.muted, fontSize: 14, marginBottom: 28 }}>Join ServiGo — book any service in minutes</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="input-grid">
          <Input label={t.firstName} value={f.fname} onChange={set("fname")} placeholder="Ravi" required theme={theme} />
          <Input label={t.lastName} value={f.lname} onChange={set("lname")} placeholder="Kumar" required theme={theme} />
        </div>
        <Input label={t.email} type="email" value={f.email} onChange={set("email")} placeholder="you@example.com" required theme={theme} />
        <Input label={t.mobileNumber} type="tel" value={f.mobile} onChange={set("mobile")} placeholder="10-digit number" required theme={theme} />
        <Input label={t.fullAddress} value={f.address} onChange={set("address")} placeholder="Street & Area" required theme={theme} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="input-grid">
          <div style={{ marginBottom: 0 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 8, color: themeColors.text }}>{t.selectState} <span style={{ color: themeColors.danger }}>*</span></label>
            <select value={f.state} onChange={(e) => handleStateChange(e.target.value)} style={{ width: "100%", padding: "11px 12px", borderRadius: 8, border: `1px solid ${themeColors.border}`, background: themeColors.card, color: themeColors.text, fontSize: 13, fontFamily: themeColors.body, transition: "all .2s", outline: "none", cursor: "pointer" }} onFocus={(e) => e.target.style.borderColor = themeColors.accent} onBlur={(e) => e.target.style.borderColor = themeColors.border}>
              <option value="">-- {t.selectState} --</option>
              {states.map(state => <option key={state} value={state}>{state}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 0 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 8, color: themeColors.text }}>{t.selectCity} <span style={{ color: themeColors.danger }}>*</span></label>
            <select value={f.city} onChange={(e) => set("city")(e.target.value)} disabled={!f.state} style={{ width: "100%", padding: "11px 12px", borderRadius: 8, border: `1px solid ${themeColors.border}`, background: !f.state ? themeColors.surface : themeColors.card, color: !f.state ? themeColors.muted : themeColors.text, fontSize: 13, fontFamily: themeColors.body, transition: "all .2s", outline: "none", cursor: f.state ? "pointer" : "not-allowed", opacity: !f.state ? 0.5 : 1 }} onFocus={(e) => f.state && (e.target.style.borderColor = themeColors.accent)} onBlur={(e) => e.target.style.borderColor = themeColors.border}>
              <option value="">-- {t.selectCity} --</option>
              {cities.map(city => <option key={city} value={city}>{city}</option>)}
            </select>
          </div>
        </div>
        <Input label="Pincode" value={f.pincode} onChange={set("pincode")} placeholder="400001" theme={theme} />
        <Input label={t.password} type="password" value={f.password} onChange={set("password")} placeholder="Minimum 6 characters" required theme={theme} />
        <button onClick={handle} disabled={loading} style={{ background: themeColors.accent, color: "#fff", border: "none", borderRadius: 10, padding: "14px", fontSize: 15, fontWeight: 700, cursor: "pointer", width: "100%", boxShadow: `0 4px 20px ${themeColors.accentGlow}`, opacity: loading ? .7 : 1 }}>
          {loading ? "Creating account..." : t.createAccount + " →"}
        </button>
        <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: themeColors.muted }}>{t.alreadyHave} <span style={{ color: themeColors.accent, cursor: "pointer", fontWeight: 600 }} onClick={() => onNav("login")}>{t.login}</span></p>
      </div>
    </div>
  );
}

// ─── USER DASHBOARD ───────────────────────────────────────────────────────────
function UserDashboard({ user, services, bookings, onBook, onLogout, lang, theme }) {
  const themeColors = getTheme(theme);
  const t = LANGUAGES[lang];
  const [tab, setTab] = useState("book");
  const myBookings = bookings.filter(b => b.userId === user.id);

  const sideItems = [
    { id: "book", icon: "🏠", label: t.bookService },
    { id: "mybookings", icon: "📋", label: t.myBookings },
    { id: "profile", icon: "👤", label: t.profile },
  ];

  return (
    <div style={{ display: "flex", minHeight: "calc(100vh - 64px)" }} className="dashboard">
      <aside style={{ width: 230, background: themeColors.surface, borderRight: `1px solid ${themeColors.border}`, padding: "28px 14px", flexShrink: 0, display: "flex", flexDirection: "column" }} className="sidebar">
        <div style={{ padding: "12px 14px", marginBottom: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: themeColors.accentDim, border: `2px solid ${themeColors.accent}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, marginBottom: 10, color: themeColors.text }}>
            {user.fname?.[0]}{user.lname?.[0]}
          </div>
          <div style={{ fontWeight: 700, fontSize: 14, color: themeColors.text }}>{user.fname} {user.lname}</div>
          <div style={{ fontSize: 12, color: themeColors.muted, marginTop: 2 }}>{user.email}</div>
        </div>
        <div style={{ flex: 1 }}>
          {sideItems.map(item => (
            <div key={item.id} onClick={() => setTab(item.id)}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 500, marginBottom: 4, background: tab === item.id ? themeColors.accentDim : "transparent", color: tab === item.id ? themeColors.accent : themeColors.muted, transition: "all .2s", borderLeft: tab === item.id ? `3px solid ${themeColors.accent}` : "3px solid transparent" }}>
              <span style={{ fontSize: 16 }}>{item.icon}</span> {item.label}
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${themeColors.border}`, paddingTop: 16, marginTop: 16 }}>
          <div onClick={onLogout} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", borderRadius: 10, cursor: "pointer", fontSize: 14, color: themeColors.danger, transition: "all .2s" }}>
            <span>🚪</span> {t.logout}
          </div>
        </div>
      </aside>

      <main style={{ flex: 1, padding: 36, overflow: "auto", background: themeColors.bg, color: themeColors.text }} className="main-content">
        {tab === "book" && <BookForm user={user} services={services} onBook={b => { onBook(b); setTab("mybookings"); }} lang={lang} theme={theme} />}
        {tab === "mybookings" && <MyBookings bookings={myBookings} lang={lang} theme={theme} />}
        {tab === "profile" && <ProfileView user={user} bookings={myBookings} lang={lang} theme={theme} />}
      </main>
    </div>
  );
}

function BookForm({ user, services, onBook, lang, theme }) {
  const t = LANGUAGES[lang];
  const themeColors = getTheme(theme);
  const [f, setF] = useState({ name: user.fname + " " + user.lname, mobile: user.mobile || "", address: user.address || "", state: user.state || "", city: user.city || "", serviceId: services[0]?.id || "", date: "", time: "09:00", meridiem: "AM", desc: "", days: 1 });
  const [loading, setLoading] = useState(false);
  const set = k => v => setF(p => ({ ...p, [k]: v }));

  const submit = async () => {
    if (!f.address || !f.state || !f.city || !f.date || !f.time || !f.desc || !f.days) return toast(t.fillAllFields, "error");
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    const svc = services.find(s => s.id === f.serviceId);
    const finalAmount = svc.base * f.days;
    const bookingDateTime = `${f.date} ${f.time} ${f.meridiem}`;
    onBook({ id: uid(), userId: user.id, name: f.name, mobile: f.mobile, address: f.address, state: f.state, city: f.city, service: svc.name, serviceIcon: svc.icon, serviceColor: svc.color, datetime: bookingDateTime, date: f.date, time: f.time, meridiem: f.meridiem, days: f.days, desc: f.desc, status: "Pending", createdAt: new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }), amount: finalAmount });
    toast(t.bookingConfirmed + " 🎉");
    setLoading(false);
  };

  const svc = services.find(s => s.id === f.serviceId);
  const today = new Date().toISOString().split('T')[0];
  const availableCities = f.state ? STATE_CITIES[f.state] || [] : [];

  return (
    <div style={{ maxWidth: 680, animation: "fadeIn .3s" }}>
      <h2 style={{ fontFamily: themeColors.font, fontSize: 26, fontWeight: 800, letterSpacing: -1, marginBottom: 4, color: themeColors.text }}>{t.bookService}</h2>
      <p style={{ color: themeColors.muted, fontSize: 14, marginBottom: 32 }}>Fill your details and we''ll send a verified professional</p>

      <div style={{ marginBottom: 28 }}>
        <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: G.muted, marginBottom: 12, textTransform: "uppercase", letterSpacing: .5 }}>{t.selectService} <span style={{ color: G.accent }}>*</span></label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 10 }}>
          {services.map(sv => (
            <div key={sv.id} onClick={() => setF(p => ({ ...p, serviceId: sv.id }))} style={{ padding: "14px 12px", borderRadius: 12, cursor: "pointer", border: `1.5px solid ${f.serviceId === sv.id ? sv.color : G.border}`, background: f.serviceId === sv.id ? `${sv.color}14` : G.card, transition: "all .2s", textAlign: "center" }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{sv.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: f.serviceId === sv.id ? sv.color : G.text }}>{sv.name}</div>
              <div style={{ fontSize: 11, color: G.muted, marginTop: 2 }}>₹{sv.base}+</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ ...s.card(), padding: 28 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 }} className="input-grid">
          <Input label={t.yourName} value={f.name} onChange={set("name")} required />
          <Input label={t.mobileNumber} value={f.mobile} onChange={set("mobile")} required />
        </div>
        <Input label={t.fullAddress} value={f.address} onChange={set("address")} placeholder="House no., Street, Area, City" rows={2} required />
        
        {/* ─── STATE & CITY SELECTION ─── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 }}>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: G.muted, marginBottom: 8, textTransform: "uppercase", letterSpacing: .5 }}>{t.selectState} <span style={{ color: G.accent }}>*</span></label>
            <select value={f.state} onChange={e => { set("state")(e.target.value); set("city")(""); }} style={{ ...s.input(), padding: "10px 12px", width: "100%", cursor: "pointer", background: G.card, border: `1px solid ${G.border}`, color: G.text, borderRadius: 8 }}>
              <option value="">Choose State...</option>
              {Object.keys(STATE_CITIES).map(st => <option key={st} value={st}>{st}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: G.muted, marginBottom: 8, textTransform: "uppercase", letterSpacing: .5 }}>{t.selectCity} <span style={{ color: G.accent }}>*</span></label>
            <select value={f.city} onChange={e => set("city")(e.target.value)} disabled={!f.state} style={{ ...s.input(), padding: "10px 12px", width: "100%", cursor: f.state ? "pointer" : "not-allowed", background: G.card, border: `1px solid ${G.border}`, color: f.state ? G.text : G.muted, borderRadius: 8, opacity: f.state ? 1 : 0.5 }}>
              <option value="">Choose City...</option>
              {availableCities.map(city => <option key={city} value={city}>{city}</option>)}
            </select>
          </div>
        </div>
        
        {/* ─── DATE & TIME PICKER ─── */}
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: G.muted, marginBottom: 8, textTransform: "uppercase", letterSpacing: .5 }}>📅 {t.preferredDateTime} <span style={{ color: G.accent }}>*</span></label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 0.6fr", gap: 10, "@media (max-width: 480px)": { gridTemplateColumns: "1fr" } }}>
            <Input type="date" value={f.date} onChange={set("date")} min={today} required style={{ gridColumn: "span 1" }} />
            <Input type="time" value={f.time} onChange={set("time")} required style={{ gridColumn: "span 1" }} />
            <select value={f.meridiem} onChange={e => set("meridiem")(e.target.value)} style={{ ...s.input(), padding: "10px 12px", gridColumn: "span 1", cursor: "pointer", background: G.card, border: `1px solid ${G.border}`, color: G.text, borderRadius: 8 }}>
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>

        <div style={{ marginBottom: 18 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: G.muted, marginBottom: 8, textTransform: "uppercase", letterSpacing: .5 }}>{t.selectDays} <span style={{ color: G.accent }}>*</span></label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6 }}>
            {[1, 2, 3, 4, 5, 6, 7].map(day => (
              <button key={day} onClick={() => set("days")(day)} style={{ ...s.btn(f.days === day ? "primary" : "ghost", "sm"), width: "100%", fontSize: 12, padding: "8px" }}>
                {day}d
              </button>
            ))}
          </div>
        </div>

        <Input label={t.describeProblem} value={f.desc} onChange={set("desc")} placeholder={`Explain the issue in detail for ${svc?.name || "the service"}...`} rows={3} required />

        {svc && (
          <div style={{ background: G.surface, borderRadius: 10, padding: "14px 16px", marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center", border: `1px solid ${G.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 22 }}>{svc.icon}</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{svc.name}</div>
                <div style={{ fontSize: 12, color: G.muted }}>{t.estimatedPrice}</div>
              </div>
            </div>
            <div style={{ fontFamily: G.font, fontSize: 20, fontWeight: 800, color: svc.color }}>₹{svc.base * f.days}</div>
          </div>
        )}

        <button onClick={submit} disabled={loading} style={{ ...s.btn("primary"), width: "100%", padding: 14, fontSize: 15, boxShadow: `0 4px 20px ${G.accentGlow}`, opacity: loading ? .7 : 1 }}>
          {loading ? "Confirming..." : t.confirmBooking + " →"}
        </button>
      </div>
    </div>
  );
}

function MyBookings({ bookings, lang, theme }) {
  const themeColors = getTheme(theme);
  const t = LANGUAGES[lang];
  const statusDot = { Pending: G.accent, Confirmed: G.info, Done: G.success, Cancelled: G.danger };
  const statusGradient = { 
    Pending: "linear-gradient(135deg, #ffb347 0%, #ff9100 100%)",
    Confirmed: "linear-gradient(135deg, #4a9eff 0%, #0066ff 100%)",
    Done: "linear-gradient(135deg, #22d37a 0%, #00b366 100%)",
    Cancelled: "linear-gradient(135deg, #ff4757 0%, #ff1744 100%)"
  };
  
  return (
    <div style={{ animation: "fadeIn .3s" }}>
      <div style={{ marginBottom: 40 }}>
        <h2 style={{ fontFamily: themeColors.font, fontSize: 32, fontWeight: 900, letterSpacing: -1.5, marginBottom: 8, color: themeColors.accent }}>{t.myBookings}</h2>
        <p style={{ color: themeColors.muted, fontSize: 14, marginBottom: 0 }}>Track and manage all your service requests</p>
      </div>

      {bookings.length === 0 ? (
        <div style={{ 
          background: `linear-gradient(135deg, ${themeColors.surface} 0%, ${themeColors.card} 100%)`,
          border: `2px dashed ${themeColors.border}`,
          borderRadius: 24,
          padding: "80px 40px",
          textAlign: "center",
          animation: "fadeUp .5s ease"
        }}>
          <div style={{ fontSize: 80, marginBottom: 24, animation: "pulse 2s ease-in-out infinite" }}>✨</div>
          <h3 style={{ fontFamily: themeColors.font, fontSize: 24, fontWeight: 700, color: themeColors.text, marginBottom: 12 }}>No Bookings Yet</h3>
          <p style={{ color: themeColors.muted, fontSize: 15, marginBottom: 28, maxWidth: 400, margin: "0 auto 28px" }}>Your first booking will appear here. Explore our services and book now to get started!</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <span style={{ display: "inline-block", background: `${themeColors.accent}20`, color: themeColors.accent, padding: "8px 16px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>⚡ Quick service available</span>
            <span style={{ display: "inline-block", background: `${themeColors.success}20`, color: themeColors.success, padding: "8px 16px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>✓ Verified professionals</span>
          </div>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 20 }}>
          {[...bookings].reverse().map((b, i) => (
            <div 
              key={b.id} 
              style={{
                background: themeColors.card,
                border: `1.5px solid ${themeColors.border}`,
                borderRadius: 20,
                overflow: "hidden",
                animation: `fadeUp .5s ${i * 0.08}s ease both`,
                transition: "all .3s ease",
                cursor: "pointer",
                transform: "translateY(0)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 12px 32px rgba(255, 107, 53, 0.15)";
                e.currentTarget.style.borderColor = themeColors.accent;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
                e.currentTarget.style.borderColor = themeColors.border;
              }}
            >
              {/* Top gradient bar */}
              <div style={{ height: 4, background: statusGradient[b.status] }} />
              
              {/* Header with icon and status */}
              <div style={{ padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: `1px solid ${themeColors.border}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ 
                    width: 56, 
                    height: 56, 
                    borderRadius: 14, 
                    background: `${b.serviceColor}15`,
                    border: `2px solid ${b.serviceColor}40`,
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    fontSize: 28,
                    fontWeight: 700
                  }}>
                    {b.serviceIcon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: themeColors.text, marginBottom: 4, fontFamily: themeColors.font }}>{b.service}</h3>
                    <div style={{ fontSize: 11, color: themeColors.muted, fontFamily: "monospace", letterSpacing: 0.5 }}>#{b.id}</div>
                  </div>
                </div>
                <div style={{
                  padding: "6px 12px",
                  borderRadius: 12,
                  background: statusGradient[b.status],
                  color: "#fff",
                  fontSize: 11,
                  fontWeight: 700,
                  whiteSpace: "nowrap"
                }}>
                  {b.status}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "20px 24px" }}>
                {/* Price */}
                <div style={{ marginBottom: 18, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: themeColors.muted, fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>Total Amount</span>
                  <span style={{ fontFamily: themeColors.font, fontSize: 24, fontWeight: 900, color: b.serviceColor }}>₹{b.amount}</span>
                </div>

                {/* Details grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 18 }}>
                  <div style={{ padding: 12, background: themeColors.surface, borderRadius: 10 }}>
                    <div style={{ fontSize: 11, color: themeColors.muted, marginBottom: 6, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>📅 Date & Time</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: themeColors.text }}>{b.date || "TBD"}</div>
                    <div style={{ fontSize: 12, color: themeColors.muted, marginTop: 3 }}>{b.time} {b.meridiem || ""}</div>
                  </div>
                  <div style={{ padding: 12, background: themeColors.surface, borderRadius: 10 }}>
                    <div style={{ fontSize: 11, color: themeColors.muted, marginBottom: 6, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>⏱️ Duration</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: themeColors.text }}>{b.days} day{b.days > 1 ? "s" : ""}</div>
                    {b.timeSlot && <div style={{ fontSize: 12, color: themeColors.muted, marginTop: 3 }}>Slot: {b.timeSlot}</div>}
                  </div>
                </div>

                {/* Location */}
                <div style={{ padding: 12, background: G.surface, borderRadius: 10, marginBottom: 16 }}>
                  <div style={{ fontSize: 11, color: G.muted, marginBottom: 6, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>📍 Location</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: G.text, marginBottom: 3 }}>{b.city}, {b.state}</div>
                  <div style={{ fontSize: 12, color: G.muted, lineHeight: 1.4 }}>{b.address}</div>
                </div>

                {/* Issue description */}
                {b.desc && (
                  <div style={{ 
                    padding: 12, 
                    background: `${b.serviceColor}10`,
                    border: `1px solid ${b.serviceColor}30`,
                    borderRadius: 10, 
                    marginBottom: 0 
                  }}>
                    <div style={{ fontSize: 11, color: G.muted, marginBottom: 6, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>📝 Issue Details</div>
                    <div style={{ fontSize: 13, color: G.text, lineHeight: 1.5, fontWeight: 500 }}>{b.desc}</div>
                  </div>
                )}
              </div>

              {/* Footer timeline */}
              <div style={{ padding: "12px 24px", background: G.surface, borderTop: `1px solid ${G.border}`, fontSize: 11, color: G.muted, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>🕐 Booked on {b.createdAt || "Apr 8, 2026"}</span>
                <span style={{ 
                  width: 24, 
                  height: 24, 
                  borderRadius: "50%", 
                  background: statusGradient[b.status],
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  {b.status === "Done" ? "✓" : b.status === "Pending" ? "⏳" : b.status === "Confirmed" ? "✔" : "✕"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProfileView({ user, bookings, lang, theme }) {
  const t = LANGUAGES[lang];
  const themeColors = getTheme(theme);
  return (
    <div style={{ animation: "fadeIn .3s", maxWidth: 500 }} className="profile-grid">
      <h2 style={{ fontFamily: themeColors.font, fontSize: 26, fontWeight: 800, letterSpacing: -1, marginBottom: 28, color: themeColors.text }}>{t.myProfile}</h2>
      <div style={{ background: themeColors.card, border: `1px solid ${themeColors.border}`, borderRadius: 16, padding: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28, paddingBottom: 24, borderBottom: `1px solid ${themeColors.border}` }}>
          <div style={{ width: 60, height: 60, borderRadius: "50%", background: themeColors.accentDim, border: `2px solid ${themeColors.accent}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700, color: themeColors.accent }}>
            {user.fname?.[0]}{user.lname?.[0]}
          </div>
          <div>
            <div style={{ fontFamily: themeColors.font, fontSize: 20, fontWeight: 800, color: themeColors.text }}>{user.fname} {user.lname}</div>
            <div style={{ fontSize: 13, color: themeColors.muted }}>{t.joinedSince} {user.joined}</div>
          </div>
        </div>
        {[
          [t.email, user.email],
          [t.mobile, user.mobile],
          ["Address", user.address],
          ["City", user.city],
          ["State", user.state],
          ["Pincode", user.pincode],
          [t.totalBookings, bookings.length],
          [t.completed, bookings.filter(b => b.status === "Done").length]
        ].map(([k, v]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: `1px solid ${themeColors.border}`, fontSize: 14, color: themeColors.text }}>
            <span style={{ color: themeColors.muted }}>{k}</span>
            <span style={{ fontWeight: 600 }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPageState] = useState(() => {
    const user = storeGet("currentUser", null);
    const savedPage = storeGet("currentPage", "home");
    // If no user logged in, always show home
    if (!user) return "home";
    // If user is logged in and page is admin/dashboard, restore it
    if ((savedPage === "admin" || savedPage === "dashboard") && user) return savedPage;
    return "home";
  });
  
  const setPage = (p) => {
    setPageState(p);
    storeSave("currentPage", p);
  };
  
  const [user, setUser] = useState(() => storeGet("currentUser", null));
  const [users, setUsers] = useState(() => storeGet("users", INITIAL_USERS));
  const [services, setServices] = useState(() => storeGet("services", INITIAL_SERVICES));
  const [bookings, setBookings] = useState(() => storeGet("bookings", INITIAL_BOOKINGS));
  const [lang, setLang] = useState(() => storeGet("language", "en"));
  const [theme, setTheme] = useState(() => storeGet("theme", "dark"));

  useEffect(() => { storeSave("language", lang); }, [lang]);
  useEffect(() => { storeSave("theme", theme); }, [theme]);

  const handleNav = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const handleLogin = (u) => { setUser(u); storeSave("currentUser", u); handleNav(u.isAdmin ? "admin" : "dashboard"); };
  const handleLogout = () => { setUser(null); storeSave("currentUser", null); storeSave("currentPage", "home"); handleNav("home"); };
  const handleRegister = (u) => { setUsers(p => { const newUsers = [...p, u]; storeSave("users", newUsers); return newUsers; }); handleLogin(u); };
  const handleBook = (b) => { setBookings(p => { const newBookings = [...p, b]; storeSave("bookings", newBookings); return newBookings; }); };
  const handleUpdateStatus = (id, status) => { setBookings(p => { const updated = p.map(b => b.id === id ? { ...b, status } : b); storeSave("bookings", updated); return updated; }); toast("Status updated!"); };
  const handleAddService = (svc) => { setServices(p => { const newServices = [...p, svc]; storeSave("services", newServices); return newServices; }); };
  const handleDeleteService = (id) => { setServices(p => { const filtered = p.filter(s => s.id !== id); storeSave("services", filtered); return filtered; }); };
  const handleDeleteUser = (userId) => { setUsers(p => { const filtered = p.filter(u => u.id !== userId); storeSave("users", filtered); return filtered; }); setBookings(prev => { const updated = prev.filter(b => b.userId !== userId); storeSave("bookings", updated); return updated; }); };
  const handleDeleteBooking = (bookingId) => { setBookings(p => { const filtered = p.filter(b => b.id !== bookingId); storeSave("bookings", filtered); return filtered; }); };
  const handleExportData = () => {
    const data = {
      exportDate: new Date().toISOString(),
      users: users,
      bookings: bookings,
      services: services,
    };
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `servigo-backup-${new Date().getTime()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast("Data exported successfully!");
  };

  useEffect(() => { const style = document.createElement("style"); style.innerHTML = CSS; document.head.appendChild(style); }, []);

  return (
    <div style={{ background: getTheme(theme).bg, color: getTheme(theme).text }}>
      <Nav page={page} user={user} onNav={handleNav} onLogout={handleLogout} lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} />
      {page === "home" && <HomePage services={services} onNav={handleNav} lang={lang} theme={theme} />}
      {page === "login" && <LoginPage users={users} onLogin={handleLogin} onNav={handleNav} lang={lang} theme={theme} />}
      {page === "register" && <RegisterPage onRegister={handleRegister} onNav={handleNav} lang={lang} theme={theme} />}
      {page === "dashboard" && user && !user.isAdmin && <UserDashboard user={user} services={services} bookings={bookings} onBook={handleBook} onLogout={handleLogout} lang={lang} theme={theme} />}
      {page === "admin" && user?.isAdmin && <AdminDashboard users={users} bookings={bookings} services={services} onUpdateStatus={handleUpdateStatus} onAddService={handleAddService} onDeleteService={handleDeleteService} onDeleteUser={handleDeleteUser} onDeleteBooking={handleDeleteBooking} onExportData={handleExportData} onLogout={handleLogout} lang={lang} toast={toast} theme={theme} />}
      <Toast />
    </div>
  );
}
