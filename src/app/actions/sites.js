import { readAllIfNeeded, rereadAll, readOneIfNeeded, rereadOne, create, patch, del } from './crud'

export const readSitesIfNeeded = () => readAllIfNeeded('site')
export const rereadSites = () => rereadAll('site')
export const readSiteIfNeeded = (id) => readOneIfNeeded('site', id)
export const rereadSite = (id) => rereadOne('site', id)
export const createSite = (object) => create('site', object)
export const patchSite = (id, params) => patch('site', id, params)
export const deleteSite = (id, params) => del('site', id)
