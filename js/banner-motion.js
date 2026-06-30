import { animate, hover, inView, scroll, stagger } from "https://cdn.jsdelivr.net/npm/motion@12.41.0/+esm";

const banner = document.querySelector(".band.banner");

if (banner) {
	const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	const eyebrow = banner.querySelector(".banner-eyebrow");
	const lines = banner.querySelectorAll(".banner-line");
	const intro = banner.querySelector(".banner-intro");
	const cta = banner.querySelector(".banner-cta");
	const bg = banner.querySelector(".banner-bg");

	if (reducedMotion) {
		[eyebrow, ...lines, intro, cta].forEach((el) => {
			if (el) el.style.opacity = "1";
		});
		banner.classList.add("is-text-visible");
	} else {
		inView(
			banner,
			() => {
				if (eyebrow) {
					animate(eyebrow, { opacity: [0, 1], y: [16, 0] }, { duration: 0.6, ease: "easeOut" });
				}

				animate(
					lines,
					{ opacity: [0, 1], y: [48, 0] },
					{ delay: stagger(0.15, { start: 0.1 }), duration: 0.9, ease: [0.22, 1, 0.36, 1] }
				);

				if (intro) {
					animate(
						intro,
						{ opacity: [0, 1], y: [24, 0] },
						{ delay: 0.35, duration: 0.8, ease: "easeOut" }
					);
				}

				if (cta) {
					animate(
						cta,
						{ opacity: [0, 1], y: [24, 0], scale: [0.96, 1] },
						{ delay: 0.5, duration: 0.7, type: "spring", stiffness: 260, damping: 22 }
					);
				}

				banner.classList.add("is-text-visible");
			},
			{ amount: 0.35 }
		);

		if (bg && window.matchMedia("(min-width: 768px)").matches) {
			scroll(
				animate(bg, { y: ["0%", "25%"] }, { ease: "linear" }),
				{ target: banner, offset: ["start start", "end start"] }
			);
		}

		document.querySelectorAll(".button-primary").forEach((button) => {
			hover(button, (element) => {
				const animation = animate(
					element,
					{ scale: 1.04, y: -1 },
					{ type: "spring", stiffness: 420, damping: 18 }
				);

				return () => animation.stop();
			});
		});
	}
}
