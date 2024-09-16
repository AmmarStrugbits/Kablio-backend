export const RECRUITERFIRM_DIR = (id: string) => `recruiterFirm/${id}`;
export const RECRUITERFIRM_LOGO_KEY = (id: string, ext: string) =>
  `${RECRUITERFIRM_DIR(id)}/logo_v${Date.now()}.${ext}`;
