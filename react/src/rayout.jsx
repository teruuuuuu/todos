import React from 'react';

import styles from "./rayout.css";
export class TileRayout extends React.Component {

    render() {
        return (<div className={styles["tile-rayout"]}>
            {this.props.children.map((content, index) => <TileItem key={"index-" + index}>{content}</TileItem>)}
        </div>);
    }
}

export class TileItem extends React.Component {
    render() {
        return (<div className={styles["tile-item"]}>{this.props.children}</div>);
    }
}
