import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import matchSorter from 'match-sorter'
import {getEventData} from '../../redux/actions'

// Import React Table
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';


const AllUpperCase = props => <span>{props.value.toUpperCase()}</span>;
class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filtered: [],
      filterAll: [],
    };
    this.filterAll = this.filterAll.bind(this);
    props.getEventData();
  }
  

  onFilteredChange(filtered) {
    // extra check for the "filterAll"
    if (filtered.length > 1 && this.state.filterAll.length) {
      // NOTE: this removes any FILTER ALL filter
      const filterAll = '';
      this.setState({ filtered: filtered.filter((item) => item.id != 'all'), filterAll })
    }
    else
      this.setState({ filtered });
  }

  filterAll(e) {
   const { value } = e.target;
   let filterAll = value;
   let filtered = [{ id: 'discount', value: filterAll }];
    
    if(e.target.value == "all"){
      filterAll = ""
      filtered = [{ id: 'all', value: filterAll }];
    }
    
    if(e.target.value == "free"){
      filtered = [{ id: 'price', value: filterAll }];
    }
  // NOTE: this completely clears any COLUMN filters
    this.setState({ filterAll, filtered });
    
  }
  
  render() {
    const { eventdata } = this.props;
    return (
      <div className="event-table">
        Filter All: 
        <select onChange={this.filterAll}>
          <option value="all">All</option>
          <option value="free">Free</option>
          <option value="Discount">Discount</option>
          <option value="No discount">No discount</option>
         </select>
         <div className="scroll-table">
          <ReactTable
            filtered={this.state.filtered}
            ref={r => this.reactTable = r}
            onFilteredChange={this.onFilteredChange.bind(this)}
            data={eventdata}
            filterable
            defaultFilterMethod={(filter, row) =>
              String(row[filter.id]) === filter.value}
            columns={[
            {
                columns: [
                  {
                    Header: "Event Name",
                    accessor: "name",
                    id: "name",
                    Cell: ({value}) => <AllUpperCase value={value} />,
                  },
                  {
                    Header: "Description",
                    id: "description",
                    accessor: d => d.description,
                    Cell: ({value}) => <AllUpperCase value={value} />,
                    filterMethod: (filter, rows) =>
                      matchSorter(rows, filter.value, { keys: ["description"] }),
                  },
                  {
                    Header: "Venue",
                    accessor: "venue",
                    id: "venue",
                    Cell: ({value}) => <AllUpperCase value={value} />,
                    filterMethod: (filter, rows) =>
                      matchSorter(rows, filter.value, { keys: ["venue"] }),
                      filterAll: true
                  },
                  {
                    Header: "Price",
                    accessor: "price",
                    id: "price",
                    Cell: ({value}) => <AllUpperCase value={value} />,
                    filterMethod: (filter, rows) =>
                      matchSorter(rows, filter.value, { keys: ["price"] }),
                      filterAll: true
                  },
                  {
                    Header: "Discount",
                    accessor: "discount",
                    id: "discount",
                    Cell: ({ value }) => (parseInt(value) > 0 ? value : "No Discount"),
                    filterMethod: (filter, row) => {
                      if (filter.value.indexOf("Free") > -1) {
                        return true;
                      }
                      if (filter.value.indexOf("Discount") > -1) {
                        return row[filter.id] > 0;
                      }
                      if(!filter.value.indexOf("Discount") > -1){
                        var a = parseInt(row[filter.id]);
                        if(isNaN(row[filter.id]) || row[filter.id] == ""){
                          return typeof row[filter.id] === "string" 
                        }
                      }
                    },
                  }
                ]
              },
            {
              id: 'all',
                width: 0,
                resizable: false,
                sortable: false,
                Filter: () => { },
                getProps: () => {
                  return {
                    // style: { padding: "0px"}
                  }
                },
                filterMethod: (filter, rows) => {
                  const result = matchSorter(rows, filter.value, {
                    keys: [
                      "name",
                      "description",
                      "venue",
                      "price",
                      "discount"
                    ], threshold: matchSorter.rankings.WORD_STARTS_WITH
                  });
                  return result;
                },
                filterAll: true,
              },

            ]}
            defaultPageSize={10}
            className="-striped -highlight"

            getTrProps={(state,rowInfo)=>{ 
              return {} 
            }}
          />
        </div>
        <br />
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    eventdata: state.commonReducer.eventdata
  }
}
const mapDispatchToProps = (dispatch) => bindActionCreators({getEventData}, dispatch);

EventList = connect(mapStateToProps, mapDispatchToProps)(EventList)
export default EventList;
