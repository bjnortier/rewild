import { connect } from 'react-redux'

import Sites from '../components/Sites'
import { readSitesIfNeeded, rereadSites, createSite, deleteSite, patchSite } from '../actions/sites'

const mapStateToProps = (state) => {
  const { sites } = state
  return {
    readingAll: sites.readingAll,
    creating: sites.creating,
    patching: sites.patching,
    deleting: sites.deleting,
    sites: sites.objects
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onReadSitesIfNeeded: () => dispatch(readSitesIfNeeded()),
    onRereadSites: () => dispatch(rereadSites()),
    onCreate: () => dispatch(createSite()),
    onDelete: (id) => dispatch(deleteSite(id)),
    onPatch: (id, params) => dispatch(patchSite(id, params))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sites)
