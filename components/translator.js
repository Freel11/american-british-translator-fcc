const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
	toBritish(text) {
		const dict = { ...americanOnly, ...americanToBritishSpelling }
		const titles = americanToBritishTitles
		const timeRegex = /([1-9]|1[012]):[0-5][0-9]/g
		const translated = this.translate(text, dict, titles, timeRegex, "toBritish")

		if (!translated) {
			return text
		}

		return translated
	}

	toAmerican(text) {
		const dict = { ...britishOnly, ...this.reverse(americanToBritishSpelling) }
		const titles = this.reverse(americanToBritishTitles)
		const timeRegex = /([1-9]|1[012]).[0-5][0-9]/g
		const translated = this.translate(text, dict, titles, timeRegex, "toAmerican")

		if (!translated) {
			return text
		}

		return translated
	}

	translate(text, dict, titles, timeRegex, locale) {
		const lowerText = text.toLowerCase()
		const matchesMap = {}

		Object.entries(titles).map(([k, v]) => {
			if (lowerText.includes(k)) {
				matchesMap[k] = v.charAt(0).toUpperCase() + v.slice(1)
			}
		})

		const spacedWords = Object.fromEntries(Object.entries(dict).filter(([k,v]) => k.includes(" ")))

		Object.entries(spacedWords).map(([k,v]) => {
			if (lowerText.includes(k)) {
				matchesMap[k] = v
			}
		})

		lowerText.match(/(\w+([-'])(\w+)?['-]?(\w+))|\w+/g).forEach(word => {
			if (dict[word]) {
				matchesMap[word] = dict[word]
			}
		})

		const matchedTimes = lowerText.match(timeRegex)

		if (matchedTimes) {
			matchedTimes.map(e => {
				if (locale == "toBritish") {
					return (matchesMap[e] = e.replace(":", "."))
				}
				return (matchesMap[e] = e.replace(".", ":"))
			})
		}

		if (Object.keys(matchesMap).length === 0) return null

		const translation = this.replaceText(text, matchesMap)
		const hilightedTranslation = this.replaceTextAndHilight(text, matchesMap)

		return [translation, hilightedTranslation]
	}

	replaceText(text, matchesMap) {
		const regex = new RegExp(Object.keys(matchesMap).join("|"), "gi")
		return text.replace(regex, matched => matchesMap[matched.toLowerCase()])
	}

	replaceTextAndHilight(text, matchesMap) {
		const regex = new RegExp(Object.keys(matchesMap).join("|"), "gi")
		return text.replace(regex, matched => {
			return `<span class="highlight">${matchesMap[matched.toLowerCase()]}</span>`
		})
	}

	reverse(obj) {
		return Object.assign({}, ...Object.entries(obj).map(([k, v]) => ({ [v]: k })))
	}
}

module.exports = Translator;