/* eslint-disable import/no-unused-modules */
// TODO: To be deleted - Not used!
// import React from "react";
// import moment from "moment";
// import {SingleDatePicker} from "react-dates";
// import "react-dates/lib/css/_datepicker.css";

// class Dates extends React.Component {
//     state = {
//         date: moment(),
//         focused: true,
//     };

//     renderMonthElement = ({month, onMonthSelect, onYearSelect,}) => (
//         <div style={
//             {
//                 display: "flex",
//                 justifyContent: "center",
//             }
//         }>
//             <div>
//                 <select value={month.month()}
//                     onChange={
//                         (e) => onMonthSelect(month, e.target.value)
//                 }>

//             {moment.months().map((label, value) => (<option value={value}>{label}</option>)}

//                 </select>
//             </div>
//             <div>
//                 <select value={
//                         month.year()
//                     }
//                     onChange={
//                         (e) => onYearSelect(month, e.target.value)
//                 }>
//                     <option value={
//                         moment().year() - 5
//                     }>
//                         {
//                         moment().year() - 5
//                     }</option>
//                     <option value={
//                         moment().year() - 4
//                     }>
//                         {
//                         moment().year() - 4
//                     }</option>
//                     <option value={
//                         moment().year() - 3
//                     }>
//                         {
//                         moment().year() - 3
//                     }</option>
//                     <option value={
//                         moment().year() - 2
//                     }>
//                         {
//                         moment().year() - 2
//                     }</option>
//                     <option value={
//                         moment().year() - 1
//                     }>
//                         {
//                         moment().year() - 1
//                     }</option>
//                     <option value={
//                         moment().year()
//                     }>
//                         {
//                         moment().year()
//                     }</option>
//                     <option value={
//                         moment().year() + 1
//                     }>Next year</option>
//                 </select>
//             </div>
//         </div>
//     );

//     render = () => (
//         <>
//             <div style={
//                 { // borderRight: "55px solid rgba(149, 219, 199, 0.5)",
//                     marginLeft: "23px"
//                 }
//             }>
//                 <h6 style={
//                     {
//                         paddingTop: "15px",
//                         color: "#065f65",
//                         fontWeight: "500",
//                     }
//                 }>
//                     Date Range & Year
//                 </h6>

//                 <SingleDatePicker small noBorder showClearDates keepOpenOnDateSelect
//                     date={
//                         this.state.date
//                     }
//                     onDateChange={
//                         (date) => this.setState({date})
//                     }
//                     focused={
//                         this.state.focused
//                     }
//                     onFocusChange={
//                         ({focused}) => this.setState({focused})
//                     }
//                     renderMonthElement={
//                         this.renderMonthElement
//                     }/>
//             </div>
//             <hr style={
//                 {
//                     border: "0.5px solid #66b3a6",
//                     marginTop: "0%",
//                     marginBottom: "0%",
//                     marginLeft: "5px",
//                 }
//             }/>
//         </>
//     );
// }

// export default Dates;
