import { RequestHandler } from 'express';
import { format } from 'url';
import V from 'validator';
import puppeteer from 'puppeteer';

const parseResolution = (resolution: string): [number, number] => {
  const parsedResolution = resolution.split(':');
  const formatError = new Error(`Given unexpected value for 'resolution' - ${resolution}. Expected DDD:DDD`);

  if (parsedResolution.length !== 2) {
    throw formatError;
  } else if (!V.isNumeric(parsedResolution[0]) || !V.isNumeric(parsedResolution[1])) {
    throw formatError;
  }

  return [Number(parsedResolution[0]), Number(parsedResolution[1])];
};

const parseQuality = (quality: string): number => {
  const formatError = new Error('Quality must be an integer number between 0 and 100');
  let parsedQuality: number;

  if (!V.isNumeric(quality)) {
    throw formatError;
  } else if ((parsedQuality = Number(quality)) < 0 || parsedQuality > 100) {
    throw formatError;
  }

  return parsedQuality;
};

const renderCache: {
  cache: {
    [key: string]: Buffer,
  }
  set(path: string, resolution: string, quality: string, buffer: Buffer): void
  get(path: string, resolution: string, quality: string): Buffer | null,
  hashKey(path: string, resolution: string, quality: string): string,
  invalidate(): void
} = {
  cache: {},
  set (path, resolution, quality, buffer) {
    if (Object.keys(this.cache).length > 100) {
      this.invalidate();
    }

    this.cache[this.hashKey(path, resolution, quality)] = buffer;
  },
  get (path, resolution, quality) {
    const hashKey = this.hashKey(path, resolution, quality);
    if (this.cache[hashKey]) {
      return this.cache[hashKey];
    }

    return null;
  },
  hashKey (path: string, resolution: string, quality: string) {
    return `${path}_${resolution}_${quality}`;
  },
  invalidate () {
    this.cache = {};
  }
};

export const renderHandle: RequestHandler = async (req, res) => {
  const {
    path,
    resolution = '800:600',
    quality = '70'
  }: {path: string, resolution: string, quality: string} = req.query;

  let screenshotBuffer: Buffer | null = renderCache.get(path, resolution, quality);

  if (screenshotBuffer) {
    res.setHeader('content-type', 'image/jpeg');
    res.send(screenshotBuffer);

    return;
  }

  const [width, height] = parseResolution(resolution);
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium-browser',
    headless: true,
    args: [
      '--no-sandbox', // default
      '--single-process'
    ]
  });
  const page = await browser.newPage();
  const parsedQuality = parseQuality(quality);

  await page.goto(format({
    protocol: 'https',
    host: 'github.com',
    pathname: path
  }));

  await page.setViewport({
    width,
    height,
    deviceScaleFactor: 1
  });

  screenshotBuffer = await page.screenshot({
    type: 'jpeg',
    clip: {
      height,
      width,
      x: 0,
      y: 0
    },
    quality: parsedQuality
  });

  renderCache.set(path, resolution, quality, screenshotBuffer);

  res.setHeader('content-type', 'image/jpeg');
  res.send(screenshotBuffer);
};
