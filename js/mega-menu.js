import { animate, stagger } from "https://cdn.jsdelivr.net/npm/motion@12.41.0/+esm";

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
		: document.querySelector(`.mega-mobile-panel [data-panel="${menuId}"], .mega-mobile-panel`);

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

	animate(indicator, props, { type: "spring", stiffness: 420, damping: 34 });
}

function hideIndicator() {
	if (!indicator || clickPinned) return;

	if (reducedMotion) {
		indicator.style.opacity = "0";
		return;
	}

	animate(indicator, { opacity: 0 }, { duration: 0.15 });
}

function revealColumns() {
	const items = columns();
	if (!items.length) return;

	if (reducedMotion) {
		items.forEach((item) => {
			item.style.opacity = "1";
			item.style.transform = "none";
		});
		return;
	}

	animate(
		items,
		{ opacity: [0, 1], y: [16, 0] },
		{ delay: stagger(0.06), duration: 0.45, ease: [0.22, 1, 0.36, 1] }
	);
}

function hideColumns(items) {
	if (reducedMotion) return;

	animate(items, { opacity: 0, y: 8 }, { duration: 0.12 });
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
	const firstLink = getPanelLinks(menuId)[0];
	firstLink?.focus();
}

function openMenu(menuId, { focusFirst = false } = {}) {
	if (!panel || !desktop()) return;

	const content = panel.querySelector(`[data-panel="${menuId}"]`);
	const trigger = getTrigger(menuId);
	if (!content || !trigger) return;

	clearTimeout(closeTimer);
	panelAnimation?.stop?.();
	clickPinned = false;

	contents.forEach((block) => {
		block.hidden = block !== content;
		block.querySelectorAll(".mega-menu-column").forEach((col) => {
			col.classList.remove("is-hidden");
			col.style.opacity = reducedMotion ? "1" : "0";
		});
	});

	panel.hidden = false;
	setActiveTrigger(menuId);
	activeMenu = menuId;
	moveIndicator(trigger);

	if (reducedMotion) {
		panel.style.height = "auto";
		panel.style.opacity = "1";
		revealColumns();
		if (focusFirst) focusFirstPanelLink(menuId);
		return;
	}

	panel.style.height = "0px";
	panel.style.opacity = "0";
	panel.style.overflow = "hidden";

	requestAnimationFrame(() => {
		const targetHeight = panel.scrollHeight;
		panelAnimation = animate(
			panel,
			{ height: `${targetHeight}px`, opacity: 1 },
			{ type: "spring", stiffness: 320, damping: 28, opacity: { duration: 0.2 } }
		);

		panelAnimation.then(() => {
			panel.style.height = "auto";
			revealColumns();
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
		}
		contents.forEach((block) => {
			block.hidden = true;
		});
		activeMenu = null;
		if (returnFocus && previousTrigger) previousTrigger.focus();
		return;
	}

	const visibleColumns = [...columns()];
	hideColumns(visibleColumns);

	if (reducedMotion) {
		panel.hidden = true;
		panel.style.height = "";
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
			{ type: "spring", stiffness: 420, damping: 36, opacity: { duration: 0.15 } }
		);

		panelAnimation.then(() => {
			panel.hidden = true;
			panel.style.height = "";
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
	const isOpen = activeMenu === menuId;

	clearMobilePanels();

	if (isOpen) {
		activeMenu = null;
		trigger.setAttribute("aria-expanded", "false");
		trigger.classList.remove("is-active");
		return;
	}

	resetTriggers();

	const content = panel.querySelector(`[data-panel="${menuId}"]`);
	if (!content) return;

	const mobilePanel = content.cloneNode(true);
	mobilePanel.removeAttribute("id");
	mobilePanel.classList.add("mega-mobile-panel");
	mobilePanel.hidden = false;
	trigger.closest(".mega-nav__item")?.after(mobilePanel);
	trigger.classList.add("is-active");
	trigger.setAttribute("aria-expanded", "true");
	activeMenu = menuId;

	if (!reducedMotion) {
		animate(
			mobilePanel.querySelectorAll(".mega-menu-column"),
			{ opacity: [0, 1], y: [12, 0] },
			{ delay: stagger(0.05), duration: 0.35 }
		);
	}
}

if (nav && panel) {
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
		}
	});
}
