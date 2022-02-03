// ---- Methods --------------------------------------------------------------------------

/**
 * Add "current" class to navbar link corresponding to the current section
 * @param navbarLinks All navbar links with corresponding section id
 * @param sections All sections with corresponding id as name and top offset as top
 * @param force If set on true, will force updating the navbar links even if it shouldn't have any change
 * @returns
 */
function updateNavbarSection(navbarLinks, sections, force = false) {
	const scrollY = window.scrollY

	// All sections above the scrollY limit, the last one is the current section
	const aboveSections = sections.filter((section) => section.top <= scrollY)

	// Skip on error
	if (aboveSections.length === 0) return

	const currentSection = aboveSections[aboveSections.length - 1]
	const previousCurrentLink = navbarLinks.filter(
		(item) => item.a.classList.contains('current') && item.section !== currentSection.id
	)

	// No change, skip if not on initialize step
	if (previousCurrentLink.length === 0 && !force) return

	// Remove current class on previous items
	previousCurrentLink.forEach((item) => item.a.classList.remove('current'))

	// Current item changed, add current class to new item
	const currentLink = navbarLinks.find((item) => item.section === currentSection.id)
	if (currentLink) currentLink.a.classList.add('current')
}

// ---- Elements -------------------------------------------------------------------------

const navbar = document.querySelector('nav#main-nav')

const navbarItems = [...navbar.querySelectorAll('a')]
	.filter((item) => item.getAttribute('href').startsWith('#'))
	.map((a) => ({ section: a.getAttribute('href').slice(1), a }))

const sections = [...document.querySelectorAll('section')].map((section) => ({
	id: section.id,
	section,
	top: section.offsetTop,
}))

// ---- Events ---------------------------------------------------------------------------

window.addEventListener('scroll', () => {
	// Skip cases
	if (navbarItems.length === 0) return
	if (sections.length === 0) return
	if (window.scrollY < 0) return

	updateNavbarSection(navbarItems, sections)
})

// ---- Sky rocket -----------------------------------------------------------------------

// Initialize navbar section update
updateNavbarSection(navbarItems, sections, true)

console.log('🚀')
