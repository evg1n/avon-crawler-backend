'use strict'
const express = require('express');
const crawler = require('./crawler');
const schedule = require('node-schedule');
const json2xls = require('json2xls');
const app = express();
const cors = require('cors');


//cached files
const parfum = require('./productCategories/parfum.json')
const makyaj = require('./productCategories/makyaj.json');
const ciltBakimi = require('./productCategories/cilt-bakimi.json');
const kisiselBakim = require('./productCategories/kisisel-bakim.json');
const sacBakimi = require('./productCategories/sac-bakimi.json')

const port = process.env.PORT || 8080;
const allLinks = [
  'https://kozmetik.avon.com.tr/301/parfum/',
  'https://kozmetik.avon.com.tr/302/makyaj/',
  'https://kozmetik.avon.com.tr/303/cilt-bakimi/',
  'https://kozmetik.avon.com.tr/304/kisisel-bakim/',
  'https://kozmetik.avon.com.tr/305/sac-bakimi/'
]

app.use(cors());
app.use(json2xls.middleware);

// welcome text
app.get('/', (req, res) => res.json('This is the backend for avon-crawler. Coded by evg1n. Please visit: https://www.github.evg1n'));

app.get('/parfum', (req, res) => {
  res.status(200).json(parfum);
});
app.get('/makyaj', (req, res) => {
  res.status(200).json(makyaj)
});
app.get('/cilt-bakimi', (req, res) => {
  res.status(200).json(ciltBakimi)
});
app.get('/kisisel-bakim', (req, res) => {
  res.status(200).json(kisiselBakim)
});
app.get('/sac-bakimi', (req, res) => {
  res.status(200).json(sacBakimi)
});
app.get('/force-all', (req, res) => {
  crawler.crawlAll(allLinks);
  res.status(200).json('Files are being generated')
})
app.listen(port, () => console.log("\x1b[0m", "\x1b[47m", "\x1b[30m",
  `AVON CRAWLER BACKEND ONLINE @PORT:${port}`, "\x1b[0m"));

app.get('/parfum/refresh', async (req, res) => {
  res.status(200).send("Crawling parfum");
  await crawler.crawl(allLinks[0])
});
app.get('/makyaj/refresh', async (req, res) => {
  res.status(200).send("Crawling makyaj");
  await crawler.crawl(allLinks[1])
});
app.get('/cilt-bakimi/refresh', async (req, res) => {
  res.status(200).send("Crawling cilt-bakimi");
  await crawler.crawl(allLinks[2])
});
app.get('/kisisel-bakim/refresh', async (req, res) => {
  res.status(200).send("Crawling kisisel-bakim");
  await crawler.crawl(allLinks[3])
});
app.get('/sac-bakimi/refresh', async (req, res) => {
  res.status(200).send("Crawling sac bakimi");
  await crawler.crawl(allLinks[4])
});

// scheduling for everyday 07.30
var ruleParfum = new schedule.RecurrenceRule();
var ruleMakyaj = new schedule.RecurrenceRule();
var ruleCiltBakimi = new schedule.RecurrenceRule();
var ruleKisiselBakim = new schedule.RecurrenceRule();
var ruleSacBakimi = new schedule.RecurrenceRule();

// set rules
ruleParfum.dayOfWeek = [new schedule.Range(0, 6)];
ruleParfum.hour = 6;
ruleParfum.minute = 0;
ruleMakyaj.dayOfWeek = [new schedule.Range(0, 6)];
ruleMakyaj.hour = 6;
ruleMakyaj.minute = 30;
ruleCiltBakimi.dayOfWeek = [new schedule.Range(0, 6)];
ruleCiltBakimi.hour = 7;
ruleCiltBakimi.minute = 0;
ruleKisiselBakim.dayOfWeek = [new schedule.Range(0, 6)];
ruleKisiselBakim.hour = 7;
ruleKisiselBakim.minute = 30;
ruleSacBakimi.dayOfWeek = [new schedule.Range(0, 6)];
ruleSacBakimi.hour = 7;
ruleSacBakimi.minute = 45;


var parfumSchedule = schedule.scheduleJob(ruleParfum, async function () {
  console.log('Scheduled crawling.');
  await crawler.crawl(allLinks[0]);
})
var makyajSchedule = schedule.scheduleJob(ruleMakyaj, async function () {
  console.log('Scheduled crawling.');
  await crawler.crawl(allLinks[1]);
})
var ciltBakimiSchedule = schedule.scheduleJob(ruleCiltBakimi, async function () {
  console.log('Scheduled crawling.');
  await crawler.crawl(allLinks[2]);
})
var kisiselBakimSchedule = schedule.scheduleJob(ruleKisiselBakim, async function () {
  console.log('Scheduled crawling.');
  await crawler.crawl(allLinks[3]);
})
var sacBakimiSchedule = schedule.scheduleJob(ruleSacBakimi, async function () {
  console.log('Scheduled crawling.');
  await crawler.crawl(allLinks[4]);
})


app.get('/parfum/xls', (req, res) => {
  let json2convert = JSON.stringify(makyaj);
  let json = JSON.parse(json2convert);
  res.xls('parfum.xlsx', json)
});

app.get('/makyaj/xls', (req, res) => {
  let json2convert = JSON.stringify(makyaj);
  let json = JSON.parse(json2convert);
  res.xls('makyaj.xlsx', json)
});

app.get('/cilt-bakimi/xls', (req, res) => {
  let json2convert = JSON.stringify(makyaj);
  let json = JSON.parse(json2convert);
  res.xls('cilt-bakimi.xlsx', json)
});

app.get('/kisisel-bakim/xls', (req, res) => {
  let json2convert = JSON.stringify(kisiselBakim);
  let json = JSON.parse(json2convert);
  res.xls('kisisel-bakim.xlsx', json)
});

app.get('/sac-bakimi/xls', (req, res) => {
  let json2convert = JSON.stringify(makyaj);
  let json = JSON.parse(json2convert);
  res.xls('sac-bakımı.xlsx', json)
});
