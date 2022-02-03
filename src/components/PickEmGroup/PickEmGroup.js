import React, { Component }  from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

import PickEmWeek from './PickEmWeek'

import DateHelper from '../../Helpers/DateHelper';


function TabPanel(props) {
    return (
      <div
        role="tabpanel"
        hidden={props.value !== props.index}
        id={`simple-tabpanel-${ props.index}`}
        aria-labelledby={`simple-tab-${ props.index}`}
      >
        {props.value ===  props.index && (
              <PickEmWeek  week={props.week} isCurrentWeek={props.isCurrentWeek} weekIndex={props.weekIndex} />
        )}
      </div>
    );
  }
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

class PickEmGroup extends Component{

    state = {
        group: {},
        value: 0,
        weeks: [],
        weekFound: false,
        curWeekIndex: null
    }

    componentDidMount = async () => {
        await this.props.dispatch({
            type: "FETCH_GROUP_BY_ID",
            payload: this.props.match.params
        });
    }
    componentDidUpdate = () =>{
      if (this.props.store.group.events.length > 0 && !this.state.weekFound ){
        this.renderWeeks()
      }
    }

    renderWeeks = () => {
       
        const weeks = Object.entries(this.props.store.group.eventWeeks)
        let weekArry = []
        let eventIndex = null
        weeks.forEach( ([key, value], index) => {
            weekArry.push(value)
            let isCurrentEvent = DateHelper.checkIfSameWeek(new Date(value.start))
            if (isCurrentEvent) {
              eventIndex = index
            }
        })
        if(eventIndex !== null){
          this.setState({
            weeks: weekArry,
            value: eventIndex,
            weekFound: true,
            curWeekIndex: eventIndex
          })
        } else {
          this.setState({
            weeks: weekArry,
            value: eventIndex,
            weekFound: false,
            curWeekIndex: null
          })
        }
        
        return eventIndex
    }
    checkIfCurrentWeek = (index) =>{
      if(this.state.weekFound && this.state.curWeekIndex === index){
        return true
      }
    }

    handleChange = (event, newValue) => {
       this.setState({
           value: newValue
       })
    };

    render(){ 
       return  (
        <div>
            <div  className='groupName'>
              <Typography variant="h3" gutterBottom component="div">
                {String(this.props.store.group.name).toUpperCase()}
              </Typography>
              <Typography variant="h8" gutterBottom component="div">
                {'Join Code: ' + String(this.props.store.group.joinCode).toUpperCase()}
              </Typography>
            </div>

            {
                
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={this.state.value} onChange={this.handleChange} aria-label="basic tabs example">
                        {
                            
                            this.props.store.group.events.length > 0 ?
                              this.state.weeks.map( (el, index) => {

                                  return  (<Tab label={el.week} {...a11yProps(index)} key={'tab' + el.week}  sx={{color: 'white'}}/>)
                              })
                            :
                            <Tab label={'ERROR'} {...a11yProps(0)} key={'tab' + 'ERROR'}  sx={{color: 'white'}}>NO EVENT FOUND</Tab>
                        }
                    </Tabs>
                </Box>
                {
                    this.props.store.group.events.length > 0 ?
                      this.state.weeks.map( (el, index) => {
                            return  (
                                <TabPanel value={this.state.value} index={index} key={'panel' + el.week}  week={{matches: el.matches, index: index}} isCurrentWeek={this.checkIfCurrentWeek} weekIndex={index} />
                            )
                        })
                    :
                    <></>
                      
                }
            </Box>
            }
            
        </div>
       )
    }
}

export default connect(mapStoreToProps)(PickEmGroup); 
