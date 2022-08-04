const chai = require('chai');
const assert = chai.assert;
const Translator = require('../components/translator.js');
const translator = new Translator

suite('Unit Tests', () => {
	suite('To British translations', () => {
		test('Translate "Mangoes are my favorite fruit"', done => {
			assert.equal(translator.toBritish("Mangoes are my favorite fruit")[0], "Mangoes are my favourite fruit")
			done()
		})
		test('Translate "I ate yogurt for breakfast"', done => {
			assert.equal(translator.toBritish("I ate yogurt for breakfast")[0], "I ate yoghurt for breakfast")
			done()
		})
		test('Translate "We had a party at my friend\'s condo"', done => {
			assert.equal(translator.toBritish("We had a party at my friend's condo")[0], "We had a party at my friend's flat")
			done()
		})
		test('Translate "Can you toss this in the trashcan for me?"', done => {
			assert.equal(translator.toBritish("Can you toss this in the trashcan for me?")[0], "Can you toss this in the bin for me?")
			done()
		})
		test('Translate "The parking lot was full"', done => {
			assert.equal(translator.toBritish("The parking lot was full")[0], "The car park was full")
			done()
		})
		test('Translate "Like a high tech Rube Goldberg machine"', done => {
			assert.equal(translator.toBritish("Like a high tech Rube Goldberg machine")[0], "Like a high tech Heath Robinson device")
			done()
		})		
		test('Translate "To play hooky means to skip class or work"', done => {
			assert.equal(translator.toBritish("To play hooky means to skip class or work")[0], "To bunk off means to skip class or work")
			done()
		})		
		test('Translate "No Mr. Bond, I expect you to die"', done => {
			assert.equal(translator.toBritish("No Mr. Bond, I expect you to die")[0], "No Mr Bond, I expect you to die")
			done()
		})		
		test('Translate "Dr. Grosh will see you now"', done => {
			assert.equal(translator.toBritish("Dr. Grosh will see you now")[0], "Dr Grosh will see you now")
			done()
		})		
		test('Translate "Lunch is at 12:15 today"', done => {
			assert.equal(translator.toBritish("Lunch is at 12:15 today")[0], "Lunch is at 12.15 today")
			done()
		})
	})
	suite('To American translations', () => {
		test('Translate "We watched the footie match for a while"', done => {
			assert.equal(translator.toAmerican("We watched the footie match for a while")[0], "We watched the soccer match for a while")
			done()
		})
		test('Translate "Paracetamol takes up to an hour to work"', done => {
			assert.equal(translator.toAmerican("Paracetamol takes up to an hour to work")[0], "Tylenol takes up to an hour to work")
			done()
		})
		test('Translate "First, caramelise the onions"', done => {
			assert.equal(translator.toAmerican("First, caramelise the onions")[0], "First, caramelize the onions")
			done()
		})
		test('Translate "I spent the bank holiday at the funfair"', done => {
			assert.equal(translator.toAmerican("I spent the bank holiday at the funfair")[0], "I spent the public holiday at the carnival")
			done()
		})
		test('Translate "I had a bicky then went to the chippy"', done => {
			assert.equal(translator.toAmerican("I had a bicky then went to the chippy")[0], "I had a cookie then went to the fish-and-chip shop")
			done()
		})
		test('Translate "I\'ve just got bits and bobs in my bum bag"', done => {
			assert.equal(translator.toAmerican("I've just got bits and bobs in my bum bag")[0], "I've just got odds and ends in my fanny pack")
			done()
		})
		test('Translate "The car boot sale at Boxted Airfield was called off"', done => {
			assert.equal(translator.toAmerican("The car boot sale at Boxted Airfield was called off")[0], "The swap meet at Boxted Airfield was called off")
			done()
		})
		test('Translate "Have you met Mrs Kalyani?"', done => {
			assert.equal(translator.toAmerican("Have you met Mrs Kalyani?")[0], "Have you met Mrs. Kalyani?")
			done()
		})
		test('Translate "Prof Joyner of King\'s College, London"', done => {
			assert.equal(translator.toAmerican("Prof Joyner of King's College, London")[0], "Prof. Joyner of King's College, London")
			done()
		})
		test('Translate "Tea time is usually around 4 or 4.30"', done => {
			assert.equal(translator.toAmerican("Tea time is usually around 4 or 4.30")[0], "Tea time is usually around 4 or 4:30")
			done()
		})
	})
	suite('Highlight translations', () => {
		test('Translate "Mangoes are my favorite fruit"', done => {
			assert.equal(translator.toBritish("Mangoes are my favorite fruit")[1], 'Mangoes are my <span class="highlight">favourite</span> fruit')
			done()
		})
		test('Translate "I ate yogurt for breakfast"', done => {
			assert.equal(translator.toBritish("I ate yogurt for breakfast")[1], 'I ate <span class="highlight">yoghurt</span> for breakfast')
			done()
		})
		test('Translate "We watched the footie match for a while"', done => {
			assert.equal(translator.toAmerican("We watched the footie match for a while")[1], 'We watched the <span class="highlight">soccer</span> match for a while')
			done()
		})
		test('Translate "Paracetamol takes up to an hour to work"', done => {
			assert.equal(translator.toAmerican("Paracetamol takes up to an hour to work")[1], '<span class="highlight">Tylenol</span> takes up to an hour to work')
			done()
		})
	})
});
