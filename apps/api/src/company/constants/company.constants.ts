export const COMPANY_DIR = (id: string) => `company/${id}`;
export const COMPANY_LOGO_KEY = (id: string, ext: string) =>
  `${COMPANY_DIR(id)}/logo_v${Date.now()}.${ext}`;
