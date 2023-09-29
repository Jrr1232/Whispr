// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import { QUERY_SINGLE_WHISPR } from '../utils/queries';

const SingleWhispr = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { whisprId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_WHISPR, {
    // pass URL parameter
    variables: { whisprId: whisprId },
  });

  const whispr = data?.whispr || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {whispr.whisprAuthor.toLowerCase()} <br />
        <span style={{ fontSize: '1rem' }}>
          whispred on {whispr.createdAt.toLowerCase()}
        </span>
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >
          {whispr.whisprText.toLowerCase()}
        </blockquote>
      </div>

      <div className="my-5">
        <CommentList comments={whispr.comments} whisprId={whispr._id} />
      </div>
      <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <CommentForm whisprId={whispr._id} />
      </div>
    </div>
  );
};

export default SingleWhispr;
