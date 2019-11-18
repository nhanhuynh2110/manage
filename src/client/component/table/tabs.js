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

const TabsComponent = ({ children, tabData }) => {
  const [selectTab] = React.useState(0)

  function a11yProps (index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`
    }
  }

  const onChangeTab = () => {

  }

  console.log('tabData', tabData)
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
            {/* {Object.keys((k, index) => <Tab key={index} label={tabData[k].label} {...a11yProps(index)} />)} */}

            <Tab label='Item One' {...a11yProps(1)} />
            <Tab label='Item Two' {...a11yProps(2)} />
            <Tab label='Item Three' {...a11yProps(3)} />
          </Tabs>
          <TabPanel value={selectTab} index={0}>
            {children}
          </TabPanel>
        </>
      ) : <>{children}</>
  )
}

export default TabsComponent
