import React from 'react'
import {Paper} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {TreeView} from '@material-ui/lab'
import {Typography} from '@material-ui/core'
import { CloseSquare, PlusSquare, MinusSquare } from '../svgIcon'
import StyledTreeItem from './styledTreeItem'
import treeviewStyle from './treeviewStyle'

const useStyles = makeStyles(treeviewStyle)

export default () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant='h6'>
          Category
        </Typography>
        <TreeView
          className={classes.treeview}
          defaultExpanded={['1']}
          defaultCollapseIcon={<MinusSquare />}
          defaultExpandIcon={<PlusSquare />}
          defaultEndIcon={<CloseSquare />}
        >
          <StyledTreeItem nodeId='1' label='Main'>
            <StyledTreeItem nodeId='2' label='Hello' />
            <StyledTreeItem nodeId='3' label='Subtree with children'>
              <StyledTreeItem nodeId='6' label='Hello' />
              <StyledTreeItem nodeId='7' label='Sub-subtree with children'>
                <StyledTreeItem nodeId='9' label='Child 1' />
                <StyledTreeItem nodeId='10' label='Child 2' />
                <StyledTreeItem nodeId='11' label='Child 3' />
              </StyledTreeItem>
              <StyledTreeItem nodeId='8' label='Hello' />
            </StyledTreeItem>
            <StyledTreeItem nodeId='4' label='World' />
            <StyledTreeItem nodeId='5' label='Something something' />
          </StyledTreeItem>
        </TreeView>
      </Paper>
    </div>
  )
}
