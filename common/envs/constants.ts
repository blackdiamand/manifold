import { escapeRegExp } from 'lodash'
import { DEV_CONFIG } from './dev'
import { EnvConfig, PROD_CONFIG } from './prod'
import { THEOREMONE_CONFIG } from './theoremone'
import { SALEM_CENTER_CONFIG } from './salemcenter'

export const ENV = process.env.NEXT_PUBLIC_FIREBASE_ENV ?? 'PROD'

const CONFIGS: { [env: string]: EnvConfig } = {
  PROD: PROD_CONFIG,
  DEV: DEV_CONFIG,
  THEOREMONE: THEOREMONE_CONFIG,
  SALEM_CENTER: SALEM_CENTER_CONFIG,
}

export const ENV_CONFIG = CONFIGS[ENV]

export function isWhitelisted(email?: string) {
  if (!ENV_CONFIG.whitelistEmail) {
    return true
  }
  return email && (email.endsWith(ENV_CONFIG.whitelistEmail) || isAdmin(email))
}

// TODO: Before open sourcing, we should turn these into env vars
export function isAdmin(email: string) {
  return ENV_CONFIG.adminEmails.includes(email)
}

export const DOMAIN = ENV_CONFIG.domain
export const FIREBASE_CONFIG = ENV_CONFIG.firebaseConfig
export const PROJECT_ID = ENV_CONFIG.firebaseConfig.projectId
export const IS_PRIVATE_MANIFOLD = ENV_CONFIG.visibility === 'PRIVATE'

// Manifold's domain or any subdomains thereof
export const CORS_ORIGIN_MANIFOLD = new RegExp(
  '^https?://(?:[a-zA-Z0-9\\-]+\\.)*' + escapeRegExp(ENV_CONFIG.domain) + '$'
)
// Vercel deployments, used for testing.
export const CORS_ORIGIN_VERCEL = new RegExp(
  '^https?://[a-zA-Z0-9\\-]+' + escapeRegExp('mantic.vercel.app') + '$'
)
// Any localhost server on any port
export const CORS_ORIGIN_LOCALHOST = /^http:\/\/localhost:\d+$/
