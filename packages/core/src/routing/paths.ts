const OMNI_CREATE = {
  OMNI_CREATE_HOME: '/omnicreate',
} as const

const PLAN = {
  PLAN_HOME: '/campaigns',
  PLAN: '/campaigns/:campaignId'
} as const

const SEARCH = {
  SEARCH_HOME: '/search'
} as const

const HOME = {
  HOME_HOME: '/'
} as const

const HUB = {
  HUB_HOME: '/hub'
} as const

export const paths = {
  ...HUB
}