import type { IOptions } from './types.js';

export function validateOptions(opts: IOptions) {
  // docsDir
  validateType('docsDir', opts.docsDir, 'string');
  validateNotEmpty('docsDir', opts.docsDir);
  checkRelativePath('docsDir', opts.docsDir);

  // termsDir
  validateType('termsDir', opts.termsDir, 'string');
  validateNotEmpty('termsDir', opts.termsDir);
  checkRelativePath('termsDir', opts.termsDir);

  // glossary filepath
  validateType('glossaryFilepath', opts.glossaryFilepath, 'string');
  validateNotEmpty('glossaryFilepath', opts.glossaryFilepath);
  checkRelativePath('glossaryFilepath', opts.glossaryFilepath);

  // noParseFiles
  validateType('noParseFiles', opts.noParseFiles, 'array');
  for (const file of opts.noParseFiles) {
    checkRelativePath(`noParseFiles item ${file}`, file);
  }

  // noGlossaryFiles
  validateType('noGlossaryFiles', opts.noGlossaryFiles, 'array');
  for (const file of opts.noGlossaryFiles) {
    checkRelativePath(`noGlossaryFiles item ${file}`, file);
  }

  // term component
  validateType('termComponent', opts.termComponent, 'string');
  if (!['tooltip', 'popover'].includes(opts.termComponent)) {
    console.log(
      `"termComponent" should be either "tooltip" or "popover".\nExiting...`
    );
    process.exit(1);
  }

  validateOptionalString('termWrapperClass', opts.termWrapperClass);
  validateOptionalString('termLinkClass', opts.termLinkClass);
  validateOptionalString('termTextClass', opts.termTextClass);
  validateOptionalString('termPopupClass', opts.termPopupClass);
}

function validateNotEmpty(key: string, value: string | any[]) {
  if (value.length == 0) {
    console.log(`"${key}" needs to have a value.\nExiting...`);
    process.exit(1);
  }
}

function validateType(key: string, value: any, type: string) {
  if (type == 'array') {
    if (!Array.isArray(value)) {
      const curType = typeof value;
      console.log(`"${key}" should be an ${type}, not ${curType}.\nExiting...`);
      process.exit(1);
    }
  } else {
    if (typeof value != type) {
      const curType = typeof value;
      console.log(`"${key}" should be a ${type}, not ${curType}.\nExiting...`);
      process.exit(1);
    }
  }
}

function validateOptionalString(key: string, value: unknown) {
  if (typeof value !== 'string') {
    console.log(`"${key}" should be a string.\nExiting...`);
    process.exit(1);
  }
}

function checkRelativePath(key: string, value: string) {
  if (value.charAt(0) == '/') {
    console.log(`${key} should be a relative path, not absolute.\nExiting...`);
    process.exit(1);
  }
}
