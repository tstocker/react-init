import React, { Component } from 'react';
import $ from 'jquery';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.headers = [];
    }

    buildHeaders(headerData) {
        if(!headerData)
            return false;
        let columns = this.props.columns;
        let headers = [];
        for(let i = 0, len = columns.length; i < len; i++) {
            headers.push(<th key={i}>{this.props.columns[i].label}</th>);
        }
        this.setState({"headers": headers});
    }

    componentDidMount() {
        this.buildHeaders(this.props.columns);
    }

    componentWillReceiveProps(nextProps) {
        this.buildHeaders(nextProps.columns);
    }

    render() {
        return (
            <thead>
                <tr>
                    {this.state.headers}
                </tr>
            </thead>
        );
    }
}

class Line extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.columns = [];
    }

    buildColumns(columnData) {
        if(!columnData)
            return false;
        let columnProperties = this.props.properties;
        let columns = [];

        for(let i = 0, len = columnProperties.length; i < len; i++) {

            let spy = true;
            let value = columnData;

            for(let j = 0, pathLength = columnProperties[i].propertyPath.length; j < pathLength; j++) {
                if(value && value.hasOwnProperty(columnProperties[i].propertyPath[j])) {
                   value = value[columnProperties[i].propertyPath[j]];
                } else {
                    spy = false;
                }
            }

            if(columnProperties[i].propertyPath && columnProperties[i].propertyPath.length > 0 && spy)
                columns.push(<td key={i}>{value}</td>);
            else {
                columns.push(<td></td>);
            }
        }
        this.setState({"columns": columns});
    }

    componentDidMount() {
        this.buildColumns(this.props.data);
    }

    componentWillReceiveProps(nextProps) {
        this.buildColumns(nextProps.data);
    }

    render() {
        return (
            <tr>
                {this.state.columns}
            </tr>
        );
    }
}

class Table extends Component {

    constructor(props) {
        super(props);

        this.state = {};
        this.state.lines = [];
        this.status = 0;
        this.state.pageLines = 10;
        this.state.pageSelected = 0;
        this.state.paginations = [];
        this.buildLines(props.data, this.state.pageSelected);
        this.buildPaginations(props.data);
    }

    renderPage(e, pageId){
        $(e.target).parents('ul').find('li').removeClass('active');
        $(e.target).parent().addClass('active');
        this.setState({pageSelected: pageId});
        this.buildLines(this.props.data, pageId);
    }

    buildPaginations(data){
        if(!data)
            data = [];

        let pages = [];

        for(let i = 0, len = data.length / this.state.pageLines; i < len; i++) {
            pages.push(<li className={this.state.pageSelected === i ? "page-item active" : "page-item"}>
                <a className="page-link" href="javascript:void(0)" onClick={(e)=> this.renderPage(e, i)}>{i + 1}</a>
            </li>)
        }

        this.setState({paginations: pages});
    }

    buildLines(lineData, pageId) {
        if(!lineData)
            return false;

        let lines = [];
        let firstLine = pageId * this.state.pageLines;
        let lastLineToDisplay = lineData.length < firstLine + this.state.pageLines ? lineData.length : firstLine + this.state.pageLines ;

        for(let i = firstLine, len = lastLineToDisplay; i < len; i++) {
            lines.push(<Line data={lineData[i]} key={i} properties={this.props.properties}/>);
        }

        this.setState({"lines": lines});
    }

    componentWillReceiveProps(nextProps) {
        this.buildLines(nextProps.data, this.state.pageSelected);
        this.buildPaginations(nextProps.data);
    }

    render() {
        return (
            <div>
                <table className="table table-responsive-sm table-bordered">
                    <Header columns={this.props.properties} />
                    <tbody>
                        {this.state.lines}
                    </tbody>
                </table>
                { (this.state.paginations.length > 1) ?
                    <ul className="pagination">
                        <li className={this.state.pageSelected === 0 ? "page-item disabled" : "page-item"}>
                            <a className="page-link" href="#">Prev</a>
                        </li>
                        {this.state.paginations}
                        <li className={this.state.pageSelected === Math.floor(this.props.data.length / this.state.pageLines) ? "page-item disabled" : "page-item"}>
                            <a className="page-link" href="#">Next</a>
                        </li>
                    </ul>
                    : ''
                }
            </div>
        );
    }
}

export default Table;





