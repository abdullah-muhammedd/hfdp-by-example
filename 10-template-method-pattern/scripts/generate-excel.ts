import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

const ROWS = 100;
const outputDir = path.join(__dirname, '../files');
const outputFile = path.join(outputDir, 'events.xlsx');

const eventTypes = ['click', 'page_view', 'form_submit', 'scroll'];
const deviceTypes = ['mobile', 'desktop', 'tablet'];
const browsers = ['Chrome', 'Firefox', 'Safari', 'Edge'];
const countries = ['US', 'CA', 'GB', 'DE', 'FR', 'IN', 'JP', 'BR', 'AU', 'CN'];

function randomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function maybe<T>(value: T): T | undefined {
  return Math.random() < 0.15 ? undefined : value;
}

const data = Array.from({ length: ROWS }, (_, i) => {
  const id = i + 1;
  const userId = maybe(`user${id}`);
  const sessionId = maybe(`sess-${Math.ceil(Math.random() * 20)}`);
  const eventType = maybe(eventTypes[Math.floor(Math.random() * eventTypes.length)]);
  const url = `https://example.com/page${Math.ceil(Math.random() * 20)}`;
  const referrer =
    Math.random() < 0.3 ? `https://ref${Math.ceil(Math.random() * 5)}.com` : undefined;
  const userAgent = Math.random() < 0.8 ? 'Mozilla/5.0' : undefined;
  const deviceType = deviceTypes[Math.floor(Math.random() * deviceTypes.length)];
  const browser =
    Math.random() < 0.9 ? browsers[Math.floor(Math.random() * browsers.length)] : undefined;
  const country =
    Math.random() < 0.9 ? countries[Math.floor(Math.random() * countries.length)] : undefined;
  const timestamp = maybe(randomDate(new Date('2024-01-01'), new Date()).toISOString());
  const createdAt = randomDate(new Date('2024-01-01'), new Date()).toISOString();
  const ipAddress = Math.random() < 0.8 ? `192.168.1.${Math.ceil(Math.random() * 100)}` : undefined;
  const countryCode = country;
  const isBot = Math.random() < 0.05;
  return {
    id,
    userId,
    sessionId,
    eventType,
    url,
    referrer,
    userAgent,
    deviceType,
    browser,
    country,
    timestamp,
    createdAt,
    ipAddress,
    countryCode,
    isBot,
  };
});

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

const worksheet = XLSX.utils.json_to_sheet(data);
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, 'Events');
XLSX.writeFile(workbook, outputFile);

console.log(`Excel file generated at ${outputFile}`);
