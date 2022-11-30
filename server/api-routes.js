const express = require('express');
const path = require('path');
const fs = require('fs')
const unirest = require('unirest');
const { getMobByName, insertMob, updateMobByName } = require('./persistence');

const router = new express.Router();

router.get('/cat/', (req, res) => {
  const request = unirest('GET', 'https://cataas.com/cat?json=true');
  request.end(function (response) {
    if (response.error) throw new Error(response.error);
    res.json(response.body || {});
  });
});

router.get('/sounds', (req, res) => {
  const files = fs.readdirSync(path.join(__dirname, 'public', 'sounds'));
  const result = files.map(file => {
    return {
      title: file.split('.')[0].charAt(0).toUpperCase() + file.split('.')[0].slice(1),
      url: `/sounds/${file}`,
    };
  });
  res.json(result);
});

router.post('/sounds', (req, res) => {
  const upfile = req.files.sound;
  const updest = path.join(__dirname, 'public', 'sounds', upfile.name);

  upfile.mv(updest, err => {
    if (err) { return res.status(500).send(err); }

    res
      .status(201)
      .send();
  });
});

router.get('/mobs/:name', async (req, res) => {
  const mobName = req.params.name;

  if (!mobName) {
    res
      .status(400)
      .send();
    return;
  }

  const mob = await getMobByName(mobName);

  if (!mob) {
    res
      .status(404)
      .send();
    return;
  }

  res.json(mob);
});

router.post('/mobs', async (req, res) => {
  // TODO: validate body content (schema validation)
  const mob = req.body;

  const existingMob = await getMobByName(mob.mob);

  if (existingMob) {
    res
      .status(409)
      .json({
        message: "Cannot insert duplicated mob name "
      });
  }

  await insertMob(mob);

  res.status(201).send();
});

router.patch('/mobs', async (req, res) => {
  // TODO: validate body content (schema validation)

  const mob = req.body;

  const existingMob = await getMobByName(mob.mob);
  if (!existingMob) {
    res
      .status(404)
      .json({
        message: "Mob does not exist"
      });
    return;
  }

  if (!mob.names && !mob.timeInitial && !mob.sounds && !mob.timerEndDate) {
    res.status(400).send();
    return;
  }

  const mobToUpdate = Object.assign(existingMob, mob)

  await updateMobByName(mob.mob, mobToUpdate);
  res.status(200).send();
});


module.exports = router;