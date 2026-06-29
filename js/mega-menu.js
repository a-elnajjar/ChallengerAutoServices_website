import { animate } from "https://cdn.jsdelivr.net/npm/motion@12.41.0/+esm";

const nav = document.querySelector(".mega-nav");
const panel = document.querySelector(".mega-menu-panel");
const indicator = document.querySelector(".nav-indicator");
const triggers = document.querySelectorAll(".mega-trigger");
const navLinks = document.querySelectorAll(".mega-nav__link:not(.nav-cta)");
const contents = document.querySelectorAll(".mega-menu-content");
const columns = () => panel?.querySelectorAll(".mega-menu-column:not(.is-hidden)") ?? [];

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const desktop = () => window.matchMedia("(min-width: 768px)").matches;

const CLOSE_DELAY = 250;
const OPEN_DURATION = 0.18;
const CLOSE_DURATION = 0.14;

let activeMenu = null;
let closeTimer = null;
let panelAnimation = null;
let clickPinned = false;

function getTrigger(menuId) {
	return document.querySelector(`.mega-trigger[data-menu="${menuId}"]`);
}

function getPanelLinks(menuId) {
	const root = desktop()
		? panel?.querySelector(`[data-panel="${menuId}"]`)
		: document.querySelector(".mega-mobile-panel");

	if (!root) {
		return panel?.querySelector(`[data-panel="${menuId}"]`)?.querySelectorAll("a") ?? [];
	}

	return root.querySelectorAll("a");
}

function moveIndicator(target) {
	if (!indicator || !nav || !target || target.classList.contains("nav-cta")) {
		return;
	}

	const navRect = nav.getBoundingClientRect();
	const targetRect = target.getBoundingClientRect();

	const props = {
		left: targetRect.left - navRect.left,
		width: targetRect.width,
		opacity: 1,
	};

	if (reducedMotion) {
		Object.assign(indicator.style, {
			left: `${props.left}px`,
			width: `${props.width}px`,
			opacity: "1",
		});
		return;
	}

	animate(indicator, props, { duration: 0.15, ease: "easeOut" });
}

function hideIndicator() {
	if (!indicator || clickPinned) return;

	if (reducedMotion) {
		indicator.style.opacity = "0";
		return;
	}

	animate(indicator, { opacity: 0 }, { duration: 0.12 });
}

function showColumns() {
	columns().forEach((item) => {
		item.style.opacity = "1";
		item.style.transform = "none";
	});
}

function hideColumns() {
	columns().forEach((item) => {
		item.style.opacity = "0";
	});
}

function measurePanelHeight() {
	panel.style.height = "auto";
	panel.style.visibility = "hidden";
	panel.style.overflow = "hidden";
	const height = panel.scrollHeight;
	panel.style.visibility = "";
	return height;
}

function resetTriggers() {
	triggers.forEach((trigger) => {
		trigger.classList.remove("is-active");
		trigger.setAttribute("aria-expanded", "false");
	});
}

function setActiveTrigger(menuId) {
	triggers.forEach((trigger) => {
		const isActive = trigger.dataset.menu === menuId;
		trigger.classList.toggle("is-active", isActive);
		trigger.setAttribute("aria-expanded", String(isActive));
	});
}

function clearMobilePanels() {
	document.querySelectorAll(".mega-mobile-panel").forEach((el) => el.remove());
}

function focusFirstPanelLink(menuId) {
	getPanelLinks(menuId)[0]?.focus();
}

function setPanelContent(menuId) {
	const content = panel.querySelector(`[data-panel="${menuId}"]`);
	if (!content) return null;

	contents.forEach((block) => {
		block.hidden = block !== content;
	});

	return content;
}

function openMenu(menuId, { focusFirst = false } = {}) {
	if (!panel || !desktop()) return;

	const trigger = getTrigger(menuId);
	if (!setPanelContent(menuId) || !trigger) return;

	clearTimeout(closeTimer);
	panelAnimation?.stop?.();
	clickPinned = false;

	const wasOpen = activeMenu && !panel.hidden;

	panel.hidden = false;
	setActiveTrigger(menuId);
	activeMenu = menuId;
	moveIndicator(trigger);

	const targetHeight = measurePanelHeight();
	showColumns();
	panel.style.overflow = "hidden";

	if (reducedMotion) {
		panel.style.height = "auto";
		panel.style.opacity = "1";
		if (focusFirst) focusFirstPanelLink(menuId);
		return;
	}

	if (wasOpen) {
		panel.style.height = `${targetHeight}px`;
		panel.style.opacity = "1";
		if (focusFirst) focusFirstPanelLink(menuId);
		return;
	}

	panel.style.height = "0px";
	panel.style.opacity = "0";

	requestAnimationFrame(() => {
		panelAnimation = animate(
			panel,
			{ height: `${targetHeight}px`, opacity: 1 },
			{ duration: OPEN_DURATION, ease: "easeOut" }
		);

		panelAnimation.then(() => {
			panel.style.height = "auto";
			if (focusFirst) focusFirstPanelLink(menuId);
		}).catch(() => {});
	});
}

function closeMenu({ returnFocus = false } = {}) {
	const previousMenu = activeMenu;
	const previousTrigger = previousMenu ? getTrigger(previousMenu) : null;
	const panelWasOpen = panel && !panel.hidden && desktop();

	clearMobilePanels();
	resetTriggers();
	clickPinned = false;

	if (!panelWasOpen || !previousMenu) {
		if (panel) {
			panel.hidden = true;
			panel.style.height = "";
			panel.style.opacity = "";
		}
		contents.forEach((block) => {
			block.hidden = true;
		});
		hideColumns();
		activeMenu = null;
		if (returnFocus && previousTrigger) previousTrigger.focus();
		return;
	}

	hideColumns();

	if (reducedMotion) {
		panel.hidden = true;
		panel.style.height = "";
		panel.style.opacity = "";
		contents.forEach((block) => {
			block.hidden = true;
		});
		activeMenu = null;
		hideIndicator();
		if (returnFocus && previousTrigger) previousTrigger.focus();
		return;
	}

	panelAnimation?.stop?.();
	panel.style.overflow = "hidden";
	panel.style.height = `${panel.scrollHeight}px`;

	requestAnimationFrame(() => {
		panelAnimation = animate(
			panel,
			{ height: 0, opacity: 0 },
			{ duration: CLOSE_DURATION, ease: "easeIn" }
		);

		panelAnimation.then(() => {
			panel.hidden = true;
			panel.style.height = "";
			panel.style.opacity = "";
			contents.forEach((block) => {
				block.hidden = true;
			});
			activeMenu = null;
			hideIndicator();
			if (returnFocus && previousTrigger) previousTrigger.focus();
		}).catch(() => {});
	});
}

function toggleMenu(menuId, { focusFirst = false } = {}) {
	if (activeMenu === menuId && !document.querySelector(".mega-mobile-panel")) {
		closeMenu({ returnFocus: true });
		return;
	}

	openMenu(menuId, { focusFirst });
}

function scheduleClose() {
	if (clickPinned) return;

	clearTimeout(closeTimer);
	closeTimer = setTimeout(() => closeMenu(), CLOSE_DELAY);
}

function cancelClose() {
	clearTimeout(closeTimer);
}

function openMobileMenu(trigger) {
	const menuId = trigger.dataset.menu;
	const item = trigger.closest(".mega-nav__item");
	const isOpen = activeMenu === menuId && item?.querySelector(".mega-mobile-panel");

	item?.querySelector(".mega-mobile-panel")?.remove();

	triggers.forEach((btn) => {
		if (btn !== trigger) {
			btn.classList.remove("is-active");
			btn.setAttribute("aria-expanded", "false");
			btn.closest(".mega-nav__item")?.querySelector(".mega-mobile-panel")?.remove();
		}
	});

	if (isOpen) {
		activeMenu = null;
		trigger.setAttribute("aria-expanded", "false");
		trigger.classList.remove("is-active");
		return;
	}

	const content = panel.querySelector(`[data-panel="${menuId}"] .mega-menu-columns`);
	if (!content || !item) return;

	const mobilePanel = document.createElement("div");
	mobilePanel.className = "mega-mobile-panel";
	mobilePanel.appendChild(content.cloneNode(true));
	item.appendChild(mobilePanel);

	trigger.classList.add("is-active");
	trigger.setAttribute("aria-expanded", "true");
	activeMenu = menuId;
}

function closeMobileNav() {
	document.querySelector(".site-header")?.classList.remove("is-nav-open");
	document.querySelector(".nav-link")?.setAttribute("aria-expanded", "false");
}

function openMobileNav() {
	document.querySelector(".site-header")?.classList.add("is-nav-open");
	document.querySelector(".nav-link")?.setAttribute("aria-expanded", "true");
}

if (nav && panel) {
	const siteHeader = document.querySelector(".site-header");
	const navToggle = document.querySelector(".nav-link");

	navToggle?.addEventListener("click", () => {
		const isOpen = siteHeader?.classList.toggle("is-nav-open");
		navToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));

		if (!isOpen) {
			clearMobilePanels();
			resetTriggers();
			activeMenu = null;
		}
	});

	nav.querySelectorAll(".mega-nav__link:not(.mega-trigger)").forEach((link) => {
		link.addEventListener("click", () => {
			if (!desktop()) {
				closeMobileNav();
				clearMobilePanels();
				resetTriggers();
				activeMenu = null;
			}
		});
	});

	navLinks.forEach((link) => {
		link.addEventListener("mouseenter", () => {
			if (!desktop() || clickPinned) return;
			moveIndicator(link);
			if (!link.classList.contains("mega-trigger")) {
				closeMenu();
			}
		});

		link.addEventListener("focus", () => {
			if (!desktop()) return;
			moveIndicator(link);
		});
	});

	triggers.forEach((trigger) => {
		trigger.addEventListener("mouseenter", () => {
			if (!desktop() || clickPinned) return;
			cancelClose();
			openMenu(trigger.dataset.menu);
		});

		trigger.addEventListener("click", (event) => {
			event.preventDefault();

			if (!desktop()) {
				openMobileNav();
				openMobileMenu(trigger);
				return;
			}

			clickPinned = true;
			cancelClose();

			if (activeMenu === trigger.dataset.menu) {
				closeMenu({ returnFocus: true });
				return;
			}

			toggleMenu(trigger.dataset.menu);
		});

		trigger.addEventListener("keydown", (event) => {
			const menuId = trigger.dataset.menu;

			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();

				if (!desktop()) {
					openMobileMenu(trigger);
					return;
				}

				clickPinned = true;
				cancelClose();

				if (activeMenu === menuId) {
					closeMenu({ returnFocus: true });
					return;
				}

				toggleMenu(menuId, { focusFirst: true });
			}

			if (event.key === "ArrowDown" && desktop()) {
				event.preventDefault();
				clickPinned = true;
				cancelClose();
				openMenu(menuId, { focusFirst: true });
			}

			if (event.key === "Escape") {
				event.preventDefault();
				closeMenu({ returnFocus: true });
			}
		});
	});

	panel.addEventListener("mouseenter", cancelClose);
	panel.addEventListener("mouseleave", scheduleClose);

	panel.addEventListener("keydown", (event) => {
		if (event.key === "Escape") {
			event.preventDefault();
			closeMenu({ returnFocus: true });
		}
	});

	nav.addEventListener("mouseleave", () => {
		if (!desktop() || clickPinned) return;
		scheduleClose();
		hideIndicator();
	});

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape" && activeMenu) {
			closeMenu({ returnFocus: true });
		}
	});

	document.addEventListener("click", (event) => {
		if (!desktop() || !activeMenu) return;

		const target = event.target;
		if (target instanceof Node && nav.contains(target)) return;
		if (target instanceof Node && panel.contains(target)) return;

		closeMenu();
	});

	window.addEventListener("resize", () => {
		if (!desktop()) {
			closeMenu();
			clearMobilePanels();
			activeMenu = null;
		} else {
			closeMobileNav();
			clearMobilePanels();
			resetTriggers();
			activeMenu = null;
		}
	});
}
