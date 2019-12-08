import React from 'react';
import { Card } from "react-bootstrap";
import { Link } from 'react-router-dom';

import { timeSince } from '../../../../utils';

const Post = (props) => {
  return (
    <Card style={styles.card}>
      <Card.Body>
        <Card.Title>
          <Link style={{ color: "inherit" }} to={`/user/${props.userId}`}>
            {props.firstName + " " + props.lastName}
          </Link>
        </Card.Title>
        <Card.Text>
          {props.body}
        </Card.Text>
        <Card.Text>
          <small className="text-muted">{timeSince(props.date)}</small>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

const styles = {
  card: {
    width: '100%',
    margin: 'auto',
    marginTop: '1rem'
  }
};

export default Post;
