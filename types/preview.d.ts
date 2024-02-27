export type PreviewCodeProps = {
  showPreview: boolean;
  componentCode: string;
  handleSetType: any;
  showToggle?: boolean;
  codeType: string;
};

export type PreviewIframeProps = {
  showPreview: boolean;
  componentHtml: string;
  componentTitle: string;
  componentCreator: string;
  componentDescription: string;
  previewWidth: string;
  refIframe: any;
  previewDark: boolean;
};
