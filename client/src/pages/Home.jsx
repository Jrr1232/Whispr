import { useQuery } from '@apollo/client';

import WhisprList from '../components/WhisprList';
import WhisprForm from '../components/WhisprForm';

import { QUERY_WHISPRS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_WHISPRS);
  const whisprs = data?.whisprs || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <WhisprForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <WhisprList
              whisprs={whisprs}
              title="some feed for whispr(s)..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
