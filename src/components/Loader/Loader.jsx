import { Blocks } from 'react-loader-spinner';
import { Spiner } from './Loader.styled';

const Loader = () => {
  return (
    <Spiner>
      <Blocks
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
      />
    </Spiner>
  );
};

export default Loader;
