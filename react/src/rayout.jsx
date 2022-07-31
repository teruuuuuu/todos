import React from 'react';

export class TileRayout extends React.Component {

    render() {
        return (<div className="tile-rayout">
            {this.props.children.map((content, index) => <TileItem key={"index-" + index}>{content}</TileItem>)}
        </div>);
    }
}

export class TileItem extends React.Component {
    render() {
        return (<div className="tile-item">{this.props.children}</div>);
    }
}
