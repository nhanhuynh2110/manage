import React from 'react'
import { Tabs, Tab, Typography, Box } from '@material-ui/core'

function TabPanel (props) {
  const { children, value, index, hidden, ...other } = props
  return (
    <Typography
      component='div'
      role='tabpanel'
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  )
}

const TabsComponent = ({ children, tabData, handleTab, tabActive = 0 }) => {
  const [selectTab, setTab] = React.useState(tabActive)

  function a11yProps (index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`
    }
  }

  const onChangeTab = (event, newValue) => {
    handleTab(event.currentTarget.getAttribute('data-name'), newValue)
    setTab(newValue)
  }
  return (
    tabData
      ? (
        <>
          <Tabs
            // value={selectTab}
            value={selectTab}
            onChange={onChangeTab}
            indicatorColor='primary'
            textColor='primary'
            variant='scrollable'
            scrollButtons='auto'
            aria-label='scrollable auto tabs example'
          >
            {Object.keys(tabData).map((k, index) => <Tab data-name={k} key={index} label={tabData[k].label} {...a11yProps(index)} />)}
          </Tabs>
          <TabPanel value={selectTab} index={0}>
            {children}
          </TabPanel>
        </>
      ) : <>{children}</>
  )
}

export default TabsComponent
