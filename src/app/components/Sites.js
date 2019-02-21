import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import { Button, HSpace, Panel } from 'minimui'

import Site from './Site'

const Center = styled.div`
  margin: 20px auto;
  text-align: center;
  > div {
    text-align: left;
  }
`

class Sites extends Component {
  componentDidMount () {
    this.props.onReadSitesIfNeeded()
  }

  render () {
    const { sites, onCreate, creating, onRereadSites, readingAll } = this.props
    const { onDelete, deleting } = this.props
    const sorted = Object.keys(sites).map(key => sites[key])
    let table
    if (sorted.length) {
      table = <table><tbody>{sorted.map(s => <Site
        key={s.id}
        site={s}
        deleting={deleting[s.id] || 'initial'}
        onDelete={() => onDelete(s.id)}
      />)}</tbody></table>
    } else {
      table = 'None'
    }
    return <Center><Panel>
      <div>
        <span>Sites<HSpace /></span>
        <Button
          secondary
          label={<FontAwesomeIcon icon={faSyncAlt} />}
          inProgress={readingAll === 'in-progress'}
          error={readingAll === 'error'}
          onClick={onRereadSites}
        />
      </div>
      {table}
      <div>
        <Button
          label='Create'
          onClick={onCreate}
          inProgress={creating === 'in-progress'}
          error={creating === 'error'}
        />
      </div>
    </Panel></Center>
  }
}

Sites.propTypes = {
  sites: PropTypes.object.isRequired,
  readingAll: PropTypes.string.isRequired,
  onReadSitesIfNeeded: PropTypes.func.isRequired,
  onRereadSites: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  creating: PropTypes.string.isRequired,
  onPatch: PropTypes.func.isRequired,
  patching: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  deleting: PropTypes.object.isRequired
}

export default Sites
