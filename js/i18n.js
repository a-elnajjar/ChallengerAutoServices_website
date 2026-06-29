const STORAGE_KEY = "cas-lang";
const SUPPORTED = ["en", "ar"];

export const translations = {
	en: {
		"meta.title": "Challenger Auto Services | Auto Repair & Maintenance Shop",
		"meta.description":
			"Challenger Auto Services offers honest auto repair and maintenance for foreign and domestic vehicles. Oil changes, brakes, tires, and general repairs with no gimmicks.",
		"skipLink": "Skip to main content",
		"lang.label": "Language",
		"header.hours": "Mon–Fri 8am–6pm · Sat 9am–2pm",
		"logo": "Challenger Auto Services",
		"logoAria": "Challenger Auto Services home",
		"menu": "Menu",
		"nav.label": "Primary",
		"nav.home": "Home",
		"nav.services": "Services",
		"nav.about": "About",
		"nav.schedule": "Schedule Service",
		"mega.label": "Submenu",
		"mega.services.popular": "Popular Services",
		"mega.services.oil": "Oil Change Service",
		"mega.services.brakes": "Brake Pad & Rotor Service",
		"mega.services.tires": "Tire Service",
		"mega.services.repairs": "Repairs & Maintenance",
		"mega.services.general": "General Repairs & Maintenance",
		"mega.services.viewAll": "View All Services",
		"mega.services.warranty": "Service Warranty",
		"mega.services.offers": "Offers",
		"mega.services.special": "Special Offers",
		"mega.services.note":
			"Foreign & domestic · honest estimates · no gimmicks.",
		"mega.about.shop": "Our Shop",
		"mega.about.aboutUs": "About Us",
		"mega.about.whyUs": "Why Choose Us",
		"mega.about.connect": "Connect",
		"mega.about.call": "Call Us",
		"mega.about.note":
			"Family-owned. Treating every car as if it were our own.",
		"hero.eyebrow": "We Service All Foreign and Domestic Makes",
		"hero.line1": "Your Trusted Service Shop",
		"hero.line2": "for Everything Automotive",
		"hero.intro":
			"Honest, friendly service with no hassles or gimmicks. We treat every car as if it were our own — so you can drive with peace of mind.",
		"hero.cta": "Schedule Service",
		"about.overline": "Why Choose Us",
		"about.title": "Built on Trust, Transparency, and Craftsmanship",
		"about.lead":
			"Family-owned and committed to doing the job right. No pressure, no jargon — just straightforward care for your vehicle.",
		"about.card1.title": "Honest Diagnostics",
		"about.card1.text":
			"We explain what your car needs and why, so you can make informed decisions without the hard sell.",
		"about.card2.title": "Quality Parts & Workmanship",
		"about.card2.text":
			"From routine maintenance to complex repairs, we use quality parts and stand behind our work.",
		"about.card3.title": "Owner On Site",
		"about.card3.text":
			"You'll always know who is working on your car. Approachable experts who take pride in every job.",
		"about.cta": "Get in Touch",
		"services.overline": "Explore Our Services",
		"services.title": "Complete Auto Repair & Maintenance",
		"services.lead":
			"Everything your vehicle needs under one roof — performed with care and transparency.",
		"services.card1.title": "Oil Change Service",
		"services.card1.text":
			"Keep your engine running smoothly with regular oil and filter service tailored to your vehicle.",
		"services.card2.title": "Brake Pad & Rotor Service",
		"services.card2.text":
			"Safe, reliable stopping power with thorough inspections and quality brake components.",
		"services.card3.title": "Tire Service",
		"services.card3.text":
			"Rotation, balancing, and replacement to keep you confident on the road in every season.",
		"services.card4.title": "General Repairs",
		"services.card4.text":
			"From check-engine lights to major repairs — honest diagnostics and expert workmanship.",
		"services.cta": "Schedule Service",
		"contact.title": "Ready for Honest Auto Care?",
		"contact.text":
			"Contact us today for friendly service you can trust — no gimmicks, just peace of mind.",
		"contact.schedule": "Schedule Service",
		"contact.call": "Call Us",
		"footer.tagline":
			"Your Trusted Service Shop for Everything Automotive",
		"footer.hoursTitle": "Hours of Operation",
		"footer.hours":
			'<time datetime="Mo-Fr 08:00-18:00">Mon–Fri: 8am – 6pm</time><br><time datetime="Sa 09:00-14:00">Sat: 9am – 2pm</time><br>Sun: Closed',
		"footer.contact": "Contact",
		"footer.getInTouch": "Get in Touch",
		"footer.schedule": "Schedule Service",
		"footer.copyright": "© Challenger Auto Services. All rights reserved.",
	},
	ar: {
		"meta.title": "Challenger Auto Services | صيانة وإصلاح السيارات",
		"meta.description":
			"تقدّم Challenger Auto Services صيانة وإصلاحاً أميناً للسيارات المحلية والمستوردة: تغيير الزيت، الفرامل، الإطارات، والإصلاحات العامة بدون مبالغات.",
		"skipLink": "انتقل إلى المحتوى الرئيسي",
		"lang.label": "اللغة",
		"header.hours": "الإثنين–الجمعة 8ص–6م · السبت 9ص–2م",
		"logo": "Challenger Auto Services",
		"logoAria": "الصفحة الرئيسية — Challenger Auto Services",
		"menu": "القائمة",
		"nav.label": "التنقل الرئيسي",
		"nav.home": "الرئيسية",
		"nav.services": "الخدمات",
		"nav.about": "من نحن",
		"nav.schedule": "احجز موعداً",
		"mega.label": "قائمة فرعية",
		"mega.services.popular": "الخدمات الأكثر طلباً",
		"mega.services.oil": "تغيير الزيت",
		"mega.services.brakes": "خدمة الفرامل والأقراص",
		"mega.services.tires": "خدمة الإطارات",
		"mega.services.repairs": "الإصلاح والصيانة",
		"mega.services.general": "الإصلاحات والصيانة العامة",
		"mega.services.viewAll": "عرض جميع الخدمات",
		"mega.services.warranty": "ضمان الخدمة",
		"mega.services.offers": "العروض",
		"mega.services.special": "عروض خاصة",
		"mega.services.note":
			"سيارات محلية ومستوردة · تقديرات شفافة · بدون حيل تسويقية.",
		"mega.about.shop": "ورشتنا",
		"mega.about.aboutUs": "من نحن",
		"mega.about.whyUs": "لماذا تختارنا",
		"mega.about.connect": "تواصل معنا",
		"mega.about.call": "اتصل بنا",
		"mega.about.note":
			"مؤسسة عائلية. نتعامل مع كل سيارة وكأنها ملكنا.",
		"hero.eyebrow": "نخدم جميع الماركات المحلية والمستوردة",
		"hero.line1": "ورشتك الموثوقة",
		"hero.line2": "لجميع احتياجات سيارتك",
		"hero.intro":
			"خدمة صادقة وودودة بدون تعقيد أو مبالغات. نتعامل مع كل سيارة وكأنها ملكنا — لتقود باطمئنان.",
		"hero.cta": "احجز موعداً",
		"about.overline": "لماذا تختارنا",
		"about.title": "نبني على الثقة والشفافية والإتقان",
		"about.lead":
			"مؤسسة عائلية ملتزمة بإنجاز العمل على أكمل وجه. بدون ضغط وبدون مصطلحات معقدة — فقط عناية مباشرة بسيارتك.",
		"about.card1.title": "تشخيص صادق",
		"about.card1.text":
			"نوضّح ما تحتاجه سيارتك ولماذا، لتتخذ قرارات مدروسة دون ضغط بيع.",
		"about.card2.title": "قطع غيار وجودة عمل",
		"about.card2.text":
			"من الصيانة الدورية إلى الإصلاحات المعقدة، نستخدم قطعاً موثوقة ونضمن عملنا.",
		"about.card3.title": "المالك في الموقع",
		"about.card3.text":
			"ستعرف دائماً من يعمل على سيارتك. خبراء ودودون يفخرون بكل مهمة.",
		"about.cta": "تواصل معنا",
		"services.overline": "استكشف خدماتنا",
		"services.title": "إصلاح وصيانة شاملة للسيارات",
		"services.lead":
			"كل ما تحتاجه سيارتك تحت سقف واحد — بعناية وشفافية.",
		"services.card1.title": "تغيير الزيت",
		"services.card1.text":
			"حافظ على محركك بخدمة زيت وفلاتر منتظمة مناسبة لسيارتك.",
		"services.card2.title": "خدمة الفرامل والأقراص",
		"services.card2.text":
			"قوة توقف آمنة وموثوقة مع فحص دقيق وقطع فرامل عالية الجودة.",
		"services.card3.title": "خدمة الإطارات",
		"services.card3.text":
			"تدوير وموازنة واستبدال لتقود بثقة في كل موسم.",
		"services.card4.title": "إصلاحات عامة",
		"services.card4.text":
			"من أضواء المحرك إلى الإصلاحات الكبرى — تشخيص صادق وعمل متقن.",
		"services.cta": "احجز موعداً",
		"contact.title": "هل أنت مستعد لعناية صادقة بسيارتك؟",
		"contact.text":
			"تواصل معنا اليوم لخدمة ودودة يمكنك الوثوق بها — بدون حيل، فقط راحة بال.",
		"contact.schedule": "احجز موعداً",
		"contact.call": "اتصل بنا",
		"footer.tagline": "ورشتك الموثوقة لجميع احتياجات سيارتك",
		"footer.hoursTitle": "ساعات العمل",
		"footer.hours":
			'<time datetime="Mo-Fr 08:00-18:00">الإثنين–الجمعة: 8ص – 6م</time><br><time datetime="Sa 09:00-14:00">السبت: 9ص – 2م</time><br>الأحد: مغلق',
		"footer.contact": "التواصل",
		"footer.getInTouch": "تواصل معنا",
		"footer.schedule": "احجز موعداً",
		"footer.copyright": "© Challenger Auto Services. جميع الحقوق محفوظة.",
	},
};

function getInitialLang() {
	const params = new URLSearchParams(window.location.search);
	const queryLang = params.get("lang");
	if (queryLang && SUPPORTED.includes(queryLang)) {
		return queryLang;
	}

	const stored = localStorage.getItem(STORAGE_KEY);
	if (stored && SUPPORTED.includes(stored)) {
		return stored;
	}

	if (navigator.language?.startsWith("ar")) {
		return "ar";
	}

	return "en";
}

function setMetaContent(selector, content) {
	const el = document.querySelector(selector);
	if (el && content) {
		el.setAttribute("content", content);
	}
}

export function applyLanguage(lang) {
	if (!SUPPORTED.includes(lang)) {
		return;
	}

	const t = translations[lang];

	document.documentElement.lang = lang;
	document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

	document.querySelectorAll("[data-i18n]").forEach((el) => {
		const key = el.getAttribute("data-i18n");
		const value = t[key];
		if (value === undefined) {
			return;
		}

		if (el.hasAttribute("data-i18n-html")) {
			el.innerHTML = value;
		} else {
			el.textContent = value;
		}
	});

	document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
		const key = el.getAttribute("data-i18n-aria");
		if (t[key]) {
			el.setAttribute("aria-label", t[key]);
		}
	});

	document.title = t["meta.title"];
	setMetaContent('meta[name="description"]', t["meta.description"]);
	setMetaContent('meta[property="og:title"]', t["meta.title"]);
	setMetaContent('meta[property="og:description"]', t["meta.description"]);
	setMetaContent('meta[name="twitter:title"]', t["meta.title"]);
	setMetaContent('meta[name="twitter:description"]', t["meta.description"]);

	document.querySelectorAll("[data-lang-switch]").forEach((btn) => {
		const active = btn.getAttribute("data-lang-switch") === lang;
		btn.classList.toggle("is-active", active);
		btn.setAttribute("aria-pressed", active ? "true" : "false");
	});

	localStorage.setItem(STORAGE_KEY, lang);

	const url = new URL(window.location.href);
	if (lang === "en") {
		url.searchParams.delete("lang");
	} else {
		url.searchParams.set("lang", lang);
	}
	history.replaceState(null, "", url);

	document.dispatchEvent(new CustomEvent("languagechange", { detail: { lang } }));
}

function initI18n() {
	applyLanguage(getInitialLang());

	document.querySelectorAll("[data-lang-switch]").forEach((btn) => {
		btn.addEventListener("click", () => {
			const lang = btn.getAttribute("data-lang-switch");
			if (lang && SUPPORTED.includes(lang)) {
				applyLanguage(lang);
			}
		});
	});
}

initI18n();
