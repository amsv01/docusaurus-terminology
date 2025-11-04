let addJSImportStatement;
let getRelativePath;
let getCleanTokens;
let filterTypeTerms;
let getFiles;
let preloadTerms;

beforeAll(async () => {
  ({
    addJSImportStatement,
    getRelativePath,
    getCleanTokens,
    filterTypeTerms,
    getFiles,
    preloadTerms
  } = await import('../lib/lib.js'));
});

const options = {
  termsUrl: '/docs/terms',
  termsDir: '/docs/'
};

describe('get relative path', () => {
  it('finds the file', () => {
    const source = '/docs/file1.md';
    const target = '/docs/dir/file2.md';
    const path = getRelativePath(source, target, options);
    expect(path).toBe('/docs/terms/dir/file2');
  });
});

describe('add import statement', () => {
  it('gets the updated content with the import statement', () => {
    const content = '# Hospitality';
    const newContent = addJSImportStatement(content, { termComponent: 'tooltip' });
    expect(newContent).toBe(
      '\n\nimport Term from "@lunaticmuch/docusaurus-terminology/components/tooltip.js";\n' +
        content
    );
  });
});

describe('add import statement in empty file', () => {
  it('gets the updated content with the import statement', () => {
    const content = '';
    const newContent = addJSImportStatement(content, { termComponent: 'tooltip' });
    expect(newContent).toBe(
      content +
        '\n\nimport Term from "@lunaticmuch/docusaurus-terminology/components/tooltip.js";\n'
    );
  });
});

describe('add import statement for popover', () => {
  it('uses the popover component path', () => {
    const content = '# Hospitality';
    const newContent = addJSImportStatement(content, { termComponent: 'popover' });
    expect(newContent).toBe(
      '\n\nimport Term from "@lunaticmuch/docusaurus-terminology/components/popover.js";\n' +
        content
    );
  });
});

describe('get the term name and reference from the regex match', () => {
  it('the clean tokens', () => {
    const matchPattern = '%%Term name$term%%';
    const separator = '$';
    const tokens = getCleanTokens(matchPattern, separator);
    expect(tokens).toStrictEqual(['Term name', 'term']);
  });
});

describe('get the term name and reference (without the file extension)', () => {
  it('the clean tokens', () => {
    const matchPattern = '%%Mr.Doe$term.md%%';
    const separator = '$';
    const tokens = getCleanTokens(matchPattern, separator);
    expect(tokens).toStrictEqual(['Mr.Doe', 'term']);
  });
});

// async functions
it('get list of files to parse', async () => {
  const basePath = './__tests__/test_docs/';
  const excludeList = ['./__tests__/test_docs/exclude.md'];
  const files = await getFiles(basePath, excludeList);
  expect(files.length).toEqual(2);
});

it('get list of terms', async () => {
  const basePath = './__tests__/test_docs/';
  const files = await getFiles(basePath, []);
  const terms = await preloadTerms(files);
  expect(terms.length).toEqual(2);
});

it('filter the terms based on the type: concept', async () => {
  const basePath = './__tests__/test_docs/';
  const files = await getFiles(basePath, []);
  const terms = await preloadTerms(files);
  const glossaryTermPatterns = ['concept'];
  var typeTerms = filterTypeTerms(terms, glossaryTermPatterns);
  expect(typeTerms.length).toEqual(1);
});
