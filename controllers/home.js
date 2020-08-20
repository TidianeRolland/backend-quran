/**
 * GET /
 * Home page.
 */

let errs = require('restify-errors');


exports.listRecitators = (req, res, next) => {
  const recitators = require('../public/recitators/recitators.json');
  res.send(recitators);
};

exports.listSurahs = (req, res, next) => {
  const surahs = require('../public/surahs/surahs.json');
  res.send(surahs);
};

exports.getSurah = (req, res, next) => {
  const no = +req.params.id;
  const surahs = require('../public/surahs/surahs.json');
  if (no >= 1 && no <= 114 ) {
    const surah = surahs.filter((s) => s.number === no)[0];
    res.send(surah);
  }
  else {
    return next(new errs.NotFoundError('Surah not Found'));
  }
};
  