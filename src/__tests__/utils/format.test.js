const { formatRelativeTime, formatNumber, getLanguageColor } = require('../../utils/format');

describe('formatRelativeTime', () => {
  beforeAll(() => {
    // Mock Date to ensure consistent test results
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2023-06-16T12:00:00Z'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('formats seconds correctly', () => {
    const date = new Date('2023-06-16T11:59:30Z').toISOString();
    expect(formatRelativeTime(date)).toBe('30 seconds ago');
  });

  it('formats single minute correctly', () => {
    const date = new Date('2023-06-16T11:59:00Z').toISOString();
    expect(formatRelativeTime(date)).toBe('1 minute ago');
  });

  it('formats minutes correctly', () => {
    const date = new Date('2023-06-16T11:55:00Z').toISOString();
    expect(formatRelativeTime(date)).toBe('5 minutes ago');
  });

  it('formats single hour correctly', () => {
    const date = new Date('2023-06-16T11:00:00Z').toISOString();
    expect(formatRelativeTime(date)).toBe('1 hour ago');
  });

  it('formats hours correctly', () => {
    const date = new Date('2023-06-16T08:00:00Z').toISOString();
    expect(formatRelativeTime(date)).toBe('4 hours ago');
  });

  it('formats single day correctly', () => {
    const date = new Date('2023-06-15T12:00:00Z').toISOString();
    expect(formatRelativeTime(date)).toBe('1 day ago');
  });

  it('formats days correctly', () => {
    const date = new Date('2023-06-13T12:00:00Z').toISOString();
    expect(formatRelativeTime(date)).toBe('3 days ago');
  });

  it('formats weeks correctly', () => {
    const date = new Date('2023-06-02T12:00:00Z').toISOString();
    expect(formatRelativeTime(date)).toBe('2 weeks ago');
  });

  it('formats months correctly', () => {
    const date = new Date('2023-04-16T12:00:00Z').toISOString();
    expect(formatRelativeTime(date)).toBe('2 months ago');
  });

  it('formats years correctly', () => {
    const date = new Date('2021-06-16T12:00:00Z').toISOString();
    expect(formatRelativeTime(date)).toBe('2 years ago');
  });

  it('handles future dates by treating them as just now', () => {
    const date = new Date('2023-06-17T12:00:00Z').toISOString();
    expect(formatRelativeTime(date)).toBe('just now');
  });
});

describe('formatNumber', () => {
  it('formats numbers less than 1000 as is', () => {
    expect(formatNumber(123)).toBe('123');
  });

  it('formats numbers between 1000 and 999999 with k', () => {
    expect(formatNumber(1000)).toBe('1k');
    expect(formatNumber(1500)).toBe('1.5k');
    expect(formatNumber(10000)).toBe('10k');
    expect(formatNumber(123456)).toBe('123.5k');
  });

  it('formats numbers between 1000000 and 999999999 with m', () => {
    expect(formatNumber(1000000)).toBe('1m');
    expect(formatNumber(1500000)).toBe('1.5m');
    expect(formatNumber(10000000)).toBe('10m');
    expect(formatNumber(123456789)).toBe('123.5m');
  });

  it('formats numbers greater than or equal to 1000000000 with b', () => {
    expect(formatNumber(1000000000)).toBe('1b');
    expect(formatNumber(1500000000)).toBe('1.5b');
    expect(formatNumber(123456789012)).toBe('123.5b');
  });

  it('handles single decimal places correctly', () => {
    expect(formatNumber(1100)).toBe('1.1k');
    expect(formatNumber(2500)).toBe('2.5k');
    expect(formatNumber(9900)).toBe('9.9k');
  });

  it('removes trailing zeros in decimal places', () => {
    expect(formatNumber(1000)).toBe('1k');
    expect(formatNumber(2000)).toBe('2k');
    expect(formatNumber(1000000)).toBe('1m');
  });
});

describe('getLanguageColor', () => {
  it('returns the correct color for known languages', () => {
    expect(getLanguageColor('JavaScript')).toBe('#f1e05a');
    expect(getLanguageColor('TypeScript')).toBe('#2b7489');
    expect(getLanguageColor('Python')).toBe('#3572A5');
    expect(getLanguageColor('Java')).toBe('#b07219');
  });

  it('returns default color for null language', () => {
    expect(getLanguageColor(null)).toBe('#e3e3e3');
  });

  it('returns default color for unknown languages', () => {
    expect(getLanguageColor('Unknown')).toBe('#e3e3e3');
    expect(getLanguageColor('NonExistentLanguage')).toBe('#e3e3e3');
  });
}); 