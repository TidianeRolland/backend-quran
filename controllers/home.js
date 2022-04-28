let errs = require('restify-errors');
const fileSystem = require('fs');


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

exports.getSurahAudio = (req, res, next) => {
  const no = +req.params.no;
  const recitatorID = req.params.recitator;
  

  if ( ! (no && recitatorID) ) return next(new errs.NotFoundError('Surah not Found'));

  let path = require('path');
  const root = path.dirname(require.main.filename);

  if (no >= 1 && no <= 114 ) {
    const filePath = `${root}/public/audio/${recitatorID}/${no}.mp3`;
    const stat = fileSystem.statSync(filePath);
    res.writeHead(200, {
      'Content-Type': 'audio/mpeg',
      'Content-Length': stat.size
    });

    var readStream = fileSystem.createReadStream(filePath);
    readStream.pipe(res);
  }
  else {
    return next(new errs.NotFoundError('Surah not Found'));
  }
 
};
  