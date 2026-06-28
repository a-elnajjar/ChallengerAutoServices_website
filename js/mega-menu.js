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

let activeMenu = null;
let closeTimer = null;
let panelAnimation = null;

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
	if (!indicator) return;

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

function setActiveTrigger(menuId) {
	triggers.forEach((trigger) => {
		const isActive = trigger.dataset.menu === menuId;
		trigger.classList.toggle("is-active", isActive);
		trigger.setAttribute("aria-expanded", String(isActive));
	});
}

function openMenu(menuId) {
	if (!panel || !desktop()) return;

	const content = panel.querySelector(`[data-panel="${menuId}"]`);
	if (!content) return;

	clearTimeout(closeTimer);
	panelAnimation?.stop?.();

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

	if (reducedMotion) {
		panel.style.height = "auto";
		panel.style.opacity = "1";
		revealColumns();
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
		}).catch(() => {});
	});
}

function closeMenu() {
	if (!panel || !activeMenu) return;

	const visibleColumns = [...columns()];
	hideColumns(visibleColumns);

	triggers.forEach((trigger) => {
		trigger.classList.remove("is-active");
		trigger.setAttribute("aria-expanded", "false");
	});

	if (reducedMotion) {
		panel.hidden = true;
		panel.style.height = "";
		activeMenu = null;
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
		}).catch(() => {});
	});
}

function scheduleClose() {
	clearTimeout(closeTimer);
	closeTimer = setTimeout(closeMenu, 120);
}

function cancelClose() {
	clearTimeout(closeTimer);
}

if (nav && panel) {
	navLinks.forEach((link) => {
		link.addEventListener("mouseenter", () => {
			if (!desktop()) return;
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
			if (!desktop()) return;
			cancelClose();
			moveIndicator(trigger);
			openMenu(trigger.dataset.menu);
		});

		trigger.addEventListener("click", () => {
			if (desktop()) return;

			const menuId = trigger.dataset.menu;
			const isOpen = activeMenu === menuId;

			document.querySelectorAll(".mega-mobile-panel").forEach((el) => el.remove());

			if (isOpen) {
				activeMenu = null;
				trigger.setAttribute("aria-expanded", "false");
				trigger.classList.remove("is-active");
				return;
			}

			triggers.forEach((btn) => {
				btn.classList.remove("is-active");
				btn.setAttribute("aria-expanded", "false");
			});

			const content = panel.querySelector(`[data-panel="${menuId}"]`);
			if (!content) return;

			const mobilePanel = content.cloneNode(true);
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
		});
	});

	panel.addEventListener("mouseenter", cancelClose);
	panel.addEventListener("mouseleave", scheduleClose);

	nav.addEventListener("mouseleave", () => {
		if (!desktop()) return;
		scheduleClose();
		hideIndicator();
	});

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape") {
			closeMenu();
		}
	});

	window.addEventListener("resize", () => {
		if (!desktop()) {
			closeMenu();
			document.querySelectorAll(".mega-mobile-panel").forEach((el) => el.remove());
			activeMenu = null;
		}
	});
}
