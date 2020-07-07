import React from 'react';
import TableFilter from 'react-table-filter';
import "react-table-filter/lib/styles.css";

let EVENTDATA;

export default class EventList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           eventList: [],
           eventListData: [],
        };
        this.filterUpdated = this.filterUpdated.bind(this);
        EVENTDATA = [];
    }

    

    filterUpdated = (newData, filtersObject) => {
        this.setState({
			"upddatedData": newData
		});
    }
    
    render() {
        EVENTDATA = localStorage.getItem("Data") ? JSON.parse(localStorage.getItem("Data")) : [];

        const upddatedData = this.state.upddatedData;
        if(upddatedData){
            EVENTDATA = upddatedData
        }
        const elementsHtml = EVENTDATA.map((item, index) => {
          return (
            <tr key={'row_'+index}>
              <td className="cell">
                { item.name }
              </td>
              <td className="cell" style={{width: "200px"}}>
                { item.description }
              </td>
              <td className="cell">
                { item.venue }
              </td>
              <td className="cell">
                { item.price }
              </td>
              <td className="cell">
                { item.discount }
              </td>
            </tr>
          );
        });
        return (
          (EVENTDATA && EVENTDATA.length > 0 ?
          <div>
           <div className="examples">
              <div className="wrapper">
                  <h1>Event Listing</h1>
                  <div className="scroll-table">
                    <table className="basic-table">
                        <thead>
                            <TableFilter
                            rows={EVENTDATA}
                            onFilterUpdate={this.filterUpdated}>
                            <th key="name" filterkey="name" className="cell" casesensitive={'true'} showsearch={'true'} >
                                Name
                            </th>
                            <th key="description" filterkey="description" className="cell">
                                Description
                            </th>
                            <th key="venue" filterkey="venue" className="cell" alignleft={'true'}>
                                Venue
                            </th>
                            <th key="price" filterkey="price" className="cell" alignleft={'true'}>
                                Price
                            </th>
                            <th key="discount" filterkey="discount" className="cell" alignleft={'true'}>
                                Discount
                            </th>
                            </TableFilter>
                        </thead>
                        <tbody>
                            { elementsHtml }
                        </tbody>
                    </table>
                </div>
              </div>
            </div>
          </div>
          :
          ""
            )
        );
      }
}
