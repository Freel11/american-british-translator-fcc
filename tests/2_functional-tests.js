const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

const Translator = require('../components/translator.js');
const translator = new Translator

suite('Functional Tests', () => {
	suite('POST requests', () => {
		test('Translation with text and locale fields', done => {
			chai.request(server)
				.post('/api/translate')
				.send({
					text: 'favourite',
					locale: 'british-to-american'
				})
				.end((err, res) => {
					assert.equal(res.status, 200)
					assert.equal(res.body.translation, '<span class="highlight">favorite</span>')
					done()
				})
		})
		test('Translation with text and invalid locale fields', done => {
			chai.request(server)
				.post('/api/translate')
				.send({
					text: 'favourite',
					locale: 'british-to-somalian'
				})
				.end((err, res) => {
					assert.equal(res.status, 200)
					assert.equal(res.body.error, 'Invalid value for locale field')
					done()
				})
		})
		test('Translation with missing text field', done => {
			chai.request(server)
				.post('/api/translate')
				.send({
					locale: 'british-to-american'
				})
				.end((err, res) => {
					assert.equal(res.status, 200)
					assert.equal(res.body.error, 'Required field(s) missing')
					done()
				})
		})
		test('Translation with missing locale field', done => {
			chai.request(server)
				.post('/api/translate')
				.send({
					text: 'favourite',
					locale: ''
				})
				.end((err, res) => {
					assert.equal(res.status, 200)
					assert.equal(res.body.error, 'Required field(s) missing')
					done()
				})
		})
		test('Translation with empty text field', done => {
			chai.request(server)
				.post('/api/translate')
				.send({
					text: '',
					locale: 'british-to-american'
				})
				.end((err, res) => {
					assert.equal(res.status, 200)
					assert.equal(res.body.error, 'No text to translate')
					done()
				})
		})
		test('Translation with text that needs no translation', done => {
			chai.request(server)
				.post('/api/translate')
				.send({
					text: 'hello',
					locale: 'british-to-american'
				})
				.end((err, res) => {
					assert.equal(res.status, 200)
					assert.equal(res.body.translation, 'Everything looks good to me!')
					done()
				})
		})
	})
});
