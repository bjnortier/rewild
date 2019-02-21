import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { Button } from 'minimui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Site extends Component {
  render () {
    const { site, onDelete, deleting } = this.props
    return <tr>
      <td>{site.name}</td>
      <td><Button
        label={<FontAwesomeIcon icon={faTrashAlt} />}
        secondary
        onClick={() => onDelete()}
        error={deleting === 'error'}
        inProgress={deleting === 'in-progress'}
      /></td>
    </tr>
  }
}

Site.propTypes = {
  site: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  deleting: PropTypes.string.isRequired,
  onPatch: PropTypes.func.isRequired,
  patching: PropTypes.string.isRequired
}

export default Site
