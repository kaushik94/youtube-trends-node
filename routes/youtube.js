import express from 'express';
import * as config from '../config.json';
import { YoutubeService } from '../services/youtube';

const router = express.Router();
const service = new YoutubeService();

/* GET home page. */
router.get('/', async (req, res) => {
  const trends = await service.getTrendingVideos(req.query.country);
  Promise.all(trends).then(videos => {
    res.render('youtube/index', {
      selectedCountry: req.query.country,
      countries: config.countryList,
      title: config.title,
      videos: videos
    });
  })
});

router.get('/:videoId', async (req, res) => {
  res.render('youtube/player', {
    countries: config.countryList,
    title: config.title
  });
});

module.exports = router;
