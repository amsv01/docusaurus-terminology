export interface IOptions {
  termsUrl: string;
  termsDir: string;
  docsDir: string;
  glossaryFilepath: string;
  noParseFiles: string[];
  noGlossaryFiles: string[];
  glossaryTermPatterns: string[];
  dryRun: boolean;
  debug: boolean;
  patternSeparator: string;
  termComponent: 'tooltip' | 'popover';
  termWrapperClass: string;
  termLinkClass: string;
  termTextClass: string;
  termPopupClass: string;
}

export interface ITerm {
  glossaryText: string;
  hoverText: string;
  title: string;
}
