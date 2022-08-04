'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const { locale, text } = req.body
      if (!locale || text == undefined) {
        res.json({ error: "Required field(s) missing" })
        return
      }
      if (text == "") {
        res.json({ error: "No text to translate" })
        return
      }

    });
};
