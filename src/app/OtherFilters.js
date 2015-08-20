import React from 'react';
import TextFilter from './TextFilter';
import AvailabilityFilter from './AvailabilityFilter';
import TimeRangeFilter from './TimeRangeFilter';



export default class OtherFilters extends React.Component {

    componentDidMount() {
    }

    render() {
        return (
            <div className="filtertools">
                <h4>Filter tools</h4>
                <TextFilter />
                <AvailabilityFilter />
                <TimeRangeFilter />
            </div>
        );
    }
}
